import {
  depositMoney,
  getUserWallet,
  getWalletTransactions,
} from "@/Redux/Wallet/Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CopyIcon,
  DownloadIcon,
  ReloadIcon,
  ShuffleIcon,
  UpdateIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { DollarSign, WalletIcon, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, ArrowLeftRight } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopupForm from "./TopupForm";
import TransferForm from "./TransferForm";
import WithdrawForm from "./WithdrawForm";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import bgVideo from "../Home/vecteezy_illuminated-financial-data-graphs-on-digital-screen_52263081.mp4";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallet } = useSelector((store) => store);
  const query = useQuery();
  const paymentId = query.get("payment_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");
  const orderId = query.get("order_id");
  const { order_id } = useParams();

  useEffect(() => {
    if (orderId || order_id) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId: orderId || order_id,
          paymentId: razorpayPaymentId || "AuedkfeuUe",
          navigate,
        })
      );
    }
  }, [paymentId, orderId, razorpayPaymentId]);

  useEffect(() => {
    handleFetchUserWallet();
    hanldeFetchWalletTransactions();
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };

  const hanldeFetchWalletTransactions = () => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  };

  function copyToClipboard(text) {
    const element = document.createElement("textarea");
    element.value = text;
    document.body.appendChild(element);
    element.select();
    try {
      const copied = navigator.clipboard.writeText(text);
      copied.then(
        () => {
          console.log("Text copied to clipboard!");
        },
        (err) => {
          console.error("Failed to copy text: ", err);
        }
      );
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    document.body.removeChild(element);
  }

  if (wallet.loading) {
    return <SpinnerBackdrop />;
  }

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
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-3 border border-rose-500/30 shadow-lg shadow-rose-500/10">
              <WalletIcon className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-200 via-slate-50 to-rose-200 bg-clip-text text-transparent lg:text-4xl">
                My Wallet
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Manage your funds and transactions
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="mb-8 animate-fade-in-delay">
          <Card className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className="rounded-xl bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-3 border border-rose-500/30">
                    <WalletIcon className="h-8 w-8 text-rose-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-50">My Wallet</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-gray-400 text-sm font-mono">
                        #FAVHJY{wallet.userWallet?.id}
                      </p>
                      <CopyIcon
                        onClick={() => copyToClipboard(wallet.userWallet?.id)}
                        className="cursor-pointer h-4 w-4 text-slate-500 hover:text-rose-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <ReloadIcon
                    onClick={handleFetchUserWallet}
                    className="w-6 h-6 cursor-pointer text-slate-400 hover:text-rose-400 transition-colors"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-2 border border-emerald-500/30">
                  <DollarSign className="h-6 w-6 text-emerald-400" />
                </div>
                <span className="text-3xl font-bold text-slate-50">
                  ${wallet.userWallet?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="group h-28 cursor-pointer flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/60 via-slate-900/60 to-black/60 p-4 transition-all hover:border-emerald-500/50 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-emerald-500/10">
                      <div className="rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-2 border border-emerald-500/30 mb-2 group-hover:scale-110 transition-transform">
                        <UploadIcon className="h-6 w-6 text-emerald-400" />
                      </div>
                      <span className="text-sm font-semibold text-slate-50">Add Money</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl border-slate-800 bg-gradient-to-br from-black/95 via-slate-950/95 to-black/95 text-slate-50">
                    <DialogHeader>
                      <DialogTitle className="text-center text-2xl font-bold">
                        Top Up Your Wallet
                      </DialogTitle>
                    </DialogHeader>
                    <TopupForm />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <div className="group h-28 cursor-pointer flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/60 via-slate-900/60 to-black/60 p-4 transition-all hover:border-rose-500/50 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-rose-500/10">
                      <div className="rounded-lg bg-gradient-to-r from-rose-500/20 to-rose-600/20 p-2 border border-rose-500/30 mb-2 group-hover:scale-110 transition-transform">
                        <DownloadIcon className="h-6 w-6 text-rose-400" />
                      </div>
                      <span className="text-sm font-semibold text-slate-50">Withdraw</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl border-slate-800 bg-gradient-to-br from-black/95 via-slate-950/95 to-black/95 text-slate-50">
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl font-bold">
                        Request Withdrawal
                      </DialogTitle>
                    </DialogHeader>
                    <WithdrawForm />
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <div className="group h-28 cursor-pointer flex flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/60 via-slate-900/60 to-black/60 p-4 transition-all hover:border-cyan-500/50 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-cyan-500/10">
                      <div className="rounded-lg bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 p-2 border border-cyan-500/30 mb-2 group-hover:scale-110 transition-transform">
                        <ShuffleIcon className="h-6 w-6 text-cyan-400" />
                      </div>
                      <span className="text-sm font-semibold text-slate-50">Transfer</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl border-slate-800 bg-gradient-to-br from-black/95 via-slate-950/95 to-black/95 text-slate-50">
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl font-bold">
                        Transfer To Other Wallet
                      </DialogTitle>
                    </DialogHeader>
                    <TransferForm />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <div className="animate-fade-in-delay">
          <div className="flex gap-2 items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-50">Transaction History</h1>
            <UpdateIcon
              onClick={hanldeFetchWalletTransactions}
              className="p-0 h-6 w-6 cursor-pointer text-slate-400 hover:text-rose-400 transition-colors"
            />
          </div>

          <div className="space-y-4">
            {wallet.transactions?.length > 0 ? (
              wallet.transactions.map((item, index) => (
                <Card
                  key={index}
                  className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/60 via-slate-950/60 to-black/60 px-5 py-4 flex justify-between items-center transition-all hover:border-slate-700 hover:bg-slate-900/80"
                >
                  <div className="flex items-center gap-5">
                    <Avatar className="h-12 w-12 border border-slate-700">
                      <AvatarFallback className="bg-gradient-to-r from-rose-500/20 to-cyan-500/20">
                        {item.amount > 0 ? (
                          <TrendingUp className="h-6 w-6 text-emerald-400" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-rose-400" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h1 className="font-semibold text-slate-50">{item.type || item.purpose}</h1>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                  </div>
                  <div>
                    <p
                      className={`flex items-center gap-1 text-lg font-bold ${
                        item.amount > 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {item.amount > 0 ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5" />
                      )}
                      {item.amount > 0 ? "+" : ""}${Math.abs(item.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                    </p>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/60 via-slate-950/60 to-black/60 p-12">
                <div className="flex flex-col items-center gap-3">
                  <ArrowLeftRight className="h-12 w-12 text-slate-600" />
                  <p className="text-lg font-semibold text-slate-400">No transactions yet</p>
                  <p className="text-sm text-slate-500">Your transaction history will appear here</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
