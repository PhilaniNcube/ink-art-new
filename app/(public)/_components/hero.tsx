import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import FeaturedBlogPosts from "./featured-blog-posts";
import FeaturedBlogPostsSkeleton from "./featured-blog-posts-skeleton";

const Hero = () => {
  return (
    <div className="container mx-auto py-4">
      <section className="grid grid-cols-3 gap-4 lg:h-[65vh] ">
        <div className="col-span-3 lg:col-span-2  h-full rounded-lg flex flex-col justify-center relative">
          <Image
            src="https://replicate.delivery/xezq/zBXqgOpgDXJmEFYeMXKKuQelAUJLtvN2ADyEdvbzh3CnqAkUA/tmp8gijn66m.webp"
            alt="Logo"
            width={1344}
            height={768}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex justify-center items-center rounded-lg flex-col p-5">
            <h1 className="text-4xl font-bold">Welcome to Ink Art</h1>
            {/* <p className="mt-4 hidden md:block text-balance font-medium max-w-xl">
              Discover the world of art and creativity with our curated
              collection of unique pieces. Whether you're an artist, collector,
              or simply an admirer, we have something for everyone. Explore our
              gallery and find your next masterpiece today!
            </p> */}
            <Link
              href="/categories"
              className="mt-4 w-fit inline-block bg-black text-white py-2 px-4 rounded-none hover:bg-blue-600 transition duration-300 text-4xl font-semibold"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
          </div>
        </div>
        <div className="col-span-3 lg:col-span-1  h-full rounded-lg flex flex-col justify-center px-4">
          {/* Rebder the featured blog posts */}
          <h2 className="text-2xl font-bold mb-4">Featured Blog Posts</h2>
          <Suspense fallback={<FeaturedBlogPostsSkeleton />}>
            <FeaturedBlogPosts />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default Hero;
