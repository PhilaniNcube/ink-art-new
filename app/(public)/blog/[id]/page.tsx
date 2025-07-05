import { Blog } from "@/payload-types";
import { getBlogPost } from "@/utils/queries/blogs";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { metadata } from "../../layout";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const post: Blog | null = await getBlogPost(id);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const imageUrl = post.image?.url
    ? `${process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL}${post.image.url}`
    : undefined;

  return {
    metadataBase: process.env.VERCEL_URL,
    generator: "Next.js",
    title: post.title,
    description: post.excerpt,
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": "-1",
        "max-image-preview": "large",
        "max-video-preview": "-1",
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL}/blog/${post.id}`,
      type: "article",
      publishedTime: post.publishedDate,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: post.image?.alt || post.title,
              width: post.image?.width || 1200,
              height: post.image?.height || 630,
            },
          ]
        : undefined,
    },
  };
}

const BlogArticlePage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;

  const post: Blog | null = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedDate
    ? format(new Date(post.publishedDate), "PPP")
    : "No date available";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="w-full max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          aria-label="Back to blog listing"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>
            )}
          </header>

          {post.image?.url && (
            <figure className="relative aspect-[16/9] w-full mb-10 rounded-lg overflow-hidden">
              <Image
                src={post.image.url}
                alt={post.image.alt || post.title}
                width={post.image.width}
                height={post.image.height}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
                priority
                quality={90}
              />
            </figure>
          )}

          <div className="prose prose-lg md:prose-xl max-w-none">
            <RichText data={post.content} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogArticlePage;
