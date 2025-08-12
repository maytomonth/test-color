import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          당신만의 퍼스널 컬러를 찾아보세요
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          간단한 테스트를 통해 당신에게 가장 잘 어울리는 색상을 발견하고, 
          더욱 매력적인 스타일을 완성해보세요.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">간단한 테스트</h3>
            <p className="text-gray-600 text-sm">
              8개의 간단한 질문으로 당신의 색상 선호도를 파악합니다
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">개인 맞춤</h3>
            <p className="text-gray-600 text-sm">
              당신의 피부톤과 스타일에 맞는 색상을 추천해드립니다
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">실용적 조언</h3>
            <p className="text-gray-600 text-sm">
              패션과 메이크업에 바로 활용할 수 있는 팁을 제공합니다
            </p>
          </div>
        </div>

        <Link
          href="/test"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          테스트 시작하기
          <span className="ml-2">→</span>
        </Link>
      </div>

      <div className="text-center text-gray-500 text-sm">
        <p>소요시간: 약 3-5분 | 무료 테스트</p>
      </div>
    </div>
  );
}
