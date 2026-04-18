import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { logoutUser } from "@/store/auth-slice";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import CartWrapper from "./CartWrapper";

// 👇 shadcn dropdown + avatar imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Avatar, AvatarFallback } from "../ui/avatar";

// ---------------- Menu Items ----------------
function MenuItems() {
  return (
    <nav className="flex flex-col gap-6 mb-3 lg:mb-0 lg:flex-row lg:items-center">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id || menuItem.label}
          to={menuItem.path}
          className="text-sm font-medium hover:text-primary"
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}

// ---------------- Right Side (User) ----------------
function HeaderRightContent({ user }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const displayName = user?.username || user?.userName || user?.name || "";
  const avatarLetter = displayName?.trim()?.[0]?.toUpperCase() || "U";
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const userId = user?.id || user?._id;
  const totalCartItems =
    cartItems?.items?.reduce((acc, item) => acc + (item?.quantity || 0), 0) || 0;

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, userId]);

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="flex items-center gap-4">
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">Open cart</span>
          {totalCartItems > 0 ? (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs font-bold text-white">
              {totalCartItems}
            </span>
          ) : null}
        </Button>

        <CartWrapper
          cartItems={cartItems?.items || []}
          setOpenCartSheet={setOpenCartSheet}
        />
      </Sheet>

      {/* Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {avatarLetter}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as {displayName || "User"}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link to="/shop/account">
            <UserCog className="mr-2 h-4 w-4" />
            Account
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// ---------------- Main Header ----------------
function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* 👇 Right Section (User) */}
        {isAuthenticated && <HeaderRightContent user={user} />}
      </div>
    </header>
  );
}

export default ShoppingHeader;
