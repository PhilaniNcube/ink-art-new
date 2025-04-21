import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media File',
    plural: 'Media Files',
  },
  access: {
    read: () => true, // Anyone can view media
    create: () => true, // Anyone can create media (you might want to restrict this in production)
    update: () => true, // Anyone can update media (you might want to restrict this in production)
    delete: () => true, // Anyone can delete media (you might want to restrict this in production)
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'center' },
      { name: 'card', width: 768, height: 1024, position: 'center' },
      { name: 'banner', width: 1920, height: 1080, position: 'center' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],

  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Describe the image for screen readers and SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
      admin: {
        description: 'Optional caption to display with the image',
      },
    },
 
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      admin: {
        description: 'Add tags to help organize and find this media',
      },
    },
  ],
  admin: {
    useAsTitle: 'filename',
    description: 'Upload and manage images for your website',
    group: 'Content',
  },
}