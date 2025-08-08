import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        "source": "/auth/:path*",
        "destination": "https://api.eks-stage01.gigndvr.com/auth/:path*"
      },
      {
        "source": "/realms/:path*",
        "destination": "https://api.eks-stage01.gigndvr.com/realms/:path*"
      },
      {
        "source": "/assets/:path*",
        "destination": "https://kc-theme-test-next.vercel.app/assets/:path*"
      }
    ]
  },
};

export default nextConfig;
