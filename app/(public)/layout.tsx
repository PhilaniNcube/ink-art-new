import React, { ReactNode, Suspense } from "react";
import DesktopNavigation from "./_components/desktop-navigation";
import { Geist } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Footer from "./_components/footer";
import { admin, currentUser } from "@/utils/queries/users";
import { fetchCategories } from "@/utils/queries/categories";
import { fetchFeaturedProducts } from "@/utils/queries/products";
import MobileNavigation from "./_components/mobile-navigation";
import DesktopNavigationSkeleton from "./_components/desktop-navigation-skeleton";
import MobileNavigationSkeleton from "./_components/mobile-navigation-skeleton";
import FooterSkeleton from "./_components/footer-skeleton";
import "../globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://inkart.store";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Ink Art | Custom Art for Your Home",
  description:
    "Custom Art for Your Home - Ink Art. Explore our collection of unique and personalized art pieces that will transform your living space. Discover the perfect artwork to express your style and enhance your home decor.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

const PublicLayout = async ({ children }: { children: ReactNode }) => {

  const categoriesPromise = fetchCategories();
  const featuredProductsPromise = fetchFeaturedProducts();
  const userPromise = currentUser();
  const adminPromise = admin();

  return (
    <html lang="en" className={geistSans.className}>
      <body>
        <div suppressHydrationWarning className="bg-background text-foreground">
          <NuqsAdapter>
            <Suspense fallback={<DesktopNavigationSkeleton />}>
              <DesktopNavigation
                categoriesPromise={categoriesPromise}
                featuredProductsPromise={featuredProductsPromise}
                userPromise={userPromise}
                isAdminPromise={adminPromise}
              />
            </Suspense>
            {/* Add padding bottom on mobile to account for the mobile navigation bar */}
            <div className="pb-16 lg:pb-0">{children}</div>
            <Suspense fallback={<MobileNavigationSkeleton />}>
              <MobileNavigation
                categoriesPromise={categoriesPromise}
                featuredProductsPromise={featuredProductsPromise}
                userPromise={userPromise}
                isAdminPromise={adminPromise}
              />
            </Suspense>
            <Suspense fallback={<FooterSkeleton />}>
              <Footer
                categoriesPromise={categoriesPromise}
                featuredProductsPromise={featuredProductsPromise}
              />
            </Suspense>
          </NuqsAdapter>
        </div>
      </body>
    </html>
  );
};

export default PublicLayout;
