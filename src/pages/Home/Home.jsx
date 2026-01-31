/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { AssetTable } from "./AssetTable";
import { Button } from "@/components/ui/button";
import StockChart from "../StockDetails/StockChart";
import {
  ChatBubbleIcon,
  ChevronLeftIcon,
  Cross1Icon,
  DotIcon,
} from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoinDetails,
  fetchCoinList,
  fetchTradingCoinList,
  getTop50CoinList,
} from "@/Redux/Coin/Action";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { MessageCircle, Play, Sparkles, Shield, TrendingUp, Zap, User, Wallet, Gamepad2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { sendMessage } from "@/Redux/Chat/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { useNavigate } from "react-router-dom";
import CryptoMindRush from "./CryptoMindRush";
import InteractiveTour from "./InteractiveTour";
import CommunityChat from "./CommunityChat";
import heroBgVideo from "./vecteezy_digital-animation-of-business-stock-market-price-chart_2273298.mp4";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const { coin, chatBot, auth } = useSelector((store) => store);
  const [isBotRelease, setIsBotRelease] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isCommunityChatOpen, setIsCommunityChatOpen] = useState(false);
  const chatContainerRef = useRef(null);

  // Scrolling crypto stats for bottom bar
  const cryptoStats = [
    "SOLANA +4.2%",
    "TETHER $1.1B",
    "AI COINS +1.2%",
    "BITCOIN +2.4%",
    "ETHEREUM 18 gwei",
    "CARDANO +3.1%",
    "POLKADOT +2.8%",
    "AVALANCHE +5.3%",
  ];

  useEffect(() => {
    dispatch(fetchCoinList(page));
  }, [page]);

  useEffect(() => {
    dispatch(
      fetchCoinDetails({
      coinId: "bitcoin",
      jwt: auth.jwt || localStorage.getItem("jwt"),
      })
    );
  }, []);

  useEffect(() => {
    if (category == "top50") {
      dispatch(getTop50CoinList());
    } else if (category == "trading") {
      dispatch(fetchTradingCoinList());
    }
  }, [category]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleBotRelease = () => setIsBotRelease(!isBotRelease);

  const handleTakeTour = () => {
    setIsTourActive(true);
  };

  const handleTourClose = () => {
    setIsTourActive(false);
  };

  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(
        sendMessage({
          prompt: inputValue,
          jwt: auth.jwt || localStorage.getItem("jwt"),
        })
      );
      setInputValue("");
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatBot.messages]);

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src={heroBgVideo}
      />
      {/* Gradient overlay for readability but keep video visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-slate-950/45 to-black/65 pointer-events-none" />
      {/* Interactive Tour */}
      {isTourActive && (
        <InteractiveTour
          onClose={handleTourClose}
          onStart={() => {}}
        />
      )}

      <div className="relative z-10 w-full">
        {/* Hero Section - Full Width */}
        <div className="w-full border-b border-slate-800/60 bg-gradient-to-r from-black/95 via-slate-950/90 via-slate-900/90 to-black/95 px-4 py-8 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left: Hero Content */}
              <div className="space-y-6 animate-fade-in">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase mb-2">
                    LIVE DASHBOARD
                  </p>
                  <h1 className="text-4xl font-bold leading-tight text-slate-50 lg:text-5xl xl:text-6xl">
                    Track, analyze, and trade{" "}
                    <span className="bg-gradient-to-r from-rose-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      cryptocurrencies
                    </span>{" "}
                    in one place
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-slate-400 lg:text-lg">
                    Monitor market movements, get instant updates, and make smart trading decisions. All data updates in real-time.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    onClick={() => {
                      const element = document.getElementById("market-table");
                      element?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 px-8 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
                  >
                    View Market
                  </Button>
                  {/* <Button
                    onClick={handleTakeTour}
                    variant="outline"
                    className="h-12 rounded-full border-slate-700 bg-black/50 px-8 text-sm font-semibold text-slate-50 hover:bg-black/80 hover:border-rose-500/50"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Take Tour
                  </Button> */}
                  <Button
                    id="play-game-button"
                    onClick={() => setIsGameOpen(true)}
                    variant="outline"
                    className="h-12 rounded-full border-slate-700 bg-black/50 px-8 text-sm font-semibold text-slate-50 hover:bg-black/80 hover:border-cyan-500/50 transition-all hover:scale-105"
                  >
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    Play Game
                  </Button>
                  <Button
                    onClick={() => setIsCommunityChatOpen(true)}
                    variant="outline"
                    className="h-12 rounded-full border-slate-700 bg-black/50 px-8 text-sm font-semibold text-slate-50 hover:bg-black/80 hover:border-emerald-500/50 transition-all hover:scale-105"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Community Chat
                  </Button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="group relative rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/60 via-slate-950/60 to-black/60 p-4 transition-all duration-300 hover:border-emerald-500/50 hover:bg-black/80 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:to-emerald-500/5 transition-all duration-300" />
                    <div className="relative z-10">
                      <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                        ACTIVE COINS
                      </p>
                      <p className="mt-2 text-2xl font-bold bg-gradient-to-r from-slate-50 to-emerald-200 bg-clip-text text-transparent">
                        {coin.coinList?.length || "2,413"}
                      </p>
                      <p className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live updates
                      </p>
                    </div>
                  </div>
                  <div className="group relative rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/60 via-slate-950/60 to-black/60 p-4 transition-all duration-300 hover:border-rose-500/50 hover:bg-black/80 hover:shadow-lg hover:shadow-rose-500/20 hover:scale-105 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/10 group-hover:to-rose-500/5 transition-all duration-300" />
                    <div className="relative z-10">
                      <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                        NEW ALERTS
                      </p>
                      <p className="mt-2 text-2xl font-bold bg-gradient-to-r from-slate-50 to-rose-200 bg-clip-text text-transparent">187</p>
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                        Last hour
                      </p>
                    </div>
                  </div>
                  <div className="group relative rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/60 via-slate-950/60 to-black/60 p-4 transition-all duration-300 hover:border-cyan-500/50 hover:bg-black/80 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-cyan-500/5 transition-all duration-300" />
                    <div className="relative z-10">
                      <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                        CONNECTED EXCHANGES
                      </p>
                      <p className="mt-2 text-2xl font-bold bg-gradient-to-r from-slate-50 to-cyan-200 bg-clip-text text-transparent">32</p>
                      <p className="mt-1 text-xs text-cyan-400 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Fast connection
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Market Summary Card */}
              <div className="animate-fade-in-delay">
                <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                        Market Summary
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Get the latest market updates every few seconds to stay informed.
                      </p>
                    </div>
                  </div>

                  {/* Market Data Points */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 px-4 py-3 border border-slate-800/50">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-slate-300">
                        <span className="font-semibold text-emerald-400">Bitcoin Trend:</span> BTC is up{" "}
                        {coin.coinDetails?.market_data?.market_cap_change_percentage_24h?.toFixed(1) || "2.4"}% today
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 px-4 py-3 border border-slate-800/50">
                      <Zap className="h-4 w-4 text-rose-400" />
                      <span className="text-sm text-slate-300">
                        <span className="font-semibold text-rose-400">Trading Volume:</span> High activity at $
                        {coin.coinDetails?.market_data?.total_volume?.usd
                          ? (coin.coinDetails.market_data.total_volume.usd / 1e9).toFixed(1) + "B"
                          : "3.6B"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 px-4 py-3 border border-slate-800/50">
                      <Shield className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm text-slate-300">
                        <span className="font-semibold text-cyan-400">Market Status:</span> Stable at 0.03%
                      </span>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500/10 to-cyan-500/10 px-3 py-1.5 text-xs text-rose-300 border border-rose-500/30 shadow-lg shadow-rose-500/10">
                      <Sparkles className="h-3.5 w-3.5 text-rose-400" />
                      AI Assistant Active
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 px-3 py-1.5 text-xs text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                      <Shield className="h-3.5 w-3.5 text-emerald-400" />
                      Security Enabled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Full Width */}
        <div className="w-full px-4 py-6 pb-24 lg:px-8 lg:py-8 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {/* Left: Market Table */}
              <div id="market-table" className="lg:w-full">
                <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase">
                        Live market data for selected coins
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        Click any coin to view detailed market information
                      </p>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-slate-800/60 px-1 py-1 text-xs shadow-lg shadow-black/20">
            <Button
                        variant={category === "all" ? "default" : "ghost"}
              onClick={() => setCategory("all")}
                        className={`h-8 rounded-full px-4 text-xs font-semibold transition-all duration-300 ${
                          category === "all"
                            ? "bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-black hover:from-rose-400 hover:via-emerald-400 hover:to-cyan-400 shadow-lg shadow-rose-500/30 scale-105"
                            : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-50"
                        }`}
            >
                        All assets
            </Button>
            <Button
                        variant={category === "top50" ? "default" : "ghost"}
              onClick={() => setCategory("top50")}
                        className={`h-8 rounded-full px-4 text-xs font-semibold transition-all duration-300 ${
                          category === "top50"
                            ? "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 hover:from-slate-50 hover:to-slate-100 shadow-lg shadow-slate-500/20 scale-105"
                            : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-50"
                        }`}
            >
              Top 50
            </Button>
                    </div>
          </div>
          <AssetTable
            category={category}
                    coins={category === "all" ? coin.coinList : coin.top50}
          />
                  {category === "all" && (
                    <Pagination className="border-t border-slate-800/80 py-4 bg-gradient-to-r from-slate-950/50 to-slate-900/50 backdrop-blur-sm">
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <Button
                    variant="ghost"
                    disabled={page == 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="rounded-full border border-slate-800/60 bg-slate-900/40 text-slate-300 hover:bg-gradient-to-r hover:from-rose-500/20 hover:via-emerald-500/20 hover:to-cyan-500/20 hover:border-rose-500/30 hover:text-slate-50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(1)}
                    isActive={page == 1}
                    className={`rounded-full border transition-all duration-300 ${
                      page == 1
                        ? "bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-black border-transparent shadow-lg shadow-rose-500/30 font-bold"
                        : "border-slate-800/60 bg-slate-900/40 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700/60"
                    }`}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(2)}
                    isActive={page == 2}
                    className={`rounded-full border transition-all duration-300 ${
                      page == 2
                        ? "bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-black border-transparent shadow-lg shadow-rose-500/30 font-bold"
                        : "border-slate-800/60 bg-slate-900/40 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700/60"
                    }`}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => handlePageChange(3)}
                    isActive={page == 3}
                    className={`rounded-full border transition-all duration-300 ${
                      page == 3
                        ? "bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-black border-transparent shadow-lg shadow-rose-500/30 font-bold"
                        : "border-slate-800/60 bg-slate-900/40 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700/60"
                    }`}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                {page > 3 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(3)}
                      isActive
                      className="rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-black border-transparent shadow-lg shadow-rose-500/30 font-bold"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationEllipsis className="text-slate-500" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer rounded-full border border-slate-800/60 bg-slate-900/40 text-slate-300 hover:bg-gradient-to-r hover:from-rose-500/20 hover:via-emerald-500/20 hover:to-cyan-500/20 hover:border-rose-500/30 hover:text-slate-50 transition-all duration-300"
                    onClick={() => handlePageChange(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
                  <p className="mt-4 text-center text-xs text-slate-500">
                    List of top cryptocurrencies
                  </p>
                </div>
        </div>

              {/* Right: Chart and Analytics */}
              <div id="market-chart" className="hidden lg:block lg:w-full">
                <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase">
                        Market Summary
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Get the latest market updates every few seconds to stay informed.
                      </p>
                    </div>
                  </div>
          <StockChart coinId={"bitcoin"} />
                  <div className="mt-4 flex items-center gap-4">
              <Avatar>
                <AvatarImage src={coin.coinDetails?.image?.large} />
              </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm">
                        <p className="font-semibold">
                          {coin.coinDetails?.symbol?.toUpperCase()}
                        </p>
                        <DotIcon className="text-gray-500" />
                <p className="text-gray-400">{coin.coinDetails?.name}</p>
              </div>
                      <div className="flex items-end gap-2 text-sm">
                        <p className="text-xl font-bold text-slate-50">
                          ${coin.coinDetails?.market_data?.current_price?.usd?.toLocaleString()}
                </p>
                <p
                  className={`${
                            coin.coinDetails?.market_data?.market_cap_change_24h < 0
                              ? "text-rose-400"
                              : "text-emerald-400"
                  }`}
                >
                  <span>
                            {coin.coinDetails?.market_data?.market_cap_change_24h > 0 ? "+" : ""}
                            {coin.coinDetails?.market_data?.market_cap_change_percentage_24h?.toFixed(2)}%
                  </span>
                          <span className="ml-1 text-xs">today</span>
                        </p>
                      </div>
                      <p className="text-xs text-slate-500">
                        Pulling data from Binance, Coinbase, and more
                </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About & Trading Steps Section */}
        <div className="w-full px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            {/* About Section */}
            <div className="mb-16 animate-fade-in-delay">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 px-4 py-2 border border-rose-500/30 mb-4">
                  <Sparkles className="h-4 w-4 text-rose-400" />
                  <span className="text-xs font-semibold tracking-wider text-rose-300 uppercase">About Crypto Trading</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-200 via-slate-50 to-cyan-200 bg-clip-text text-transparent lg:text-4xl mb-4">
                  Your Complete Crypto Trading Platform
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Crypto Trading is a comprehensive cryptocurrency trading platform designed for both beginners and experienced traders. 
                  Track real-time market data, manage your portfolio, and make informed trading decisions.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
                  <div className="rounded-xl bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-3 border border-rose-500/30 w-fit mb-4">
                    <TrendingUp className="h-6 w-6 text-rose-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-50 mb-2">Real-Time Data</h3>
                  <p className="text-sm text-slate-400">
                    Get instant updates on prices, volumes, and market caps from multiple exchanges including Binance and Coinbase.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
                  <div className="rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-3 border border-emerald-500/30 w-fit mb-4">
                    <Shield className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-50 mb-2">Secure Trading</h3>
                  <p className="text-sm text-slate-400">
                    Your funds are protected with advanced security measures and two-factor authentication for safe trading.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
                  <div className="rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 p-3 border border-cyan-500/30 w-fit mb-4">
                    <Zap className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-50 mb-2">AI Assistant</h3>
                  <p className="text-sm text-slate-400">
                    Get instant answers to your trading questions with our AI-powered assistant available 24/7.
                  </p>
                </div>
              </div>
            </div>

            {/* Trading Steps Section */}
            <div className="mb-16 animate-fade-in-delay">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 px-4 py-2 border border-emerald-500/30 mb-4">
                  <Play className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">Getting Started</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-200 via-slate-50 to-cyan-200 bg-clip-text text-transparent lg:text-4xl mb-4">
                  Steps to Start Trading
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Follow these simple steps to begin your cryptocurrency trading journey
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { step: "01", title: "Create Account", desc: "Sign up and verify your account to get started", icon: User },
                  { step: "02", title: "Fund Wallet", desc: "Add funds to your wallet using secure payment methods", icon: Wallet },
                  { step: "03", title: "Explore Market", desc: "Browse cryptocurrencies and analyze market trends", icon: TrendingUp },
                  { step: "04", title: "Start Trading", desc: "Execute trades and manage your portfolio effectively", icon: Zap },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group relative rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.95)] transition-all hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/10"
                  >
                    <div className="absolute -top-3 -left-3 rounded-full bg-gradient-to-r from-rose-500 to-cyan-500 p-1">
                      <div className="rounded-full bg-black px-3 py-1">
                        <span className="text-xs font-bold text-white">{item.step}</span>
                      </div>
                    </div>
                    <div className="rounded-xl bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-3 border border-rose-500/30 w-fit mb-4">
                      <item.icon className="h-6 w-6 text-rose-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-50 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full border-t border-slate-800/60 bg-gradient-to-br from-black via-slate-950 to-black px-4 py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="rounded-lg bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-2 border border-rose-500/30">
                    <TrendingUp className="h-5 w-5 text-rose-400" />
                  </div>
                  <span className="text-xl font-bold">
                    <span className="text-rose-400">Crypto</span>{" "}
                    <span className="text-slate-100">Trading</span>
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Your trusted platform for cryptocurrency trading and portfolio management.
                </p>
                <div className="flex gap-3">
                  <div className="rounded-lg bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-2 border border-rose-500/30 cursor-pointer hover:scale-110 transition-transform">
                    <TrendingUp className="h-4 w-4 text-rose-400" />
                  </div>
                  <div className="rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-2 border border-emerald-500/30 cursor-pointer hover:scale-110 transition-transform">
                    <Shield className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="rounded-lg bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 p-2 border border-cyan-500/30 cursor-pointer hover:scale-110 transition-transform">
                    <Zap className="h-4 w-4 text-cyan-400" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-50 mb-4 uppercase tracking-wider">Trading</h4>
                <ul className="space-y-2">
                  {["Market Data", "Portfolio", "Watchlist", "Activity"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-slate-400 hover:text-rose-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-50 mb-4 uppercase tracking-wider">Account</h4>
                <ul className="space-y-2">
                  {["Wallet", "Payment Details", "Withdrawal", "Profile"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-slate-400 hover:text-rose-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-50 mb-4 uppercase tracking-wider">Support</h4>
                <ul className="space-y-2">
                  {["Help Center", "AI Assistant", "Security", "Terms"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-slate-400 hover:text-rose-400 transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800/60 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-slate-500">
                  © 2025 Crypto Trading. All rights reserved.
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 px-3 py-1 text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    System Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Bottom Scrolling Status Bar - Enhanced */}
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-800/60 bg-gradient-to-r from-black/95 via-slate-950/95 to-black/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(15,23,42,0.5)]">
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex-1 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-transparent to-black/95 z-10 pointer-events-none"></div>
              <div className="flex items-center gap-8 animate-scroll">
                {[...cryptoStats, ...cryptoStats, ...cryptoStats].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 whitespace-nowrap group"
                  >
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-rose-400 to-cyan-400 animate-pulse"></div>
                    <span className="text-xs font-semibold text-slate-300 group-hover:text-rose-400 transition-colors">
                      {stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-6 flex items-center gap-3 flex-shrink-0">
              <span className="hidden text-xs text-slate-500 sm:inline">Need help?</span>
              <Button
                id="assistant-toggle"
                onClick={handleBotRelease}
                className="h-9 rounded-full bg-gradient-to-r from-rose-500 via-cyan-500 to-indigo-500 px-5 text-xs font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
              >
                <MessageCircle className="mr-1.5 h-4 w-4" />
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                Open Assistant
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
        {isBotRelease && (
        <div className="fixed bottom-20 right-5 z-50 h-[70vh] w-[20rem] rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/98 via-slate-950/98 to-black/98 text-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.95)] backdrop-blur-xl md:w-[25rem] lg:w-[25rem] overflow-hidden">
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
          
          <div className="flex h-[12%] items-center justify-between border-b border-slate-800/60 bg-gradient-to-r from-slate-950/50 to-slate-900/50 px-6 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-rose-400 to-cyan-400 animate-pulse" />
              <p className="font-bold bg-gradient-to-r from-rose-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                AI Assistant
              </p>
            </div>
              <Button 
                onClick={handleBotRelease} 
                size="icon" 
                variant="ghost"
                className="hover:bg-slate-800/60 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Cross1Icon className="h-4 w-4" />
              </Button>
            </div>

          <div className="scroll-container flex h-[76%] flex-col gap-5 overflow-y-auto px-5 py-4 bg-gradient-to-b from-transparent via-slate-950/20 to-transparent">
            <div className="self-start pb-3 animate-fade-in">
              <div className="w-auto self-end rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 px-5 py-3 text-sm text-slate-100 border border-slate-700/50 shadow-lg shadow-black/20">
                <p className="font-semibold mb-1">
                  {`Hi, ${auth.user?.fullName || "trader"}! 👋`}
                </p>
                <p className="text-xs text-slate-400">
                  Ask anything about prices, market cap, or trading ideas.
                </p>
              </div>
            </div>
              {chatBot.messages.map((item, index) => (
                <div
                  ref={chatContainerRef}
                  key={index}
                  className={`${
                    item.role == "user" ? "self-end" : "self-start"
                } w-auto pb-5 animate-fade-in`}
                >
                  {item.role == "user" ? (
                  <div className="w-auto self-end rounded-2xl bg-gradient-to-r from-rose-500/90 via-emerald-500/90 to-cyan-500/90 px-5 py-3 text-sm font-medium text-black shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40">
                      {item.prompt}
                    </div>
                  ) : (
                    <div className="w-full">
                    <div className="flex min-w-[15rem] w-full gap-2 rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 px-4 py-4 text-sm border border-slate-700/50 shadow-lg shadow-black/20">
                        <p className="text-slate-200 leading-relaxed">{item.ans}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            {chatBot.loading && (
              <div className="self-start pb-5">
                <div className="flex min-w-[15rem] w-full gap-2 rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-800/90 px-4 py-4 border border-slate-700/50">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            </div>

          <div className="h-[12%] border-t border-slate-800/60 bg-gradient-to-r from-slate-950/50 to-slate-900/50 backdrop-blur-sm px-4">
              <Input
              className="h-full w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-500 focus:placeholder:text-slate-400 transition-colors"
              placeholder="Write your question..."
                onChange={handleChange}
                value={inputValue}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        )}

      {/* Crypto Mind Rush Game */}
      {isGameOpen && (
        <CryptoMindRush onClose={() => setIsGameOpen(false)} />
      )}
      {isCommunityChatOpen && (
        <CommunityChat onClose={() => setIsCommunityChatOpen(false)} />
      )}
    </div>
  );
};

export default Home;
