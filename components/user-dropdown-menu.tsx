"use client"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { User, LayoutDashboard, UserCircle, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { Database } from "@/utils/supabase/types"
import { LogoutButton } from "./logout-button"
import { User as SupabaseUser} from "@supabase/supabase-js"

interface UserDropdownMenuProps {
  user: SupabaseUser | null
  isAdmin: boolean
}

export function UserDropdownMenu({ user, isAdmin }: UserDropdownMenuProps) {
  if (!user) {
    return (
      <Link href='/auth/login' className="p-2 rounded-full hover:bg-muted">
        <span className="sr-only">Account</span>
        <User className="h-5 w-5" />
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email || 'My Account'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account" className="flex cursor-pointer items-center">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>My Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/orders" className="flex cursor-pointer items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex cursor-pointer items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          
          <LogoutButton />
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
