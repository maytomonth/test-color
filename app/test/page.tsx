import Link from "next/link";

export default function TestPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">진행률</span>
          <span className="text-sm font-medium text-gray-700">Q1/8</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '12.5%' }}></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          다음 중 어떤 색상이 더 매력적으로 느껴지시나요?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <button className="group p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <div className="w-full h-32 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg mb-4 shadow-md group-hover:shadow-lg transition-shadow"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">따뜻한 톤</h3>
            <p className="text-sm text-gray-600">
              코랄, 피치, 골드 계열의 따뜻하고 생동감 있는 색상
            </p>
          </button>
          
          <button className="group p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4 shadow-md group-hover:shadow-lg transition-shadow"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">차가운 톤</h3>
            <p className="text-sm text-gray-600">
              블루, 퍼플, 실버 계열의 시원하고 세련된 색상
            </p>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
        >
          ← 처음으로
        </Link>
        
        <div className="flex space-x-3">
          <button
            disabled
            className="px-6 py-3 bg-gray-200 text-gray-400 rounded-lg font-medium cursor-not-allowed"
          >
            이전
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
            다음
          </button>
        </div>
      </div>

      {/* Question Counter */}
      <div className="mt-8 text-center">
        <div className="inline-flex space-x-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                num === 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
