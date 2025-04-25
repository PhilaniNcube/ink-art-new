import { fetchCategories } from '@/utils/queries/categories'
import React from 'react'
import MegaMenu from './mega-menu'
import { featchFeaturedProducts } from '@/utils/queries/products'
import SearchSheet from './search-sheet'
import Image from 'next/image'
import Link from 'next/link'
import CartSheet from '@/components/cart/cart-sheet'
import { admin, currentUser } from '@/utils/queries/users'
import { LayoutDashboardIcon, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/components/logout-button'

const DesktopNavigation = async () => {

    const categoriesData = fetchCategories()
    const featuredData = featchFeaturedProducts()
    const userData = currentUser()
    const adminData = admin()

    const [categories, featuredProducts, user, isAdmin] = await Promise.all([
        categoriesData,
        featuredData,
        userData,
        adminData
    ])

    return (
        <div className=' px-4 lg:px-0 py-2 border-b hidden lg:block bg-white shadow top-0 left-0 right-0 z-50 sticky'>
            <header className="container mx-auto">
                <div className="">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href='/' className="">
                                <Image
                                    src="/images/ink-art.webp"
                                    alt="Logo"
                                    width={209}
                                    height={136}
                                    className="w-28 object-cover"
                                />
                            </Link>
                            <MegaMenu categories={categories} featuredProducts={featuredProducts} />
                        </div>

                        <div className="flex items-center space-x-4">
                            <SearchSheet />
                            {
                                user ? (
                                    <div className="flex items-center space-x-2">
                                        {isAdmin && (
                                            <Link href='/dashboard' className="p-2 border rounded-lg bg-slate-200 flex items-center space-x-1 hover:bg-muted">
                                                
                                                
                                                <span className="text-xs">Dashboard</span>
                                            </Link>
                                        )}
                                        <Link href='/account' className="p-2 rounded-full hover:bg-muted">
                                            <span className="sr-only">Account</span>
                                            <User className="h-5 w-5" />
                                        </Link>
                                       <LogoutButton />
                                    </div>
                                ) : (
                                    <Link href='/auth/login' className="p-2 rounded-full hover:bg-muted">
                                        <span className="sr-only">Account</span>
                                        <User className="h-5 w-5" />
                                    </Link>
                                )
                            }

                            <CartSheet />
                        </div>
                    </div>

                </div>
            </header>
        </div>
    )
}

export default DesktopNavigation