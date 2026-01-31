import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
// NOTE: Assuming Redux imports are available globally in your project environment.
import { useDispatch, useSelector } from "react-redux"; 
import { VerifiedIcon, Shield, User, Mail, Calendar, MapPin, Lock, Send } from "lucide-react";
// NOTE: Assuming Redux action imports are available globally in your project environment.
import { enableTwoStepAuthentication, verifyOtp, updatePassword, sendVerificationOtp } from "@/Redux/Auth/Action";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import bgVideo from "../Home/vecteezy_illuminated-financial-data-graphs-on-digital-screen_52263081.mp4";


// ====================================================================
// CONSOLIDATED COMPONENT 1: AccountVarificationForm
// ====================================================================

// eslint-disable-next-line react/prop-types
const AccountVarificationForm = ({ handleSubmit }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleSendOtp = (verificationType) => {
    dispatch(
      sendVerificationOtp({
        verificationType,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  return (
    <div className="flex justify-center p-4">
      <div className="space-y-6 mt-6 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-2xl border border-slate-800/80 bg-gradient-to-r from-black/60 via-slate-900/50 to-black/60 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gradient-to-r from-rose-500/20 to-cyan-500/20 p-2 border border-rose-500/30">
              <Mail className="h-5 w-5 text-rose-400" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Email</p>
              <p className="text-sm font-medium text-slate-50">{auth.user?.email}</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleSendOtp("EMAIL")}
                className="h-11 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 px-6 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
              >
                <Send className="mr-2 h-4 w-4" />
                Send OTP
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg border-slate-800 bg-gradient-to-br from-black/95 via-slate-950/95 to-black/95 text-slate-50">
              <DialogHeader>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Shield className="h-6 w-6 text-rose-400" />
                  <DialogTitle className="text-xl font-bold text-center">
                    Enter OTP
                  </DialogTitle>
                </div>
                <p className="text-sm text-center text-slate-400 mb-6">
                  We've sent a verification code to your email address
                </p>
              </DialogHeader>
              <div className="py-5 flex flex-col gap-6 justify-center items-center">
                <div className="flex justify-center">
                  <InputOTP
                    value={value}
                    onChange={(value) => setValue(value)}
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="border-slate-700 bg-black/60 text-slate-50" />
                      <InputOTPSlot index={1} className="border-slate-700 bg-black/60 text-slate-50" />
                      <InputOTPSlot index={2} className="border-slate-700 bg-black/60 text-slate-50" />
                    </InputOTPGroup>
                    <InputOTPSeparator className="text-slate-600" />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} className="border-slate-700 bg-black/60 text-slate-50" />
                      <InputOTPSlot index={4} className="border-slate-700 bg-black/60 text-slate-50" />
                      <InputOTPSlot index={5} className="border-slate-700 bg-black/60 text-slate-50" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <DialogClose asChild className="w-full">
                  <Button
                    onClick={() => handleSubmit(value)}
                    className="w-full h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
                  >
                    Submit
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};


// ====================================================================
// CONSOLIDATED COMPONENT 2: ChangePasswordForm
// ====================================================================

// eslint-disable-next-line react/prop-types
const ChangePasswordForm = ({ closeDialog }) => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmNewPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (!formData.currentPassword || !formData.newPassword || !formData.confirmNewPassword) {
            setError("Please fill in all required fields.");
            return;
        }

        const jwt = localStorage.getItem("jwt");
        
        // Dispatch the action to update the password
        dispatch(updatePassword({ 
            jwt,
            oldPassword: formData.currentPassword, 
            newPassword: formData.newPassword 
        }));

        setFormData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
        closeDialog(); 
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 px-4">
            <div className="space-y-3">
                <Label htmlFor="currentPassword" className="text-slate-200">Current Password</Label>
                <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    required
                    className="border-slate-700 bg-black/60 text-slate-50 focus:border-rose-500"
                    value={formData.currentPassword}
                    onChange={handleChange}
                />
            </div>
            <div className="space-y-3">
                <Label htmlFor="newPassword" className="text-slate-200">New Password</Label>
                <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    className="border-slate-700 bg-black/60 text-slate-50 focus:border-rose-500"
                    value={formData.newPassword}
                    onChange={handleChange}
                />
            </div>
            <div className="space-y-3">
                <Label htmlFor="confirmNewPassword" className="text-slate-200">Confirm New Password</Label>
                <Input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    required
                    className="border-slate-700 bg-black/60 text-slate-50 focus:border-rose-500"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
                type="submit"
                className="w-full h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-[1.01] hover:shadow-xl hover:shadow-rose-500/40 mt-8"
            >
                Update Password
            </Button>
        </form>
    );
};


// ====================================================================
// MAIN COMPONENT: Profile
// ====================================================================

const Profile = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  // State to control the Change Password modal
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false); 

  const handleEnableTwoStepVerification = (otp) => {
    console.log("EnableTwoStepVerification", otp);
    dispatch(enableTwoStepAuthentication({ jwt: localStorage.getItem("jwt"), otp }));
  };

  const handleVerifyOtp = (otp) => {
    console.log("otp  - ", otp);
    dispatch(verifyOtp({ jwt: localStorage.getItem("jwt"), otp }));
  };
  
  const closeChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-65"
        src={bgVideo}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-slate-950/50 to-black/70 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-gradient-to-r from-rose-500/20 via-emerald-500/20 to-cyan-500/20 p-3 border border-rose-500/30 shadow-lg shadow-rose-500/10">
              <User className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-200 via-slate-50 to-rose-200 bg-clip-text text-transparent lg:text-4xl">
                Profile Settings
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Manage your account information and security settings
              </p>
            </div>
          </div>
        </div>

        {/* Your Information Card (Unchanged) */}
        <div className="mb-6 animate-fade-in-delay">
          <Card className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-rose-400" />
                <CardTitle className="text-xl font-bold text-slate-50">Your Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="lg:grid lg:grid-cols-2 lg:gap-12 space-y-6 lg:space-y-0">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                    <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">Email</p>
                      <p className="text-slate-50 font-medium">{auth.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                    <User className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">Full Name</p>
                      <p className="text-slate-50 font-medium">{auth.user?.fullName || "Not set"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                    <Calendar className="h-5 w-5 text-rose-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">Date Of Birth</p>
                      <p className="text-slate-50 font-medium">{"25/09/2000"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                    <MapPin className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">Nationality</p>
                      <p className="text-slate-50 font-medium">{"Indian"}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                    <MapPin className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">Address</p>
                      <p className="text-slate-50 font-medium">{"Code with Jatin"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                    <MapPin className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">City</p>
                      <p className="text-slate-50 font-medium">{"Mumbai"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                    <MapPin className="h-5 w-5 text-rose-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">Postcode</p>
                      <p className="text-slate-50 font-medium">{345020}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                    <MapPin className="h-5 w-5 text-indigo-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">Country</p>
                      <p className="text-slate-50 font-medium">{"India"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 2 Step Verification Card (Unchanged) */}
        <div className="mb-6">
          <Card className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-rose-400" />
                <CardTitle className="text-xl font-bold text-slate-50">2 Step Verification</CardTitle>
                {auth.user?.twoFactorAuth?.enabled ? (
                  <Badge className="space-x-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                    <VerifiedIcon className="h-3.5 w-3.5" />
                    <span>Enabled</span>
                  </Badge>
                ) : (
                  <Badge className="bg-gradient-to-r from-rose-500/20 to-orange-500/20 text-rose-300 border border-rose-500/40">
                    Disabled
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 px-8 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40">
                      Enable Two Step Verification
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl border-slate-800 bg-gradient-to-br from-black/95 via-slate-950/95 to-black/95 text-slate-50">
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl font-bold">
                        Verify Your Account
                      </DialogTitle>
                    </DialogHeader>
                    <AccountVarificationForm handleSubmit={handleEnableTwoStepVerification} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Change Password & Account Status */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Change Password Card: Now functional */}
          <Card className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-cyan-400" />
                <CardTitle className="text-xl font-bold text-slate-50">Change Password</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Email:</span>
                </div>
                <p className="text-slate-50 font-medium">{auth.user?.email}</p>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <Lock className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Password:</span>
                </div>
                {/* START: Change Password Dialog Integration */}
                <Dialog open={isChangePasswordModalOpen} onOpenChange={setIsChangePasswordModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full border-slate-700 bg-black/60 hover:bg-black/80 hover:border-rose-500/50"
                    >
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg border-slate-800 bg-gradient-to-br from-black/95 via-slate-950/95 to-black/95 text-slate-50">
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl font-bold text-rose-300">
                        Update Your Password
                      </DialogTitle>
                    </DialogHeader>
                    {/* Pass the function to close the modal after submission */}
                    <ChangePasswordForm closeDialog={closeChangePasswordModal} />
                  </DialogContent>
                </Dialog>
                {/* END: Change Password Dialog Integration */}
              </div>
            </CardContent>
          </Card>

          {/* Account Status Card (Unchanged) */}
          <Card className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <VerifiedIcon className="h-5 w-5 text-emerald-400" />
                <CardTitle className="text-xl font-bold text-slate-50">Account Status</CardTitle>
                {auth.user?.verified ? (
                  <Badge className="space-x-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                    <VerifiedIcon className="h-3.5 w-3.5" />
                    <span>Verified</span>
                  </Badge>
                ) : (
                  <Badge className="bg-gradient-to-r from-rose-500/20 to-orange-500/20 text-rose-300 border border-rose-500/40">
                    Pending
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Email:</span>
                </div>
                <p className="text-slate-50 font-medium">{auth.user?.email}</p>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-black/50 via-slate-900/50 to-black/50 p-4 border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">Mobile:</span>
                </div>
                <p className="text-slate-50 font-medium">+918987667899</p>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-sm font-semibold text-black shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40">
                      Verify Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl border-slate-800 bg-gradient-to-br from-black/95 via-slate-950/95 to-black/95 text-slate-50">
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl font-bold">
                        Verify Your Account
                      </DialogTitle>
                    </DialogHeader>
                    <AccountVarificationForm handleSubmit={handleVerifyOtp} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;