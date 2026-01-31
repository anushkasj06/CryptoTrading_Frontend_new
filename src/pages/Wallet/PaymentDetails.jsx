import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PaymentDetailsForm from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { maskAccountNumber } from "@/Util/maskAccountNumber";
import { Building2, CreditCard, Plus } from "lucide-react";
import heroBgVideo from "../Home/vecteezy_illuminated-financial-data-graphs-on-digital-screen_52263081.mp4";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
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

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-3 border border-rose-500/30 shadow-lg shadow-rose-500/10">
              <CreditCard className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-200 via-slate-50 to-rose-200 bg-clip-text text-transparent lg:text-4xl">
                Payment Details
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Manage your bank account information for withdrawals
              </p>
            </div>
          </div>
        </div>

        {withdrawal.paymentDetails ? (
          <div className="animate-fade-in-delay">
            <Card className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-3 border border-rose-500/30">
                    <Building2 className="h-6 w-6 text-rose-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-50">
                      {withdrawal.paymentDetails?.bankName?.toUpperCase()}
                    </CardTitle>
                    <CardDescription className="text-slate-400 mt-1">
                      A/C No: {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">A/C Holder</span>
                  </div>
                  <p className="text-slate-50 font-medium">
                    {withdrawal.paymentDetails.accountHolderName}
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">IFSC</span>
                  </div>
                  <p className="text-slate-50 font-medium font-mono">
                    {withdrawal.paymentDetails.ifsc?.toUpperCase()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="animate-fade-in-delay">
            <Card className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 shadow-[0_24px_80px_rgba(15,23,42,0.95)] p-12">
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="rounded-full bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-6 border border-rose-500/30">
                  <CreditCard className="h-12 w-12 text-rose-400" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-50 mb-2">No Payment Details</h2>
                  <p className="text-slate-400 mb-6">
                    Add your bank account details to enable withdrawals
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 px-8 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Payment Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl border-slate-800 bg-gradient-to-br from-black/95 via-slate-950/95 to-black/95 text-slate-50">
                    <DialogHeader className="pb-5">
                      <DialogTitle className="text-xl font-bold">Payment Details</DialogTitle>
                    </DialogHeader>
                    <PaymentDetailsForm />
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetails;
