import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { addPaymentDetails } from "@/Redux/Withdrawal/Action";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Building2, CreditCard, User, Lock } from "lucide-react";

const formSchema = yup.object().shape({
  accountHolderName: yup.string().required("Account holder name is required"),
  ifscCode: yup.string().length(11, "IFSC code must be 11 characters"),
  accountNumber: yup.string().required("Account number is required"),
  confirmAccountNumber: yup.string().test({
    name: "match",
    message: "Account numbers do not match",
    test: function (value) {
      return value === this.parent.accountNumber;
    },
  }),
  bankName: yup.string().required("Bank name is required"),
});

const PaymentDetailsForm = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      bankName: "",
    },
  });
  const onSubmit = (data) => {
    dispatch(
      addPaymentDetails({
        paymentDetails: data,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  return (
    <div className="px-6 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <Label className="text-slate-300">Account holder name</Label>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <Input
                      {...field}
                      className="pl-12 h-12 rounded-xl border-slate-700 bg-black/60 text-slate-50 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20"
                      placeholder="Enter account holder name"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <Label className="text-slate-300">IFSC Code</Label>
                <FormControl>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <Input
                      {...field}
                      name="ifsc"
                      className="pl-12 h-12 rounded-xl border-slate-700 bg-black/60 text-slate-50 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20 uppercase"
                      placeholder="YESB0000009"
                      maxLength={11}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <Label className="text-slate-300">Account Number</Label>
                <FormControl>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <Input
                      {...field}
                      type="password"
                      className="pl-12 h-12 rounded-xl border-slate-700 bg-black/60 text-slate-50 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20"
                      placeholder="Enter account number"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <Label className="text-slate-300">Confirm Account Number</Label>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <Input
                      {...field}
                      type="password"
                      className="pl-12 h-12 rounded-xl border-slate-700 bg-black/60 text-slate-50 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20"
                      placeholder="Confirm account number"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <Label className="text-slate-300">Bank Name</Label>
                <FormControl>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <Input
                      {...field}
                      className="pl-12 h-12 rounded-xl border-slate-700 bg-black/60 text-slate-50 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20"
                      placeholder="YES Bank"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!auth.loading ? (
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
            >
              Submit
            </Button>
          ) : (
            <Skeleton className="w-full h-12 rounded-xl" />
          )}
        </form>
      </Form>
    </div>
  );
};

export default PaymentDetailsForm;
