import { getBlogPosts } from '@/utils/queries/blogs'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import Link from 'next/link'
import React from 'react'


const FeaturedBlogPosts = async () => {

    const blogPosts = await getBlogPosts()

    if (!blogPosts) {
        return <div className="text-center">No blog posts available</div>
    }

    const posts = blogPosts.docs

    return (
        <div className="">

            <ScrollArea className="lg:h-[60vh] overflow-y-scroll">
                {posts.map((post) => (
                    <Link href={`/blog/${post.id}`} key={post.id} className="block">
                        <div className="rounded-lg p-4 flex flex-col space-y-2 mb-6">
                            <img src={post.image.url} alt={post.title} className="w-full aspect-video object-cover rounded-lg" />
                            <h3 className="text-md font-semibold">{post.title}</h3>
                            <p className="text-gray-600 mt-2 line-clamp-3 text-xs">{post.excerpt}</p>
                            <span className="text-gray-400 text-sm mt-2">{new Date(post.publishedDate).toLocaleDateString()}</span>
                        </div>
                    </Link>
                ))}
            </ScrollArea>
        </div>
    )
}

export default FeaturedBlogPosts