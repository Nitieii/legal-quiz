import React, { useState } from 'react';
import { ResultProps, Question } from '../types';

const Result: React.FC<ResultProps> = ({
  score,
  totalQuestions,
  onRetry,
  questions,
  selectedAnswers
}) => {
  const [activeTab, setActiveTab] = useState<'correct' | 'wrong'>('correct');
  const percentage = (score / totalQuestions) * 100;

  const correctAnswers = questions.filter((_, index) =>
    selectedAnswers[index] === questions[index].correctAnswer
  );

  const wrongAnswers = questions.filter((_, index) =>
    selectedAnswers[index] !== null && selectedAnswers[index] !== questions[index].correctAnswer
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto bg-white/90 rounded-2xl border border-gray-100 shadow-lg p-4 sm:p-8 md:p-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Kết quả bài kiểm tra
          </h2>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse-slow opacity-50"></div>
            <div className="relative text-5xl sm:text-6xl md:text-7xl font-bold text-blue-600 mb-4 sm:mb-6 animate-scale-in">
              {percentage.toFixed(0)}%
            </div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 animate-fade-in-delay">
            Bạn đã trả lời đúng {score}/{totalQuestions} câu hỏi
          </p>
        </div>

        <div className="mb-8 sm:mb-12 animate-fade-in-delay">
          {percentage >= 80 ? (
            <div className="text-center p-4 sm:p-6 bg-green-50 rounded-xl border border-green-100">
              <p className="text-xl sm:text-2xl font-bold text-green-800 mb-2 sm:mb-3">Xuất sắc! 🎉</p>
              <p className="text-sm sm:text-base text-green-700">Bạn đã nắm vững kiến thức về Quy tắc Đạo đức và Ứng xử nghề nghiệp luật sư!</p>
            </div>
          ) : percentage >= 60 ? (
            <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 sm:mb-3">Khá tốt! 👍</p>
              <p className="text-sm sm:text-base text-blue-700">Bạn đã có kiến thức cơ bản, hãy tiếp tục cố gắng!</p>
            </div>
          ) : (
            <div className="text-center p-4 sm:p-6 bg-yellow-50 rounded-xl border border-yellow-100">
              <p className="text-xl sm:text-2xl font-bold text-yellow-800 mb-2 sm:mb-3">Cần cố gắng thêm! 💪</p>
              <p className="text-sm sm:text-base text-yellow-700">Hãy xem lại các quy tắc và thử lại nhé!</p>
            </div>
          )}
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white text-sm sm:text-base">
            <button
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 text-center font-semibold transition-all duration-300
                ${activeTab === 'correct'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-blue-50'
                }`}
              onClick={() => setActiveTab('correct')}
            >
              Câu trả lời đúng ({correctAnswers.length})
            </button>
            <button
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 text-center font-semibold transition-all duration-300
                ${activeTab === 'wrong'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-blue-50'
                }`}
              onClick={() => setActiveTab('wrong')}
            >
              Câu trả lời sai ({wrongAnswers.length})
            </button>
          </div>

          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
            {activeTab === 'correct' ? (
              correctAnswers.map((question, index) => (
                <div key={question.id} className="p-4 sm:p-6 bg-green-50 rounded-xl border border-green-100 animate-fade-in transform hover:scale-[1.01] transition-all duration-300">
                  <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">{question.question}</h3>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-green-700 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{question.options[question.correctAnswer]}</span>
                  </div>
                </div>
              ))
            ) : (
              wrongAnswers.map((question, index) => (
                <div key={question.id} className="p-4 sm:p-6 bg-red-50 rounded-xl border border-red-100 animate-fade-in transform hover:scale-[1.01] transition-all duration-300">
                  <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">{question.question}</h3>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-red-700 mb-2 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Bạn chọn: {question.options[selectedAnswers[questions.indexOf(question)] || 0]}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 text-green-700 mb-2 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Đáp án đúng: {question.options[question.correctAnswer]}</span>
                  </div>
                  <p className="text-gray-700 mt-3 pt-3 border-t border-red-100 text-xs sm:text-sm">{question.explanation}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onRetry}
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-4 text-base sm:text-lg font-medium text-white bg-blue-600 rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02]"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
            <span className="relative flex items-center">
              Làm lại bài kiểm tra
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
