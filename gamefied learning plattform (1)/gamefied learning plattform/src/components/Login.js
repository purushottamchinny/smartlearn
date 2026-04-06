import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// 3D Character SVG that reacts to password typing
function LoginCharacter({ eyesClosed }) {
  return (
    <div className="char-wrap">
      <svg
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
        className="char-svg"
      >
        {/* Glow under character */}
        <ellipse cx="100" cy="210" rx="55" ry="10" fill="rgba(0,245,255,0.18)" />

        {/* Body */}
        <rect x="55" y="130" width="90" height="70" rx="18" fill="url(#bodyGrad)" />
        {/* Body shine */}
        <rect x="63" y="138" width="30" height="10" rx="5" fill="rgba(255,255,255,0.13)" />

        {/* Arms */}
        <rect x="20" y="140" width="35" height="18" rx="9" fill="url(#armGrad)" className="arm-left" />
        <rect x="145" y="140" width="35" height="18" rx="9" fill="url(#armGrad)" className="arm-right" />

        {/* Hands */}
        <circle cx="22" cy="149" r="9" fill="url(#handGrad)" />
        <circle cx="178" cy="149" r="9" fill="url(#handGrad)" />

        {/* Neck */}
        <rect x="85" y="120" width="30" height="18" rx="8" fill="url(#neckGrad)" />

        {/* Head */}
        <rect x="42" y="50" width="116" height="78" rx="28" fill="url(#headGrad)" />

        {/* Head shine */}
        <ellipse cx="80" cy="63" rx="22" ry="9" fill="rgba(255,255,255,0.13)" />

        {/* Ears */}
        <circle cx="42" cy="89" r="10" fill="url(#earGrad)" />
        <circle cx="158" cy="89" r="10" fill="url(#earGrad)" />
        <circle cx="42" cy="89" r="5" fill="#00f5ff" opacity="0.5" />
        <circle cx="158" cy="89" r="5" fill="#00f5ff" opacity="0.5" />

        {/* Antenna */}
        <rect x="97" y="28" width="6" height="26" rx="3" fill="url(#antennaGrad)" />
        <circle cx="100" cy="24" r="9" fill="url(#antennaBallGrad)" className="antenna-ball" />
        <circle cx="100" cy="24" r="4" fill="white" opacity="0.7" />

        {/* Eyes */}
        {eyesClosed ? (
          <>
            {/* Closed eyes - curved lines */}
            <g className="eye-closed-group">
              <path d="M72 87 Q82 80 92 87" stroke="#00f5ff" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M108 87 Q118 80 128 87" stroke="#00f5ff" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              {/* Lashes */}
              <line x1="74" y1="86" x2="71" y2="90" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" />
              <line x1="80" y1="82" x2="79" y2="87" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" />
              <line x1="87" y1="82" x2="87" y2="87" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" />
              <line x1="110" y1="86" x2="107" y2="90" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" />
              <line x1="116" y1="82" x2="115" y2="87" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" />
              <line x1="123" y1="82" x2="123" y2="87" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" />
            </g>
          </>
        ) : (
          <>
            {/* Open eyes */}
            <g className="eye-open-group">
              {/* Eye sockets */}
              <ellipse cx="82" cy="87" rx="16" ry="15" fill="#0b0f19" />
              <ellipse cx="118" cy="87" rx="16" ry="15" fill="#0b0f19" />
              {/* Eye glow rings */}
              <ellipse cx="82" cy="87" rx="16" ry="15" fill="none" stroke="#00f5ff" strokeWidth="2" opacity="0.6" />
              <ellipse cx="118" cy="87" rx="16" ry="15" fill="none" stroke="#00f5ff" strokeWidth="2" opacity="0.6" />
              {/* Iris */}
              <circle cx="82" cy="87" r="9" fill="url(#irisGrad)" className="iris-l" />
              <circle cx="118" cy="87" r="9" fill="url(#irisGrad)" className="iris-r" />
              {/* Pupil */}
              <circle cx="82" cy="87" r="5" fill="#0b0f19" />
              <circle cx="118" cy="87" r="5" fill="#0b0f19" />
              {/* Highlight */}
              <circle cx="85" cy="84" r="2.5" fill="white" opacity="0.9" />
              <circle cx="121" cy="84" r="2.5" fill="white" opacity="0.9" />
            </g>
          </>
        )}

        {/* Mouth / speaker grill */}
        <rect x="75" y="108" width="50" height="10" rx="5" fill="#0b0f19" opacity="0.7" />
        <rect x="80" y="111" width="5" height="4" rx="2" fill="#00f5ff" opacity="0.8" />
        <rect x="90" y="111" width="5" height="4" rx="2" fill="#00f5ff" opacity="0.8" />
        <rect x="100" y="111" width="5" height="4" rx="2" fill="#00f5ff" opacity="0.8" />
        <rect x="110" y="111" width="5" height="4" rx="2" fill="#00f5ff" opacity="0.8" />

        {/* Chest panel */}
        <rect x="68" y="148" width="64" height="38" rx="10" fill="rgba(0,0,0,0.3)" />
        <circle cx="82" cy="162" r="6" fill="none" stroke="#00f5ff" strokeWidth="1.5" />
        <circle cx="82" cy="162" r="3" fill="#00f5ff" opacity="0.7" className="chest-light" />
        <rect x="94" y="158" width="28" height="3" rx="1.5" fill="#7c3aed" opacity="0.8" />
        <rect x="94" y="164" width="18" height="3" rx="1.5" fill="#00f5ff" opacity="0.6" />
        <rect x="94" y="170" width="22" height="3" rx="1.5" fill="#7c3aed" opacity="0.5" />

        {/* Legs */}
        <rect x="68" y="196" width="26" height="18" rx="8" fill="url(#legGrad)" />
        <rect x="106" y="196" width="26" height="18" rx="8" fill="url(#legGrad)" />

        {/* Feet */}
        <rect x="64" y="208" width="34" height="10" rx="5" fill="url(#footGrad)" />
        <rect x="102" y="208" width="34" height="10" rx="5" fill="url(#footGrad)" />

        {/* Gradients */}
        <defs>
          <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e2a45" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="armGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e2a45" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="handGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="neckGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e2a45" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="earGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="antennaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#00f5ff" />
          </linearGradient>
          <radialGradient id="antennaBallGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
          <radialGradient id="irisGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
          <linearGradient id="legGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e2a45" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="footGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [show, setShow] = useState(false);
  const [eyesClosed, setEyesClosed] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);

  const nav = useNavigate();

  // Close eyes when password field is focused OR has text and not shown
  useEffect(() => {
    if (pwFocused && !show) {
      setEyesClosed(true);
    } else {
      setEyesClosed(false);
    }
  }, [pwFocused, show, pw]);

  const submit = (e) => {
    e.preventDefault();
    try {
      login({ email, password: pw });
      nav('/dashboard');
    } catch (c) {
      setErr(c.message);
    }
  };

  return (
    <>
      <div className="auth-wrapper">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <div className="left-content">
            <div className="badge">✦ AI LEARNING PLATFORM</div>
            <h1>Welcome<br />Back <span className="wave">👋</span></h1>
            <p>Login and start learning — your AI-powered journey continues right here.</p>
            <div className="feature-list">
              <div className="feat"><span className="feat-dot"></span>Personalized AI Lessons</div>
              <div className="feat"><span className="feat-dot"></span>Real-time Progress Tracking</div>
              <div className="feat"><span className="feat-dot"></span>Smart Study Assistant</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <div className="auth-card">

            {/* 3D Robot Character */}
            <div className="robot-container">
              <LoginCharacter eyesClosed={eyesClosed} />
              <div className="robot-label">
                {eyesClosed
                  ? "I won't peek! 🙈"
                  : "Login & Start Learning! 🚀"}
              </div>
            </div>

            <h2>Login</h2>

            {err && <p className="error">{err}</p>}

            <form onSubmit={submit}>
              <div className="input-group">
                <span className="input-icon"></span>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group password-box">
                <span className="input-icon"></span>
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  onFocus={() => setPwFocused(true)}
                  onBlur={() => setPwFocused(false)}
                />
                <span
                  className="toggle-eye"
                  onClick={() => setShow(!show)}
                  title={show ? "Hide password" : "Show password"}
                >
                  {show ? "🙈" : "👁"}
                </span>
              </div>

              <button type="submit" className="submit-btn">
                <span>Login</span>
                <span className="btn-arrow">→</span>
              </button>
            </form>

            <p className="register-link">
              New user? <Link to="/register">Create Account</Link>
            </p>
          </div>
        </div>

        {/* BACKGROUND GLOW */}
        <div className="bg-blur b1"></div>
        <div className="bg-blur b2"></div>
        <div className="bg-blur b3"></div>

        {/* Grid overlay */}
        <div className="grid-overlay"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --cyan: #00f5ff;
          --purple: #7c3aed;
          --dark: #0b0f19;
          --card: rgba(255,255,255,0.04);
          --border: rgba(255,255,255,0.09);
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
        }

        /* ========== LAYOUT ========== */
        .auth-wrapper {
          position: fixed;
          inset: 0;
          display: flex;
          background: var(--dark);
          color: white;
          overflow: hidden;
        }

        /* ========== GRID OVERLAY ========== */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: 0;
        }

        /* ========== LEFT ========== */
        .auth-left {
          flex: 1.1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px;
          z-index: 2;
        }

        .left-content {
          max-width: 440px;
        }

        .badge {
          display: inline-block;
          font-family: 'Orbitron', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--cyan);
          border: 1px solid rgba(0,245,255,0.3);
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 28px;
          background: rgba(0,245,255,0.06);
        }

        .auth-left h1 {
          font-family: 'Orbitron', monospace;
          font-size: 52px;
          font-weight: 900;
          line-height: 1.15;
          background: linear-gradient(135deg, #ffffff 0%, var(--cyan) 50%, var(--purple) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
        }

        .wave {
          display: inline-block;
          animation: wave 2s infinite;
          transform-origin: 70% 70%;
          -webkit-text-fill-color: initial;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-15deg); }
          40% { transform: rotate(10deg); }
          60% { transform: rotate(-10deg); }
          80% { transform: rotate(5deg); }
        }

        .auth-left p {
          color: #94a3b8;
          font-size: 16px;
          line-height: 1.7;
          margin-bottom: 32px;
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feat {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #cbd5e1;
        }

        .feat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--cyan), var(--purple));
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--cyan);
        }

        /* ========== RIGHT ========== */
        .auth-right {
          flex: 0.9;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
          padding: 30px;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          padding: 36px 40px 40px;
          border-radius: 28px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(0,245,255,0.15);
          box-shadow:
            0 0 60px rgba(0,245,255,0.08),
            0 0 0 1px rgba(255,255,255,0.04) inset;
          animation: cardIn 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ========== ROBOT ========== */
        .robot-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 10px;
        }

        .char-wrap {
          width: 160px;
          height: 175px;
          filter: drop-shadow(0 0 18px rgba(0,245,255,0.35)) drop-shadow(0 0 40px rgba(124,58,237,0.2));
          animation: float 3.5s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-10px) rotate(1deg); }
        }

        .char-svg {
          width: 100%;
          height: 100%;
        }

        /* Eye animations */
        .eye-open-group {
          animation: eyeOpen 0.2s ease-out both;
        }
        .eye-closed-group {
          animation: eyeClose 0.2s ease-out both;
        }
        @keyframes eyeOpen {
          from { opacity: 0; transform: scaleY(0.2); }
          to   { opacity: 1; transform: scaleY(1); }
        }
        @keyframes eyeClose {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Iris subtle look-around */
        .iris-l { animation: lookAround 4s ease-in-out infinite; }
        .iris-r { animation: lookAround 4s ease-in-out infinite 0.1s; }
        @keyframes lookAround {
          0%,100% { transform: translate(0,0); }
          25%     { transform: translate(2px,-1px); }
          50%     { transform: translate(0,2px); }
          75%     { transform: translate(-2px,-1px); }
        }

        /* Antenna pulse */
        .antenna-ball { animation: antPulse 1.8s ease-in-out infinite; }
        @keyframes antPulse {
          0%,100% { filter: brightness(1); }
          50%     { filter: brightness(1.6) drop-shadow(0 0 6px #00f5ff); }
        }

        /* Chest light */
        .chest-light { animation: chestPulse 2s ease-in-out infinite; }
        @keyframes chestPulse {
          0%,100% { opacity: 0.7; r: 3; }
          50%     { opacity: 1; r: 4; }
        }

        /* Arms wave when focused */
        .arm-left  { transform-origin: right center; animation: armL 3.5s ease-in-out infinite; }
        .arm-right { transform-origin: left center;  animation: armR 3.5s ease-in-out infinite; }
        @keyframes armL {
          0%,100% { transform: rotate(0deg); }
          50%     { transform: rotate(-8deg); }
        }
        @keyframes armR {
          0%,100% { transform: rotate(0deg); }
          50%     { transform: rotate(8deg); }
        }

        .robot-label {
          font-size: 12px;
          font-family: 'Orbitron', monospace;
          letter-spacing: 1px;
          color: var(--cyan);
          margin-top: 4px;
          opacity: 0.85;
          text-align: center;
          transition: all 0.3s ease;
          min-height: 20px;
        }

        /* ========== FORM ========== */
        .auth-card h2 {
          font-family: 'Orbitron', monospace;
          font-size: 20px;
          text-align: center;
          margin-bottom: 22px;
          letter-spacing: 2px;
          background: linear-gradient(90deg, white, var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .error {
          background: rgba(255,77,77,0.15);
          border: 1px solid rgba(255,77,77,0.4);
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 14px;
          text-align: center;
          font-size: 13px;
          color: #ff8080;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          font-size: 14px;
          z-index: 1;
          pointer-events: none;
          opacity: 0.7;
        }

        input {
          width: 100%;
          padding: 13px 14px 13px 42px;
          border-radius: 12px;
          border: 1px solid var(--border);
          outline: none;
          background: rgba(255,255,255,0.05);
          color: white;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        input::placeholder {
          color: rgba(255,255,255,0.3);
        }

        input:focus {
          background: rgba(0,245,255,0.07);
          border-color: rgba(0,245,255,0.45);
          box-shadow: 0 0 0 3px rgba(0,245,255,0.1), 0 0 20px rgba(0,245,255,0.1);
        }

        .password-box input {
          padding-right: 48px;
        }

        .toggle-eye {
          position: absolute;
          right: 14px;
          cursor: pointer;
          font-size: 14px;
          opacity: 0.6;
          transition: opacity 0.2s;
          user-select: none;
        }
        .toggle-eye:hover { opacity: 1; }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #00c8ff, #7c3aed);
          color: white;
          font-family: 'Orbitron', monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 4px;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }

        .submit-btn:hover::before { left: 100%; }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,200,255,0.35), 0 0 0 1px rgba(255,255,255,0.1);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .btn-arrow {
          font-size: 18px;
          transition: transform 0.3s;
        }
        .submit-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        .register-link {
          margin-top: 18px;
          text-align: center;
          font-size: 13px;
          color: #64748b;
        }

        .register-link a {
          color: var(--cyan);
          text-decoration: none;
          font-weight: 600;
          transition: opacity 0.2s;
        }
        .register-link a:hover { opacity: 0.8; }

        /* ========== BACKGROUND BLOBS ========== */
        .bg-blur {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          opacity: 0.25;
          pointer-events: none;
        }

        .b1 {
          width: 400px; height: 400px;
          background: var(--cyan);
          top: -100px; left: -100px;
          animation: drift1 12s ease-in-out infinite;
        }

        .b2 {
          width: 400px; height: 400px;
          background: var(--purple);
          bottom: -100px; right: -100px;
          animation: drift2 14s ease-in-out infinite;
        }

        .b3 {
          width: 200px; height: 200px;
          background: #0ea5e9;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.1;
          animation: drift1 8s ease-in-out infinite reverse;
        }

        @keyframes drift1 {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(30px,20px); }
        }

        @keyframes drift2 {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(-20px,-30px); }
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 820px) {
          .auth-wrapper {
            flex-direction: column;
            overflow-y: auto;
            position: relative;
            min-height: 100vh;
          }

          .auth-left {
            padding: 40px 24px 20px;
            justify-content: flex-start;
          }

          .auth-left h1 {
            font-size: 36px;
          }

          .auth-right {
            padding: 0 20px 40px;
          }

          .auth-card {
            padding: 28px 24px 32px;
          }

          .char-wrap {
            width: 130px;
            height: 142px;
          }
        }
      `}</style>
    </>
  );
}