import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

const TOUR_STEPS = [
  {
    id: 0,
    title: "Welcome to Crypto Trading!",
    description: "Discover powerful trading tools and real-time market insights.",
    target: null,
    position: "center",
  },
  {
    id: 1,
    title: "Live Market Data",
    description: "View real-time prices, volumes, and market caps for all cryptocurrencies. Click any coin to see detailed information.",
    target: "market-table",
    position: "top",
  },
  {
    id: 2,
    title: "Market Charts",
    description: "Track price movements with interactive charts. Analyze trends and make informed decisions.",
    target: "market-chart",
    position: "right",
  },
  {
    id: 3,
    title: "AI Assistant",
    description: "Get instant answers to your trading questions with our AI-powered assistant available 24/7.",
    target: "assistant-toggle",
    position: "bottom-right",
  },
  {
    id: 4,
    title: "Crypto Mind Rush Game",
    description: "Test your crypto trading psychology! Make quick decisions and learn market psychology through gameplay.",
    target: "play-game-button",
    position: "center",
  },
];

const InteractiveTour = ({ onClose, onStart }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState(null);
  const overlayRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (currentStep === 0) {
      // Welcome screen - no highlight
      setHighlightedElement(null);
      return;
    }

    const step = TOUR_STEPS[currentStep];
    if (step.target) {
      const element = document.getElementById(step.target);
      if (element) {
        setHighlightedElement(element);
        // Scroll to element
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      }
    } else {
      setHighlightedElement(null);
    }
  }, [currentStep]);

  useEffect(() => {
    if (highlightedElement && tooltipRef.current) {
      updateTooltipPosition();
    }
  }, [highlightedElement, currentStep]);

  useEffect(() => {
    const handleResize = () => {
      if (highlightedElement && tooltipRef.current) {
        updateTooltipPosition();
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize, true);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, true);
    };
  }, [highlightedElement, currentStep]);

  const updateTooltipPosition = () => {
    if (!highlightedElement || !tooltipRef.current) return;

    const rect = highlightedElement.getBoundingClientRect();
    const tooltip = tooltipRef.current;
    const step = TOUR_STEPS[currentStep];

    let top, left;

    switch (step.position) {
      case "top":
        top = rect.top - tooltip.offsetHeight - 20;
        left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
        break;
      case "bottom":
        top = rect.bottom + 20;
        left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
        break;
      case "left":
        top = rect.top + rect.height / 2 - tooltip.offsetHeight / 2;
        left = rect.left - tooltip.offsetWidth - 20;
        break;
      case "right":
        top = rect.top + rect.height / 2 - tooltip.offsetHeight / 2;
        left = rect.right + 20;
        break;
      case "bottom-right":
        top = window.innerHeight - 100;
        left = window.innerWidth - 350;
        break;
      default:
        top = window.innerHeight / 2 - tooltip.offsetHeight / 2;
        left = window.innerWidth / 2 - tooltip.offsetWidth / 2;
    }

    tooltip.style.top = `${Math.max(20, Math.min(top, window.innerHeight - tooltip.offsetHeight - 20))}px`;
    tooltip.style.left = `${Math.max(20, Math.min(left, window.innerWidth - tooltip.offsetWidth - 20))}px`;
  };

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setHighlightedElement(null);
    onClose();
  };

  const handleSkip = () => {
    handleFinish();
  };

  const currentStepData = TOUR_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[150]">
      {/* Dark overlay with cutout */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-500"
        onClick={currentStep === 0 ? undefined : handleNext}
      >
        {highlightedElement && (
          <div
            className="absolute border-4 border-rose-500/60 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.8)] transition-all duration-500 animate-pulse"
            style={{
              top: highlightedElement.getBoundingClientRect().top - 8,
              left: highlightedElement.getBoundingClientRect().left - 8,
              width: highlightedElement.getBoundingClientRect().width + 16,
              height: highlightedElement.getBoundingClientRect().height + 16,
              boxShadow: `0 0 0 9999px rgba(0,0,0,0.8), 0 0 40px rgba(244,63,94,0.5)`,
            }}
          />
        )}
      </div>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute z-[151] w-80 md:w-96 rounded-3xl border border-rose-500/60 bg-gradient-to-br from-black/98 via-slate-950/98 to-black/98 p-6 shadow-2xl shadow-rose-500/30 animate-scale-in"
      >
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-2 border border-rose-500/30">
              <Sparkles className="h-4 w-4 text-rose-400" />
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Step {currentStep + 1} of {TOUR_STEPS.length}
            </span>
          </div>
          <Button
            onClick={handleSkip}
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-slate-400 hover:text-slate-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress bar */}
        <div className="mb-4 h-1.5 rounded-full bg-slate-900/60 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-rose-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            {currentStepData.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 gap-3">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="flex-1 h-10 rounded-full border-slate-700 bg-slate-900/40 text-slate-300 hover:bg-slate-800/60 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            onClick={currentStep === 0 ? onStart : handleNext}
            className="flex-1 h-10 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
          >
            {currentStep === 0 ? (
              "Start Tour"
            ) : currentStep === TOUR_STEPS.length - 1 ? (
              "Finish"
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTour;

