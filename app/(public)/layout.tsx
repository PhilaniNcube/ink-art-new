import React, { ReactNode } from 'react'
import DesktopNavigation from './_components/desktop-navigation'
import { Geist } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import '@/app/globals.css'
import Footer from './_components/footer';

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

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div suppressHydrationWarning className="bg-background text-foreground">
      <NuqsAdapter>

        <DesktopNavigation />
        {children}
        <Footer />
      </NuqsAdapter>
    </div>
  )
}

export default PublicLayout