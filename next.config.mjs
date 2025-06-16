import { withPayload } from '@payloadcms/next/withPayload'
import { min } from 'date-fns';


const nextConfig = {
  /* config options here */
   experimental: {
    reactCompiler: true,
  },
  images: {
    minimumCacheTTL: 2678400,
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
