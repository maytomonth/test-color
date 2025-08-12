import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ 빌드 중 ESLint 에러 무시
  },
  // 필요 시 타입 에러도 무시하려면 아래 주석 해제
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
