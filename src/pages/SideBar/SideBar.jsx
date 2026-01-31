import { logout } from "@/Redux/Auth/Action";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import {
  ExitIcon,
  HandIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  PersonIcon,
  DashboardIcon,
  HomeIcon,
  BellIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import { CreditCardIcon, LandmarkIcon, SettingsIcon, WalletIcon, TrendingUp, Activity, Bookmark, User, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-5 w-5" /> },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <DashboardIcon className="h-5 w-5" />,
  },
  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <BookmarkIcon className="h-5 w-5" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityLogIcon className="h-5 w-5" />,
  },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-5 w-5" /> },
  {
    name: "Payment Details",
    path: "/payment-details",
    icon: <LandmarkIcon className="h-5 w-5" />,
  },
  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCardIcon className="h-5 w-5" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon className="h-5 w-5" />,
  },
  { name: "Logout", path: "/", icon: <ExitIcon className="h-5 w-5" /> },
];

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenuClick = (item) => {
    if (item.name === "Logout") {
      handleLogout();
      navigate(item.path);
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-full flex-col justify-between px-5 pb-6 pt-4 text-slate-100">
      <div>
        {/* Desk status card */}
        <div className="mb-6 rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 px-5 py-5 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-400 uppercase mb-3">
            Desk status
          </p>
          <div className="flex items-center gap-2 mb-4">
            <div className="rounded-lg bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-2 border border-rose-500/30">
              <TrendingUp className="h-5 w-5 text-rose-400" />
            </div>
            <p className="text-base font-bold text-slate-50">
              Hyperion Alpha
            </p>
          </div>
          {/* <div className="flex items-center justify-between mb-4">
            <div className="rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/40 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 shadow-lg shadow-emerald-500/10">
              Auto mode
            </div>
            <div className="rounded-full bg-gradient-to-r from-black/60 via-slate-900/60 to-black/60 border border-slate-800/80 px-3 py-1.5 text-[11px] font-semibold text-slate-400">
              Global desk
            </div>
          </div> */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 px-3 py-3">
              <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-1">Alerts</p>
              <p className="text-base font-bold text-slate-50">12</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 px-3 py-3">
              <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-1">Watchlist</p>
              <p className="text-base font-bold text-slate-50">8</p>
            </div>
            {/* <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 px-3 py-3">
              <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-1">Latency</p>
              <p className="text-base font-bold text-emerald-400">12 ms</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 px-3 py-3">
              <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-1">Signals</p>
              <p className="text-base font-bold text-slate-50">27</p>
            </div> */}
          </div>
        </div>

        {/* Menu items */}
        <div className="space-y-2">
          {menu.map((item) => {
            const active = isActive(item.path);
            return (
              <SheetClose key={item.name} className="block w-full">
                <Button
                  onClick={() => handleMenuClick(item)}
                  variant="ghost"
                  className={`group flex w-full items-center justify-between rounded-2xl border py-3.5 pl-4 pr-4 text-sm font-medium transition-all ${
                    active
                      ? "border-rose-500/50 bg-gradient-to-r from-rose-500/10 via-emerald-500/10 to-cyan-500/10 text-slate-50 shadow-lg shadow-rose-500/10"
                      : "border-transparent bg-gradient-to-r from-black/60 via-slate-900/60 to-black/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
                        active
                          ? "bg-gradient-to-r from-rose-500/20 to-cyan-500/20 border border-rose-500/30 text-rose-400 shadow-lg shadow-rose-500/10"
                          : "bg-gradient-to-r from-black/60 via-slate-900/60 to-black/60 border border-slate-800/80 text-slate-400 group-hover:bg-slate-800 group-hover:text-slate-100"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <p className={active ? "font-semibold" : ""}>{item.name}</p>
                  </div>
                  {item.name === "Home" && active && (
                    <span className="rounded-full bg-gradient-to-r from-rose-500 to-cyan-500 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg shadow-rose-500/30">
                      Now
                    </span>
                  )}
                  {item.name === "Logout" && (
                    <span className="text-[11px] font-semibold text-rose-400">Exit</span>
                  )}
                </Button>
              </SheetClose>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
