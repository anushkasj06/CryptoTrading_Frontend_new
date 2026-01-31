import { twoStepVerification } from "@/Redux/Auth/Action";
import CustomeToast from "@/components/custome/CustomeToast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import heroBgVideo from "../Home/vecteezy_glowing-bitcoin-emblem-within-a-digital-network_52140322.mp4";

const TwoFactorAuth = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const {session}=useParams()
  const navigate=useNavigate()
  const { auth } = useSelector((store) => store);

  const handleTwoFactoreAuth = () => { 
    dispatch(twoStepVerification({otp:value,session,navigate}))
    console.log(value);
  }
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
      <CustomeToast show={auth.error} message={auth.error?.error} />
      <div className="relative z-10 flex flex-col gap-5 h-screen justify-center items-center px-4">
        <Card className="authCard p-8 sm:p-9 flex flex-col justify-center items-center max-w-md w-full">
        <Avatar className="w-20 h-20">
          <AvatarImage  src="https://cdn.dribbble.com/users/1125847/screenshots/15197732/media/7201b01895b7b60d33eea77d098eb7b3.png?resize=1600x1200&vertical=center" />
        </Avatar>
          <CardHeader className="pb-3">
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-xl font-bold text-slate-50">
                Two Step Verification
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 text-center">
                Enter the 6-digit code we sent to your email to secure your
                session.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 w-full">
            <div>
            <InputOTP
              value={value}
              onChange={(value) => setValue(value)}
              maxLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="mt-2 text-slate-400 text-xs sm:text-sm text-center">
              Check your inbox and spam folder for the verification code.
            </p>
            </div>
            <Button
              onClick={handleTwoFactoreAuth}
              className="w-full py-4 text-sm font-medium authPrimaryButton border-0"
            >
              Verify
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
