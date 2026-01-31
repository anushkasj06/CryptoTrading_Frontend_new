import TreadingHistory from "../Portfilio/TreadingHistory";
import { Activity as ActivityIcon } from "lucide-react";
import heroBgVideo from "../Home/vecteezy_illuminated-financial-data-graphs-on-digital-screen_52263081.mp4";

const Activity = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src={heroBgVideo}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-slate-950/55 to-black/75 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-3 border border-rose-500/30 shadow-lg shadow-rose-500/10">
              <ActivityIcon className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-200 via-slate-50 to-rose-200 bg-clip-text text-transparent lg:text-4xl">
                Trading History
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Monitor all your trading activities and transactions
              </p>
            </div>
          </div>
        </div>
        <div className="animate-fade-in-delay">
          <TreadingHistory />
        </div>
      </div>
    </div>
  );
};

export default Activity;
