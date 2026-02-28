
import React, { useState, useEffect, useCallback } from 'react';
import { ADLAM_ALPHABET } from '../constants';
import { AdlamLetter } from '../types';
import { Trophy, RotateCcw, Play, BookOpen, CheckCircle2, XCircle } from 'lucide-react';

type Mode = 'browse' | 'practice';

const AdlamAlphabet: React.FC = () => {
  const [mode, setMode] = useState<Mode>('browse');
  const [selectedLetter, setSelectedLetter] = useState<AdlamLetter | null>(null);
  
  // Practice state
  const [currentQuestion, setCurrentQuestion] = useState<AdlamLetter | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [shake, setShake] = useState(false);

  const generateNewQuestion = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * ADLAM_ALPHABET.length);
    setCurrentQuestion(ADLAM_ALPHABET[randomIndex]);
    setFeedback(null);
  }, []);

  useEffect(() => {
    if (mode === 'practice' && !currentQuestion) {
      generateNewQuestion();
    }
  }, [mode, currentQuestion, generateNewQuestion]);

  const handlePracticeClick = (letter: AdlamLetter) => {
    if (!currentQuestion || feedback === 'correct') return;

    setTotalAttempts(prev => prev + 1);
    if (letter.char === currentQuestion.char) {
      setFeedback('correct');
      setScore(prev => prev + 1);
      setTimeout(() => {
        generateNewQuestion();
      }, 1000);
    } else {
      setFeedback('incorrect');
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setFeedback(null);
      }, 500);
    }
  };

  const resetPractice = () => {
    setScore(0);
    setTotalAttempts(0);
    generateNewQuestion();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Mode Selector */}
      <div className="flex justify-center">
        <div className="bg-slate-900 p-1 rounded-xl border border-emerald-500/20 flex">
          <button
            onClick={() => setMode('browse')}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all ${
              mode === 'browse' ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg' : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            <BookOpen size={18} />
            <span>Apprendre</span>
          </button>
          <button
            onClick={() => {
              setMode('practice');
              resetPractice();
            }}
            className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all ${
              mode === 'practice' ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg' : 'text-slate-400 hover:text-emerald-400'
            }`}
          >
            <Play size={18} />
            <span>S'entraîner</span>
          </button>
        </div>
      </div>

      {mode === 'browse' ? (
        <>
          <div className="bg-emerald-950/20 border border-emerald-500/30 p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-emerald-400">Alphabet Adlam (𞤀𞤣𞤤𞤢𞤥)</h2>
            <p className="text-slate-300 mb-8 text-lg max-w-2xl leading-relaxed">
              L'Adlam est le système d'écriture utilisé pour transcrire le Pulaar (Peul). 
              Cliquez sur une lettre pour voir sa prononciation et ses détails.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5">
              {ADLAM_ALPHABET.map((letter) => (
                <button
                  key={letter.char}
                  onClick={() => setSelectedLetter(letter)}
                  className={`
                    h-32 flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300
                    ${selectedLetter?.char === letter.char 
                      ? 'bg-emerald-500 border-emerald-300 text-slate-950 scale-105 shadow-lg shadow-emerald-500/20' 
                      : 'bg-slate-800/40 border-slate-700 text-slate-100 hover:border-emerald-500/50 hover:bg-slate-800/60'}
                  `}
                >
                  <span className="text-5xl mb-2 adlam-text font-medium">{letter.char}</span>
                  <span className="text-[11px] uppercase font-black tracking-widest opacity-60">
                    {letter.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {selectedLetter && (
            <div className="bg-slate-900 border border-emerald-500/30 p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10 animate-slideUp shadow-2xl">
              <div className="text-[10rem] p-12 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 adlam-text leading-none select-none">
                {selectedLetter.char}
              </div>
              <div className="flex-1 space-y-6 w-full">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                  <h3 className="text-4xl font-black text-emerald-400">{selectedLetter.name}</h3>
                  <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${selectedLetter.category === 'vowel' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {selectedLetter.category === 'vowel' ? 'Voyelle' : 'Consonne'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                    <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Équivalent Latin</p>
                    <p className="text-4xl font-mono text-white">{selectedLetter.latin}</p>
                  </div>
                  <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex flex-col justify-center">
                    <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Prononciation</p>
                    <p className="text-xl text-slate-300 italic">S'articule comme "{selectedLetter.latin}"</p>
                  </div>
                </div>

                <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/10 italic text-slate-400 leading-relaxed">
                  "Dans l'écriture Adlam, le caractère <span className="adlam-text text-emerald-400 font-bold px-1">{selectedLetter.char}</span> ({selectedLetter.name}) est essentiel pour la richesse phonétique de la langue Pulaar."
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          {/* Practice Header / Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center space-x-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Trophy className="text-emerald-400" size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Score</p>
                <p className="text-2xl font-bold text-white">{score}</p>
              </div>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center space-x-4 text-center justify-center">
               <div className="text-2xl font-bold text-slate-400">{score}/{totalAttempts || 0}</div>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-end">
              <button 
                onClick={resetPractice}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                title="Recommencer"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className={`bg-slate-900 border-2 rounded-3xl p-12 text-center transition-all duration-300 shadow-2xl ${
            feedback === 'correct' ? 'border-emerald-500 bg-emerald-500/5' : 
            feedback === 'incorrect' ? 'border-red-500 animate-shake bg-red-500/5' : 
            'border-slate-800'
          }`}>
            <p className="text-slate-500 uppercase font-black tracking-[0.3em] mb-4">Trouvez le caractère Adlam pour :</p>
            <div className="text-8xl font-black text-white mb-6 font-mono tracking-tighter">
              {currentQuestion?.latin}
            </div>
            
            <div className="flex justify-center h-8">
              {feedback === 'correct' && (
                <div className="flex items-center text-emerald-400 font-bold animate-bounce">
                  <CheckCircle2 size={20} className="mr-2" /> Excellent !
                </div>
              )}
              {feedback === 'incorrect' && (
                <div className="flex items-center text-red-400 font-bold">
                  <XCircle size={20} className="mr-2" /> Réessayez
                </div>
              )}
            </div>
          </div>

          {/* Answer Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {ADLAM_ALPHABET.map((letter) => (
              <button
                key={letter.char}
                onClick={() => handlePracticeClick(letter)}
                disabled={feedback === 'correct'}
                className={`
                  h-20 flex items-center justify-center rounded-xl border-2 transition-all text-3xl adlam-text
                  ${feedback === 'correct' && letter.char === currentQuestion?.char 
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 scale-105' 
                    : 'bg-slate-900 border-slate-800 text-slate-100 hover:border-emerald-500/50 hover:bg-slate-800'}
                `}
              >
                {letter.char}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};

export default AdlamAlphabet;
