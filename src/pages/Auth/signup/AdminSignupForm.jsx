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
import { registerAdmin } from "@/Redux/Auth/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const formSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

const AdminSignupForm = () => {
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
    dispatch(registerAdmin(data));
  };

  return (
      <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-slate-50 text-center sm:text-left">
          Create an admin console
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
          Provision a secure admin workspace to monitor users, portfolios and
          withdrawals.
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
                    placeholder="Admin full name"
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
                    placeholder="admin@example.com"
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
                    placeholder="Strong admin password"
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
              Create admin account
            </Button>
          ) : (
            <SpinnerBackdrop show={true} />
          )}
        </form>
      </Form>
    </div>
  );
};

export default AdminSignupForm;


