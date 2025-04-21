import { Blog } from '@/payload-types'
import { getBlogPost } from '@/utils/queries/blogs'
import { Arrow } from '@radix-ui/react-dropdown-menu'
import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { metadata } from '../../layout'

export async function generateMetadata({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params
  const post: Blog | null = await getBlogPost(id)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    metadataBase: process.env.VERCEL_URL,
    generator: 'Next.js',
    title: post.title,
    description: post.excerpt,
    keywords: post.excerpt.split(' ').join(','),
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot:{
        index: true,
        follow: true,
        'max-snippet': '-1',
        'max-image-preview': 'large',
        'max-video-preview': '-1',
      }
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${process.env.VERCEL_URL}/blog/${post.id}`,
      type: 'article',
      publishedTime: post.publishedDate, 
      images: [
        {
          url: `${process.env.VERCEL_URL}${post.image.url}` ,
          alt: post.title,
          width: post.image.width || 1200,
          height: post.image.height || 630,
        },
      ],
    },
    
  }
}

const BlogArticlePage = async ({ params }: { params: Promise<{ id: number }> }) => {

  const { id } = await params

  const post: Blog | null = await getBlogPost(id)

  if (!post) {
    return <div className="text-center">No blog post available</div>
  }

  console.log(post)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="mr-2" />
          Back to Blog
        </Link>

        <div className="mb-6">
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 text-sm font-medium rounded-full mb-4">
            {format(post.publishedDate, "PPP")}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
          <div className="flex items-center text-muted-foreground mb-8">

          </div>
        </div>

         <div className="relative aspect-[16/9] w-full mb-8 rounded-lg overflow-hidden">
          <Image src={post.image.url || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="prose max-w-none text-muted-foreground">
          <RichText data={post.content} />
          </div>
      </div>
    </div>
  )
}

export default BlogArticlePage