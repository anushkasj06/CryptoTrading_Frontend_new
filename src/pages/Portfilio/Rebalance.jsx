import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpDown, Plus, X, TrendingUp, TrendingDown, Wallet, Target, RefreshCw } from "lucide-react";
import api from "@/Api/api";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import bgVideo from "../Home/vecteezy_illuminated-financial-data-graphs-on-digital-screen_52263081.mp4";

const Rebalance = () => {
  const dispatch = useDispatch();
  const { asset } = useSelector((store) => store);
  const { toast } = useToast();
  
  const [targetAllocations, setTargetAllocations] = useState({});
  const [rebalancePlan, setRebalancePlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUserAssets(jwt));
    }
  }, [dispatch]);

  // CALCULATION LOGIC: Only use coins from the user's actual portfolio
  // CALCULATION LOGIC: Only use coins from the user's actual portfolio
const { currentAllocations, totalValue, userOwnedCoins } = useMemo(() => {
  const assets = asset.userAssets || [];
  
  // FIX: Using current_price (snake_case) to match backend JSON output
  const total = assets.reduce((sum, item) => {
    const price = item.coin?.current_price || 0;
    const qty = item.quantity || 0;
    return sum + (price * qty);
  }, 0);

  const allocations = {};
  const ownedCoins = [];

  assets.forEach((item) => {
    if (item.coin) {
      const price = item.coin.current_price || 0;
      const qty = item.quantity || 0;
      const coinValue = price * qty;
      
      // FIX: Ensure total is not zero to avoid NaN
      const percentage = total > 0 ? (coinValue / total) * 100 : 0;
      
      allocations[item.coin.id] = percentage;
      ownedCoins.push(item.coin);
    }
  });

  return { 
    currentAllocations: allocations, 
    totalValue: total, 
    userOwnedCoins: ownedCoins 
  };
}, [asset.userAssets]);

  const handleAddAllocation = () => {
    if (!selectedCoin) {
      toast({ title: "Please select a coin from your portfolio", variant: "destructive" });
      return;
    }

    if (targetAllocations[selectedCoin] !== undefined) {
      toast({ title: "Coin already added to plan", variant: "destructive" });
      return;
    }

    // Default the target to their current actual percentage for easier adjustment
    setTargetAllocations({
      ...targetAllocations,
      [selectedCoin]: currentAllocations[selectedCoin] || 0,
    });
    setSelectedCoin("");
  };

  const handleAutoFillCurrent = () => {
    setTargetAllocations(currentAllocations);
    setRebalancePlan(null);
  };

  const handleRemoveAllocation = (coinId) => {
    const newAllocations = { ...targetAllocations };
    delete newAllocations[coinId];
    setTargetAllocations(newAllocations);
    setRebalancePlan(null);
  };

  const handleAllocationChange = (coinId, value) => {
    const numValue = parseFloat(value) || 0;
    if (numValue < 0 || numValue > 100) {
      toast({ title: "Percentage must be between 0 and 100", variant: "destructive" });
      return;
    }
    setTargetAllocations({ ...targetAllocations, [coinId]: numValue });
    setRebalancePlan(null);
  };

  const calculateTotalTarget = () => {
    return Object.values(targetAllocations).reduce((sum, val) => sum + (val || 0), 0);
  };

  const handleCalculateRebalance = async () => {
    const totalTarget = calculateTotalTarget();
    if (Math.abs(totalTarget - 100) > 0.01) {
      toast({
        title: "Total allocation must equal 100%",
        description: `Current total: ${totalTarget.toFixed(2)}%`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await api.post(
        "/api/portfolio/rebalance-plan",
        {
          targetAllocations: Object.fromEntries(
            Object.entries(targetAllocations).map(([key, value]) => [key, value / 100])
          ),
        },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      setRebalancePlan(response.data);
      toast({ title: "Rebalance plan calculated", description: "Review instructions below" });
    } catch (error) {
      toast({
        title: "Error calculating plan",
        description: error.response?.data?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper to find coin info from the owned coins list
  const getCoinData = (coinId) => userOwnedCoins.find((c) => c.id === coinId) || {};

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black">
      <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-65" src={bgVideo} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-slate-950/50 to-black/70 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-8">
        
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-50 via-rose-200 to-slate-50 bg-clip-text text-transparent lg:text-4xl">
                Portfolio Rebalancing
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Adjust your current holdings to reach your ideal asset distribution
              </p>
            </div>
            <Button onClick={handleAutoFillCurrent} variant="outline" className="rounded-full border-slate-700 text-slate-300 hover:bg-slate-800">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Current Holdings
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="group rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 transition-all hover:border-emerald-500/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Portfolio Value</p>
                  <p className="mt-2 text-2xl font-bold text-slate-50">
                    ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <Wallet className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
            <div className="group rounded-2xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-6 transition-all hover:border-cyan-500/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Target Total</p>
                  <p className={`mt-2 text-2xl font-bold ${Math.abs(calculateTotalTarget() - 100) < 0.01 ? "text-emerald-400" : "text-rose-400"}`}>
                    {calculateTotalTarget().toFixed(2)}%
                  </p>
                </div>
                <Target className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 animate-fade-in-delay">
          <Card className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-50">Set Strategy</CardTitle>
              <CardDescription className="text-slate-400">Adjust percentages for coins in your portfolio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                  <SelectTrigger className="flex-1 h-12 rounded-full border-slate-700 bg-black/60 text-slate-50">
                    <SelectValue placeholder="Select from your assets" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-slate-800 text-slate-50">
                    {userOwnedCoins.map((coin) => (
                      <SelectItem key={coin.id} value={coin.id}>
                        <div className="flex items-center gap-2">
                          <img src={coin.image} alt={coin.symbol} className="h-5 w-5 rounded-full" />
                          <span>{coin.name}</span>
                          <span className="text-slate-500">({currentAllocations[coin.id]?.toFixed(1)}%)</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleAddAllocation} className="h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6">
                  <Plus className="h-5 w-5 mr-2" /> Add
                </Button>
              </div>

              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {Object.entries(targetAllocations).map(([coinId, percentage]) => {
                    const coin = getCoinData(coinId);
                    return (
                      <div key={coinId} className="flex items-center gap-3 p-4 rounded-xl border border-slate-800/50 bg-slate-900/30">
                        <Avatar className="h-10 w-10 border border-slate-700">
                          <AvatarImage src={coin.image} />
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-50">{coin.name}</p>
                          <p className="text-xs text-slate-400">Actual: {currentAllocations[coinId]?.toFixed(2)}%</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={percentage}
                            onChange={(e) => handleAllocationChange(coinId, e.target.value)}
                            className="w-24 h-10 text-center bg-black/60 text-slate-50"
                          />
                          <span className="text-slate-400">%</span>
                          <Button onClick={() => handleRemoveAllocation(coinId)} variant="ghost" size="icon" className="text-rose-400"><X className="h-5 w-5" /></Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <Button onClick={handleCalculateRebalance} disabled={loading || Object.keys(targetAllocations).length === 0} className="w-full h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                {loading ? "Calculating..." : <><ArrowUpDown className="h-5 w-5 mr-2" /> Calculate Plan</>}
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-50">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              {rebalancePlan ? (
                <ScrollArea className="h-[500px]">
                  <Table>
                    <TableHeader><TableRow className="border-slate-800"><TableHead className="text-slate-400">Coin</TableHead><TableHead className="text-slate-400">Action</TableHead><TableHead className="text-right text-slate-400">Value</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {rebalancePlan.instructions?.map((inst, i) => {
                        const coin = getCoinData(inst.coinId);
                        return (
                          <TableRow key={i} className="border-slate-800/50">
                            <TableCell><div className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarImage src={coin.image}/></Avatar><span>{coin.name}</span></div></TableCell>
                            <TableCell><span className={`px-3 py-1 rounded-full text-xs font-bold ${inst.action === "BUY" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>{inst.action} {inst.quantity.toFixed(4)}</span></TableCell>
                            <TableCell className="text-right font-bold text-slate-50">${inst.estimatedValue.toFixed(2)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </ScrollArea>
              ) : (
                <div className="text-center py-20 text-slate-500">Set targets to see suggested trades.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Rebalance;