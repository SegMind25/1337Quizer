import React, { useState, useEffect, useRef } from 'react';
import { modules } from './data.js';

const STORAGE_KEY = '1337quizer_progress';

function loadProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

const saved = loadProgress();

export default function App() {
  const [selectedModule, setSelectedModule] = useState(() => {
    if (saved && saved.moduleId) {
      return modules.find(m => m.id === saved.moduleId) || null;
    }
    return null;
  });
  const [view, setView] = useState(saved?.view || 'dashboard');
  const [answers, setAnswers] = useState(saved?.answers || []);
  const [currentQ, setCurrentQ] = useState(saved?.currentQ || 0);
  const [score, setScore] = useState(saved?.score || 0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [retryMode, setRetryMode] = useState(saved?.retryMode || false);
  const [retryQuestions, setRetryQuestions] = useState(saved?.retryQuestions || []);
  const [retryScore, setRetryScore] = useState(saved?.retryScore || 0);
  const ignoreUrlSync = useRef(false);
  const synced = useRef(false);

  useEffect(() => {
    if (synced.current) return;
    const path = view === 'dashboard'
      ? '/'
      : `/${view}/${selectedModule?.id || ''}`;
    window.history.replaceState({ view, moduleId: selectedModule?.id }, '', path);
    synced.current = true;
  }, [view, selectedModule]);

  useEffect(() => {
    if (!synced.current) return;
    if (ignoreUrlSync.current) {
      ignoreUrlSync.current = false;
      return;
    }
    const path = view === 'dashboard'
      ? '/'
      : `/${view}/${selectedModule?.id || ''}`;
    window.history.pushState({ view, moduleId: selectedModule?.id }, '', path);
  }, [view, selectedModule]);

  useEffect(() => {
    const handlePopState = (e) => {
      ignoreUrlSync.current = true;
      if (e.state && e.state.view) {
        setView(e.state.view);
        if (e.state.moduleId) {
          const mod = modules.find(m => m.id === e.state.moduleId);
          if (mod) setSelectedModule(mod);
        } else {
          setSelectedModule(null);
        }
      } else {
        setView('dashboard');
        setSelectedModule(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (view === 'quiz') {
      const handler = (e) => {
        e.preventDefault();
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', handler);
      return () => window.removeEventListener('beforeunload', handler);
    }
  }, [view]);

  useEffect(() => {
    if (view !== 'quiz') return;
    saveProgress({
      moduleId: selectedModule?.id,
      view,
      answers,
      currentQ,
      score,
      retryMode,
      retryQuestions,
      retryScore
    });
  }, [view, answers, currentQ, score, retryMode, retryQuestions, retryScore]);

  const startQuiz = (module) => {
    clearProgress();
    setSelectedModule(module);
    setAnswers([]);
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setRetryMode(false);
    setRetryQuestions([]);
    setRetryScore(0);
    setView('quiz');
  };

  const continueQuiz = () => {
    const progress = loadProgress();
    if (!progress) return;
    const mod = modules.find(m => m.id === progress.moduleId);
    if (!mod) return;
    setSelectedModule(mod);
    setView('quiz');
    setAnswers(progress.answers || []);
    setCurrentQ(progress.currentQ || 0);
    setScore(progress.score || 0);
    setRetryMode(progress.retryMode || false);
    setRetryQuestions(progress.retryQuestions || []);
    setRetryScore(progress.retryScore || 0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const discardProgress = () => {
    clearProgress();
    setSelectedModule(null);
    setView('dashboard');
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setShowFeedback(true);
    const questions = retryMode ? retryQuestions : selectedModule.quiz;
    if (option === questions[currentQ].answer) {
      if (retryMode) {
        setRetryScore(retryScore + 1);
      } else {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    const questions = retryMode ? retryQuestions : selectedModule.quiz;
    const question = questions[currentQ];
    const isCorrect = selectedAnswer === question.answer;
    const newAnswers = [...answers, {
      question: question.q,
      options: question.options,
      selectedAnswer,
      correctAnswer: question.answer,
      isCorrect
    }];
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      clearProgress();
      setView('result');
      setRetryMode(false);
    }
  };

  const reviewMistakes = () => {
    setView('review');
  };

  const retryWrongAnswers = () => {
    const wrong = answers.filter(a => !a.isCorrect).map(a => ({
      q: a.question,
      options: a.options,
      answer: a.correctAnswer
    }));
    if (wrong.length === 0) return;
    setRetryQuestions(wrong);
    setRetryMode(true);
    setCurrentQ(0);
    setAnswers([]);
    setRetryScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setView('quiz');
  };

  const retryFullQuiz = () => {
    clearProgress();
    setAnswers([]);
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setRetryMode(false);
    setRetryQuestions([]);
    setRetryScore(0);
    setView('quiz');
  };

  const generateProblem = () => {
    setView('problem');
  };

  const resetToDashboard = () => {
    clearProgress();
    setSelectedModule(null);
    setView('dashboard');
  };

  // --- DASHBOARD VIEW ---
  if (view === 'dashboard') {
    const currentProgress = loadProgress();

    return (
      <div className="min-h-screen p-8 max-w-5xl mx-auto">
        <header className="border-b-2 border-42accent pb-4 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-42accent">42 PISCINE - MOULINETTE TESTER</h1>
            <p className="text-42text mt-2">Subject: C Piscine @ 42 | {modules.reduce((acc, m) => acc + m.quiz.length, 0)}+ Expert Questions</p>
          </div>

          <a
            href="https://github.com/SegMind25/1337Quizer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-42accent transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.654 1.653.244 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.804 5.625-5.475 5.92.43.372.815 1.103.815 2.222 0 1.604-.014 2.898-.014 3.293 0 .319.216.694.825.576C20.565 21.795 24 17.298 24 12 24 5.37 18.627 0 12 0z"/>
            </svg>
            <span className="font-mono text-sm hidden md:inline">SegMind25/1337Quizer</span>
          </a>
        </header>

        {currentProgress && currentProgress.view === 'quiz' && (
          <div className="mb-6 p-4 bg-42pass/10 border border-42pass">
            <p className="text-42pass font-bold mb-2">
              You have an in-progress evaluation for {currentProgress.moduleId} (Question {currentProgress.currentQ + 1})
            </p>
            <div className="flex gap-4">
              <button
                onClick={continueQuiz}
                className="bg-42pass text-black px-6 py-2 font-bold hover:bg-white transition-colors"
              >
                CONTINUE EVALUATION
              </button>
              <button
                onClick={discardProgress}
                className="border border-gray-700 text-gray-400 px-6 py-2 hover:bg-gray-800 transition-all"
              >
                DISCARD PROGRESS
              </button>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl text-white mb-4">Available Projects:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod) => (
              <div key={mod.id} className="border border-gray-700 p-4 hover:border-42accent transition-all flex flex-col">
                <h3 className="text-42accent font-bold mb-2">{mod.id}</h3>
                <p className="text-sm text-gray-400 mb-2 flex-grow">{mod.name}</p>
                <span className="text-xs text-gray-500 mb-4">{mod.quiz.length} Questions</span>
                <button
                  onClick={() => startQuiz(mod)}
                  className="bg-42accent text-black px-4 py-2 font-bold hover:bg-white transition-colors w-full mt-auto"
                >
                  START EVALUATION
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- QUIZ VIEW ---
  if (view === 'quiz') {
    const questions = retryMode ? retryQuestions : selectedModule.quiz;
    const question = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;
    const isCorrect = selectedAnswer === question.answer;

    const getOptionStyle = (opt) => {
      if (!showFeedback) return 'border-gray-700 hover:border-42accent hover:bg-gray-800';
      if (opt === question.answer) return 'border-42pass bg-gray-800 text-42pass';
      if (opt === selectedAnswer && !isCorrect) return 'border-42fail bg-gray-800 text-42fail';
      return 'border-gray-700 opacity-50';
    };

    return (
      <div className="min-h-screen p-8 max-w-3xl mx-auto flex flex-col justify-center">
        <div className="border border-gray-700 p-8 bg-42bg shadow-lg">
          <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
            <span className="text-42accent font-bold">
              {retryMode ? `${selectedModule.id} - RETRY WRONG ANSWERS` : `${selectedModule.id} - EVALUATION`}
            </span>
            <span className="text-gray-400">Question {currentQ + 1}/{questions.length}</span>
          </div>

          <div className="w-full bg-gray-800 h-1 mb-8">
            <div className="bg-42accent h-1 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>

          {retryMode && (
            <div className="mb-4 p-2 bg-yellow-900/30 border border-yellow-700 text-yellow-400 text-sm">
              Retrying {questions.length} incorrect question{questions.length > 1 ? 's' : ''}
            </div>
          )}

          <h2 className="text-xl text-white mb-8">{question.q}</h2>

          <div className="flex flex-col gap-4">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => !showFeedback && handleAnswer(opt)}
                disabled={showFeedback}
                className={`text-left p-4 border transition-all text-42text ${getOptionStyle(opt)}`}
              >
                <span className="mr-2">[{String.fromCharCode(97 + idx)}]</span> {opt}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`mt-6 p-4 border ${isCorrect ? 'border-42pass bg-gray-900' : 'border-42fail bg-gray-900'}`}>
              <p className={`font-bold ${isCorrect ? 'text-42pass' : 'text-42fail'}`}>
                {isCorrect ? 'CORRECT!' : 'WRONG!'}
              </p>
              {!isCorrect && (
                <p className="text-42pass mt-2">
                  Correct answer: <span className="font-bold">{question.answer}</span>
                </p>
              )}
              <button
                onClick={nextQuestion}
                className="mt-4 bg-42accent text-black px-6 py-2 font-bold hover:bg-white transition-colors"
              >
                {currentQ < questions.length - 1 ? 'NEXT QUESTION' : 'SEE RESULTS'}
              </button>
            </div>
          )}

          <button
            onClick={resetToDashboard}
            className="mt-4 text-gray-500 text-sm hover:text-gray-300 transition-colors"
          >
            EXIT EVALUATION
          </button>
        </div>

        <p className="text-gray-600 text-xs text-center mt-4">
          Your progress is automatically saved. You can safely close or refresh the page.
        </p>
      </div>
    );
  }

  // --- RESULT VIEW ---
  if (view === 'result') {
    const totalQuestions = retryMode ? answers.length : selectedModule.quiz.length;
    const correctCount = retryMode ? answers.filter(a => a.isCorrect).length : score;
    const wrongCount = answers.filter(a => !a.isCorrect).length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 50;

    return (
      <div className="min-h-screen p-8 max-w-3xl mx-auto flex flex-col justify-center">
        <div className={`border-2 p-8 bg-42bg shadow-lg ${passed ? 'border-42pass' : 'border-42fail'}`}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">MOULINETTE RESULT</h2>
            <div className={`text-6xl font-bold ${passed ? 'text-42pass' : 'text-42fail'}`}>
              {percentage}%
            </div>
            <p className={`mt-4 font-bold ${passed ? 'text-42pass' : 'text-42fail'}`}>
              {passed ? 'PROJECT VALIDATED' : 'PROJECT FAILED - CHEAT DETECTED? (-42)'}
            </p>
          </div>

          <div className="bg-gray-900 p-4 mb-6 border border-gray-700">
            <p className="text-gray-400">Score Details:</p>
            <p className="text-white">Correct answers: {correctCount} / {totalQuestions}</p>
            <p className="text-white">Wrong answers: {wrongCount}</p>
            <p className="text-white">Threshold: 50%</p>
            {wrongCount > 0 && (
              <p className="text-42fail mt-2">
                Faults: {wrongCount} error{wrongCount > 1 ? 's' : ''} detected
              </p>
            )}
          </div>

          {wrongCount > 0 && (
            <button
              onClick={reviewMistakes}
              className="w-full bg-yellow-600 text-black p-4 font-bold hover:bg-yellow-500 transition-colors mb-4"
            >
              REVIEW MISTAKES ({wrongCount})
            </button>
          )}

          {wrongCount > 0 && (
            <button
              onClick={retryWrongAnswers}
              className="w-full bg-orange-600 text-black p-4 font-bold hover:bg-orange-500 transition-colors mb-4"
            >
              RETRY WRONG ANSWERS ({wrongCount})
            </button>
          )}

          <button
            onClick={retryFullQuiz}
            className="w-full bg-purple-600 text-black p-4 font-bold hover:bg-purple-500 transition-colors mb-4"
          >
            RETRY FULL QUIZ
          </button>

          {passed && (
            <button
              onClick={generateProblem}
              className="w-full bg-42accent text-black p-4 font-bold hover:bg-white transition-colors mb-4"
            >
              CLAIM RANDOM EXAM PROBLEM
            </button>
          )}

          <button
            onClick={resetToDashboard}
            className="w-full border border-gray-700 text-gray-400 p-4 hover:bg-gray-800 transition-all"
          >
            BACK TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  // --- REVIEW MISTAKES VIEW ---
  if (view === 'review') {
    const wrongAnswers = answers.filter(a => !a.isCorrect);

    return (
      <div className="min-h-screen p-8 max-w-3xl mx-auto">
        <div className="border border-gray-700 p-8 bg-42bg">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <span className="text-42fail font-bold">FAULT REPORT - {selectedModule.id}</span>
            <span className="text-gray-400">{wrongAnswers.length} error{wrongAnswers.length > 1 ? 's' : ''}</span>
          </div>

          <div className="mb-6 bg-gray-900 p-4 border border-gray-700">
            <p className="text-gray-400">Summary:</p>
            <p className="text-white">You answered <span className="text-42pass">{answers.filter(a => a.isCorrect).length}</span> correctly and <span className="text-42fail">{wrongAnswers.length}</span> incorrectly out of {answers.length} questions.</p>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            {wrongAnswers.map((item, idx) => (
              <div key={idx} className="border border-42fail bg-gray-900 p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-42fail font-bold text-sm">FAULT #{idx + 1}</span>
                </div>
                <p className="text-white mb-4">{item.question}</p>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 w-20 shrink-0">Your answer:</span>
                    <span className="text-42fail line-through">{item.selectedAnswer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 w-20 shrink-0">Correct:</span>
                    <span className="text-42pass font-bold">{item.correctAnswer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={retryWrongAnswers}
              className="flex-1 bg-orange-600 text-black p-4 font-bold hover:bg-orange-500 transition-colors"
            >
              RETRY WRONG ANSWERS ({wrongAnswers.length})
            </button>
            <button
              onClick={() => setView('result')}
              className="flex-1 border border-gray-700 text-gray-400 p-4 hover:bg-gray-800 transition-all"
            >
              BACK TO RESULTS
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- PROBLEM SOLVING VIEW ---
  if (view === 'problem' && selectedModule) {
    return (
      <div className="min-h-screen p-8 max-w-4xl mx-auto">
        <div className="border border-42accent p-8 bg-42bg">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <span className="text-42accent font-bold">RANDOM EXERCISE GENERATOR</span>
            <span className="text-gray-400">Module: {selectedModule.id}</span>
          </div>

          <div className="bg-gray-900 p-6 border border-gray-700 mb-6">
            <p className="text-42text text-lg whitespace-pre-wrap">
              <span className="text-42accent">{'$> '}</span>
              {selectedModule.problem}
            </p>
          </div>

          <div className="bg-gray-900 p-4 border border-gray-700 mb-6">
            <p className="text-gray-400 mb-2">Allowed functions:</p>
            <p className="text-42pass">
              {selectedModule.id === 'C00' || selectedModule.id === 'C01' || selectedModule.id === 'C02' || selectedModule.id === 'C05' || selectedModule.id === 'C06' || selectedModule.id === 'C08' ? 'write, malloc' : 'None or specified in subject'}
            </p>
            <p className="text-gray-400 mt-2 text-sm">* Remember to add the 42 Header and pass Norminette!</p>
          </div>

          <div className="flex flex-col gap-4">
            <textarea
              className="w-full h-48 bg-black border border-gray-700 p-4 text-42text font-mono focus:outline-none focus:border-42accent"
              placeholder="// Write your C code here..."
            ></textarea>

            <div className="flex gap-4">
              <button
                onClick={() => alert('Compiling with: cc -Wall -Wextra -Werror...\n\nNorminette check...\n\n(In a real environment, your code would be tested here.)')}
                className="flex-1 bg-42accent text-black p-4 font-bold hover:bg-white transition-colors"
              >
                COMPILE & TEST
              </button>
              <button
                onClick={resetToDashboard}
                className="flex-1 border border-gray-700 text-gray-400 p-4 hover:bg-gray-800 transition-all"
              >
                NEXT PROJECT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
