import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { verifyResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import heroBgVideo from "../Home/vecteezy_glowing-bitcoin-emblem-within-a-digital-network_52140322.mp4";

import * as yup from "yup";

const formSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords & Confirm Password must match")
    .min(8, "Password must be at least 8 characters long")
    .required("Confirm password is required"),
  otp: yup
    .string()
    .min(6, "OTP must be at least 6 characters long")
    .required("OTP is required"),
});
const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { session } = useParams();
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
      otp: "",
    },
  });
  const onSubmit = (data) => {
    dispatch(
      verifyResetPassowrdOTP({ otp: data.otp, password: data.password,session , navigate})
    );
    console.log("login form", data);
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black text-slate-50 flex justify-center items-center px-4">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src={heroBgVideo}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-slate-950/60 to-black/85 pointer-events-none" />
      <Card className="relative z-10 rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-10 max-w-md w-full shadow-[0_24px_80px_rgba(15,23,42,0.95)] backdrop-blur-xl">
        <div className="space-y-5 w-full">
          <h1 className="text-center text-xl font-bold text-slate-50 pb-5">Reset Your Password</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h1 className="pb-2 text-slate-50 font-semibold">Verify OTP</h1>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP {...field} maxLength={6}>
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
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <h1 className="pt-7 pb-2 text-slate-50 font-semibold">Change Password</h1>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="authInput w-full py-4 px-4 text-sm"
                        placeholder="new password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="authInput w-full py-4 px-4 text-sm"
                        placeholder="confirm password..."
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full py-4 text-sm font-medium authPrimaryButton border-0">
                Change Password
              </Button>
            </form>
          </Form>

          {/* <div className="flex items-center justify-center">
              <span>already have account ? </span>
              <Button variant="ghost">signup</Button>
            </div> */}
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
