
import React from 'react'
import Link from 'next/link'
import {
  Home,

  User,

} from 'lucide-react'

import { cn } from '@/lib/utils'
import { UserDropdownMenu } from '@/components/user-dropdown-menu'
import CartSheet from '@/components/cart/cart-sheet'
import SearchSheet from './search-sheet'
import MobileSheet from './mobile-sheet'
import { admin, currentUser } from '@/utils/queries/users'
import { fetchCategories } from '@/utils/queries/categories'
import { featchFeaturedProducts } from '@/utils/queries/products'

type Category = {
  id: string
  title: string
  slug: string
}

type Product = {
  id: string
  title: string
}

interface MobileNavigationProps {
  user: any
  isAdmin: boolean
  categories: Category[]
  featuredProducts: Product[]
}

const MobileNavigation = async () => {

  const userData = currentUser()
  const adminData = admin()
  const categoriesData = fetchCategories()
  const featuredData = featchFeaturedProducts()

  const [user, isAdmin, categories, featuredProducts] = await Promise.all([
    userData,
    adminData,
    categoriesData,
    featuredData
  ])


  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-40">
      {/* Bottom Tab Navigation */}
      <div className="flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex flex-col items-center">
          <Home className={cn(
            "h-5 w-5",
          )} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <SearchSheet />



        <MobileSheet user={user} isAdmin={isAdmin} categories={categories} featuredProducts={featuredProducts} />

        <CartSheet>

        </CartSheet>

        <div className="flex flex-col items-center">
          <div className="h-5 w-5 flex items-center justify-center">
            {user ? (
              <UserDropdownMenu user={user} isAdmin={isAdmin} />
            ) : (
              <Link href="/auth/login">
                <User className="h-5 w-5 text-muted-foreground" />
              </Link>
            )}
          </div>
          <span className="sr-only">Account</span>
        </div>
      </div>
    </div>
  )
}

export default MobileNavigation
