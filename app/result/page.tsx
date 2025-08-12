import Link from "next/link";

export default function ResultPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Result Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <span className="text-3xl">🎉</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          테스트 완료!
        </h1>
        <p className="text-lg text-gray-600">
          당신의 퍼스널 컬러 결과를 확인해보세요
        </p>
      </div>

      {/* Main Result Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">쿨 톤 (Cool Tone)</h2>
          <p className="text-blue-100">당신에게 가장 잘 어울리는 색상 타입입니다</p>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Color Palette */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">추천 색상 팔레트</h3>
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="aspect-square bg-blue-500 rounded-lg shadow-sm"></div>
                <div className="aspect-square bg-purple-500 rounded-lg shadow-sm"></div>
                <div className="aspect-square bg-teal-500 rounded-lg shadow-sm"></div>
                <div className="aspect-square bg-indigo-500 rounded-lg shadow-sm"></div>
                <div className="aspect-square bg-emerald-500 rounded-lg shadow-sm"></div>
                <div className="aspect-square bg-cyan-500 rounded-lg shadow-sm"></div>
                <div className="aspect-square bg-violet-500 rounded-lg shadow-sm"></div>
                <div className="aspect-square bg-slate-600 rounded-lg shadow-sm"></div>
              </div>
            </div>

            {/* Characteristics */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">당신의 특징</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-700">차가운 톤의 색상이 피부를 더욱 밝게 만들어줍니다</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-700">블루, 퍼플, 그레이 계열이 잘 어울립니다</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-700">실버 액세서리가 골드보다 더 잘 어울립니다</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span className="text-gray-700">세련되고 모던한 스타일을 선호합니다</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">👗</span>
            패션 추천
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 네이비, 차콜 그레이 정장</li>
            <li>• 화이트, 아이보리 셔츠</li>
            <li>• 블루 데님, 블랙 팬츠</li>
            <li>• 쿨톤 패턴의 스카프나 넥타이</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">💄</span>
            메이크업 추천
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 핑크, 베리 톤 립스틱</li>
            <li>• 블루, 퍼플 계열 아이섀도</li>
            <li>• 쿨톤 베이스 파운데이션</li>
            <li>• 로즈 또는 피치 블러셔</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/test"
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          다시 테스트하기
        </Link>
        <Link
          href="/"
          className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
        >
          홈으로 돌아가기
        </Link>
        <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
          결과 공유하기
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>
          이 결과는 일반적인 가이드라인입니다. 개인의 취향과 상황에 따라 다를 수 있습니다.
        </p>
      </div>
    </div>
  );
}
