import { fetchCategories } from '@/utils/queries/categories'
import React from 'react'
import MegaMenu from './mega-menu'
import { featchFeaturedProducts } from '@/utils/queries/products'
import SearchSheet from './search-sheet'
import Image from 'next/image'
import Link from 'next/link'
import CartSheet from '@/components/cart/cart-sheet'

const DesktopNavigation = async () => {

    const categoriesData = fetchCategories()
    const featuredData = featchFeaturedProducts()

    const [categories, featuredProducts] = await Promise.all([
        categoriesData,
        featuredData
    ])

    return (
        <div className=' px-4 lg:px-0 py-2 border-b hidden lg:block bg-white shadow top-0 left-0 right-0 z-50 sticky'>
            <header className="container mx-auto">
                <div className="">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href='/' className="text-2xl font-bold">
                                <Image
                                    src="/images/ink-art.webp"
                                    alt="Logo"
                                    width={209}
                                    height={136}
                                    className="w-auto"
                                />
                            </Link>
                            <MegaMenu categories={categories} featuredProducts={featuredProducts} />
                        </div>

                        <div className="flex items-center space-x-4">
                            <SearchSheet />
                            <button className="p-2 rounded-full hover:bg-muted">
                                <span className="sr-only">Account</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </button>
                           <CartSheet />
                        </div>
                    </div>

                </div>
            </header>
        </div>
    )
}

export default DesktopNavigation