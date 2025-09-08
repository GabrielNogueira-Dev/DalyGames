import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
  qualities: [75, 100], // qualidades permitidas globalmente
    remotePatterns:[
      {
        protocol:"https",
        hostname:"sujeitoprogramador.com",
        
      }
    ]
  }
};

export default nextConfig;
