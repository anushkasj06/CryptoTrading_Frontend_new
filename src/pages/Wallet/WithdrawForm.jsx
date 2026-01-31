import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./WithdrawForm.css";
import { useDispatch, useSelector } from "react-redux";
import { withdrawalRequest } from "@/Redux/Withdrawal/Action";
import { DialogClose } from "@/components/ui/dialog";
import { maskAccountNumber } from "@/Util/maskAccountNumber";
import { useNavigate } from "react-router-dom";
import { DollarSign, Building2, Wallet, ArrowDownRight } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const WithdrawForm = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const { wallet, withdrawal } = useSelector((store) => store);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value;
    if (value.toString().length < 6) {
      setAmount(e.target.value);
    }
  };

  const handleSubmit = () => {
    dispatch(withdrawalRequest({ jwt: localStorage.getItem("jwt"), amount }));
  };

  if (!withdrawal.paymentDetails) {
    return (
      <div className="h-[20rem] flex gap-5 flex-col justify-center items-center">
        <div className="rounded-full bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-6 border border-rose-500/30">
          <Building2 className="h-12 w-12 text-rose-400" />
        </div>
        <p className="text-2xl font-bold text-slate-50">Add payment method</p>
        <p className="text-sm text-slate-400 text-center">
          You need to add payment details before making a withdrawal
        </p>
        <Button
          onClick={() => navigate("/payment-details")}
          className="h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 px-8 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
        >
          Add Payment Details
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-6 space-y-6">
      <div className="flex justify-between items-center rounded-xl border border-slate-800/80 bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 text-xl font-bold px-5 py-4">
        <div className="flex items-center gap-3">
          <Wallet className="h-5 w-5 text-emerald-400" />
          <p className="text-slate-300">Available balance</p>
        </div>
        <p className="text-slate-50">${wallet.userWallet?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
      <div className="flex flex-col items-center">
        <Label className="text-slate-300 mb-4 text-lg font-semibold">Enter withdrawal amount</Label>

        <div className="flex items-center justify-center">
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-500" />
            <Input
              onChange={handleChange}
              value={amount}
              className="withdrawInput pl-12 py-8 border-none outline-none focus:outline-none text-3xl font-bold text-center text-slate-50 bg-transparent"
              placeholder="$0"
              type="number"
            />
          </div>
        </div>
      </div>

      <div>
        <Label className="text-slate-300 mb-3 block">Transfer to</Label>
        <div className="flex items-center gap-5 border border-slate-800/80 bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 px-5 py-4 rounded-xl">
          <img
            className="h-10 w-10"
            src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"
            alt="Bank"
          />
          <div>
            <p className="text-lg font-bold text-slate-50">
              {withdrawal.paymentDetails?.bankName}
            </p>
            <p className="text-xs text-slate-400 font-mono">
              {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
            </p>
          </div>
        </div>
      </div>
      <DialogClose className="w-full">
        <Button
          onClick={handleSubmit}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-base font-semibold text-white shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
        >
          <ArrowDownRight className="mr-2 h-5 w-5" />
          Withdraw {amount && <span className="ml-2">${amount}</span>}
        </Button>
      </DialogClose>
    </div>
  );
};

export default WithdrawForm;
