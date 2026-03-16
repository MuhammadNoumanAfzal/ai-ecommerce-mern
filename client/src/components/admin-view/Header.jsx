import { AlignJustify, Bell, LogOut, Search, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }
  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="rounded-[30px] border border-slate-800/80 bg-slate-950/72 px-4 py-4 shadow-[0_18px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpen?.(true)}
              className="rounded-2xl border border-slate-700 bg-slate-900 text-slate-200 shadow-sm hover:bg-slate-800 lg:hidden"
            >
              <AlignJustify className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-slate-800 to-emerald-500 text-white shadow-lg shadow-emerald-200/50">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-400">
                  Admin View
                </p>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100 sm:text-xl">
                  Store Control Center
                </h1>
                <p className="text-xs text-slate-400 sm:text-sm">
                  Structured workspace for products, orders, and performance.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-sm">
              <Search className="h-4 w-4 text-slate-500" />
              <div className="text-sm text-slate-400">
                Quick search coming soon
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-2xl border border-slate-800 bg-slate-900 text-slate-300 shadow-sm hover:bg-slate-800"
              >
                <Bell className="h-4 w-4" />
              </Button>

              <div className="hidden items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 shadow-sm sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30">
                  A
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-slate-100">
                    Admin Access
                  </p>
                  <p className="text-xs text-slate-400">
                    Secure management session
                  </p>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                className="group rounded-2xl border border-slate-700 bg-slate-100 px-4 py-2.5 text-slate-950 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:text-white"
              >
                <LogOut className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
                <span className="font-medium tracking-wide">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
