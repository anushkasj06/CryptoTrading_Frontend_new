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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import TradingHistory from "./TreadingHistory";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import bgVideo from "../Home/vecteezy_illuminated-financial-data-graphs-on-digital-screen_52263081.mp4";

const Portfolio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { asset } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  // Calculate total portfolio value
  const totalValue = asset.userAssets?.reduce((sum, item) => {
    return sum + (item.coin.current_price * item.quantity);
  }, 0) || 0;

  // Calculate total change
  const totalChange = asset.userAssets?.reduce((sum, item) => {
    const change = (item.coin.price_change_24h || 0) * item.quantity;
    return sum + change;
  }, 0) || 0;

  const totalChangePercent = totalValue > 0 ? (totalChange / (totalValue - totalChange)) * 100 : 0;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-65"
        src={bgVideo}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-slate-950/50 to-black/70 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-50 via-rose-200 to-slate-50 bg-clip-text text-transparent lg:text-4xl">
                My Portfolio
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Track your cryptocurrency investments and performance
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/portfolio/rebalance")}
                className="h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-6 text-white hover:from-emerald-600 hover:to-teal-600"
              >
                Rebalance
              </Button>
              <Select
                onValueChange={handleTabChange}
                defaultValue="portfolio"
              >
                <SelectTrigger className="w-[180px] h-12 rounded-full border-slate-700 bg-black/60 text-slate-50 hover:bg-black/80 hover:border-rose-500/50">
                  <SelectValue placeholder="Select Portfolio" />
                </SelectTrigger>
                <SelectContent className="bg-black border-slate-800">
                  <SelectItem value="portfolio" className="text-slate-50">Portfolio</SelectItem>
                  <SelectItem value="history" className="text-slate-50">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="group rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.95)] transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    Total Value
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-50">
                    ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
            <div className="group rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.95)] transition-all hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    24h Change
                  </p>
                  <p className={`mt-2 text-2xl font-bold flex items-center gap-2 ${
                    totalChange >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    {totalChange >= 0 ? (
                      <TrendingUp className="h-6 w-6" />
                    ) : (
                      <TrendingDown className="h-6 w-6" />
                    )}
                    ${Math.abs(totalChange).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
            <div className="group rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.95)] transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                    Change %
                  </p>
                  <p className={`mt-2 text-2xl font-bold ${
                    totalChangePercent >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    {totalChangePercent >= 0 ? "+" : ""}
                    {totalChangePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="animate-fade-in-delay">
          {currentTab === "portfolio" ? (
            <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.95)] lg:p-6">
              <div className="mb-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                  Your Assets
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Click any asset to view detailed information
                </p>
              </div>
              <ScrollArea className="h-[calc(100vh-28rem)]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-800 hover:bg-slate-900/50">
                      <TableHead className="py-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Assets
                      </TableHead>
                      <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Price
                      </TableHead>
                      <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Unit
                      </TableHead>
                      <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Change
                      </TableHead>
                      <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Change (%)
                      </TableHead>
                      <TableHead className="text-right text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Value
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asset.userAssets?.length > 0 ? (
                      asset.userAssets.map((item) => (
                        <TableRow
                          key={item.id}
                          onClick={() => navigate(`/market/${item.coin.id}`)}
                          className="cursor-pointer border-slate-800/50 transition-all hover:bg-slate-900/80 hover:border-slate-700"
                        >
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 border border-slate-700">
                                <AvatarImage
                                  src={item.coin.image}
                                  alt={item.coin.symbol}
                                />
                              </Avatar>
                              <div>
                                <p className="font-semibold text-slate-50">
                                  {item.coin.name}
                                </p>
                                <p className="text-xs text-slate-400">
                                  {item.coin.symbol.toUpperCase()}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium text-slate-50">
                              ${item.coin.current_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-slate-300">
                              {item.quantity?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`flex items-center gap-1 font-medium ${
                                item.coin.price_change_percentage_24h < 0
                                  ? "text-rose-400"
                                  : "text-emerald-400"
                              }`}
                            >
                              {item.coin.price_change_percentage_24h < 0 ? (
                                <TrendingDown className="h-4 w-4" />
                              ) : (
                                <TrendingUp className="h-4 w-4" />
                              )}
                              ${item.coin.price_change_24h?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-medium ${
                                item.coin.price_change_percentage_24h < 0
                                  ? "text-rose-400"
                                  : "text-emerald-400"
                              }`}
                            >
                              {item.coin.price_change_percentage_24h >= 0 ? "+" : ""}
                              {item.coin.price_change_percentage_24h?.toFixed(2)}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="font-semibold text-slate-50">
                              ${((item.coin.current_price || 0) * (item.quantity || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <Wallet className="h-12 w-12 text-slate-600" />
                            <p className="text-lg font-semibold text-slate-400">
                              No assets in your portfolio
                            </p>
                            <p className="text-sm text-slate-500">
                              Start trading to build your portfolio
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          ) : (
            <TradingHistory />
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
