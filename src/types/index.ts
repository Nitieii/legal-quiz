export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  showResult: boolean;
  answers: number[];
}

export interface QuestionProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  showAnswer: boolean;
}

export interface ResultProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  questions: Question[];
  selectedAnswers: (number | null)[];
}
