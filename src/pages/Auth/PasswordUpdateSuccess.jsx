import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCheckIcon, CheckCircle, CheckIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import heroBgVideo from "../Home/vecteezy_glowing-bitcoin-emblem-within-a-digital-network_52140322.mp4";

const PasswordUpdateSuccess = () => {
    const navigate=useNavigate();
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black text-slate-50">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src={heroBgVideo}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-slate-950/60 to-black/85 pointer-events-none" />
      <div className="relative z-10 h-screen flex flex-col justify-center items-center px-4">
        <Card className="authCard p-10 flex flex-col justify-center items-center w-full max-w-sm">
          <CheckCircle className="text-emerald-400 h-20 w-20 drop-shadow-lg" />
          <p className="pt-5 text-xl font-bold text-slate-50">
            Password changed!
          </p>
          <p className="py-2 pb-5 text-slate-400 text-center text-sm">
            Your password has been updated successfully. You can now sign in
            with your new credentials.
          </p>
          <Button
            onClick={() => navigate("/")}
            className="w-full py-4 text-sm font-medium authPrimaryButton border-0"
          >
            Go to login
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default PasswordUpdateSuccess;
