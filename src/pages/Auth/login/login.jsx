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
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
// import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(login(data));
    console.log("login form", data);
  };
  return (
      <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-50 text-center sm:text-left">
          Sign in to your hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
          Secure authentication with adaptive protection.
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
          <FormField
            control={form.control}
            name="password" // Added password field
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password" // Added type attribute for password input
                    className="authInput w-full py-4 px-4 text-sm"
                    placeholder="Enter your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!auth.loading ? (
            <Button type="submit" className="w-full py-4 text-sm font-medium authPrimaryButton border-0">
              Continue
            </Button>
          ) : (
            <SpinnerBackdrop show={true} />
          )}
        </form>
      </Form>

      {/* {toast({
        title: "Scheduled: Catch up ",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      })} */}
    </div>
  );
};

export default LoginForm;
