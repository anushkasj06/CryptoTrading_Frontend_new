import { useEffect, useState } from "react";
import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { Bookmark, TrendingUp, TrendingDown } from "lucide-react";
import heroBgVideo from "../Home/vecteezy_illuminated-financial-data-graphs-on-digital-screen_52263081.mp4";

const Watchlist = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { watchlist, coin } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserWatchlist());
  }, [page]);

  const handleAddToWatchlist = (id) => {
    dispatch(addItemToWatchlist(id));
  };

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
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-3 border border-rose-500/30 shadow-lg shadow-rose-500/10">
              <Bookmark className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-200 via-slate-50 to-rose-200 bg-clip-text text-transparent lg:text-4xl">
                Watchlist
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Track your favorite cryptocurrencies
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        {watchlist.items && watchlist.items.length > 0 ? (
          <div className="animate-fade-in-delay">
            <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.95)] lg:p-6">
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <Table>
                  <TableHeader>
                    <TableRow className="sticky top-0 left-0 right-0 bg-slate-950/95 border-slate-800">
                      <TableHead className="py-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Coin
                      </TableHead>
                      <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Symbol
                      </TableHead>
                      <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Volume
                      </TableHead>
                      <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Market Cap
                      </TableHead>
                      <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        24H
                      </TableHead>
                      <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Price
                      </TableHead>
                      <TableHead className="text-right text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Remove
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {watchlist.items.map((item) => (
                      <TableRow
                        key={item.id}
                        className="border-slate-800/50 transition-all hover:bg-slate-900/80 hover:border-slate-700"
                      >
                        <TableCell
                          onClick={() => navigate(`/market/${item.id}`)}
                          className="font-medium flex items-center gap-3 cursor-pointer py-4"
                        >
                          <Avatar className="h-10 w-10 border border-slate-700">
                            <AvatarImage src={item.image} alt={item.symbol} />
                          </Avatar>
                          <span className="text-slate-50 font-semibold">{item.name}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-300 font-medium">
                            {item.symbol?.toUpperCase()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-300">
                            {item.total_volume?.toLocaleString() || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-300">
                            ${item.market_cap?.toLocaleString() || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell
                          className={`font-semibold ${
                            item.market_cap_change_percentage_24h < 0
                              ? "text-rose-400"
                              : "text-emerald-400"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            {item.market_cap_change_percentage_24h < 0 ? (
                              <TrendingDown className="h-4 w-4" />
                            ) : (
                              <TrendingUp className="h-4 w-4" />
                            )}
                            {item.market_cap_change_percentage_24h?.toFixed(2) || "0.00"}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-slate-50">
                            ${item.current_price?.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 6,
                            }) || "0.00"}
                          </span>
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            onClick={() => handleAddToWatchlist(item.id)}
                            className="h-10 w-10 rounded-full border-slate-700 bg-black/60 hover:bg-black/80 hover:border-rose-500/50 transition-all"
                            variant="outline"
                            size="icon"
                          >
                            <BookmarkFilledIcon className="h-5 w-5 text-rose-400" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-delay">
            <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-12 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="rounded-full bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-6 border border-rose-500/30">
                  <Bookmark className="h-12 w-12 text-rose-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-50">Your watchlist is empty</h2>
                <p className="text-slate-400 text-center max-w-md">
                  Start adding coins to your watchlist to track their performance
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
