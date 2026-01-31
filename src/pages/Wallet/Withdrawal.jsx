import { getWithdrawalHistory } from "@/Redux/Withdrawal/Action";
import { readableTimestamp } from "@/Util/readbaleTimestamp";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Clock, ArrowDownRight, CheckCircle, XCircle } from "lucide-react";
import heroBgVideo from "../Home/vecteezy_illuminated-financial-data-graphs-on-digital-screen_52263081.mp4";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
  }, []);

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
              <ArrowDownRight className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-200 via-slate-50 to-rose-200 bg-clip-text text-transparent lg:text-4xl">
                Withdrawal History
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                View all your withdrawal requests and their status
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="animate-fade-in-delay">
          <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.95)] lg:p-6">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-slate-900/50">
                    <TableHead className="py-4 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Method
                    </TableHead>
                    <TableHead className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Amount
                    </TableHead>
                    <TableHead className="text-right text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawal.history?.length > 0 ? (
                    withdrawal.history.map((item) => (
                      <TableRow
                        key={item.id}
                        className="border-slate-800/50 transition-all hover:bg-slate-900/80 hover:border-slate-700"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <span className="font-medium text-slate-50">
                              {readableTimestamp(item?.date)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-slate-300">Bank Account</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-slate-50">
                            ₹{item.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            className={`inline-flex items-center gap-1.5 ${
                              item.status == "PENDING"
                                ? "bg-gradient-to-r from-rose-500/20 to-orange-500/20 text-rose-300 border border-rose-500/40"
                                : "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 border border-emerald-500/40"
                            }`}
                          >
                            {item.status == "PENDING" ? (
                              <XCircle className="h-3.5 w-3.5" />
                            ) : (
                              <CheckCircle className="h-3.5 w-3.5" />
                            )}
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <ArrowDownRight className="h-12 w-12 text-slate-600" />
                          <p className="text-lg font-semibold text-slate-400">
                            No withdrawal history
                          </p>
                          <p className="text-sm text-slate-500">
                            Your withdrawal requests will appear here
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
