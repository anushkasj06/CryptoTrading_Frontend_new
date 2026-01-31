/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { sendVerificationOtp, verifyOtp } from "@/Redux/Auth/Action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Shield, Send } from "lucide-react";

const AccountVarificationForm = ({ handleSubmit }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleSendOtp = (verificationType) => {
    dispatch(
      sendVerificationOtp({
        verificationType,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  return (
    <div className="flex justify-center p-4">
      <div className="space-y-6 mt-6 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-2xl border border-slate-800/80 bg-gradient-to-r from-black/60 via-slate-900/50 to-black/60 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-2 border border-rose-500/30">
              <Mail className="h-5 w-5 text-rose-400" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Email</p>
              <p className="text-sm font-medium text-slate-50">{auth.user?.email}</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleSendOtp("EMAIL")}
                className="h-11 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 px-6 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
              >
                <Send className="mr-2 h-4 w-4" />
                Send OTP
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg border-slate-800 bg-gradient-to-br from-black/95 via-slate-950/95 to-black/95 text-slate-50">
              <DialogHeader>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Shield className="h-6 w-6 text-rose-400" />
                  <DialogTitle className="text-xl font-bold text-center">
                    Enter OTP
                  </DialogTitle>
                </div>
                <p className="text-sm text-center text-slate-400 mb-6">
                  We've sent a verification code to your email address
                </p>
              </DialogHeader>
              <div className="py-5 flex flex-col gap-6 justify-center items-center">
                <div className="flex justify-center">
                  <InputOTP
                    value={value}
                    onChange={(value) => setValue(value)}
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="border-slate-700 bg-black/60 text-slate-50" />
                      <InputOTPSlot index={1} className="border-slate-700 bg-black/60 text-slate-50" />
                      <InputOTPSlot index={2} className="border-slate-700 bg-black/60 text-slate-50" />
                    </InputOTPGroup>
                    <InputOTPSeparator className="text-slate-600" />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} className="border-slate-700 bg-black/60 text-slate-50" />
                      <InputOTPSlot index={4} className="border-slate-700 bg-black/60 text-slate-50" />
                      <InputOTPSlot index={5} className="border-slate-700 bg-black/60 text-slate-50" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <DialogClose className="w-full">
                  <Button
                    onClick={() => handleSubmit(value)}
                    className="w-full h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
                  >
                    Submit
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountVarificationForm;
