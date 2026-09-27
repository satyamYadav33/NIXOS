import React, { useState } from 'react';
import { NIX_QUIZ_QUESTIONS } from '../data/nixosData';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

export const NixQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const question = NIX_QUIZ_QUESTIONS[currentIdx];
  const total = NIX_QUIZ_QUESTIONS.length;
  const userSelected = selectedAnswers[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: idx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < total - 1) {
      setCurrentIdx(prev => prev + 1);
      setShowExplanation(selectedAnswers[currentIdx + 1] !== undefined);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setShowExplanation(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    NIX_QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setIsFinished(false);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Check</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Nix & NixOS Mastery Quiz
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Test your understanding of pure functional package management, declarative system architectures, and atomic rollback workflows.
        </p>
      </div>

      {!isFinished ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Question {currentIdx + 1} of {total}</span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                {Math.round(((currentIdx + 1) / total) * 100)}% Complete
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
                {question.badge}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {question.title}
              </h3>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {question.scenario}
            </p>

            {question.codeSnippet && (
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-cyan-300 border border-slate-800">
                {question.codeSnippet}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {question.options.map((opt, idx) => {
              const isSelected = userSelected === idx;
              const isCorrect = idx === question.correctIndex;

              let btnStyle = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200';

              if (showExplanation) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-red-500 bg-red-500/10 text-red-800 dark:text-red-200';
                } else {
                  btnStyle = 'opacity-50 border-slate-200 dark:border-slate-800 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-2xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="mt-0.5">
                    {showExplanation && isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : showExplanation && isSelected && !isCorrect ? (
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                        isSelected ? 'border-cyan-500 bg-cyan-500 text-white' : 'border-slate-400 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                    )}
                  </div>
                  <span className="leading-relaxed flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Explanation */}
          {showExplanation && (
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-2 animate-fadeIn text-xs">
              <div className="flex items-center gap-1.5 font-bold text-cyan-700 dark:text-cyan-300">
                <Sparkles className="w-4 h-4" />
                <span>Deep Architecture Explanation</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 cursor-pointer"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={userSelected === undefined}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <span>{currentIdx === total - 1 ? 'See Results' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      ) : (
        /* Results Card */
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <Award className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Quiz Completed!
            </h3>
            <p className="text-sm text-slate-500">
              You scored <span className="font-extrabold text-cyan-600 dark:text-cyan-400 text-lg font-mono">{calculateScore()}</span> out of <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{total}</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 max-w-md mx-auto text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {calculateScore() >= 7 ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                🌟 Outstanding! You have mastered the declarative philosophy, content-addressed storage, and rollback mechanics of Nix and NixOS!
              </span>
            ) : (
              <span>
                Great effort! Explore the <strong className="text-cyan-500">Nix vs NixOS</strong> and <strong className="text-cyan-500">Rollback Machine</strong> tabs to level up your understanding of generational state transitions.
              </span>
            )}
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}

    </div>
  );
};
