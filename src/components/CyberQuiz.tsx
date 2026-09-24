import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Trophy, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const CyberQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const getRank = (finalScore: number) => {
    const ratio = finalScore / QUIZ_QUESTIONS.length;
    if (ratio === 1) return { title: 'Elite Offensive Security Professional', badge: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40' };
    if (ratio >= 0.8) return { title: 'Senior Penetration Tester', badge: 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border-cyan-500/40' };
    if (ratio >= 0.6) return { title: 'Junior Security Analyst', badge: 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40' };
    return { title: 'Cybersecurity Apprentice', badge: 'bg-slate-300 dark:bg-slate-700/40 text-slate-700 dark:text-slate-300 border-slate-400 dark:border-slate-600' };
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Quiz Header */}
      <div className="clay-card p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-500/30 shadow-sm">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 font-mono">
              Cybersecurity Scenario Challenge
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test tactical Kali command selection under realistic engagement constraints
            </p>
          </div>
        </div>

        {!isFinished && (
          <div className="clay-badge text-xs font-mono text-slate-600 dark:text-slate-300 px-3.5 py-1.5 font-bold">
            Question <span className="text-cyan-600 dark:text-cyan-400">{currentIdx + 1}</span> / {QUIZ_QUESTIONS.length}
          </div>
        )}
      </div>

      {!isFinished ? (
        <div className="clay-card p-6 sm:p-8 space-y-6">
          
          {/* Scenario Box */}
          <div className="clay-inset p-4 sm:p-5 rounded-2xl space-y-2 border-l-4 border-cyan-500">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Tactical Engagement Scenario:
            </span>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
              {currentQ.scenario}
            </p>
          </div>

          {/* Question Text */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              let btnStyle = 'clay-btn text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400';
              
              if (isAnswered) {
                if (idx === currentQ.answer) {
                  btnStyle = 'border-2 border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 shadow-md shadow-emerald-500/20';
                } else if (idx === selectedOption) {
                  btnStyle = 'border-2 border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 shadow-md shadow-rose-500/20';
                } else {
                  btnStyle = 'opacity-40 text-slate-400 dark:text-slate-500 cursor-not-allowed';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm font-mono transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <span className="w-7 h-7 rounded-xl clay-inset flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="overflow-x-auto select-text font-medium">{option}</span>
                  </div>

                  {isAnswered && idx === currentQ.answer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.answer && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation */}
          {isAnswered && (
            <div className="clay-inset p-4 sm:p-5 rounded-2xl space-y-2 border-l-4 border-amber-500 animate-in fade-in duration-200">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                Technical Debrief:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Row */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="clay-btn-primary flex items-center space-x-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Scenario' : 'View Final Score'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Results Screen */
        <div className="clay-card p-8 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
              Engagement Completed!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Tactical performance summary across offensive penetration testing questions:
            </p>
          </div>

          <div className="text-4xl sm:text-5xl font-black font-mono text-cyan-600 dark:text-cyan-400">
            {score} <span className="text-slate-400 dark:text-slate-500 text-xl font-normal">/ {QUIZ_QUESTIONS.length}</span>
          </div>

          <div className="inline-block">
            <span className={`px-4 py-2 rounded-xl text-xs font-bold border font-mono ${getRank(score).badge}`}>
              {getRank(score).title}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            {score === QUIZ_QUESTIONS.length 
              ? 'Flawless execution! You demonstrate mastery of Kali Linux toolchain tradecraft and offensive methodologies.'
              : 'Great effort! Practice commands hands-on in the Terminal Simulator and review weaponization flags to level up.'}
          </p>

          <div>
            <button
              onClick={handleRestart}
              className="clay-btn inline-flex items-center space-x-2 px-6 py-3 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-100 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Tactical Challenge</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
