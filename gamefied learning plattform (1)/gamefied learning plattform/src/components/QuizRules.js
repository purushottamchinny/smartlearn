import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function QuizRules({ courses }) {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // FIX: Same string comparison used in QuizPage so we find the course correctly
  const course = courses
    ? courses.find(c => String(c.id) === String(courseId))
    : null;

  const handleStart = () => {
    navigate(`/courses/${courseId}/quiz`);
  };

  const rules = [
    { label: "Format",   text: "50 multiple choice questions split across 5 levels." },
    { label: "Goal",     text: "Target Score: 7/10 or higher per level to advance." },
    { label: "Risk",     text: "Zero risk: No negative marking included." },
    { label: "Access",   text: "Unlimited retries available on failure." },
    { label: "Data",     text: "Instant results and performance breakdown." }
  ];

  // Guard: if course not found, show a helpful error instead of blank screen
  if (!course) {
    return (
      <div className="rules-viewport">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Outfit:wght@800&display=swap');
          .rules-viewport {
            min-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #020617;
            font-family: 'Space Grotesk', sans-serif;
          }
          .error-box {
            text-align: center;
            color: #f87171;
            font-size: 1.5rem;
          }
          .error-box p { color: #64748b; font-size: 1rem; margin-top: 10px; }
          .back-btn {
            margin-top: 24px;
            padding: 12px 32px;
            background: #4f46e5;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            cursor: pointer;
            font-family: 'Space Grotesk', sans-serif;
          }
        `}</style>
        <div className="error-box">
          <div>⚠️ Course Not Found</div>
          <p>Could not locate course with ID: <strong>{courseId}</strong></p>
          <button className="back-btn" onClick={() => navigate('/courses')}>
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rules-viewport">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Outfit:wght@800&display=swap');

          .rules-viewport {
            min-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #020617;
            background-image: 
              radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.05) 0%, transparent 50%);
            font-family: 'Space Grotesk', sans-serif;
            padding: 20px;
            overflow: hidden;
            position: relative;
          }

          .rules-viewport::after {
            content: " ";
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%),
                        linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02));
            z-index: 10;
            background-size: 100% 3px, 3px 100%;
            pointer-events: none;
          }

          .briefing-card {
            position: relative;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(20px);
            border-left: 4px solid #6366f1;
            padding: 60px;
            max-width: 650px;
            width: 100%;
            box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
            animation: slideInMain 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
          }

          @keyframes slideInMain {
            from { opacity: 0; transform: translateX(-50px); }
            to   { opacity: 1; transform: translateX(0); }
          }

          .briefing-card::before {
            content: '';
            position: absolute;
            top: 10px; right: 10px;
            width: 40px; height: 40px;
            border-top: 2px solid #06b6d4;
            border-right: 2px solid #06b6d4;
          }

          .course-title-badge {
            display: inline-block;
            margin-bottom: 12px;
            background: rgba(6, 182, 212, 0.1);
            color: #06b6d4;
            padding: 4px 14px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            border: 1px solid rgba(6, 182, 212, 0.3);
            border-radius: 2px;
            max-width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .briefing-header {
            margin-bottom: 45px;
          }

          .briefing-header h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 56px;
            font-weight: 800;
            color: #fff;
            margin: 0;
            line-height: 0.9;
            text-transform: uppercase;
            letter-spacing: -2px;
          }

          .briefing-header .tagline {
            display: inline-block;
            margin-top: 15px;
            background: rgba(99, 102, 241, 0.1);
            color: #818cf8;
            padding: 4px 12px;
            font-weight: 700;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            border: 1px solid rgba(99, 102, 241, 0.3);
          }

          .node-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 50px;
          }

          .node-item {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 16px 20px;
            border-radius: 4px;
            transition: all 0.3s ease;
            cursor: default;
            animation: nodeReveal 0.5s ease forwards;
            opacity: 0;
          }

          .node-item:hover {
            background: rgba(99, 102, 241, 0.05);
            border-color: rgba(99, 102, 241, 0.4);
            transform: scale(1.02);
          }

          @keyframes nodeReveal {
            from { opacity: 0; transform: translateY(10px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .node-label {
            min-width: 80px;
            font-size: 11px;
            font-weight: 800;
            color: #06b6d4;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            margin-right: 20px;
          }

          .node-text {
            color: #cbd5e1;
            font-size: 15px;
            font-weight: 300;
          }

          .action-container {
            position: relative;
          }

          .launch-btn {
            width: 100%;
            height: 70px;
            background: #6366f1;
            color: #fff;
            border: none;
            font-family: 'Outfit', sans-serif;
            font-size: 20px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 4px;
            cursor: pointer;
            transition: all 0.3s;
            clip-path: polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%);
          }

          .launch-btn:hover {
            background: #4f46e5;
            letter-spacing: 6px;
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.4);
          }

          .launch-btn:active {
            transform: scale(0.98);
          }

          .btn-glitch-layer {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: #06b6d4;
            z-index: -1;
            opacity: 0;
            transition: all 0.3s;
          }

          .launch-btn:hover + .btn-glitch-layer {
            opacity: 0.2;
            transform: translate(5px, 5px);
          }
        `}
      </style>

      <div className="briefing-card">
        <div className="briefing-header">
          {/* Shows the actual course name so user knows they're in the right place */}
          <div className="course-title-badge">📚 {course.title}</div>
          <span className="tagline">System Ready // Mode: Assessment</span>
          <h2>MISSION <br/>PARAMETERS</h2>
        </div>

        <div className="node-list">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="node-item"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="node-label">{rule.label}</div>
              <div className="node-text">{rule.text}</div>
            </div>
          ))}
        </div>

        <div className="action-container">
          <button className="launch-btn" onClick={handleStart}>
            Begin Protocol
          </button>
          <div className="btn-glitch-layer"></div>
        </div>
      </div>
    </div>
  );
}