import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    qualities: [75,100],
  domains: ['lh3.googleusercontent.com', 'sujeitoprogramador.com'], // domínio do Google ou outro provedor
    remotePatterns:[
      {
        protocol:"https",
        hostname:"sujeitoprogramador.com",   
        pathname: "/**" // permite qualquer caminho
      }
    ]
  }
};

export default nextConfig;
