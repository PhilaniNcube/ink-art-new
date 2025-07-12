import React from "react";
import MegaMenu from "./mega-menu";
import SearchSheet from "./search-sheet";
import Image from "next/image";
import Link from "next/link";
import CartSheet from "@/components/cart/cart-sheet";
import { UserDropdownMenu } from "@/components/user-dropdown-menu";
import { Database } from "@/utils/supabase/types";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface DesktopNavigationProps {
  categories: Database["public"]["Tables"]["categories"]["Row"][];
  featuredProducts: Database["public"]["Tables"]["products"]["Row"][];
  user: SupabaseUser | null;
  isAdmin: boolean;
}

const DesktopNavigation = ({
  categories,
  featuredProducts,
  user,
  isAdmin,
}: DesktopNavigationProps) => {
  return (
    <div className=" px-4 lg:px-0 py-2 border-b hidden lg:block bg-white shadow top-0 left-0 right-0 z-50 sticky">
      <header className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="">
            <Image
              src="/images/ink-art.webp"
              alt="Logo"
              width={209}
              height={136}
              className="w-32 object-cover"
            />
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <MegaMenu
                categories={categories}
                featuredProducts={featuredProducts}
              />
            </div>{" "}
            <div className="flex items-center space-x-4">
              <SearchSheet />
              <UserDropdownMenu user={user} isAdmin={isAdmin} />
              <CartSheet />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default DesktopNavigation;
