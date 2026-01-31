import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function AssetTable({ coins, category }) {
  const navigate = useNavigate();

  return (
    <Table className="relative border-t border-slate-800/80 px-5 text-sm text-slate-200">
      <ScrollArea className={category === "all" ? "h-[74vh]" : "h-[82vh]"}>
        <TableHeader>
          <TableRow className="sticky top-0 left-0 right-0 z-10 bg-gradient-to-r from-slate-950/98 via-slate-900/98 to-slate-950/98 backdrop-blur-xl border-b border-slate-800/60 shadow-lg shadow-black/20">
            <TableHead className="py-5 text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">
              <span className="bg-gradient-to-r from-rose-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                COIN
              </span>
            </TableHead>
            <TableHead className="py-5 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
              SYMBOL
            </TableHead>
            <TableHead className="py-5 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
              VOLUME
            </TableHead>
            <TableHead className="py-5 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
              MARKET CAP
            </TableHead>
            <TableHead className="py-5 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
              24H
            </TableHead>
            <TableHead className="text-right py-5 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
              PRICE
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {coins.map((item, index) => (
            <TableRow
              className="group cursor-pointer border-b border-slate-900/60 bg-gradient-to-r from-slate-950/50 via-slate-900/30 to-slate-950/50 transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-900/80 hover:via-slate-800/60 hover:to-slate-900/80 hover:border-slate-700/60 hover:shadow-lg hover:shadow-rose-500/5 hover:scale-[1.01] relative overflow-hidden"
              onClick={() => navigate(`/market/${item.id}`)}
              key={item.id}
              style={{ animationDelay: `${index * 20}ms` }}
            >
              {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-emerald-500/0 to-cyan-500/0 group-hover:from-rose-500/5 group-hover:via-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              
              <TableCell className="relative z-10 flex items-center gap-3 font-semibold py-4">
                <div className="relative">
                  <Avatar className="h-8 w-8 ring-2 ring-slate-800/50 group-hover:ring-rose-500/30 transition-all duration-300 group-hover:scale-110">
                    <AvatarImage src={item.image} alt={item.symbol} className="object-cover" />
                  </Avatar>
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-500/20 to-cyan-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-slate-100 group-hover:text-slate-50 transition-colors duration-300 font-medium">
                  {item.name}
                </span>
              </TableCell>
              <TableCell className="relative z-10 text-slate-400 group-hover:text-slate-300 transition-colors duration-300 font-medium py-4">
                <span className="px-2 py-1 rounded-md bg-slate-900/40 group-hover:bg-slate-800/60 transition-colors duration-300">
                  {item.symbol.toUpperCase()}
                </span>
              </TableCell>
              <TableCell className="relative z-10 text-slate-300 group-hover:text-slate-200 transition-colors duration-300 font-medium py-4">
                ${item.total_volume.toLocaleString()}
              </TableCell>
              <TableCell className="relative z-10 text-slate-300 group-hover:text-slate-200 transition-colors duration-300 font-medium py-4">
                ${item.market_cap.toLocaleString()}
              </TableCell>
              <TableCell
                className={`relative z-10 font-bold py-4 transition-all duration-300 ${
                  item.market_cap_change_percentage_24h < 0
                    ? "text-rose-400 group-hover:text-rose-300"
                    : "text-emerald-400 group-hover:text-emerald-300"
                }`}
              >
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/40 group-hover:bg-slate-800/60 transition-colors duration-300">
                  {item.market_cap_change_percentage_24h > 0 ? "↑" : "↓"}
                  {item.market_cap_change_percentage_24h?.toFixed(2)}%
                </span>
              </TableCell>
              <TableCell className="relative z-10 text-right text-slate-100 group-hover:text-slate-50 transition-colors duration-300 font-bold py-4">
                <span className="bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:from-rose-200 group-hover:via-emerald-200 group-hover:to-cyan-200 transition-all duration-300">
                  ${item.current_price.toLocaleString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ScrollArea>
    </Table>
  );
}
