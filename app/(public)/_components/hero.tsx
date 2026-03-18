import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="container mx-auto py-4">
      <section className="lg:h-[65vh]">
        <div className="h-full rounded-lg flex flex-col justify-center relative">
          <Image
            src="https://replicate.delivery/xezq/zBXqgOpgDXJmEFYeMXKKuQelAUJLtvN2ADyEdvbzh3CnqAkUA/tmp8gijn66m.webp"
            alt="Logo"
            width={1344}
            height={768}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex justify-center items-center rounded-lg flex-col p-5">
            <h1 className="text-4xl font-bold">Welcome to Ink Art</h1>
            <Link
              href="/categories"
              className="mt-4 w-fit inline-block bg-black text-white py-2 px-4 rounded-none hover:bg-blue-600 transition duration-300 text-4xl font-semibold"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
