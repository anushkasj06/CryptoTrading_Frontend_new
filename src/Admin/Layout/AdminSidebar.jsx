import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Overview", to: "/admin" },
  { label: "Users", to: "/admin/users" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Withdrawals", to: "/admin/withdrawal" },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden w-56 flex-shrink-0 flex-col gap-4 pr-6 md:flex">
      <div className="rounded-3xl border border-slate-800/70 bg-gradient-to-br from-black/85 via-slate-950/90 to-black/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.9)] backdrop-blur-xl">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Admin Console
        </p>
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <NavLink key={item.to} to={item.to}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-rose-500 via-emerald-500 to-cyan-500 text-black shadow-lg shadow-rose-500/30 hover:from-rose-400 hover:via-emerald-400 hover:to-cyan-400"
                      : "text-slate-300 hover:text-slate-50 hover:bg-slate-900/70 border border-transparent hover:border-rose-500/40"
                  }`}
                >
                  {item.label}
                </Button>
              </NavLink>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;


