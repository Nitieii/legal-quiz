import React, { useState, useEffect } from 'react';
import { Question as QuestionType } from '../types';
import Question from './Question';
import Result from './Result';
import Welcome from './Welcome';
import { getRandomQuestions } from '../data/questions';

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    console.log('Quiz Component Mount - Initializing Quiz');
    const allQuestions = getRandomQuestions();
    setQuestions(allQuestions);
    setSelectedAnswers(new Array(allQuestions.length).fill(null));
  }, []);

  const initializeQuiz = () => {
    console.log('Initializing Quiz');
    const allQuestions = getRandomQuestions();
    console.log('Loaded Questions:', allQuestions.length);

    setQuestions(allQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(allQuestions.length).fill(null));
    setShowResult(false);
    setScore(0);
    setShowAnswer(false);
    setShowWelcome(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    console.log('Answer Selected:', {
      answerIndex,
      currentQuestionIndex,
      currentQuestion: questions[currentQuestionIndex],
      previousSelectedAnswers: selectedAnswers,
      previousScore: score
    });

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
    setShowAnswer(true);

    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      console.log('Correct Answer! Updating score');
      setScore(score + 1);
    } else {
      console.log('Incorrect Answer');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      console.log('Moving to next question');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    } else {
      console.log('Quiz completed - showing results');
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    console.log('Retrying quiz');
    initializeQuiz();
  };

  if (showWelcome) {
    console.log('Rendering Welcome screen');
    return <Welcome onStart={initializeQuiz} />;
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-2xl font-semibold text-gray-800">Đang tải câu hỏi...</div>
        </div>
      </div>
    );
  }

  if (showResult) {
    console.log('Showing Results:', {
      finalScore: score,
      totalQuestions: questions.length
    });
    return (
      <Result
        score={score}
        totalQuestions={questions.length}
        onRetry={handleRetry}
        questions={questions}
        selectedAnswers={selectedAnswers}
      />
    );
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  console.log('Rendering Current Question:', {
    currentQuestionIndex,
    totalQuestions: questions.length,
    currentQuestion: questions[currentQuestionIndex],
    selectedAnswer: selectedAnswers[currentQuestionIndex],
    showAnswer
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <div className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col">
        <div className="mb-3 sm:mb-6 flex-shrink-0">
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:justify-between md:items-start">
            <div className="max-w-2xl">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-1 sm:mb-2">
                Bộ Quy tắc Đạo đức và Ứng xử nghề nghiệp luật sư Việt Nam
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Kiểm tra kiến thức của bạn về quy tắc đạo đức và ứng xử nghề nghiệp
              </p>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:space-y-2 bg-white/90 rounded-xl border border-gray-100 shadow-sm p-3 sm:p-4 w-full md:w-auto">
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm font-medium text-gray-500">Tiến độ</span>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">
                  {currentQuestionIndex + 1}/{questions.length}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm font-medium text-gray-500">Điểm số</span>
                <div className="bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                  {score}/{questions.length}
                </div>
              </div>
              <div className="hidden md:block w-full bg-gray-100 rounded-full h-1">
                <div
                  className="bg-blue-600 h-1 rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="block md:hidden w-full bg-gray-100 rounded-full h-1 mt-3">
            <div
              className="bg-blue-600 h-1 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="bg-white/90 rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-6 mb-2 sm:mb-4">
            <Question
              question={questions[currentQuestionIndex]}
              selectedAnswer={selectedAnswers[currentQuestionIndex]}
              onAnswerSelect={handleAnswerSelect}
              showAnswer={showAnswer}
            />
          </div>

          {showAnswer && (
            <div className="flex justify-center pb-2 sm:pb-4 flex-shrink-0">
              <button
                onClick={handleNextQuestion}
                className="group relative inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium text-white bg-blue-600 rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
                <span className="relative flex items-center">
                  {isLastQuestion ? 'Xem kết quả' : 'Câu hỏi tiếp theo'}
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 -mr-1 transition-transform duration-300 ease-in-out group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
