import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroBgVideo from "../Home/vecteezy_glowing-bitcoin-emblem-within-a-digital-network_52140322.mp4";
import { Sparkles, Shield, TrendingUp, Wallet, ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black text-slate-50">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src={heroBgVideo}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-slate-950/60 to-black/85 pointer-events-none" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 lg:px-6 lg:py-10">
        {/* Top bar */}
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-2 border border-rose-500/40">
              <TrendingUp className="h-5 w-5 text-rose-400" />
            </div>
            <span className="text-lg font-semibold tracking-[0.18em] uppercase text-slate-100">
              <span className="text-rose-400">Crypto</span>{" "}
              <span className="text-slate-50">Trading</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="rounded-full border border-slate-700/70 bg-black/40 px-5 text-xs font-semibold text-slate-200 hover:border-rose-500/60 hover:text-slate-50"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </Button>
            <Button
              className="rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 px-6 text-xs font-semibold text-black shadow-lg shadow-rose-500/40 hover:from-rose-400 hover:via-emerald-400 hover:to-cyan-400 hover:shadow-xl hover:shadow-rose-500/50"
              onClick={() => navigate("/signup")}
            >
              Get started
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </header>

        {/* Hero */}
        <main className="grid flex-1 items-center gap-10 pb-12 lg:grid-cols-[1.2fr,1fr] lg:gap-12">
          {/* Left: copy */}
          <section className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium text-slate-300 border border-slate-700/70 backdrop-blur-md">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Next‑gen crypto trading desk
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-slate-50 sm:text-5xl lg:text-6xl">
                Trade smarter with{" "}
                <span className="bg-gradient-to-r from-rose-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  real‑time intelligence
                </span>
              </h1>
              <p className="max-w-xl text-sm text-slate-300 sm:text-base">
                One unified workspace for tracking markets, managing your wallet, and
                executing trades—wrapped in bank‑grade security and live analytics.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                className="h-11 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 px-7 text-sm font-semibold text-black shadow-lg shadow-rose-500/40 hover:from-rose-400 hover:via-emerald-400 hover:to-cyan-400 hover:shadow-xl hover:shadow-rose-500/50"
                onClick={() => navigate("/signup")}
              >
                Create free account
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-full border-slate-700/80 bg-black/50 px-6 text-sm font-semibold text-slate-100 hover:border-rose-500/60 hover:bg-black/70"
                onClick={() => navigate("/signin")}
              >
                I already have an account
              </Button>
            </div>
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800/80 bg-black/50 p-4 backdrop-blur-md">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
                  Live markets
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-50">+120</p>
                <p className="mt-1 text-xs text-slate-400">
                  Assets streaming in real‑time.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-black/50 p-4 backdrop-blur-md">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
                  Portfolio view
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-50">Unified</p>
                <p className="mt-1 text-xs text-slate-400">
                  Positions, PnL and history in one place.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-black/50 p-4 backdrop-blur-md">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
                  Security
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-50">2FA</p>
                <p className="mt-1 text-xs text-slate-400">
                  Protected with two‑factor authentication.
                </p>
              </div>
            </div>
          </section>

          {/* Right: feature cards */}
          <section className="space-y-4">
            <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.95)] backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-3 border border-rose-500/40">
                  <Sparkles className="h-5 w-5 text-rose-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">
                    Why traders choose us
                  </p>
                  <p className="text-sm text-slate-300">
                    Built for speed, clarity and control.
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-4 w-4 text-emerald-400" />
                  <div>
                    <p className="font-semibold text-slate-100">
                      Real‑time market insights
                    </p>
                    <p className="text-xs text-slate-400">
                      Stream live prices, depth charts, and market sentiment powered
                      by your existing dashboard.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wallet className="mt-0.5 h-4 w-4 text-cyan-400" />
                  <div>
                    <p className="font-semibold text-slate-100">
                      Secure wallet & withdrawals
                    </p>
                    <p className="text-xs text-slate-400">
                      Connect funding, manage balances, and track withdrawals in a
                      single, secure view.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-4 w-4 text-emerald-400" />
                  <div>
                    <p className="font-semibold text-slate-100">
                      Enterprise‑grade protection
                    </p>
                    <p className="text-xs text-slate-400">
                      Two‑factor auth, role‑based admin console, and audit‑ready
                      activity logs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800/70 bg-black/70 px-5 py-4 text-xs text-slate-400 backdrop-blur-xl">
              <p>
                Ready to explore the full desk?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="font-semibold text-rose-300 underline-offset-4 hover:text-rose-200 hover:underline"
                >
                  Create your workspace in seconds
                </button>
                .
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Landing;


