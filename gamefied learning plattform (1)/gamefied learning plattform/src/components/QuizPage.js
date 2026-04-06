import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Certificate from './Certificate';
import { AuthContext } from '../context/AuthContext';

export default function QuizPage({ courses, progress, onQuizComplete, onRestart }) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const restartRequested = new URLSearchParams(location.search).get('restart') === '1';

  // FIX 1: Use String comparison so IDs like "js-101", "react-101" work correctly
  const course = courses.find(c => String(c.id) === String(courseId));
  const courseProg = progress[courseId] || { level: 1, completed: false };

  const [level, setLevel] = useState(courseProg.level || 1);
  const [completed, setCompleted] = useState(courseProg.completed || false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('quiz');
  const [quizFinished, setQuizFinished] = useState(false);

  // Handle restart
  useEffect(() => {
    if (restartRequested && course) {
      onRestart(courseId);
      setLevel(1);
      setCompleted(false);
      setQuizFinished(false);
      setStatus('quiz');
      setQuestions([]);
      setCurrent(0);
      setScore(0);
      setSelected(null);
      navigate(`/courses/${course.id}/quiz`, { replace: true });
    }
  }, [restartRequested]);

  // FIX 2: Removed 'completed' from the guard — it was blocking questions from loading
  // when a course was previously completed
  useEffect(() => {
    if (!course || quizFinished || restartRequested) return;
    const start = (level - 1) * 10;
    const slice = course.quiz.slice(start, start + 10);
    if (slice.length === 0) return;
    setQuestions(slice);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setStatus('quiz');
  }, [course, level, quizFinished]);

  const retryLevel = () => {
    const start = (level - 1) * 10;
    setQuestions(course.quiz.slice(start, start + 10));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setStatus('quiz');
  };

  const handleAnswer = (opt) => {
    if (status !== 'quiz' || selected) return;

    const q = questions[current];
    const correct = opt === q.answer;
    setSelected(opt);

    // FIX 3: Calculate newScore locally to avoid stale closure bug
    const newScore = score + (correct ? 1 : 0);

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setScore(newScore);
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        setScore(newScore);
        const passed = onQuizComplete(courseId, newScore);
        setStatus(passed ? 'passed' : 'failed');
        if (passed && level >= 5) {
          setQuizFinished(true);
          setCompleted(true);
        } else if (passed) {
          setLevel(prev => prev + 1);
        }
      }
    }, 800);
  };

  if (!course) {
    return <div className="loading-screen">System Offline: Course Not Found</div>;
  }

  if (!questions.length && !quizFinished) {
    return <div className="loading-screen">Syncing Data Streams...</div>;
  }

  const q = questions[current];

  return (
    <div className="quiz-universe">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');

        .quiz-universe {
          min-height: 100vh;
          background: radial-gradient(circle at top right, #1e1b4b, #020617, #000000);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Outfit', sans-serif;
          overflow: hidden;
        }

        .main-card {
          position: relative;
          width: 100%;
          max-width: 720px;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(25px);
          border-radius: 40px;
          padding: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 50px rgba(79, 70, 229, 0.15);
          z-index: 10;
        }

        .main-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 42px;
          padding: 2px;
          background: linear-gradient(45deg, #4f46e5, transparent, #06b6d4, transparent, #4f46e5);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .level-tag {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #06b6d4;
          background: rgba(6, 182, 212, 0.1);
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid rgba(6, 182, 212, 0.3);
        }

        .progress-orbit {
          margin: 30px 0;
          height: 6px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4f46e5, #06b6d4);
          border-radius: 10px;
          box-shadow: 0 0 20px #4f46e5;
          transition: width 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
        }

        .question-header {
          font-size: 2rem;
          font-weight: 600;
          color: #f8fafc;
          line-height: 1.2;
          margin-bottom: 40px;
          animation: slideUp 0.5s ease forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .options-grid {
          display: grid;
          gap: 16px;
        }

        .option-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 20px 25px;
          color: #94a3b8;
          font-size: 1.1rem;
          font-weight: 400;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .option-item:hover:not(:disabled) {
          background: rgba(79, 70, 229, 0.1);
          border-color: #4f46e5;
          color: #f8fafc;
          transform: scale(1.02);
        }

        .option-item.correct {
          background: rgba(16, 185, 129, 0.2) !important;
          border-color: #10b981 !important;
          color: #34d399 !important;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
        }

        .option-item.incorrect {
          background: rgba(239, 68, 68, 0.2) !important;
          border-color: #ef4444 !important;
          color: #f87171 !important;
        }

        .result-view {
          text-align: center;
          animation: zoomIn 0.5s ease;
        }

        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .big-icon {
          font-size: 6rem;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 20px rgba(79, 70, 229, 0.5));
        }

        .action-button {
          background: #4f46e5;
          color: white;
          padding: 18px 40px;
          border-radius: 18px;
          font-weight: 700;
          font-size: 1.1rem;
          border: none;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 10px 30px rgba(79, 70, 229, 0.4);
          margin-top: 20px;
        }

        .action-button:hover {
          background: #4338ca;
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(79, 70, 229, 0.6);
        }

        .loading-screen {
          color: #4f46e5;
          font-size: 1.5rem;
          text-align: center;
          margin-top: 20%;
          font-family: 'Outfit', sans-serif;
        }
      `}</style>

      <div className="main-card">

        {/* ── QUIZ IN PROGRESS ── */}
        {status === 'quiz' && !quizFinished && q && (
          <div className="quiz-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="level-tag">Lvl {level}</span>
              <span style={{ color: '#64748b', fontWeight: '600' }}>{current + 1} / {questions.length}</span>
            </div>

            <div className="progress-orbit">
              <div
                className="progress-fill"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="question-header" key={current}>
              {q.question}
            </h2>

            <div className="options-grid">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  className={`option-item ${
                    selected
                      ? opt === q.answer
                        ? 'correct'
                        : opt === selected
                        ? 'incorrect'
                        : ''
                      : ''
                  }`}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!selected}
                  style={{
                    animation: `slideUp 0.4s ease ${i * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── LEVEL PASSED ── */}
        {status === 'passed' && !quizFinished && (
          <div className="result-view">
            <div className="big-icon">💎</div>
            <h1 style={{ color: 'white', fontSize: '2.5rem' }}>Efficiency Verified</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '30px' }}>
              Level {level - 1} complete. Score: {score}/10
            </p>
            <button
              className="action-button"
              onClick={() => navigate(`/courses/${course.id}/quiz`)}
            >
              Initialize Level {Math.min(level, 5)}
            </button>
          </div>
        )}

        {/* ── LEVEL FAILED ── */}
        {status === 'failed' && (
          <div className="result-view">
            <div className="big-icon">🔴</div>
            <h1 style={{ color: 'white', fontSize: '2.5rem' }}>Sync Failed</h1>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '30px' }}>
              Result: {score}/10. Recalibrate and try again.
            </p>
            <button
              className="action-button"
              style={{ background: '#ef4444', boxShadow: '0 10px 30px rgba(239,68,68,0.4)' }}
              onClick={retryLevel}
            >
              Restart Level {level}
            </button>
          </div>
        )}

        {/* ── ALL LEVELS COMPLETE ── */}
        {quizFinished && (
          <div className="result-view">
            <div className="big-icon">🔥</div>
            <h1 style={{ color: 'white', fontSize: '2.5rem' }}>Mastery Achieved</h1>
            <div style={{ margin: '30px 0' }}>
              <Certificate course={course} user={user} progress={courseProg} />
            </div>
            <button
              className="action-button"
              onClick={() => navigate(`/courses/${course.id}/quiz?restart=1`)}
            >
              Restart Core Protocol
            </button>
          </div>
        )}

      </div>
    </div>
  );
}