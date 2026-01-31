import { Button } from "@/components/ui/button";
import {
  AvatarIcon,
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import SideBar from "../SideBar/SideBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleNavigate = () => {
    if (auth.user) {
      auth.user.role === "ROLE_ADMIN"
        ? navigate("/admin")
        : navigate("/profile");
    }
  };

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50 border-b border-slate-800/60 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-900/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6 lg:py-5">
          {/* Left cluster: menu + brand + live status */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="rounded-full h-12 w-12 border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 hover:border-rose-500/50 transition-all"
                  variant="outline"
                  size="icon"
                >
                  <DragHandleHorizontalIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="w-80 border-r-0 bg-slate-950/95 text-slate-50 px-0 pt-6"
                side="left"
              >
                <SheetHeader className="px-6 pb-4">
                  <SheetTitle>
                    <div className="flex items-center gap-2 text-2xl">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" />
                      </Avatar>
                      <div className="leading-snug">
                        <span className="font-semibold text-emerald-400">Crypto</span>{" "}
                        <span className="font-medium text-slate-100">Trading</span>
                      </div>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <SideBar />
              </SheetContent>
            </Sheet>

            <div className="flex flex-col justify-center">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-1.5 text-sm font-semibold tracking-[0.16em] text-slate-300 uppercase hover:opacity-80 transition-opacity"
              >
                <span className="text-rose-400">Crypto</span>
                <span className="text-slate-100">Trading</span>
                <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500/20 to-cyan-500/20 border border-rose-500/30 px-2.5 py-1 text-[11px] font-semibold text-slate-200">
                  Desk
                </span>
              </button>
              <div className="mt-1.5 flex items-center gap-2.5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 px-2.5 py-1 text-emerald-300 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE SESSION
                </span>
                <span className="hidden sm:inline text-slate-500 text-xs">BTC +2.3%</span>
                <span className="hidden sm:inline text-slate-500 text-xs">ETH 18 gwei</span>
                <span className="hidden lg:inline text-slate-500 text-xs">Desk latency 12 ms</span>
              </div>
            </div>
          </div>

          {/* Center: quick search */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <Button
              variant="outline"
              onClick={() => navigate("/search")}
              className="group flex h-12 w-full max-w-md items-center gap-3 rounded-full border-slate-700/80 bg-slate-900/60 px-5 text-sm text-slate-400 hover:border-rose-500/50 hover:bg-slate-900 transition-all"
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-slate-500 group-hover:text-rose-400 transition-colors" />
              <span className="flex-1 text-left">Quick search markets, coins, or alerts…</span>
              <span className="hidden items-center gap-1 rounded-full border border-slate-700 bg-black/40 px-2.5 py-1 text-[11px] text-slate-500 md:inline-flex">
                /
                <span className="text-[10px]">Search</span>
              </span>
            </Button>
          </div>

          {/* Right: user pill */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end text-xs leading-tight">
              <span className="text-slate-300 font-medium">
                {auth.user ? auth.user.fullName : "Guest"}
              </span>
              <span className="text-slate-500 text-[11px]">
                {auth.user ? "Global desk" : "Sign in to sync"}
              </span>
            </div>
            <Avatar
              className="cursor-pointer border-2 border-slate-600/80 bg-slate-900/70 hover:border-rose-500/50 transition-all h-11 w-11"
              onClick={handleNavigate}
            >
              {!auth.user ? (
                <AvatarIcon className="h-6 w-6 text-slate-300" />
              ) : (
                <AvatarFallback className="text-sm font-semibold">{auth.user?.fullName[0].toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
