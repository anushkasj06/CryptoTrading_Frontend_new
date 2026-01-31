/* eslint-disable no-unused-vars */
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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/Redux/Auth/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const formSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
});
const SignupForm = () => {
  const { auth } = useSelector((store) => store);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });
  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(register(data));
    console.log("signup form", data);
  };
  return (
      <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-50 text-center sm:text-left">
          Create your workspace
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
          Set up once and sync securely across every device.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="authInput w-full py-4 px-4 text-sm"
                    placeholder="Enter your full name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    className="authInput w-full py-4 px-4 text-sm"
                    placeholder="Enter your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!auth.loading ? (
            <Button
              type="submit"
              className="w-full py-4 text-sm font-medium authPrimaryButton border-0"
            >
              Create account
            </Button>
          ) : (
            <SpinnerBackdrop show={true} />
          )}
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
