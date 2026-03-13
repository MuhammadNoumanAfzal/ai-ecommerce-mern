import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "./Sidebar";
import AdminHeader from "./Header";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_22%),linear-gradient(180deg,#020617_0%,#0f172a_42%,#111827_100%)] text-slate-100">
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader setOpen={setOpenSidebar} />

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="min-h-[calc(100vh-7rem)] rounded-[32px] border border-slate-800/80 bg-slate-950/55 p-4 shadow-[0_25px_80px_rgba(2,6,23,0.5)] backdrop-blur-xl sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
