"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import Profile from "./Profile";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <header className="sticky top-0 bg-background opacity-95 z-10">
      <nav className="px-8 py-4 border-b border-b-neutral-500  flex justify-between">
        <Link href={"/"} className="flex items-center gap-2 text-xl font-bold">
          <ShoppingBag />
          <span className="text-indigo-500">ShopWithMe</span>
        </Link>
        <div className="flex items-center gap-4">
          <Profile />
          <Cart />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
