import React from 'react';
import { QuestionProps } from '../types';

const Question: React.FC<QuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showAnswer
}) => {
  console.log('Question Component Render:', {
    currentQuestion: question.question,
    selectedAnswer,
    showAnswer,
    correctAnswer: question.correctAnswer
  });

  const isAnswerSelected = selectedAnswer !== undefined && selectedAnswer !== null;

  const handleClick = (index: number) => {
    console.log('Click Handler:', {
      clickedIndex: index,
      currentSelectedAnswer: selectedAnswer,
      isClickable: !isAnswerSelected
    });

    if (!isAnswerSelected) {
      console.log('Calling onAnswerSelect with index:', index);
      onAnswerSelect(index);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    console.log('KeyDown Event:', {
      key: event.key,
      index,
      selectedAnswer
    });

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isAnswerSelected) {
        onAnswerSelect(index);
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
        {question.question}
      </h2>

      <div className="flex-1 flex flex-col space-y-2 sm:space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = showAnswer && index === question.correctAnswer;
          const isWrong = showAnswer && isSelected && index !== question.correctAnswer;

          return (
            <button
              key={index}
              onClick={() => !showAnswer && onAnswerSelect(index)}
              disabled={showAnswer}
              className={`
                relative w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-200
                ${showAnswer ? 'cursor-default' : 'hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer'}
                ${isSelected
                  ? isWrong
                    ? 'border-red-200 bg-red-50'
                    : isCorrect
                      ? 'border-green-200 bg-green-50'
                      : 'border-blue-200 bg-blue-50'
                  : isCorrect
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-white'
                }
              `}
            >
              <div className="flex items-start">
                <div className={`
                  flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 border-2 rounded-full mr-3 sm:mr-4 mt-0.5
                  ${isSelected
                    ? isWrong
                      ? 'border-red-500 bg-red-500'
                      : isCorrect
                        ? 'border-green-500 bg-green-500'
                        : 'border-blue-500 bg-blue-500'
                    : isCorrect
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }
                `}>
                  {(isSelected || isCorrect) && (
                    <svg className="w-full h-full text-white" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="3" fill="currentColor" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm sm:text-base
                  ${isSelected
                    ? isWrong
                      ? 'text-red-700'
                      : isCorrect
                        ? 'text-green-700'
                        : 'text-blue-700'
                    : isCorrect
                      ? 'text-green-700'
                      : 'text-gray-700'
                  }
                `}>
                  {option}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {showAnswer && (
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
          <div className="text-sm sm:text-base text-gray-700">
            <span className="font-medium text-gray-900">Giải thích: </span>
            {question.explanation}
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
