import { getAssetDetails } from "@/Redux/Assets/Action";
import { payOrder } from "@/Redux/Order/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DotIcon } from "@radix-ui/react-icons";
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { getUserWallet } from "@/Redux/Wallet/Action";

const TradingForm = () => {
  const { coin, asset, wallet, order } = useSelector((store) => store);
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const [orderType, setOrderType] = useState("BUY");
  const { toast } = useToast();
  const prevOrderState = useRef({ loading: false, order: null, error: null });
  const orderDetailsRef = useRef({ orderType: "BUY", quantity: 0, amount: 0, coinSymbol: "" });

  const handleOnChange = (e) => {
    const amount = e.target.value;
    setAmount(amount);
    const volume = calculateBuyCost(amount, coin.coinDetails?.market_data?.current_price?.usd);
    setQuantity(volume);
  };

  function calculateBuyCost(amountUSD, cryptoPrice) {
    if (!cryptoPrice || !amountUSD) return 0;
    let volume = amountUSD / cryptoPrice;
    let decimalPlaces = Math.max(
      2,
      cryptoPrice.toString().split(".")[0].length
    );
    return volume.toFixed(decimalPlaces);
  }

  const handleBuyCrypto = () => {
    // Store order details for toast notification
    orderDetailsRef.current = {
      orderType,
      quantity: parseFloat(quantity) || 0,
      amount: parseFloat(amount) || 0,
      coinSymbol: coin.coinDetails?.symbol?.toUpperCase() || "Coin",
    };
    
    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount,
        orderData: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
        },
      })
    );
  };

  useEffect(() => {
    if (coin.coinDetails?.id) {
      dispatch(getAssetDetails({ coinId: coin.coinDetails.id, jwt: localStorage.getItem("jwt") }));
    }
  }, [coin.coinDetails?.id]);

  // Monitor order success/error and show toast notifications
  useEffect(() => {
    const prev = prevOrderState.current;
    
    // Check if order was just completed successfully
    if (prev.loading && !order.loading && order.order && !order.error) {
      const orderDetails = orderDetailsRef.current;
      const action = orderDetails.orderType === "BUY" ? "bought" : "sold";
      
      toast({
        title: `Successfully ${action} ${orderDetails.coinSymbol}`,
        description: `You have ${action} ${orderDetails.quantity} ${orderDetails.coinSymbol} for $${orderDetails.amount}`,
        variant: "success",
      });

      // Reset form
      setAmount(0);
      setQuantity(0);
      
      // Refresh wallet and asset data
      dispatch(getUserWallet(localStorage.getItem("jwt")));
      if (coin.coinDetails?.id) {
        dispatch(getAssetDetails({ coinId: coin.coinDetails.id, jwt: localStorage.getItem("jwt") }));
      }
    }
    
    // Check if order failed
    if (prev.loading && !order.loading && order.error) {
      toast({
        title: "Transaction Failed",
        description: order.error || "An error occurred while processing your order",
        variant: "destructive",
      });
    }
    
    // Update previous state
    prevOrderState.current = {
      loading: order.loading,
      order: order.order,
      error: order.error,
    };
  }, [order.loading, order.order, order.error, coin.coinDetails, dispatch, toast]);

  const currentPrice = coin.coinDetails?.market_data?.current_price?.usd || 0;
  const totalCost = quantity * currentPrice;
  const availableBalance = wallet.userWallet?.balance || 0;
  const availableQuantity = asset.assetDetails?.quantity || 0;
  const maxSellValue = availableQuantity * currentPrice;

  const isInsufficientBuy = orderType === "BUY" && totalCost > availableBalance;
  const isInsufficientSell = orderType === "SELL" && amount > maxSellValue;
  const isDisabled = quantity === 0 || isInsufficientBuy || isInsufficientSell || (orderType === "SELL" && !availableQuantity);

  return (
    <div className="space-y-6 p-2">
      {/* Amount Input Section */}
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="mb-2 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Amount (USD)
            </label>
            <Input
              className="h-14 rounded-xl border-slate-700 bg-slate-900/60 text-lg font-semibold text-slate-50 focus:border-emerald-500 focus:ring-emerald-500/20"
              placeholder="Enter amount..."
              onChange={handleOnChange}
              type="number"
              value={amount || ""}
            />
          </div>
          <div className="w-40">
            <label className="mb-2 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Quantity
            </label>
            <div className="flex h-14 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-4">
              <span className="text-lg font-semibold text-slate-50">
                {quantity || "0.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Error Messages */}
        {isInsufficientSell && (
          <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 px-4 py-3">
            <TrendingDown className="h-5 w-5 text-rose-400" />
            <p className="text-sm font-medium text-rose-400">
              Insufficient quantity to sell
            </p>
          </div>
        )}
        {isInsufficientBuy && (
          <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 px-4 py-3">
            <Wallet className="h-5 w-5 text-rose-400" />
            <p className="text-sm font-medium text-rose-400">
              Insufficient wallet balance to buy
            </p>
          </div>
        )}
      </div>

      {/* Coin Info Card */}
      <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/60 via-slate-900/50 to-black/60 p-5">
        <div className="flex gap-4 items-center">
          <Avatar className="h-14 w-14 border-2 border-slate-700">
            <AvatarImage src={coin.coinDetails?.image?.large} />
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold text-slate-50">
                {coin.coinDetails?.symbol?.toUpperCase()}
              </p>
              <DotIcon className="text-slate-500" />
              <p className="text-slate-400">{coin.coinDetails?.name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold text-slate-50">
                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
              </p>
              <p
                className={`text-sm font-medium ${
                  coin.coinDetails?.market_data?.market_cap_change_24h < 0
                    ? "text-rose-400"
                    : "text-emerald-400"
                }`}
              >
                {coin.coinDetails?.market_data?.market_cap_change_24h >= 0 ? "+" : ""}
                {coin.coinDetails?.market_data?.market_cap_change_percentage_24h?.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/60 via-slate-900/50 to-black/60 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Order Type</span>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
            Market Order
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">
            {orderType === "BUY" ? "Available Balance" : "Available Quantity"}
          </span>
          <div className="flex items-center gap-2">
            {orderType === "BUY" ? (
              <>
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <span className="text-base font-semibold text-slate-50">
                  ${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </>
            ) : (
              <span className="text-base font-semibold text-slate-50">
                {availableQuantity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
              </span>
            )}
          </div>
        </div>
        {amount > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-sm text-slate-400">Total Cost</span>
            <span className="text-lg font-bold text-slate-50">
              ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <DialogClose className="w-full">
          <Button
            onClick={handleBuyCrypto}
            disabled={isDisabled}
            className={`w-full h-14 rounded-xl text-base font-semibold transition-all ${
              orderType === "SELL"
                ? "bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 text-white shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 hover:scale-[1.02]"
                : "bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-black shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02]"
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
          >
            {orderType === "SELL" ? (
              <>
                <ArrowDownRight className="mr-2 h-5 w-5" />
                Sell {coin.coinDetails?.symbol?.toUpperCase()}
              </>
            ) : (
              <>
                <ArrowUpRight className="mr-2 h-5 w-5" />
                Buy {coin.coinDetails?.symbol?.toUpperCase()}
              </>
            )}
          </Button>
        </DialogClose>

        <Button
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
          className="w-full h-12 rounded-xl border-slate-700 bg-black/60 text-base font-medium text-slate-300 hover:bg-black/80 hover:text-rose-300 hover:border-rose-500/50"
          variant="outline"
        >
          {orderType === "BUY" ? "Switch to Sell" : "Switch to Buy"}
        </Button>
      </div>
    </div>
  );
};

export default TradingForm;
