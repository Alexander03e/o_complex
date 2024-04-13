/** @type {import('next').NextConfig} */
import path from 'path'
import {fileURLToPath} from "node:url";
const __filename = fileURLToPath(import.meta.url);
const nextConfig = {
  // output: "export",
  images: {
    domains: ["encrypted-tbn2.gstatic.com", "encrypted-tbn0.gstatic.com", "encrypted-tbn3.gstatic.com"]
  }
};


export default nextConfig;
