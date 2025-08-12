import { ImageResponse } from 'next/og';
import { getHomeMeta } from '@/lib/seo';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const customTitle = searchParams.get('title');
    const customSubtitle = searchParams.get('subtitle');
    const color1 = searchParams.get('c1') || '#ef4444';
    const color2 = searchParams.get('c2') || '#8b5cf6';
    
    const { title: defaultTitle, description } = getHomeMeta('ko');
    const title = customTitle || defaultTitle;
    const subtitle = customSubtitle || description;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 24,
              padding: 80,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: 1000,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 700,
                color: '#1f2937',
                marginBottom: 20,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 28,
                color: '#6b7280',
                lineHeight: 1.4,
                maxWidth: 800,
              }}
            >
              {subtitle}
            </div>
            
            {/* Color palette preview or gradient */}
            <div
              style={{
                display: 'flex',
                marginTop: 40,
                gap: 12,
              }}
            >
              {customTitle ? (
                // Custom gradient for personalized results
                <div
                  style={{
                    width: 300,
                    height: 60,
                    borderRadius: 30,
                    background: `linear-gradient(45deg, ${color1}, ${color2})`,
                  }}
                />
              ) : (
                // Default color palette
                <>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: '#ef4444',
                    }}
                  />
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: '#f97316',
                    }}
                  />
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: '#eab308',
                    }}
                  />
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: '#22c55e',
                    }}
                  />
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: '#3b82f6',
                    }}
                  />
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: '#8b5cf6',
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`Failed to generate OG image: ${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
