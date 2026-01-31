import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Trophy, Heart, Zap, Clock } from "lucide-react";

// Game event data structure
const GAME_EVENTS = [
  {
    id: 1,
    scenario: "Token price spikes 50% in 10 minutes",
    options: ["HOLD", "FOMO BUY", "PANIC SELL"],
    correct: 0, // HOLD is correct
    explanation: "Sudden spikes often correct. Stay calm and hold."
  },
  {
    id: 2,
    scenario: "Influencer with 1M followers tweets about a new coin",
    options: ["IGNORE", "BUY IMMEDIATELY"],
    correct: 0, // IGNORE is correct
    explanation: "Influencer hype is often a pump. Do your own research first."
  },
  {
    id: 3,
    scenario: "Security alert: Possible rug pull detected",
    options: ["EXIT", "WAIT"],
    correct: 0, // EXIT is correct
    explanation: "Security comes first. Exit immediately if rug pull is suspected."
  },
  {
    id: 4,
    scenario: "Market crashes 15% in one day",
    options: ["DCA", "SELL ALL"],
    correct: 0, // DCA is correct
    explanation: "Dollar-cost averaging during dips is a smart strategy."
  },
  {
    id: 5,
    scenario: "Coin you hold drops 30% after bad news",
    options: ["HOLD", "SELL NOW", "BUY MORE"],
    correct: 0, // HOLD is correct (assess first)
    explanation: "Don't panic sell. Assess the situation first."
  },
  {
    id: 6,
    scenario: "Friend tells you about a 'guaranteed' 10x coin",
    options: ["RESEARCH FIRST", "BUY NOW"],
    correct: 0, // RESEARCH FIRST is correct
    explanation: "Nothing is guaranteed in crypto. Always research first."
  },
  {
    id: 7,
    scenario: "Exchange announces listing of your coin",
    options: ["HOLD", "SELL BEFORE LISTING"],
    correct: 0, // HOLD is correct
    explanation: "Major exchange listings often bring positive momentum."
  },
  {
    id: 8,
    scenario: "You see FOMO building on social media",
    options: ["STAY CALM", "JOIN THE HYPE"],
    correct: 0, // STAY CALM is correct
    explanation: "FOMO leads to poor decisions. Stay rational."
  },
  {
    id: 9,
    scenario: "Your portfolio is up 100% in a month",
    options: ["TAKE PROFITS", "HOLD FOREVER"],
    correct: 0, // TAKE PROFITS is correct
    explanation: "Taking profits is smart. Don't be greedy."
  },
  {
    id: 10,
    scenario: "Whale wallet moves 10,000 BTC",
    options: ["MONITOR", "PANIC SELL"],
    correct: 0, // MONITOR is correct
    explanation: "Whale movements are normal. Monitor but don't panic."
  },
  {
    id: 11,
    scenario: "Coin gets delisted from major exchange",
    options: ["EXIT", "HOLD"],
    correct: 0, // EXIT is correct
    explanation: "Delisting is a major red flag. Consider exiting."
  },
  {
    id: 12,
    scenario: "You missed a 5x pump",
    options: ["MOVE ON", "CHASE IT"],
    correct: 0, // MOVE ON is correct
    explanation: "Chasing pumps leads to losses. Move on to the next opportunity."
  },
  {
    id: 13,
    scenario: "Technical analysis shows bearish pattern",
    options: ["REASSESS", "IGNORE"],
    correct: 0, // REASSESS is correct
    explanation: "Technical indicators are tools. Reassess your position."
  },
  {
    id: 14,
    scenario: "You're down 50% on a position",
    options: ["REASSESS STRATEGY", "AVERAGE DOWN"],
    correct: 0, // REASSESS STRATEGY is correct
    explanation: "First reassess why you're down. Don't just average down blindly."
  },
  {
    id: 15,
    scenario: "Regulatory news creates uncertainty",
    options: ["WAIT & SEE", "PANIC SELL"],
    correct: 0, // WAIT & SEE is correct
    explanation: "Regulatory news needs time to digest. Wait for clarity."
  }
];

const MAX_LIVES = 3;
const MAX_EVENTS = 15;
const TIME_LIMIT = 8; // seconds (increased for better gameplay)

const CryptoMindRush = ({ onClose }) => {
  const [gameState, setGameState] = useState("start"); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [usedEvents, setUsedEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [shake, setShake] = useState(false);
  const [glow, setGlow] = useState(false);
  const [particles, setParticles] = useState([]);
  const [confetti, setConfetti] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  // Get random event that hasn't been used
  const getRandomEvent = useCallback(() => {
    const availableEvents = GAME_EVENTS.filter(
      (event) => !usedEvents.includes(event.id)
    );
    
    if (availableEvents.length === 0) {
      // Reset if all events used
      setUsedEvents([]);
      return GAME_EVENTS[Math.floor(Math.random() * GAME_EVENTS.length)];
    }
    
    const randomEvent =
      availableEvents[Math.floor(Math.random() * availableEvents.length)];
    return randomEvent;
  }, [usedEvents]);

  // Initialize new event
  useEffect(() => {
    if (gameState === "playing" && currentEventIndex < MAX_EVENTS && lives > 0) {
      const event = getRandomEvent();
      setCurrentEvent(event);
      setTimeLeft(TIME_LIMIT);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShake(false);
      setGlow(false);
      setParticles([]);
      setConfetti(false);
      setPulse(false);
    }
  }, [gameState, currentEventIndex, lives, getRandomEvent]);

  // Timer countdown
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameState === "playing" && timeLeft === 0 && !showFeedback) {
      // Time's up - wrong answer
      handleTimeUp();
    }
  }, [gameState, timeLeft, showFeedback]);

  const handleTimeUp = () => {
    if (showFeedback) return;
    const newAnswered = answeredCount + 1;
    const livesAfter = lives - 1;

    setShowFeedback(true);
    setShake(true);
    setAnsweredCount(newAnswered);
    setLives((prev) => prev - 1);

    const shouldEnd = livesAfter <= 0 || newAnswered >= MAX_EVENTS;

    setTimeout(() => {
      if (shouldEnd) {
        setGameState("gameover");
      } else {
        nextEvent();
      }
    }, 2000);
  };

  // Create particles effect
  const createParticles = (color, count = 20) => {
    const newParticles = [];
    const centerX = 50; // Center of screen
    const centerY = 50;
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const radius = 5 + Math.random() * 10;
      newParticles.push({
        id: Date.now() + i,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        color: color,
        delay: Math.random() * 0.3,
        angle: angle,
        distance: 30 + Math.random() * 50,
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  const handleAnswer = (answerIndex) => {
    if (showFeedback) return;

    const isCorrect = answerIndex === currentEvent?.correct;
    const newAnswered = answeredCount + 1;
    const livesAfter = isCorrect ? lives : lives - 1;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    setPulse(true);
    setAnsweredCount(newAnswered);

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setGlow(true);
      setConfetti(true);
      createParticles("emerald", 30);
      setTimeout(() => {
        setConfetti(false);
        setPulse(false);
      }, 1500);
    } else {
      setLives((prev) => prev - 1);
      setShake(true);
      createParticles("rose", 20);
      setTimeout(() => {
        setPulse(false);
      }, 1500);
    }
    
    const shouldEnd = livesAfter <= 0 || newAnswered >= MAX_EVENTS;

    setTimeout(() => {
      if (shouldEnd) {
        setGameState("gameover");
      } else {
        nextEvent();
      }
    }, 1800);
  };

  const nextEvent = () => {
    if (currentEvent) {
      setUsedEvents((prev) => [...prev, currentEvent.id]);
    }
    setCurrentEventIndex((prev) => prev + 1);
    setTimeLeft(TIME_LIMIT);
  };

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setLives(MAX_LIVES);
    setCurrentEventIndex(0);
    setUsedEvents([]);
    setTimeLeft(TIME_LIMIT);
    setAnsweredCount(0);
  };

  const restartGame = () => {
    startGame();
  };

  // Render Start Screen
  if (gameState === "start") {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
        <div className="relative w-full max-w-2xl rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/98 via-slate-950/98 to-black/98 p-8 shadow-2xl shadow-rose-500/20">
          <Button
            onClick={onClose}
            variant="ghost"
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-50 hover:bg-slate-800/60 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-4 border border-rose-500/30">
                <Zap className="h-12 w-12 text-rose-400" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Crypto Mind Rush
            </h1>
            
            <p className="text-slate-400 text-lg max-w-md mx-auto">
              Test your crypto trading psychology! Make quick decisions under pressure.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4">
                <Clock className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 uppercase">Time Limit</p>
                <p className="text-lg font-bold text-slate-50">{TIME_LIMIT}s</p>
              </div>
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4">
                <Heart className="h-6 w-6 text-rose-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 uppercase">Lives</p>
                <p className="text-lg font-bold text-slate-50">{MAX_LIVES}</p>
              </div>
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4">
                <Trophy className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 uppercase">Events</p>
                <p className="text-lg font-bold text-slate-50">{MAX_EVENTS}</p>
              </div>
            </div>
            
            <div className="mt-8 space-y-3">
              <Button
                onClick={startGame}
                className="w-full h-14 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-lg font-bold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
              >
                Start Game
              </Button>
              <p className="text-xs text-slate-500">
                Make decisions fast! You have {TIME_LIMIT} seconds per question.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Game Over Screen
  if (gameState === "gameover") {
    const percentage =
      answeredCount > 0 ? Math.round((score / (answeredCount * 10)) * 100) : 0;
    
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
        <div className="relative w-full max-w-2xl rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/98 via-slate-950/98 to-black/98 p-8 shadow-2xl shadow-rose-500/20">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-4 border border-rose-500/30">
                <Trophy className="h-12 w-12 text-emerald-400" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Game Over!
            </h1>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-6">
                <p className="text-sm text-slate-400 uppercase mb-2">Final Score</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-rose-300 to-cyan-300 bg-clip-text text-transparent">
                  {score}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800/60 bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-6">
                <p className="text-sm text-slate-400 uppercase mb-2">Accuracy</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  {percentage}%
                </p>
              </div>
            </div>
            
            <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4">
              <p className="text-sm text-slate-400 mb-1">Events Completed</p>
              <p className="text-xl font-bold text-slate-50">{answeredCount} / {MAX_EVENTS}</p>
            </div>
            
            <div className="flex gap-4 mt-8">
              <Button
                onClick={restartGame}
                className="flex-1 h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 font-bold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
              >
                Play Again
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 h-12 rounded-full border-slate-700 bg-slate-900/40 text-slate-50 hover:bg-slate-800/60 hover:border-rose-500/50"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Game Screen
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-3xl">
        {/* Header Stats */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-800/60 bg-gradient-to-r from-slate-950/90 to-slate-900/90 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-emerald-400" />
              <span className="text-lg font-bold text-slate-50">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-400" />
              <span className="text-lg font-bold text-slate-50">{lives}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              Event {Math.min(answeredCount + 1, MAX_EVENTS)} / {MAX_EVENTS}
            </span>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-slate-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="mb-6 h-3 rounded-full bg-slate-900/60 overflow-hidden relative">
          <div
            className={`h-full transition-all duration-1000 relative ${
              timeLeft <= 2
                ? "bg-gradient-to-r from-rose-500 to-red-600 animate-pulse"
                : timeLeft <= 4
                ? "bg-gradient-to-r from-yellow-500 to-rose-500"
                : "bg-gradient-to-r from-emerald-500 to-cyan-500"
            }`}
            style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
          >
            {timeLeft <= 2 && (
              <div className="absolute inset-0 bg-white/30 animate-ping" />
            )}
          </div>
          {timeLeft <= 2 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-rose-400 animate-pulse">
                HURRY! {timeLeft}s
              </span>
            </div>
          )}
        </div>

        {/* Confetti Effect */}
        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-[201]">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ["#10b981", "#f43f5e", "#06b6d4", "#fbbf24"][
                    Math.floor(Math.random() * 4)
                  ],
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Particles Effect */}
        {particles.length > 0 && (
          <div className="fixed inset-0 pointer-events-none z-[201]">
            {particles.map((particle) => {
              const finalX = particle.x + Math.cos(particle.angle) * particle.distance;
              const finalY = particle.y + Math.sin(particle.angle) * particle.distance;
              
              return (
                <div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    backgroundColor:
                      particle.color === "emerald" ? "#10b981" : "#f43f5e",
                    boxShadow: `0 0 10px ${particle.color === "emerald" ? "#10b981" : "#f43f5e"}`,
                    animation: `particle-move-${particle.id} 1s ease-out ${particle.delay}s forwards`,
                  }}
                >
                  <style>{`
                    @keyframes particle-move-${particle.id} {
                      0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 1;
                      }
                      100% {
                        transform: translate(calc(${finalX}% - ${particle.x}%), calc(${finalY}% - ${particle.y}%)) scale(0);
                        opacity: 0;
                      }
                    }
                  `}</style>
                </div>
              );
            })}
          </div>
        )}

        {/* Event Card */}
        {currentEvent && (
          <div
            className={`rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/98 via-slate-950/98 to-black/98 p-8 shadow-2xl transition-all duration-300 relative overflow-hidden ${
              shake ? "animate-shake border-rose-500/60" : ""
            } ${
              glow ? "border-emerald-500/60 shadow-emerald-500/50" : ""
            } ${
              pulse ? "animate-pulse" : ""
            }`}
          >
            {/* Animated background glow */}
            {(glow || shake) && (
              <div
                className={`absolute inset-0 rounded-3xl blur-2xl opacity-50 ${
                  glow
                    ? "bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 animate-pulse"
                    : "bg-gradient-to-r from-rose-500/30 to-red-500/30 animate-pulse"
                }`}
              />
            )}
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Scenario
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-50 leading-tight">
                  {currentEvent.scenario}
                </h2>
              </div>

              {/* Options */}
            <div className="relative z-10">
              <div className="grid gap-4 mt-8">
                {currentEvent.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentEvent.correct;
                  const showResult = showFeedback && isSelected;

                  return (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showFeedback}
                      className={`h-16 text-lg font-semibold rounded-xl transition-all duration-300 relative overflow-hidden ${
                        showResult
                          ? isCorrect
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50 animate-pulse scale-105"
                            : "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/50 animate-shake"
                          : isSelected
                          ? "bg-gradient-to-r from-slate-700 to-slate-800 text-slate-50"
                          : "bg-gradient-to-r from-slate-800/60 to-slate-900/60 text-slate-200 hover:from-slate-700/80 hover:to-slate-800/80 hover:scale-105 border border-slate-700/50 hover:border-rose-500/50"
                      }`}
                    >
                      {showResult && isCorrect && (
                        <div className="absolute inset-0 bg-white/20 animate-ping" />
                      )}
                      <span className="relative z-10">{option}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

              {/* Feedback */}
              {showFeedback && (
                <div
                  className={`mt-6 rounded-2xl p-4 border transition-all duration-300 animate-scale-in ${
                    selectedAnswer === currentEvent.correct
                      ? "bg-emerald-500/20 border-emerald-500/50 shadow-lg shadow-emerald-500/20"
                      : "bg-rose-500/20 border-rose-500/50 shadow-lg shadow-rose-500/20"
                  }`}
                >
                  <p className="text-sm text-slate-200">
                    {selectedAnswer === currentEvent.correct ? (
                      <span className="text-emerald-400 font-bold text-lg animate-pulse">
                        ✓ Correct! 🎉
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold text-lg">
                        ✗ Wrong! 😔
                      </span>
                    )}
                    <span className="block mt-2 text-slate-300">
                      {currentEvent.explanation}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoMindRush;

