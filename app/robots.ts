// app/robots.ts

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Replace with your actual production domain when you deploy
  const baseUrl = 'https://48hoursplus.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',     // Strictly blocks Google from crawling your admin panels [1]
        '/api/',       // Blocks private backend data routes [1]
        '/_next/',     // Blocks Next.js internal system directories
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}