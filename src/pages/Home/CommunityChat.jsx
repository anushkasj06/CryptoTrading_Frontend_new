import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  X, Send, Users, MessageCircle, Copy, Check, Smile, 
  Wifi, WifiOff, ChevronDown, Clock, User
} from "lucide-react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import api, { API_BASE_URL } from "@/Api/api";

const CommunityChat = ({ onClose }) => {
  const { auth } = useSelector((store) => store);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
  const MAX_MESSAGE_LENGTH = 500;

  // Format timestamp with detailed time
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  // Format detailed timestamp for tooltip
  const formatDetailedTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = [];
    let currentGroup = null;

    messages.forEach((msg) => {
      const msgDate = new Date(msg.timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let dateLabel = "";
      if (msgDate.toDateString() === today.toDateString()) {
        dateLabel = "Today";
      } else if (msgDate.toDateString() === yesterday.toDateString()) {
        dateLabel = "Yesterday";
      } else {
        dateLabel = msgDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: msgDate.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
        });
      }

      if (!currentGroup || currentGroup.date !== dateLabel) {
        currentGroup = { date: dateLabel, messages: [] };
        groups.push(currentGroup);
      }
      currentGroup.messages.push(msg);
    });

    return groups;
  };

  // Scroll to bottom with smooth animation
  const scrollToBottom = (smooth = true) => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    }
  };

  // Check if user should see scroll button
  const checkScrollPosition = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        setShowScrollButton(scrollHeight - scrollTop - clientHeight > 200);
      }
    }
  };

  // Copy message to clipboard
  const copyMessage = async (messageText, messageId) => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  // Load chat history
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await api.get("/api/community/messages", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setMessages(response.data || []);
        setIsLoading(false);
        setTimeout(() => scrollToBottom(false), 100);
      } catch (error) {
        console.error("Error loading chat history:", error);
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  // WebSocket connection
  useEffect(() => {
    if (!auth.user) return;

    const socket = new SockJS(`${API_BASE_URL}/ws-community`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        setIsConnected(true);
        console.log("Connected to community chat");

        // Subscribe to community messages
        stompClient.subscribe("/topic/community", (message) => {
          try {
            const newMessage = JSON.parse(message.body);
            setMessages((prev) => [...prev, newMessage]);
            setTimeout(() => {
              scrollToBottom(true);
              checkScrollPosition();
            }, 100);
          } catch (error) {
            console.error("Error parsing message:", error);
          }
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
        console.log("Disconnected from community chat");
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
        setIsConnected(false);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [auth.user]);

  // Scroll position listener
  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      return () => scrollContainer.removeEventListener("scroll", checkScrollPosition);
    }
  }, [messages]);

  // Scroll when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollToBottom(true);
        checkScrollPosition();
      }, 100);
    }
  }, [messages.length]);

  // Send message
  const handleSendMessage = () => {
    if (!inputValue.trim() || !isConnected || !auth.user || inputValue.length > MAX_MESSAGE_LENGTH) return;

    const message = {
      sender: auth.user,
      message: inputValue.trim(),
    };

    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: "/app/chat",
        body: JSON.stringify(message),
      });
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-fade-in">
      <div className="relative w-full max-w-5xl h-[90vh] rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/98 via-slate-950/98 to-black/98 shadow-2xl shadow-rose-500/20 flex flex-col overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-emerald-500/5 to-cyan-500/5 animate-pulse pointer-events-none" />
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-slate-800/60 bg-gradient-to-r from-slate-950/50 to-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="rounded-full bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-3 border border-rose-500/30 animate-pulse">
                <Users className="h-6 w-6 text-rose-400" />
              </div>
              {isConnected && (
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-slate-950 animate-ping" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-50 via-rose-200 to-slate-50 bg-clip-text text-transparent">
                Community Chat
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full transition-all ${
                      isConnected 
                        ? "bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" 
                        : "bg-rose-400"
                    }`}
                  />
                  <span className="text-xs text-slate-400 font-medium">
                    {isConnected ? "Connected" : "Connecting..."}
                  </span>
                </div>
                {isConnected && (
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <User className="h-3 w-3" />
                    <span>{onlineUsers || messages.length > 0 ? "Active" : "0"} users</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            className="rounded-full h-10 w-10 text-slate-400 hover:text-slate-50 hover:bg-slate-800/60 transition-all hover:scale-110"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages Area */}
        <ScrollArea
          ref={scrollAreaRef}
          className="flex-1 p-6 relative"
        >
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-3 animate-pulse">
                  <Skeleton className="h-10 w-10 rounded-full bg-slate-800/60" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24 bg-slate-800/60" />
                    <Skeleton className="h-16 w-full rounded-2xl bg-slate-800/60" />
                  </div>
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-fade-in">
              <div className="relative">
                <div className="rounded-full bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-8 border border-rose-500/30 animate-pulse">
                  <MessageCircle className="h-16 w-16 text-rose-400" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 animate-ping opacity-20" />
              </div>
              <div>
                <p className="text-xl font-bold bg-gradient-to-r from-slate-50 via-rose-200 to-slate-50 bg-clip-text text-transparent">
                  No messages yet
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  Be the first to start the conversation!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6" ref={messagesEndRef}>
              {messageGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-4">
                  {/* Date Separator */}
                  <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                    <span className="text-xs font-semibold text-slate-500 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800/60">
                      {group.date}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                  </div>

                  {/* Messages in group */}
                  {group.messages.map((msg, msgIndex) => {
                    const isOwnMessage = auth.user && msg.sender?.id === auth.user.id;
                    const isHovered = hoveredMessageId === msg.id;
                    const isCopied = copiedMessageId === msg.id;
                    const showAvatar = msgIndex === 0 || 
                      group.messages[msgIndex - 1].sender?.id !== msg.sender?.id;

                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 group transition-all duration-300 animate-fade-in ${
                          isOwnMessage ? "flex-row-reverse" : "flex-row"
                        }`}
                        onMouseEnter={() => setHoveredMessageId(msg.id)}
                        onMouseLeave={() => setHoveredMessageId(null)}
                        style={{ animationDelay: `${msgIndex * 0.05}s` }}
                      >
                        {/* Avatar */}
                        <div className={`transition-all ${showAvatar ? "opacity-100" : "opacity-0"}`}>
                          <Avatar className="h-10 w-10 border-2 border-slate-700 hover:border-rose-500/50 transition-all cursor-pointer hover:scale-110">
                            {msg.sender?.fullName ? (
                              <AvatarFallback className="bg-gradient-to-r from-rose-500/20 to-cyan-500/20 text-slate-50 text-sm font-semibold">
                                {msg.sender.fullName[0].toUpperCase()}
                              </AvatarFallback>
                            ) : (
                              <AvatarImage src={msg.sender?.image} />
                            )}
                          </Avatar>
                        </div>

                        {/* Message Content */}
                        <div
                          className={`flex flex-col max-w-[75%] transition-all ${
                            isOwnMessage ? "items-end" : "items-start"
                          }`}
                        >
                          {/* Sender Name & Time */}
                          {showAvatar && (
                            <div className={`flex items-center gap-2 mb-1.5 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
                              <span className="text-xs font-bold text-slate-300 hover:text-rose-400 transition-colors cursor-pointer">
                                {msg.sender?.fullName || "Anonymous"}
                              </span>
                              <span 
                                className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors"
                                title={formatDetailedTime(msg.timestamp)}
                              >
                                {formatTime(msg.timestamp)}
                              </span>
                            </div>
                          )}

                          {/* Message Bubble */}
                          <div className="relative group/message">
                            <div
                              className={`rounded-2xl px-4 py-3 transition-all duration-300 relative ${
                                isOwnMessage
                                  ? "bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 border border-rose-500/30 text-slate-50 shadow-lg shadow-rose-500/10 hover:shadow-xl hover:shadow-rose-500/20 hover:scale-[1.02]"
                                  : "bg-slate-900/60 border border-slate-800/60 text-slate-200 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:scale-[1.02]"
                              } ${isHovered ? "ring-2 ring-slate-700/50" : ""}`}
                            >
                              {/* Message Text */}
                              <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                                {msg.message}
                              </p>

                              {/* Copy Button (on hover) */}
                              {isHovered && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => copyMessage(msg.message, msg.id)}
                                  className={`absolute top-1 ${
                                    isOwnMessage ? "left-1" : "right-1"
                                  } h-7 w-7 rounded-full bg-black/40 hover:bg-black/60 text-slate-400 hover:text-slate-50 transition-all opacity-0 group-hover/message:opacity-100`}
                                >
                                  {isCopied ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* Scroll to Bottom Button */}
          {showScrollButton && (
            <Button
              onClick={() => scrollToBottom(true)}
              className="absolute bottom-6 right-6 h-12 w-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-black font-semibold shadow-lg shadow-rose-500/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-rose-500/40 animate-bounce"
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="relative p-6 border-t border-slate-800/60 bg-gradient-to-r from-slate-950/50 to-slate-900/50 backdrop-blur-sm">
          {/* Character Count */}
          {inputValue.length > 0 && (
            <div className="absolute top-2 right-8 text-xs text-slate-500">
              <span className={inputValue.length > MAX_MESSAGE_LENGTH ? "text-rose-400" : ""}>
                {inputValue.length}/{MAX_MESSAGE_LENGTH}
              </span>
            </div>
          )}

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                    setInputValue(e.target.value);
                  }
                }}
                onKeyPress={handleKeyPress}
                placeholder={
                  isConnected
                    ? "Type your message... (Press Enter to send)"
                    : "Connecting to chat..."
                }
                disabled={!isConnected}
                maxLength={MAX_MESSAGE_LENGTH}
                className="h-14 rounded-full border-slate-700 bg-slate-900/60 text-slate-50 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/20 disabled:opacity-50 transition-all pr-20"
              />
              {/* Emoji Button (placeholder for future) */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full text-slate-400 hover:text-rose-400 hover:bg-slate-800/60"
                disabled
              >
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || !isConnected || inputValue.length > MAX_MESSAGE_LENGTH}
              className="h-14 w-14 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-black font-semibold shadow-lg shadow-rose-500/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-rose-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>

          {/* Status Messages */}
          <div className="mt-3 flex items-center justify-between">
            {!auth.user ? (
              <p className="text-xs text-slate-500 text-center w-full">
                Please sign in to participate in the community chat
              </p>
            ) : !isConnected ? (
              <div className="flex items-center gap-2 text-xs text-rose-400 w-full justify-center">
                <WifiOff className="h-3.5 w-3.5" />
                <span>Reconnecting...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-400 w-full justify-center">
                <Wifi className="h-3.5 w-3.5" />
                <span>Connected • Messages are end-to-end encrypted</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
