import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: "10mb" }, // habilita ações de servidor no App Router
  },
  // middleware matcher: define quais rotas o middleware vai proteger
  matcher: ["/dashboard/:path*", "/profile/:path*", "/orders/:path*"],
};

export default nextConfig;
