import React, { ReactNode } from 'react'
import DesktopNavigation from './_components/desktop-navigation'
import { Geist } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import '@/app/globals.css'
import Footer from './_components/footer';
import { admin, currentUser } from '@/utils/queries/users'
import { fetchCategories } from '@/utils/queries/categories'
import { featchFeaturedProducts } from '@/utils/queries/products'
import MobileNavigation from './_components/mobile-navigation';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Ink Art | Custom Art for Your Home',
  description: "Custom Art for Your Home - Ink Art. Explore our collection of unique and personalized art pieces that will transform your living space. Discover the perfect artwork to express your style and enhance your home decor.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

const PublicLayout = async ({ children }: { children: ReactNode }) => {
  // Fetch all the data needed for both desktop and mobile navigation
  const categoriesPromise = fetchCategories()
  const featuredProductsPromise = featchFeaturedProducts()
  const userPromise = currentUser()
  const adminPromise = admin()

  const [categories, featuredProducts, user, isAdmin] = await Promise.all([
    categoriesPromise,
    featuredProductsPromise,
    userPromise,
    adminPromise
  ])

  return (
    <div suppressHydrationWarning className="bg-background text-foreground">
      <NuqsAdapter>
        <DesktopNavigation />
        {/* Add padding bottom on mobile to account for the mobile navigation bar */}
        <div className="pb-16 lg:pb-0">
          {children}
        </div>
        <MobileNavigation />
        <Footer />
      </NuqsAdapter>
    </div>
  )
}

export default PublicLayout
