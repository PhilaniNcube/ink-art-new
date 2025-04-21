import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
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
    },
  ],
  
}