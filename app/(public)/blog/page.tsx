import { getAllBlogPosts, getBlogPosts } from '@/utils/queries/blogs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { format } from 'date-fns'
import BlogCard from '../_components/blog-card'

const BlogPage = async () => {

    // Fetch the blog posts from the API
    const blogPosts = await getAllBlogPosts()

    if (!blogPosts) {
        return <div className="text-center">No blog posts available</div>
    }

    const posts = blogPosts.docs

    return (
        <div className='container mx-auto py-6'>
            <div className="w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Ink Art Blog</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Insights, inspiration, and information about art, canvas printing, and interior design
                    </p>
                </div>

                {/* Featured Post */}
                <div className="mb-16">
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                        <Link href={`/blog/${posts[0].id}`}>
                            <div className="relative aspect-[16/9] w-full">
                                <Image
                                    src={posts[0].image.url!}
                                    alt={posts[0].title}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                    priority
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                <div className="mb-2">
                                    <span className="inline-block bg-primary px-3 py-1 text-sm font-medium rounded-full">
                                        Published:   {format(posts[0].publishedDate, "PPP")}
                                    </span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{posts[0].title}</h2>
                                <p className="text-gray-200 mb-2">{posts[0].excerpt}</p>
                                <div className="flex items-center text-sm">
                                    <span>Created: {format(posts[0].createdAt, "PPP")}</span>

                                </div>
                            </div>
                        </Link>
                    </div>
                </div>


                {/* Blog Posts List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(1).map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default BlogPage