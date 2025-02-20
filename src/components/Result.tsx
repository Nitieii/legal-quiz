import React, { useState, useMemo } from 'react';
import { ResultProps, Question } from '../types';

const Result: React.FC<ResultProps> = ({
  score,
  totalQuestions,
  onRetry,
  questions,
  selectedAnswers
}) => {
  const [activeTab, setActiveTab] = useState<'correct' | 'wrong'>('correct');

  // Memoize expensive calculations
  const { percentage, correctAnswers, wrongAnswers } = useMemo(() => {
    const percentage = (score / totalQuestions) * 100;
    const correctAnswers = questions.filter((_, index) =>
      selectedAnswers[index] === questions[index].correctAnswer
    );
    const wrongAnswers = questions.filter((_, index) =>
      selectedAnswers[index] !== null && selectedAnswers[index] !== questions[index].correctAnswer
    );
    return { percentage, correctAnswers, wrongAnswers };
  }, [score, totalQuestions, questions, selectedAnswers]);

  // Memoize feedback message
  const feedbackMessage = useMemo(() => {
    if (percentage >= 80) {
      return {
        type: 'success',
        title: 'Xuất sắc! 🎉',
        message: 'Bạn đã nắm vững kiến thức về Quy tắc Đạo đức và Ứng xử nghề nghiệp luật sư!',
        bgClass: 'bg-green-50',
        borderClass: 'border-green-100',
        textClass: 'text-green-800'
      };
    } else if (percentage >= 60) {
      return {
        type: 'good',
        title: 'Khá tốt! 👍',
        message: 'Bạn đã có kiến thức cơ bản, hãy tiếp tục cố gắng!',
        bgClass: 'bg-blue-50',
        borderClass: 'border-blue-100',
        textClass: 'text-blue-800'
      };
    }
    return {
      type: 'warning',
      title: 'Cần cố gắng thêm! 💪',
      message: 'Hãy xem lại các quy tắc và thử lại nhé!',
      bgClass: 'bg-yellow-50',
      borderClass: 'border-yellow-100',
      textClass: 'text-yellow-800'
    };
  }, [percentage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto bg-white/90 rounded-2xl border border-gray-100 shadow-lg p-4 sm:p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kết quả bài kiểm tra
          </h2>
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-600 mb-4">
            {percentage.toFixed(0)}%
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Bạn đã trả lời đúng {score}/{totalQuestions} câu hỏi
          </p>
        </div>

        <div className="mb-8">
          <div className={`text-center p-4 sm:p-6 ${feedbackMessage.bgClass} rounded-xl border ${feedbackMessage.borderClass}`}>
            <p className={`text-xl sm:text-2xl font-bold ${feedbackMessage.textClass} mb-2`}>{feedbackMessage.title}</p>
            <p className="text-sm sm:text-base text-gray-700">{feedbackMessage.message}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white">
            <button
              className={`flex-1 py-3 px-4 text-center font-semibold transition-colors
                ${activeTab === 'correct' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-blue-50'}`}
              onClick={() => setActiveTab('correct')}
            >
              Câu trả lời đúng ({correctAnswers.length})
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center font-semibold transition-colors
                ${activeTab === 'wrong' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-blue-50'}`}
              onClick={() => setActiveTab('wrong')}
            >
              Câu trả lời sai ({wrongAnswers.length})
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {activeTab === 'correct' ? (
              correctAnswers.map((question) => (
                <div key={question.id} className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h3 className="font-semibold text-gray-900 mb-2">{question.question}</h3>
                  <div className="flex items-center space-x-2 text-green-700">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{question.options[question.correctAnswer]}</span>
                  </div>
                </div>
              ))
            ) : (
              wrongAnswers.map((question) => (
                <div key={question.id} className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <h3 className="font-semibold text-gray-900 mb-2">{question.question}</h3>
                  <div className="flex items-center space-x-2 text-red-700 mb-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Bạn chọn: {question.options[selectedAnswers[questions.indexOf(question)] || 0]}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-700">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Đáp án đúng: {question.options[question.correctAnswer]}</span>
                  </div>
                  <p className="text-gray-700 mt-3 pt-3 border-t border-red-100 text-sm">{question.explanation}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onRetry}
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="flex items-center">
              Làm lại bài kiểm tra
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
