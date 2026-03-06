import { withPayload } from '@payloadcms/next/withPayload'


const nextConfig = {
  /* config options here */
  reactCompiler: true,
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
      },
      {
        protocol: "https",
        hostname: 'utfs.io'
      },
      {
        protocol: "https",
        hostname: '*.ufs.sh'
      }

    ]
  }
};

export default withPayload(nextConfig);
