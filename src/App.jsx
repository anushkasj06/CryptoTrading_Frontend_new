import Home from "./pages/Home/Home";
import Portfolio from "./pages/Portfilio/Portfolio";
import Rebalance from "./pages/Portfilio/Rebalance";
import Auth from "./pages/Auth/Auth";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import StockDetails from "./pages/StockDetails/StockDetails";
import Profile from "./pages/Profile/Profile";
import Notfound from "./pages/Notfound/Notfound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import Wallet from "./pages/Wallet/Wallet";
import Watchlist from "./pages/Watchlist/Watchlist";
import TwoFactorAuth from "./pages/Auth/TwoFactorAuth";
import ResetPasswordForm from "./pages/Auth/ResetPassword";
import PasswordUpdateSuccess from "./pages/Auth/PasswordUpdateSuccess";
import LoginWithGoogle from "./pages/Auth/LoginWithGoogle.";
import PaymentSuccess from "./pages/Wallet/PaymentSuccess";
import Withdrawal from "./pages/Wallet/Withdrawal";
import PaymentDetails from "./pages/Wallet/PaymentDetails";
import WithdrawalAdmin from "./Admin/Withdrawal/WithdrawalAdmin";
import Activity from "./pages/Activity/Activity";
import SearchCoin from "./pages/Search/Search";
import { shouldShowNavbar } from "./Util/shouldShowNavbar";
import AdminDashboard from "./Admin/Dashboard/AdminDashboard";
import AdminUsers from "./Admin/Users/AdminUsers";
import AdminUserDetail from "./Admin/Users/AdminUserDetail";
import AdminOrders from "./Admin/Orders/AdminOrders";
import Navbar from "./pages/Navbar/Navbar";
import Landing from "./pages/Landing/Landing";

const routes = [
  { path: "/", role: "ROLE_USER" },
  { path: "/portfolio", role: "ROLE_USER" },
  { path: "/portfolio/rebalance", role: "ROLE_USER" },
  { path: "/activity", role: "ROLE_USER" },
  { path: "/wallet", role: "ROLE_USER" },
  { path: "/withdrawal", role: "ROLE_USER" },
  { path: "/payment-details", role: "ROLE_USER" },
  { path: "/wallet/success", role: "ROLE_USER" },
  { path: "/market/:id", role: "ROLE_USER" },
  { path: "/watchlist", role: "ROLE_USER" },
  { path: "/profile", role: "ROLE_USER" },
  { path: "/search", role: "ROLE_USER" },
  { path: "/admin", role: "ROLE_ADMIN" },
  { path: "/admin/users", role: "ROLE_ADMIN" },
  { path: "/admin/users/:userId", role: "ROLE_ADMIN" },
  { path: "/admin/orders", role: "ROLE_ADMIN" },
  { path: "/admin/withdrawal", role: "ROLE_ADMIN" },
];

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("jwt")));
  }, [auth.jwt, dispatch]);

  const showNavbar = !auth.user
    ? false
    : shouldShowNavbar(location.pathname, routes, auth.user?.role);
if (!auth.user) {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/signin" element={<Auth />} />
      <Route path="/forgot-password" element={<Auth />} />

      {/* ✅ Razorpay callback must be accessible */}
      <Route path="/wallet/:order_id" element={<Wallet />} />

      <Route path="/login-with-google" element={<LoginWithGoogle />} />
      <Route path="/reset-password/:session" element={<ResetPasswordForm />} />
      <Route
        path="/password-update-successfully"
        element={<PasswordUpdateSuccess />}
      />
      <Route
        path="/two-factor-auth/:session"
        element={<TwoFactorAuth />}
      />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}


  // Redirect root based on role
  if (location.pathname === "/") {
    if (auth.user.role === "ROLE_ADMIN") {
      return <Navigate to="/admin" replace />;
    }
  }

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* User routes */}
        <Route element={<Home />} path="/" />
        <Route element={<Portfolio />} path="/portfolio" />
        <Route element={<Rebalance />} path="/portfolio/rebalance" />
        <Route element={<Activity />} path="/activity" />
        <Route element={<Wallet />} path="/wallet" />
        <Route element={<Withdrawal />} path="/withdrawal" />
        <Route element={<PaymentDetails />} path="/payment-details" />
        <Route element={<Wallet />} path="/wallet/:order_id" />
        <Route element={<StockDetails />} path="/market/:id" />
        <Route element={<Watchlist />} path="/watchlist" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<SearchCoin />} path="/search" />

        {/* Admin routes */}
        {auth.user.role === "ROLE_ADMIN" && (
          <>
            <Route element={<AdminDashboard />} path="/admin" />
            <Route element={<AdminUsers />} path="/admin/users" />
            <Route element={<AdminUserDetail />} path="/admin/users/:userId" />
            <Route element={<AdminOrders />} path="/admin/orders" />
            <Route
              element={<WithdrawalAdmin />}
              path="/admin/withdrawal"
            />
          </>
        )}

        <Route element={<Notfound />} path="*" />
      </Routes>
    </>
  );
}

export default App;
