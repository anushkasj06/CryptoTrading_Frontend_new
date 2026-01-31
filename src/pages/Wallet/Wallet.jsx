import {
  depositMoney,
  getUserWallet,
  getWalletTransactions,
} from "@/Redux/Wallet/Action";

import { getPaymentDetails } from "@/Redux/Withdrawal/Action";

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

import {
  DollarSign,
  WalletIcon,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
} from "lucide-react";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import TopupForm from "./TopupForm";
import TransferForm from "./TransferForm";
import WithdrawForm from "./WithdrawForm";

import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import bgVideo from "../Home/vecteezy_illuminated-financial-data-graphs-on-digital-screen_52263081.mp4";



const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallet } = useSelector((store) => store);

  const { order_id } = useParams();
  const [searchParams] = useSearchParams();

  const razorpayPaymentId = searchParams.get("razorpay_payment_id");
  const paymentStatus = searchParams.get("razorpay_payment_link_status");

  const hasDeposited = useRef(false);

  // ✅ Handle Razorpay callback safely
  useEffect(() => {
    if (
      !hasDeposited.current &&
      order_id &&
      razorpayPaymentId &&
      paymentStatus === "paid"
    ) {
      hasDeposited.current = true;

      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId: order_id,
          paymentId: razorpayPaymentId,
          navigate,
        })
      );
    }
  }, [order_id, razorpayPaymentId, paymentStatus, dispatch, navigate]);

  // ✅ Fetch wallet balance
  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };

  // ✅ Fetch transactions
  const handleFetchWalletTransactions = () => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  };

  // ✅ Initial load
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    dispatch(getUserWallet(jwt));
    dispatch(getWalletTransactions({ jwt }));
    dispatch(getPaymentDetails({ jwt }));
  }, [dispatch]);

  if (wallet.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 to-black">
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
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-rose-500/20 p-3 border border-rose-500/30">
              <WalletIcon className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-50">My Wallet</h1>
              <p className="text-sm text-slate-400">
                Manage your funds and transactions
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Card */}
        <Card className="mb-8 rounded-3xl border border-slate-800 bg-black/80">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl text-slate-50">
                  Wallet ID
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 font-mono">
                    #{wallet.userWallet?.id}
                  </span>
                  <CopyIcon
                    onClick={() =>
                      copyToClipboard(wallet.userWallet?.id || "")
                    }
                    className="h-4 w-4 cursor-pointer text-slate-500"
                  />
                </div>
              </div>

              <ReloadIcon
                onClick={handleFetchUserWallet}
                className="h-6 w-6 cursor-pointer text-slate-400"
              />
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold text-emerald-400 mb-6">
              $
              {wallet.userWallet?.balance?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0.00"}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="wallet-action-btn">
                    <UploadIcon /> Add Money
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Top Up Wallet</DialogTitle>
                  </DialogHeader>
                  <TopupForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="wallet-action-btn">
                    <DownloadIcon /> Withdraw
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                  </DialogHeader>
                  <WithdrawForm />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="wallet-action-btn">
                    <ShuffleIcon /> Transfer
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Transfer Wallet</DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-slate-50">
              Transaction History
            </h2>
            <UpdateIcon
              onClick={handleFetchWalletTransactions}
              className="h-5 w-5 cursor-pointer text-slate-400"
            />
          </div>

          {wallet.transactions?.length > 0 ? (
            wallet.transactions.map((item, index) => (
              <Card key={index} className="mb-3 bg-black/70 border-slate-800">
                <CardContent className="flex justify-between items-center py-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {item.amount > 0 ? (
                          <TrendingUp className="text-emerald-400" />
                        ) : (
                          <TrendingDown className="text-rose-400" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-slate-50 font-semibold">
                        {item.type || item.purpose}
                      </p>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                  </div>

                  <p
                    className={`font-bold ${
                      item.amount > 0
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {item.amount > 0 ? "+" : "-"}$
                    {Math.abs(item.amount).toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-slate-500 text-center">
              No transactions yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
