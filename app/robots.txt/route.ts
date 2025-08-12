import { getBaseUrl } from '@/lib/seo';

export function GET() {
  const baseUrl = getBaseUrl();
  
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
