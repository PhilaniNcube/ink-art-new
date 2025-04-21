import { Blog } from '@/payload-types'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogCard = ({ post }: { post: Blog }) => {
    return (
        <div className="group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
            <Link href={`/blog/${post.id}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                        src={`/media/${post.image.filename}`}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-5">
                    <div className="mb-3">
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 text-xs font-medium rounded-full">
                            {format(post.publishedDate, "PP")}
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                   
                </div>
            </Link>
        </div>
    )
}

export default BlogCard