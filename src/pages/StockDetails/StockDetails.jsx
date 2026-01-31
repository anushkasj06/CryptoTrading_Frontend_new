/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import { Button } from "@/components/ui/button";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  DotIcon,
} from "@radix-ui/react-icons";
import StockChart from "./StockChart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TradingForm from "./TreadingForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails } from "@/Redux/Coin/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { existInWatchlist } from "@/Util/existInWatchlist";
import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { getUserWallet } from "@/Redux/Wallet/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { TrendingUp, TrendingDown, Bookmark, ArrowUpRight } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const StockDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { coin, watchlist, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: id,
        jwt: auth.jwt || localStorage.getItem("jwt"),
      })
    );
  }, [id]);

  useEffect(() => {
    dispatch(getUserWatchlist());
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  }, []);

  const handleAddToWatchlist = () => {
    dispatch(addItemToWatchlist(coin.coinDetails?.id));
  };

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  const isPositive = coin.coinDetails?.market_data?.market_cap_change_24h >= 0;
  const changePercent = coin.coinDetails?.market_data?.market_cap_change_percentage_24h || 0;
  const changeValue = coin.coinDetails?.market_data?.market_cap_change_24h || 0;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {coin.loading ? (
          "loading..."
        ) : (
          <>
            {/* Coin Header Card */}
            <div className="mb-8 animate-fade-in">
              <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.95)] lg:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-5">
                    <Avatar className="h-16 w-16 border-2 border-slate-700 lg:h-20 lg:w-20">
                      <AvatarImage src={coin.coinDetails?.image?.large} />
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-2xl font-bold text-slate-50 lg:text-3xl">
                          {coin.coinDetails?.symbol?.toUpperCase()}
                        </h1>
                        <DotIcon className="h-5 w-5 text-slate-500" />
                        <p className="text-lg text-slate-400">
                          {coin.coinDetails?.name}
                        </p>
                      </div>
                      <div className="flex items-end gap-3">
                        <p className="text-3xl font-bold bg-gradient-to-r from-slate-50 via-rose-200 to-slate-50 bg-clip-text text-transparent lg:text-4xl">
                          ${coin.coinDetails?.market_data?.current_price?.usd?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                        </p>
                        <div
                          className={`flex items-center gap-1 rounded-full px-3 py-1 ${
                            isPositive
                              ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                              : "bg-gradient-to-r from-rose-500/20 to-rose-600/20 text-rose-400 border border-rose-500/40 shadow-lg shadow-rose-500/10"
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span className="text-sm font-semibold">
                            {isPositive ? "+" : ""}
                            {changePercent?.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-500">
                        {isPositive ? "+" : ""}${Math.abs(changeValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (24h)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={handleAddToWatchlist}
                      className="h-12 w-12 rounded-full border-slate-700 bg-black/60 hover:bg-black/80 hover:border-rose-500/50"
                      variant="outline"
                      size="icon"
                    >
                      {existInWatchlist(watchlist.items, coin.coinDetails) ? (
                        <BookmarkFilledIcon className="h-5 w-5 text-rose-400" />
                      ) : (
                        <BookmarkIcon className="h-5 w-5 text-slate-400" />
                      )}
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="lg"
                          className="h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 px-8 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
                        >
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          Trade
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl border-slate-800 bg-slate-950/95 text-slate-50">
                        <DialogHeader>
                          <DialogTitle className="text-center text-xl font-bold">
                            How much do you want to spend?
                          </DialogTitle>
                          <DialogDescription className="text-center text-slate-400">
                            Enter the amount you'd like to invest in this cryptocurrency
                          </DialogDescription>
                        </DialogHeader>
                        <TradingForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="animate-fade-in-delay">
              <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.95)] lg:p-8">
                <div className="mb-6">
                  <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase mb-2">
                    Price Chart
                  </p>
                  <p className="text-sm text-slate-300">
                    Historical price data and market trends
                  </p>
                </div>
                <StockChart coinId={coin.coinDetails?.id} />
              </div>
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default StockDetails;
