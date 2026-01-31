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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForUser } from "@/Redux/Order/Action";
import { calculateProfite } from "@/Util/calculateProfite";
import { readableDate } from "@/Util/readableDate";
import { useEffect } from "react";
import { TrendingUp, TrendingDown, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";

const TradingHistory = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);

  return (
    <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.95)] lg:p-6">
      <div className="mb-4">
        <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
          Trading History
        </p>
        <p className="mt-1 text-sm text-slate-300">
          View all your past buy and sell orders
        </p>
      </div>
      <ScrollArea className="h-[calc(100vh-20rem)]">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-900/50">
              <TableHead className="py-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Date & Time
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Trading Pair
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Buy Price
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Selling Price
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Order Type
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Profit/Loss
              </TableHead>
              <TableHead className="text-right text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Value
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.orders?.length > 0 ? (
              order.orders.map((item) => {
                const profit = calculateProfite(item);
                const isProfit = profit >= 0;
                const isSell = item.orderType === "SELL";
                
                return (
                  <TableRow
                    key={item.id}
                    className="border-slate-800/50 transition-all hover:bg-slate-900/80 hover:border-slate-700"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-50">
                            {readableDate(item.timestamp).date}
                          </p>
                          <p className="text-xs text-slate-500">
                            {readableDate(item.timestamp).time}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-slate-700">
                          <AvatarImage
                            src={item.orderItem?.coin?.image}
                            alt={item.orderItem?.coin?.symbol}
                          />
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-50">
                            {item.orderItem?.coin?.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {item.orderItem?.coin?.symbol?.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-slate-50">
                        ${item.orderItem?.buyPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                      </span>
                    </TableCell>
                    <TableCell>
                      {item.orderItem?.sellPrice ? (
                        <span className="font-medium text-slate-50">
                          ${item.orderItem.sellPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                        </span>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          isSell
                            ? "bg-gradient-to-r from-rose-500/20 to-rose-600/20 text-rose-400 border border-rose-500/40 shadow-lg shadow-rose-500/10"
                            : "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                        }`}
                      >
                        {isSell ? (
                          <ArrowDownRight className="h-3 w-3" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3" />
                        )}
                        {item.orderType}
                      </span>
                    </TableCell>
                    <TableCell>
                      {isSell && profit !== null ? (
                        <span
                          className={`flex items-center gap-1 font-semibold ${
                            isProfit ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {isProfit ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          ${Math.abs(profit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-slate-50">
                        ${item.price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Clock className="h-12 w-12 text-slate-600" />
                    <p className="text-lg font-semibold text-slate-400">
                      No trading history
                    </p>
                    <p className="text-sm text-slate-500">
                      Your completed orders will appear here
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default TradingHistory;
