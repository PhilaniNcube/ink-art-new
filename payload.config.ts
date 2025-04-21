import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { Media } from './collections/Media'
import { Blog } from './collections/Blog'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    Media,
    Blog
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
        connectionString: process.env.DATABASE_URL,
    }
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  plugins: [
      uploadthingStorage({
      collections: {
        media: true,
      },
      clientUploads: true,
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
        
      },
    }),
  ]
})