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
    if (ratio === 1) return { title: 'Elite Offensive Security Professional', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    if (ratio >= 0.8) return { title: 'Senior Penetration Tester', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' };
    if (ratio >= 0.6) return { title: 'Junior Security Analyst', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    return { title: 'Cybersecurity Student / Apprentice', badge: 'bg-slate-700/40 text-slate-300 border-slate-600' };
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Quiz Header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Cybersecurity Scenario Challenge</h2>
            <p className="text-xs text-slate-400">Test your tactical command selection in real penetration testing situations</p>
          </div>
        </div>

        {!isFinished && (
          <div className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-slate-800 border border-slate-700/60">
            Question <span className="text-cyan-400 font-bold">{currentIdx + 1}</span> of {QUIZ_QUESTIONS.length}
          </div>
        )}
      </div>

      {!isFinished ? (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5 shadow-xl">
          
          {/* Scenario Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Engagement Scenario:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {currentQ.scenario}
            </p>
          </div>

          {/* Question Text */}
          <h3 className="text-sm sm:text-base font-semibold text-white">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, idx) => {
              let btnStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300';
              
              if (isAnswered) {
                if (idx === currentQ.answer) {
                  btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10';
                } else if (idx === selectedOption) {
                  btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-950/30 border-slate-800/60 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-mono transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-700/80 flex items-center justify-center text-xs font-semibold text-slate-400 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="overflow-x-auto">{option}</span>
                  </div>

                  {isAnswered && idx === currentQ.answer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.answer && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-in fade-in duration-200">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Technical Explanation:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Row */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Scenario' : 'View Final Score'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Results Screen */
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-white">Challenge Completed!</h3>
            <p className="text-xs text-slate-400 mt-1">Here is how you performed on tactical command decision-making:</p>
          </div>

          <div className="text-4xl font-extrabold font-mono text-cyan-400">
            {score} <span className="text-slate-500 text-xl font-normal">/ {QUIZ_QUESTIONS.length}</span>
          </div>

          <div className="inline-block">
            <span className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${getRank(score).badge}`}>
              {getRank(score).title}
            </span>
          </div>

          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            {score === QUIZ_QUESTIONS.length 
              ? 'Flawless performance! You have deep technical knowledge of Kali Linux tools and penetration testing methodologies.'
              : 'Good job! You can explore the Command Vault and test commands directly in the Kali Terminal to sharpen your skills.'}
          </p>

          <div>
            <button
              onClick={handleRestart}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Challenge</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
