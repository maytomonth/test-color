import type { Metadata } from "next";
import { getTestMeta, getLocaleFromContext, getAbsoluteUrl } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleFromContext();
  const { title, description } = getTestMeta(locale);
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: getAbsoluteUrl('/test'),
      images: [
        {
          url: getAbsoluteUrl('/og'),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [getAbsoluteUrl('/og')],
    },
  };
}

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
