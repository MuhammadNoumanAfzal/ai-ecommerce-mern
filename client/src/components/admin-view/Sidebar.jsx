import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
  Sparkles,
} from "lucide-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "Overview and insights",
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: ShoppingBasket,
    description: "Catalog and inventory",
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: BadgeCheck,
    description: "Sales and fulfillment",
  },
  
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-6 flex flex-col gap-3">
      {adminSidebarMenuItems.map((menuItem) => {
        const Icon = menuItem.icon;
        const isActive = location.pathname === menuItem.path;

        return (
          <button
            key={menuItem.id}
            type="button"
            onClick={() => {
              navigate(menuItem.path);
              setOpen?.(false);
            }}
            className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-[24px] border px-4 py-4 text-left transition-all duration-300 ${
              isActive
                ? "border-transparent bg-gradient-to-r from-slate-950 via-slate-800 to-emerald-600 text-white shadow-[0_16px_40px_rgba(15,23,42,0.32)]"
                : "border-slate-800/80 bg-slate-900/80 text-slate-200 shadow-sm hover:-translate-y-0.5 hover:border-emerald-500/40 hover:bg-slate-900"
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-white/15 text-white"
                  : "bg-slate-800 text-slate-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-400"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold tracking-wide">
                {menuItem.label}
              </p>
              <p
                className={`mt-1 text-xs ${
                  isActive ? "text-slate-200" : "text-slate-400"
                }`}
              >
                {menuItem.description}
              </p>
            </div>

            {isActive ? (
              <div className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}

function SidebarContent({ setOpen }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-[linear-gradient(180deg,#020617_0%,#0f172a_42%,#111827_100%)] p-5 text-slate-100">
      <div
        onClick={() => navigate("/admin/dashboard")}
        className="cursor-pointer rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-800 to-emerald-600 p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.3)]"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 backdrop-blur">
            <ChartNoAxesCombined className="h-7 w-7" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-100/80">
              Commerce Suite
            </p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight">
              Admin Panel
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Elegant control for catalog, orders, and store operations.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[28px] border border-slate-800/80 bg-slate-950/70 p-4 shadow-[0_15px_50px_rgba(2,6,23,0.35)] backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Navigation
            </p>
            <h2 className="mt-2 text-sm font-semibold text-slate-100">
              Workspace modules
            </h2>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        <MenuItems setOpen={setOpen} />
      </div>

      <div className="mt-auto pt-5">
        <div className="rounded-[26px] border border-slate-800/80 bg-slate-950/78 p-4 shadow-sm backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Workspace Status
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.65)]" />
            <p className="text-sm font-medium text-slate-100">
              Admin environment active
            </p>
          </div>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Manage products, monitor orders, and keep the storefront aligned
            from one structured dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

function AdminSideBar({ open, setOpen }) {
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-[310px] border-r border-slate-800 bg-slate-950 p-0 shadow-[0_25px_80px_rgba(2,6,23,0.55)]"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Admin navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      <aside className="hidden min-h-screen w-[310px] shrink-0 lg:block">
        <SidebarContent setOpen={setOpen} />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
