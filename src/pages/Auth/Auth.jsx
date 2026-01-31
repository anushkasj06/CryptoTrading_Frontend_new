/* eslint-disable no-unused-vars */
import "./Auth.css";
import { Button } from "@/components/ui/button";

import SignupForm from "./signup/SignupForm";
import AdminSignupForm from "./signup/AdminSignupForm";
import LoginForm from "./login/login";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import ForgotPasswordForm from "./ForgotPassword";
import { useSelector } from "react-redux";
import CustomeToast from "@/components/custome/CustomeToast";
import heroBgVideo from "../Home/vecteezy_glowing-bitcoin-emblem-within-a-digital-network_52140322.mp4";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((store) => store);

  const [animate, setAnimate] = useState(false);

  const handleNavigation = (path) => {
    setAnimate(true);
    navigate(path);
    setTimeout(() => setAnimate(false), 350);
  };

  const isSignup = location.pathname === "/signup";
  const isAdminSignup = location.pathname === "/admin/signup";
  const isForgotPassword = location.pathname === "/forgot-password";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black text-slate-50">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src={heroBgVideo}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-slate-950/60 to-black/85 pointer-events-none" />
      <div className="authInnerShell relative z-10 flex items-center justify-center px-6 py-10 lg:px-16">
        <div className="authShellGrid w-full max-w-6xl mx-auto">
          {/* Left hero section */}
          <div className="space-y-6 lg:space-y-8">
            <div className="authPillRow">
              <span className="authPill">NEXT-GEN TRADING OS</span>
              <span className="authPill">SECURE BY DESIGN</span>
            </div>
            <h1 className="authHeroTitle text-slate-50">
              Crypto <span className="authHeroAccent">Trading</span>
              <br />
              Smart Crypto Trading.
            </h1>
            <p className="authHeroSubtitle text-sm sm:text-base text-slate-300">
              Execute smarter strategies with sentiment overlays, on-chain signals, and AI-powered
              recommendations. Customize dashboards, automate alerts and stay ahead of every move.
            </p>

            <div className="authStatGrid">
              <div className="authStatCard">
                <p className="authStatLabel">99.9% uptime</p>
                <p className="authStatValue">Redundant data feeds</p>
              </div>
              <div className="authStatCard">
                <p className="authStatLabel">+120 integrations</p>
                <p className="authStatValue">Exchanges & wallets</p>
              </div>
              <div className="authStatCard">
                <p className="authStatLabel">Real-time</p>
                <p className="authStatValue">24/7 support desk</p>
              </div>
            </div>
          </div>

          {/* Right auth card */}
          <div className={`authCardShell transition-all duration-300 ${animate ? "scale-[1.01]" : ""}`}>
            <Card className="authCard p-7 sm:p-8 lg:p-9">
              <CustomeToast show={auth.error} message={auth.error?.error} />

              {/* Header text changes by route */}
              <div className="mb-7 space-y-2">
                <h2 className="authCardHeaderTitle text-slate-50">
                  {isForgotPassword
                    ? "Forgot your password?"
                    : isSignup
                    ? "Create an account"
                    : isAdminSignup
                    ? "Create an admin account"
                    : "Welcome back"}
                </h2>
                <p className="authCardHeaderSubtitle text-slate-400">
                  {isForgotPassword
                    ? "We'll send you a one-time code to securely reset your password."
                    : isSignup
                    ? "Access premium insights, personalized alerts, and curated trading rooms."
                    : isAdminSignup
                    ? "Lock down admin access with role-based controls and full audit visibility."
                    : "Sync your trading setup across devices and unlock real-time market intelligence."}
                </p>
              </div>

              {/* Form area */}
              <div className="space-y-6">
                {isForgotPassword ? (
                  <section className="space-y-4">
                    <ForgotPasswordForm />
                    <div className="flex items-center justify-center">
                      <span className="authSwitchText">Back to sign in?</span>
                      <Button
                        onClick={() => handleNavigation("/signin")}
                        variant="ghost"
                        className="px-2 authUnderlineLink"
                      >
                        Sign in
                      </Button>
                    </div>
                  </section>
                ) : isSignup ? (
                  <section className={animate ? "translate-y-1 opacity-95" : ""}>
                    <SignupForm />
                    <div className="mt-4 flex items-center justify-center gap-1.5">
                      <span className="authSwitchText">Already have an account?</span>
                      <Button
                        onClick={() => handleNavigation("/signin")}
                        variant="ghost"
                        className="px-2 authUnderlineLink"
                      >
                        Sign in
                      </Button>
                    </div>
                  </section>
                ) : isAdminSignup ? (
                  <section className={animate ? "translate-y-1 opacity-95" : ""}>
                    <AdminSignupForm />
                    <div className="mt-4 flex items-center justify-center gap-1.5">
                      <span className="authSwitchText">Already an admin?</span>
                      <Button
                        onClick={() => handleNavigation("/signin")}
                        variant="ghost"
                        className="px-2 authUnderlineLink"
                      >
                        Sign in
                      </Button>
                    </div>
                  </section>
                ) : (
                  <section className={animate ? "translate-y-1 opacity-95" : ""}>
                    <LoginForm />
                    <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="authSwitchText">Don&apos;t have an account?</span>
                          <Button
                            onClick={() => handleNavigation("/signup")}
                            variant="ghost"
                            className="px-2 authUnderlineLink"
                          >
                            Sign up
                          </Button>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="authSwitchText text-xs text-slate-500">Admin?</span>
                          <Button
                            onClick={() => handleNavigation("/admin/signup")}
                            variant="ghost"
                            className="px-2 authUnderlineLink text-xs"
                          >
                            Create admin account
                          </Button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate("/forgot-password")}
                        className="authMutedLink underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </section>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;


