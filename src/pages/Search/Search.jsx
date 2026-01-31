/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SearchIcon, TrendingUp, TrendingDown } from "lucide-react";
import { searchCoin } from "@/Redux/Coin/Action";
import { useNavigate } from "react-router-dom";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const SearchCoin = () => {
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearchCoin = () => {
    if (keyword.trim()) {
      dispatch(searchCoin(keyword));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchCoin();
    }
  };

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-3 border border-rose-500/30 shadow-lg shadow-rose-500/10">
              <SearchIcon className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-200 via-slate-50 to-rose-200 bg-clip-text text-transparent lg:text-4xl">
                Search Markets
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Explore and discover cryptocurrencies
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-fade-in-delay">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Input
                className="h-14 rounded-full border-slate-700 bg-black/60 pl-12 pr-4 text-slate-50 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20"
                placeholder="Search coins, symbols, or markets..."
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                value={keyword}
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            </div>
            <Button
              onClick={handleSearchCoin}
              className="h-14 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 px-8 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Results Table */}
        {coin.searchCoinList && coin.searchCoinList.length > 0 && (
          <div className="animate-fade-in-delay">
            <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.95)] lg:p-6">
              <div className="mb-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                  Search Results
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {coin.searchCoinList.length} result{coin.searchCoinList.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-800 hover:bg-slate-900/50">
                      <TableHead className="py-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Market Cap Rank
                      </TableHead>
                      <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Trading Pair
                      </TableHead>
                      <TableHead className="text-right text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Symbol
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coin.searchCoinList.map((item) => (
                      <TableRow
                        onClick={() => navigate(`/market/${item.id}`)}
                        key={item.id}
                        className="cursor-pointer border-slate-800/50 transition-all hover:bg-slate-900/80 hover:border-slate-700"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500/20 to-cyan-500/20 px-3 py-1 text-xs font-semibold text-slate-300 border border-rose-500/30">
                              #{item.market_cap_rank || "N/A"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-slate-700">
                              <AvatarImage src={item.large} alt={item.name} />
                            </Avatar>
                            <div>
                              <p className="font-semibold text-slate-50">{item.name}</p>
                              <p className="text-xs text-slate-400">{item.symbol?.toUpperCase()}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-medium text-slate-50">{item.symbol?.toUpperCase()}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        )}

        {/* Empty State */}
        {coin.searchCoinList && coin.searchCoinList.length === 0 && keyword && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in-delay">
            <SearchIcon className="h-16 w-16 text-slate-600 mb-4" />
            <p className="text-xl font-semibold text-slate-400 mb-2">No results found</p>
            <p className="text-sm text-slate-500">Try searching with a different keyword</p>
          </div>
        )}

        {/* Initial State */}
        {!coin.searchCoinList && !keyword && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in-delay">
            <SearchIcon className="h-16 w-16 text-slate-600 mb-4" />
            <p className="text-xl font-semibold text-slate-400 mb-2">Start searching</p>
            <p className="text-sm text-slate-500">Enter a coin name or symbol to begin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCoin;
