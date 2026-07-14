import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "smudgy-jubilance-action.ngrok-free.dev",
  ],
};

export default nextConfig;
