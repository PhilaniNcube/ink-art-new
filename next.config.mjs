import { withPayload } from '@payloadcms/next/withPayload'


const nextConfig = {
  /* config options here */
   experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hdhqxisqffmoqhpzmhet.supabase.co",

      },
      {
        protocol: "https",
        hostname: 'replicate.delivery'
      }, 
      {
        protocol: "https",
        hostname: 'images-api.printify.com'
      },
      {
        protocol: "https",
        hostname: 'images.unsplash.com'
      }

    ]
  }
};

export default withPayload(nextConfig);
