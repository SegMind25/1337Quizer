import React, { useState } from 'react';
import { modules } from './data.js'; // Import the massive database

export default function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [view, setView] = useState('dashboard'); // dashboard, quiz, result, problem
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = (module) => {
    setSelectedModule(module);
    setAnswers([]);
    setCurrentQ(0);
    setScore(0);
    setView('quiz');
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (option === selectedModule.quiz[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ < selectedModule.quiz.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setView('result');
    }
  };

  const generateProblem = () => {
    setView('problem');
  };

  const resetToDashboard = () => {
    setSelectedModule(null);
    setView('dashboard');
  };

  // --- DASHBOARD VIEW ---
  if (view === 'dashboard') {
    return (
      <div className="min-h-screen p-8 max-w-5xl mx-auto">
        <header className="border-b-2 border-42accent pb-4 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-42accent">42 PISCINE - MOULINETTE TESTER</h1>
            <p className="text-42text mt-2">Subject: C Piscine @ 42 | {modules.reduce((acc, m) => acc + m.quiz.length, 0)}+ Expert Questions</p>
          </div>
          
          {/* GitHub Link */}
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
    const question = selectedModule.quiz[currentQ];
    const progress = ((currentQ + 1) / selectedModule.quiz.length) * 100;
    
    return (
      <div className="min-h-screen p-8 max-w-3xl mx-auto flex flex-col justify-center">
        <div className="border border-gray-700 p-8 bg-42bg shadow-lg">
          <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
            <span className="text-42accent font-bold">{selectedModule.id} - EVALUATION</span>
            <span className="text-gray-400">Question {currentQ + 1}/{selectedModule.quiz.length}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-800 h-1 mb-8">
            <div className="bg-42accent h-1 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>

          <h2 className="text-xl text-white mb-8">{question.q}</h2>
          
          <div className="flex flex-col gap-4">
            {question.options.map((opt, idx) => (
              <button 
                key={idx}
                onClick={() => handleAnswer(opt)}
                className="text-left p-4 border border-gray-700 hover:border-42accent hover:bg-gray-800 transition-all text-42text"
              >
                <span className="text-42accent mr-2">[{String.fromCharCode(97 + idx)}]</span> {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- RESULT VIEW ---
  if (view === 'result') {
    const percentage = Math.round((score / selectedModule.quiz.length) * 100);
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
            <p className="text-white">Correct answers: {score} / {selectedModule.quiz.length}</p>
            <p className="text-white">Threshold: 50%</p>
          </div>

          <button 
            onClick={generateProblem}
            className="w-full bg-42accent text-black p-4 font-bold hover:bg-white transition-colors mb-4"
          >
            CLAIM RANDOM EXAM PROBLEM
          </button>
          
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
              <span className="text-42accent">$> </span>
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
