import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    (<ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        // Determine icon based on variant
        let Icon = AlertCircle;
        if (variant === "success") {
          Icon = CheckCircle2;
        } else if (variant === "destructive") {
          Icon = XCircle;
        }

        return (
          (<Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-3 w-full">
              <div className={`flex-shrink-0 mt-0.5 ${
                variant === "success" ? "text-emerald-400" : 
                variant === "destructive" ? "text-rose-400" : 
                "text-slate-400"
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle className={
                  variant === "success" ? "text-emerald-50" : 
                  variant === "destructive" ? "text-rose-50" : 
                  "text-slate-50"
                }>{title}</ToastTitle>}
                {description && (
                  <ToastDescription className={
                    variant === "success" ? "text-emerald-100" : 
                    variant === "destructive" ? "text-rose-100" : 
                    "text-slate-300"
                  }>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose className={
                variant === "success" ? "text-emerald-300 hover:text-emerald-100" : 
                variant === "destructive" ? "text-rose-300 hover:text-rose-100" : 
                "text-slate-400 hover:text-slate-200"
              } />
            </div>
          </Toast>)
        );
      })}
      <ToastViewport />
    </ToastProvider>)
  );
}
