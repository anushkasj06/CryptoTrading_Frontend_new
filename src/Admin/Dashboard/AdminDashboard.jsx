import { useSelector } from "react-redux";
import AdminLayout from "../Layout/AdminLayout";
import { Card } from "@/components/ui/card";

const StatCard = ({ label, value, hint }) => (
  <Card className="flex flex-col gap-1 rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
    <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
      {label}
    </span>
    <span className="text-2xl font-semibold text-slate-50">{value}</span>
    {hint && <span className="text-xs text-slate-500">{hint}</span>}
  </Card>
);

const AdminDashboard = () => {
  const { admin, withdrawal } = useSelector((store) => store);

  const totalUsers = admin.users.length;
  const totalOrders = admin.orders.length;
  const pendingWithdrawals =
    withdrawal.requests?.filter((r) => r.status === "PENDING").length || 0;

  return (
    <AdminLayout
      title="Admin control center"
      subtitle="Monitor platform health, investigate user portfolios and approve withdrawals."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Registered users"
          value={totalUsers}
          hint="From /api/admin/users"
        />
        <StatCard
          label="Global orders"
          value={totalOrders}
          hint="All buy & sell activity"
        />
        <StatCard
          label="Pending withdrawals"
          value={pendingWithdrawals}
          hint="Requests awaiting action"
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;


