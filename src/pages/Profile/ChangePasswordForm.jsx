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

export default ChangePasswordForm;