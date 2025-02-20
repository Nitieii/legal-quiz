import React from 'react';
import Image from 'next/image';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-3xl w-full text-center space-y-8 sm:space-y-12">
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 mx-auto transform hover:scale-110 transition-transform duration-500">
          <div className="absolute inset-0 bg-blue-200 rounded-full animate-pulse-slow opacity-30"></div>
          <Image
            src="/logo.svg"
            alt="Logo"
            fill
            priority
            className="object-contain relative z-10"
          />
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight animate-fade-in">
            Bộ Quy tắc Đạo đức và Ứng xử
            <span className="block text-blue-600 mt-1 sm:mt-2">nghề nghiệp luật sư Việt Nam</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-delay">
            Kiểm tra kiến thức của bạn về quy tắc đạo đức và ứng xử nghề nghiệp luật sư
          </p>
        </div>

        <div className="relative group animate-fade-in-delay-2">
          {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-10 group-hover:opacity-20 transition duration-300"></div> */}
          <button
            onClick={onStart}
            className="relative group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white bg-blue-600 rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02]"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
            <span className="relative flex items-center">
              Bắt đầu kiểm tra
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 -mr-1 transition-transform duration-300 ease-in-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-16 animate-fade-in-delay-3">
          <div className="p-4 sm:p-6 bg-white/90 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-blue-600 mb-2 sm:mb-3 text-2xl sm:text-3xl">📚</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Kiến thức chuyên sâu</h3>
            <p className="text-sm sm:text-base text-gray-600">Tìm hiểu về quy tắc đạo đức và ứng xử nghề nghiệp</p>
          </div>
          <div className="p-4 sm:p-6 bg-white/90 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-blue-600 mb-2 sm:mb-3 text-2xl sm:text-3xl">🎯</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Kiểm tra năng lực</h3>
            <p className="text-sm sm:text-base text-gray-600">Đánh giá mức độ hiểu biết của bạn qua các câu hỏi</p>
          </div>
          <div className="p-4 sm:p-6 bg-white/90 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-blue-600 mb-2 sm:mb-3 text-2xl sm:text-3xl">💡</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Giải thích chi tiết</h3>
            <p className="text-sm sm:text-base text-gray-600">Hiểu rõ hơn thông qua các giải thích cụ thể</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
