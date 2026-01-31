import { paymentHandler } from "@/Redux/Wallet/Action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DollarSign, CreditCard } from "lucide-react";

const TopupForm = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount,
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
            onChange={handleChange}
            value={amount}
            className="pl-12 h-14 rounded-xl border-slate-700 bg-black/60 text-lg font-semibold text-slate-50 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20"
            placeholder="$9999"
            type="number"
          />
        </div>
      </div>

      <div>
        <Label className="text-slate-300 mb-3 block">Select payment method</Label>
        <RadioGroup
          onValueChange={(value) => {
            setPaymentMethod(value);
          }}
          className="flex gap-4"
          defaultValue="RAZORPAY"
        >
          <div className="flex-1 group">
            <Label
              htmlFor="r1"
              className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                paymentMethod === "RAZORPAY"
                  ? "border-rose-500/50 bg-gradient-to-r from-rose-500/10 to-rose-600/10 shadow-lg shadow-rose-500/10"
                  : "border-slate-700 bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 hover:border-slate-600"
              }`}
            >
              <RadioGroupItem
                icon={DotFilledIcon}
                iconClassName="h-8 w-8"
                className="h-5 w-5"
                value="RAZORPAY"
                id="r1"
              />
              <div className="bg-white rounded-lg px-4 py-2 flex-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png"
                  alt="Razorpay"
                  className="h-6 object-contain"
                />
              </div>
            </Label>
          </div>
          <div className="flex-1 group">
            <Label
              htmlFor="r2"
              className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all ${
                paymentMethod === "STRIPE"
                  ? "border-cyan-500/50 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 shadow-lg shadow-cyan-500/10"
                  : "border-slate-700 bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 hover:border-slate-600"
              }`}
            >
              <RadioGroupItem
                icon={DotFilledIcon}
                className="h-5 w-5"
                iconClassName="h-8 w-8"
                value="STRIPE"
                id="r2"
              />
              <div className="bg-white rounded-lg px-4 py-2 flex-1">
                <img
                  className="h-8 object-contain"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png"
                  alt="Stripe"
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      {wallet.loading ? (
        <Skeleton className="h-14 w-full rounded-xl" />
      ) : (
        <Button
          onClick={handleSubmit}
          className="w-full h-14 rounded-xl bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-base font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Proceed to Payment
        </Button>
      )}
    </div>
  );
};

export default TopupForm;
