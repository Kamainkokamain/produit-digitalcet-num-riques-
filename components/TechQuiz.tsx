
import React, { useState } from 'react';
import { HTML_CSS_QUIZ } from '../constants';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, ChevronRight, Trophy, RefreshCw } from 'lucide-react';

const TechQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = HTML_CSS_QUIZ[currentQuestionIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < HTML_CSS_QUIZ.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-slate-900 border border-blue-500/30 p-10 rounded-3xl text-center space-y-6 animate-fadeIn">
        <div className="flex justify-center">
          <div className="p-4 bg-blue-500/20 rounded-full">
            <Trophy className="w-16 h-16 text-blue-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white">Quiz Terminé !</h2>
        <p className="text-xl text-slate-400">
          Votre score : <span className="text-blue-400 font-bold">{score} / {HTML_CSS_QUIZ.length}</span>
        </p>
        <div className="pt-4">
          <button 
            onClick={restartQuiz}
            className="flex items-center mx-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-slate-950 font-bold rounded-xl transition-all gap-2"
          >
            <RefreshCw size={18} /> Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-blue-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[450px] animate-fadeIn">
      {/* Header / Progress bar */}
      <div className="bg-slate-800 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-blue-400 uppercase tracking-widest text-xs">Quiz Tech #1 : HTML & CSS</h3>
          <span className="text-xs font-mono text-slate-500">{currentQuestionIndex + 1} / {HTML_CSS_QUIZ.length}</span>
        </div>
        <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
          <div 
            className="bg-blue-500 h-full transition-all duration-500" 
            style={{ width: `${((currentQuestionIndex + 1) / HTML_CSS_QUIZ.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-8 space-y-6">
        <h4 className="text-xl font-bold text-white leading-relaxed">
          {currentQuestion.question}
        </h4>

        <div className="grid gap-3">
          {currentQuestion.options.map((option, idx) => {
            let style = "bg-slate-800 border-slate-700 hover:border-blue-500/50 text-slate-300";
            if (isAnswered) {
              if (idx === currentQuestion.correctAnswer) {
                style = "bg-emerald-500/10 border-emerald-500 text-emerald-400";
              } else if (idx === selectedOption) {
                style = "bg-red-500/10 border-red-500 text-red-400";
              } else {
                style = "bg-slate-800 border-slate-700 text-slate-600 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all flex items-center justify-between ${style}`}
              >
                <span>{option}</span>
                {isAnswered && idx === currentQuestion.correctAnswer && <CheckCircle size={20} />}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctAnswer && <XCircle size={20} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / Explanation */}
      {isAnswered && (
        <div className="p-8 bg-slate-950/50 border-t border-blue-500/10 space-y-4 animate-slideUp">
          <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl text-sm text-slate-400 italic">
            <strong>Explication :</strong> {currentQuestion.explanation}
          </div>
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-blue-500/10"
          >
            {currentQuestionIndex < HTML_CSS_QUIZ.length - 1 ? 'Question Suivante' : 'Voir les résultats'}
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TechQuiz;
