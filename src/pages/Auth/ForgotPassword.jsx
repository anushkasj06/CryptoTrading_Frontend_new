import { Input } from "@/components/ui/input";
// import "./Login.css";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { sendResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});
const ForgotPasswordForm = () => {
  const [verificationType, setVerificationType] = useState("EMAIL");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(
      sendResetPassowrdOTP({ 
        sendTo: data.email, navigate, verificationType })
    );
    console.log("login form", data);
  };
  return (
      <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-50 text-center sm:text-left">
          Forgot your password?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
          Enter the email linked to your CryptoTrading account and we&apos;ll send a
          one-time code.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="authInput w-full py-4 px-4 text-sm"
                    placeholder="you@example.com"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-4 text-sm font-medium authPrimaryButton border-0"
          >
            Send reset code
          </Button>
        </form>
      </Form>

      
    </div>
  );
};

export default ForgotPasswordForm;
