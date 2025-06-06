import { fetchCategories } from '@/utils/queries/categories'
import React from 'react'
import MegaMenu from './mega-menu'
import { featchFeaturedProducts } from '@/utils/queries/products'
import SearchSheet from './search-sheet'
import Image from 'next/image'
import Link from 'next/link'
import CartSheet from '@/components/cart/cart-sheet'
import { admin, currentUser } from '@/utils/queries/users'
import { UserDropdownMenu } from '@/components/user-dropdown-menu'

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
                    <div className="flex justify-center">
                        <Link href='/' className="">
                            <Image
                                src="/images/ink-art.webp"
                                alt="Logo"
                                width={209}
                                height={136}
                                className="w-32 object-cover"
                            />
                        </Link>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">

                            <MegaMenu categories={categories} featuredProducts={featuredProducts} />
                        </div>                        <div className="flex items-center space-x-4">
                            <SearchSheet />
                            <UserDropdownMenu user={user} isAdmin={isAdmin} />
                            <CartSheet />
                        </div>
                    </div>

                </div>
            </header>
        </div>
    )
}

export default DesktopNavigation
