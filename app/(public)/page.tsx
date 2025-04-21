import { Suspense } from "react";
import FeaturedProducts from "./_components/featured-products";
import FeaturedProductsSkeleton from "./_components/featured-products-skeleton";
import Hero from "./_components/hero";
import MasonryGrid from "./_components/masonry-grid";
import CTASecion from "./_components/cta-section";



export default function Home() {


  return (
    <main>
      <Hero />
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <MasonryGrid />
      <CTASecion />
    </main>
  );
}
