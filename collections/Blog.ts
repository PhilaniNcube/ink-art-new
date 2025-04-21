import type { CollectionConfig } from 'payload'

import { Media } from './Media'

export const Blog: CollectionConfig = {
  slug: 'blog',
    labels: {
        singular: 'Blog',
        plural: 'Blogs',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            label: 'Slug',
            admin: {
                description: 'This is the URL slug for the blog post. It should be unique and descriptive.',
            },
            
            validate: (value:any) => {
                if (!value) {
                    return 'Slug is required.'
                }
                if (value.length < 3) {
                    return 'Slug must be at least 3 characters long.'
                }
                if (value.length > 100) {
                    return 'Slug must be less than 100 characters long.'
                }
                if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
                    return 'Slug can only contain lowercase letters, numbers, and hyphens.'
                }
                return true
        },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'excerpt',
            type: 'text',
            required: true,
        },
        {
            name: 'image',
            type: 'relationship',
            relationTo: Media.slug,
            required: true,
        },
        {
            name: 'publishedDate',
            type: 'date',
            required: true,
        },
        {
            name: 'published',
            type: 'checkbox',
            label: 'Published',
            defaultValue: false,
        }
    ]
}