import { transferMoney } from "@/Redux/Wallet/Action";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DollarSign, Hash, MessageSquare, Send } from "lucide-react";

const TransferForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.walletId,
        reqData: {
          amount: formData.amount,
          purpose: formData.purpose,
        },
      })
    );
  };

  return (
    <div className="pt-6 space-y-6">
      <div>
        <Label className="text-slate-300 mb-2 block">Enter Amount</Label>
        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <Input
            name="amount"
            onChange={handleChange}
            value={formData.amount}
            className="pl-12 h-14 rounded-xl border-slate-700 bg-black/60 text-slate-50 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20"
            placeholder="$9999"
            type="number"
          />
        </div>
      </div>
      <div>
        <Label className="text-slate-300 mb-2 block">Enter Wallet ID</Label>
        <div className="relative">
          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <Input
            name="walletId"
            onChange={handleChange}
            value={formData.walletId}
            className="pl-12 h-14 rounded-xl border-slate-700 bg-black/60 text-slate-50 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20"
            placeholder="#ADFE34456"
          />
        </div>
      </div>

      <div>
        <Label className="text-slate-300 mb-2 block">Purpose</Label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <Input
            name="purpose"
            onChange={handleChange}
            value={formData.purpose}
            className="pl-12 h-14 rounded-xl border-slate-700 bg-black/60 text-slate-50 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20"
            placeholder="Gift for your friend..."
          />
        </div>
      </div>

      <DialogClose className="w-full">
        <Button
          onClick={handleSubmit}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-base font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
        >
          <Send className="mr-2 h-5 w-5" />
          Send Money
        </Button>
      </DialogClose>
    </div>
  );
};

export default TransferForm;
