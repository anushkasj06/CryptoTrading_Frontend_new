/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "@/Redux/Auth/Action"; // Import the new action

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

        // Note: In a production app, closing the dialog should typically wait 
        // for the Redux success state/message to show confirmation. 
        // For simplicity here, we close immediately after dispatching the action.
        setFormData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
        closeDialog(); 
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 px-4 py-2">
            <div className="space-y-3">
                <Label htmlFor="currentPassword" className="text-slate-200 font-semibold text-sm flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gradient-to-r from-rose-400 to-cyan-400" />
                    Current Password
                </Label>
                <div className="relative group">
                    <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        required
                        className="border-slate-700/60 bg-gradient-to-r from-black/80 via-slate-950/80 to-black/80 text-slate-50 focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20 transition-all duration-300 placeholder:text-slate-600 hover:border-slate-600/60 rounded-xl h-12 pl-4 pr-4"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter your current password"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/0 via-emerald-500/0 to-cyan-500/0 group-hover:from-rose-500/5 group-hover:via-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none -z-10" />
                </div>
            </div>
            <div className="space-y-3">
                <Label htmlFor="newPassword" className="text-slate-200 font-semibold text-sm flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                    New Password
                </Label>
                <div className="relative group">
                    <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        required
                        className="border-slate-700/60 bg-gradient-to-r from-black/80 via-slate-950/80 to-black/80 text-slate-50 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 placeholder:text-slate-600 hover:border-slate-600/60 rounded-xl h-12 pl-4 pr-4"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter your new password"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/0 via-emerald-500/0 to-cyan-500/0 group-hover:from-rose-500/5 group-hover:via-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none -z-10" />
                </div>
            </div>
            <div className="space-y-3">
                <Label htmlFor="confirmNewPassword" className="text-slate-200 font-semibold text-sm flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400" />
                    Confirm New Password
                </Label>
                <div className="relative group">
                    <Input
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        type="password"
                        required
                        className="border-slate-700/60 bg-gradient-to-r from-black/80 via-slate-950/80 to-black/80 text-slate-50 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 placeholder:text-slate-600 hover:border-slate-600/60 rounded-xl h-12 pl-4 pr-4"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        placeholder="Confirm your new password"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/0 via-emerald-500/0 to-cyan-500/0 group-hover:from-rose-500/5 group-hover:via-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none -z-10" />
                </div>
            </div>

            {error && (
                <div className="rounded-xl bg-gradient-to-r from-rose-500/10 via-red-500/10 to-rose-500/10 border border-rose-500/30 p-3 animate-fade-in">
                    <p className="text-sm text-rose-400 font-medium flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                        {error}
                    </p>
                </div>
            )}

            <Button
                type="submit"
                className="w-full h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-sm font-bold text-black shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-rose-500/40 hover:from-rose-400 hover:via-emerald-400 hover:to-cyan-400 mt-8 relative overflow-hidden group"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>Update Password</span>
                    <span className="h-4 w-4 rounded-full bg-black/20 group-hover:bg-black/30 transition-colors" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Button>
        </form>
    );
};

export default ChangePasswordForm;