import AdminSidebar from "./AdminSidebar";
import heroBgVideo from "@/pages/Home/vecteezy_illuminated-financial-data-graphs-on-digital-screen_52263081.mp4";

const AdminLayout = ({ title, subtitle, children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-slate-950 via-slate-900 to-black text-slate-50">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src={heroBgVideo}
      />
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-slate-950/55 to-black/75 pointer-events-none" />

      <main className="relative z-10 mx-auto flex max-w-6xl px-4 pb-16 pt-8 lg:px-6 lg:pt-10">
        <AdminSidebar />
        <div className="flex-1">
          <header className="mb-6 flex flex-col gap-2">
            {title && (
              <h1 className="text-2xl font-semibold tracking-tight text-slate-50 lg:text-3xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-slate-400 lg:text-base">{subtitle}</p>
            )}
          </header>
          <section className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/90 via-slate-950/90 to-black/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.95)] lg:p-6">
            {children}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;


