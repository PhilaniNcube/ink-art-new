
const sharp = require('sharp');
const { lexicalEditor } = require('@payloadcms/richtext-lexical');
const { buildConfig } = require('payload');
const { postgresAdapter } = require('@payloadcms/db-postgres');
const Media = require('./collections/Media.ts').Media;
const Blog = require('./collections/Blog.ts').Blog;

module.exports = buildConfig({
  editor: lexicalEditor(),
  collections: [Media, Blog],
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    }
  }),
  sharp,
});