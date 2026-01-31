import { getUserWallet } from '@/Redux/Wallet/Action'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReloadIcon } from '@radix-ui/react-icons'
import { DollarSignIcon, WalletIcon, CheckCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const { wallet } = useSelector((store) => store);

  const handleFetchUserWallet = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black flex flex-col justify-center items-center px-4">
      <div className="max-w-2xl w-full">
        <div className="mb-8 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-4 border border-emerald-500/30 mb-4">
            <CheckCircle className="h-12 w-12 text-emerald-400" />
          </div>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-emerald-200 via-slate-50 to-cyan-200 bg-clip-text text-transparent mb-2'>
            Payment Added Successfully
          </h1>
          <p className="text-slate-400">Your payment has been processed</p>
        </div>
        
        <Card className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 shadow-[0_24px_80px_rgba(15,23,42,0.95)] animate-fade-in-delay">
          <CardHeader className="pb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div className="rounded-xl bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-3 border border-rose-500/30">
                  <WalletIcon className="h-8 w-8 text-rose-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-50">My Balance</CardTitle>
              </div>
              <div>
                <Button
                  onClick={handleFetchUserWallet}
                  variant="ghost"
                  size="icon"
                  className="rounded-full border-slate-700 bg-black/60 hover:bg-black/80 hover:border-rose-500/50"
                >
                  <ReloadIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-6">
              <div className="rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 p-3 border border-emerald-500/30">
                <DollarSignIcon className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="text-3xl font-bold text-slate-50">
                ${wallet.userWallet?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PaymentSuccess
