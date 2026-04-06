import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// 3D Robot Character - excited/welcoming for register
function RegisterCharacter({ eyesClosed, isTyping }) {
  return (
    <div className="char-wrap">
      <svg
        viewBox="0 0 200 220"
        xmlns="http://www.w3.org/2000/svg"
        className="char-svg"
      >
        {/* Glow under character */}
        <ellipse cx="100" cy="210" rx="55" ry="10" fill="rgba(124,58,237,0.2)" />

        {/* Body */}
        <rect x="55" y="130" width="90" height="70" rx="18" fill="url(#bodyGrad)" />
        {/* Body shine */}
        <rect x="63" y="138" width="30" height="10" rx="5" fill="rgba(255,255,255,0.13)" />

        {/* Arms - raised up for welcome */}
        <rect
          x="18" y="128" width="37" height="18" rx="9"
          fill="url(#armGrad)"
          className={isTyping ? "arm-left-type" : "arm-left"}
        />
        <rect
          x="145" y="128" width="37" height="18" rx="9"
          fill="url(#armGrad)"
          className={isTyping ? "arm-right-type" : "arm-right"}
        />

        {/* Hands */}
        <circle cx="19" cy="137" r="9" fill="url(#handGrad)" />
        <circle cx="181" cy="137" r="9" fill="url(#handGrad)" />

        {/* Thumbs up when not typing */}
        {!isTyping && (
          <>
            <text x="10" y="128" fontSize="14" className="thumb">👍</text>
            <text x="172" y="128" fontSize="14" className="thumb">👍</text>
          </>
        )}

        {/* Neck */}
        <rect x="85" y="120" width="30" height="18" rx="8" fill="url(#neckGrad)" />

        {/* Head */}
        <rect x="42" y="50" width="116" height="78" rx="28" fill="url(#headGrad)" />

        {/* Head shine */}
        <ellipse cx="80" cy="63" rx="22" ry="9" fill="rgba(255,255,255,0.13)" />

        {/* Ears */}
        <circle cx="42" cy="89" r="10" fill="url(#earGrad)" />
        <circle cx="158" cy="89" r="10" fill="url(#earGrad)" />
        <circle cx="42" cy="89" r="5" fill="#7c3aed" opacity="0.6" />
        <circle cx="158" cy="89" r="5" fill="#7c3aed" opacity="0.6" />

        {/* Antenna */}
        <rect x="97" y="28" width="6" height="26" rx="3" fill="url(#antennaGrad)" />
        <circle cx="100" cy="24" r="9" fill="url(#antennaBallGrad)" className="antenna-ball" />
        <circle cx="100" cy="24" r="4" fill="white" opacity="0.7" />

        {/* Eyes */}
        {eyesClosed ? (
          <g className="eye-closed-group">
            <path d="M72 87 Q82 80 92 87" stroke="#7c3aed" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M108 87 Q118 80 128 87" stroke="#7c3aed" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <line x1="74" y1="86" x2="71" y2="90" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
            <line x1="80" y1="82" x2="79" y2="87" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
            <line x1="87" y1="82" x2="87" y2="87" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
            <line x1="110" y1="86" x2="107" y2="90" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
            <line x1="116" y1="82" x2="115" y2="87" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
            <line x1="123" y1="82" x2="123" y2="87" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : (
          <g className="eye-open-group">
            {/* Eye sockets */}
            <ellipse cx="82" cy="87" rx="16" ry="15" fill="#0b0f19" />
            <ellipse cx="118" cy="87" rx="16" ry="15" fill="#0b0f19" />
            {/* Glow rings */}
            <ellipse cx="82" cy="87" rx="16" ry="15" fill="none" stroke="#7c3aed" strokeWidth="2" opacity="0.7" />
            <ellipse cx="118" cy="87" rx="16" ry="15" fill="none" stroke="#7c3aed" strokeWidth="2" opacity="0.7" />
            {/* Iris */}
            <circle cx="82" cy="87" r="9" fill="url(#irisGrad)" className="iris-l" />
            <circle cx="118" cy="87" r="9" fill="url(#irisGrad)" className="iris-r" />
            {/* Pupil */}
            <circle cx="82" cy="87" r="5" fill="#0b0f19" />
            <circle cx="118" cy="87" r="5" fill="#0b0f19" />
            {/* Highlight */}
            <circle cx="85" cy="84" r="2.5" fill="white" opacity="0.9" />
            <circle cx="121" cy="84" r="2.5" fill="white" opacity="0.9" />
            {/* Star sparkle in eyes */}
            {isTyping && (
              <>
                <text x="74" y="91" fontSize="11" className="star-eye">✦</text>
                <text x="110" y="91" fontSize="11" className="star-eye">✦</text>
              </>
            )}
          </g>
        )}

        {/* Smile mouth - bigger when typing (excited) */}
        {isTyping ? (
          <path d="M76 112 Q100 124 124 112" stroke="#7c3aed" strokeWidth="3" fill="none" strokeLinecap="round" className="mouth-excited" />
        ) : (
          <rect x="75" y="108" width="50" height="10" rx="5" fill="#0b0f19" opacity="0.7">
            <rect x="80" y="111" width="5" height="4" rx="2" fill="#7c3aed" opacity="0.8" />
          </rect>
        )}

        {/* Speaker grill (only when not excited) */}
        {!isTyping && (
          <>
            <rect x="80" y="111" width="5" height="4" rx="2" fill="#7c3aed" opacity="0.8" />
            <rect x="90" y="111" width="5" height="4" rx="2" fill="#7c3aed" opacity="0.8" />
            <rect x="100" y="111" width="5" height="4" rx="2" fill="#7c3aed" opacity="0.8" />
            <rect x="110" y="111" width="5" height="4" rx="2" fill="#7c3aed" opacity="0.8" />
          </>
        )}

        {/* Chest panel */}
        <rect x="68" y="148" width="64" height="38" rx="10" fill="rgba(0,0,0,0.3)" />
        <circle cx="82" cy="162" r="6" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
        <circle cx="82" cy="162" r="3" fill="#7c3aed" opacity="0.8" className="chest-light" />
        <rect x="94" y="158" width="28" height="3" rx="1.5" fill="#00f5ff" opacity="0.8" />
        <rect x="94" y="164" width="18" height="3" rx="1.5" fill="#7c3aed" opacity="0.6" />
        <rect x="94" y="170" width="22" height="3" rx="1.5" fill="#00f5ff" opacity="0.5" />

        {/* Legs */}
        <rect x="68" y="196" width="26" height="18" rx="8" fill="url(#legGrad)" />
        <rect x="106" y="196" width="26" height="18" rx="8" fill="url(#legGrad)" />

        {/* Feet */}
        <rect x="64" y="208" width="34" height="10" rx="5" fill="url(#footGrad)" />
        <rect x="102" y="208" width="34" height="10" rx="5" fill="url(#footGrad)" />

        {/* Sparkles around robot when excited */}
        {isTyping && (
          <>
            <text x="28" y="60" fontSize="12" className="sparkle s1">✦</text>
            <text x="160" y="55" fontSize="10" className="sparkle s2">✦</text>
            <text x="20" y="100" fontSize="8" className="sparkle s3">✦</text>
            <text x="166" y="108" fontSize="9" className="sparkle s4">✦</text>
          </>
        )}

        <defs>
          <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1a3a" />
            <stop offset="100%" stopColor="#0f0d1f" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1a3a" />
            <stop offset="100%" stopColor="#0f0d1f" />
          </linearGradient>
          <linearGradient id="armGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2d1f5e" />
            <stop offset="100%" stopColor="#0f0d1f" />
          </linearGradient>
          <linearGradient id="handGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2d1f5e" />
            <stop offset="100%" stopColor="#0f0d1f" />
          </linearGradient>
          <linearGradient id="neckGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1a3a" />
            <stop offset="100%" stopColor="#0f0d1f" />
          </linearGradient>
          <linearGradient id="earGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2d1f5e" />
            <stop offset="100%" stopColor="#0f0d1f" />
          </linearGradient>
          <linearGradient id="antennaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00f5ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <radialGradient id="antennaBallGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#00f5ff" />
          </radialGradient>
          <radialGradient id="irisGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#00f5ff" />
          </radialGradient>
          <linearGradient id="legGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1a3a" />
            <stop offset="100%" stopColor="#0f0d1f" />
          </linearGradient>
          <linearGradient id="footGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2d1f5e" />
            <stop offset="100%" stopColor="#0f0d1f" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Password strength indicator
function PasswordStrength({ password }) {
  const getStrength = (pw) => {
    if (!pw) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { score, label: 'Weak', color: '#ff4d4d' };
    if (score <= 2) return { score, label: 'Fair', color: '#f59e0b' };
    if (score <= 3) return { score, label: 'Good', color: '#00f5ff' };
    return { score, label: 'Strong 🔥', color: '#22c55e' };
  };
  const { score, label, color } = getStrength(password);
  if (!password) return null;
  return (
    <div className="pw-strength">
      <div className="pw-bars">
        {[1,2,3,4].map(i => (
          <div
            key={i}
            className="pw-bar"
            style={{ background: i <= score ? color : 'rgba(255,255,255,0.1)' }}
          />
        ))}
      </div>
      <span style={{ color, fontSize: '11px', fontWeight: 600 }}>{label}</span>
    </div>
  );
}

export default function Register() {
  const { register } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [show, setShow] = useState(false);
  const [eyesClosed, setEyesClosed] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = React.useRef(null);

  const nav = useNavigate();

  // Close eyes on password focus
  useEffect(() => {
    setEyesClosed(pwFocused && !show);
  }, [pwFocused, show]);

  // Excited when typing any field
  const handleTyping = () => {
    setIsTyping(true);
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setIsTyping(false), 1200);
  };

  const submit = (e) => {
    e.preventDefault();
    try {
      register({ name, email, password: pw });
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
            <h1>Start Your<br />Journey <span className="rocket">🚀</span></h1>
            <p>Join thousands of learners upgrading their skills with AI-powered personalized lessons.</p>
            <div className="stats-row">
              <div className="stat">
                <div className="stat-num"></div>
                <div className="stat-lbl"></div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <div className="stat-num"></div>
                <div className="stat-lbl"></div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <div className="stat-num"></div>
                <div className="stat-lbl">Create your account</div>
              </div>
            </div>
            <div className="feature-list">
              <div className="feat"><span className="feat-dot"></span>Free to get started</div>
              <div className="feat"><span className="feat-dot"></span>AI-personalized roadmap</div>
              <div className="feat"><span className="feat-dot"></span>Gamified progress system</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <div className="auth-card">

            {/* Robot character */}
            <div className="robot-container">
              <RegisterCharacter eyesClosed={eyesClosed} isTyping={isTyping} />
              <div className="robot-label">
                {eyesClosed
                  ? "Your secret is safe! 🙈"
                  : isTyping
                  ? "Looking good! Keep going ✨"
                  : "Create Account & Start Learning! 🎓"}
              </div>
            </div>

            <h2>Create Account</h2>

            {err && <p className="error">{err}</p>}

            <form onSubmit={submit}>
              <div className="input-group">
                <span className="input-icon"></span>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => { setName(e.target.value); handleTyping(); }}
                />
              </div>

              <div className="input-group">
                <span className="input-icon"></span>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); handleTyping(); }}
                />
              </div>

              <div className="input-group password-box">
                <span className="input-icon"></span>
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={pw}
                  onChange={(e) => { setPw(e.target.value); handleTyping(); }}
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

              <PasswordStrength password={pw} />

              <button type="submit" className="submit-btn">
                <span>Create Account</span>
                <span className="btn-arrow">→</span>
              </button>
            </form>

            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>

        {/* BACKGROUND */}
        <div className="bg-blur b1"></div>
        <div className="bg-blur b2"></div>
        <div className="bg-blur b3"></div>
        <div className="grid-overlay"></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --cyan: #00f5ff;
          --purple: #7c3aed;
          --dark: #0b0f19;
          --border: rgba(255,255,255,0.09);
        }

        body { font-family: 'Space Grotesk', sans-serif; }

        /* ========== LAYOUT ========== */
        .auth-wrapper {
          position: fixed;
          inset: 0;
          display: flex;
          background: var(--dark);
          color: white;
          overflow: hidden;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
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

        .left-content { max-width: 440px; }

        .badge {
          display: inline-block;
          font-family: 'Orbitron', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--purple);
          border: 1px solid rgba(124,58,237,0.35);
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 28px;
          background: rgba(124,58,237,0.08);
        }

        .auth-left h1 {
          font-family: 'Orbitron', monospace;
          font-size: 50px;
          font-weight: 900;
          line-height: 1.15;
          background: linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, var(--cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
        }

        .rocket {
          display: inline-block;
          animation: rocketLaunch 2s ease-in-out infinite;
          transform-origin: center;
          -webkit-text-fill-color: initial;
        }

        @keyframes rocketLaunch {
          0%,100% { transform: translateY(0) rotate(-10deg); }
          50%      { transform: translateY(-10px) rotate(10deg); }
        }

        .auth-left p {
          color: #94a3b8;
          font-size: 15px;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        /* Stats */
        .stats-row {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
          padding: 18px 24px;
          border-radius: 14px;
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.2);
        }

        .stat { text-align: center; }
        .stat-num {
          font-family: 'Orbitron', monospace;
          font-size: 20px;
          font-weight: 900;
          background: linear-gradient(135deg, var(--cyan), var(--purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-lbl { font-size: 11px; color: #64748b; margin-top: 2px; letter-spacing: 1px; }
        .stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.1); }

        .feature-list { display: flex; flex-direction: column; gap: 12px; }
        .feat { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #cbd5e1; }
        .feat-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: linear-gradient(135deg, var(--purple), var(--cyan));
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--purple);
        }

        /* ========== RIGHT ========== */
        .auth-right {
          flex: 0.9;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
          padding: 24px;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          padding: 28px 38px 36px;
          border-radius: 28px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(124,58,237,0.2);
          box-shadow:
            0 0 60px rgba(124,58,237,0.1),
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
          margin-bottom: 6px;
        }

        .char-wrap {
          width: 148px;
          height: 162px;
          filter: drop-shadow(0 0 18px rgba(124,58,237,0.45)) drop-shadow(0 0 40px rgba(0,245,255,0.15));
          animation: float 3.5s ease-in-out infinite;
        }

        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-10px) rotate(1deg); }
        }

        .char-svg { width: 100%; height: 100%; }

        /* Eye animations */
        .eye-open-group  { animation: eyeOpen  0.2s ease-out both; }
        .eye-closed-group{ animation: eyeClose 0.2s ease-out both; }
        @keyframes eyeOpen  { from { opacity:0; transform:scaleY(0.2); } to { opacity:1; transform:scaleY(1); } }
        @keyframes eyeClose { from { opacity:0; } to { opacity:1; } }

        .iris-l { animation: lookAround 4s ease-in-out infinite; }
        .iris-r { animation: lookAround 4s ease-in-out infinite 0.1s; }
        @keyframes lookAround {
          0%,100% { transform:translate(0,0); }
          25%     { transform:translate(2px,-1px); }
          50%     { transform:translate(0,2px); }
          75%     { transform:translate(-2px,-1px); }
        }

        .antenna-ball { animation: antPulse 1.8s ease-in-out infinite; }
        @keyframes antPulse {
          0%,100% { filter:brightness(1); }
          50%     { filter:brightness(1.6) drop-shadow(0 0 6px #7c3aed); }
        }

        .chest-light { animation: chestPulse 2s ease-in-out infinite; }
        @keyframes chestPulse {
          0%,100% { opacity:0.8; }
          50%     { opacity:1; }
        }

        /* Arms */
        .arm-left  { transform-origin:right center; animation:armL 3.5s ease-in-out infinite; }
        .arm-right { transform-origin:left center;  animation:armR 3.5s ease-in-out infinite; }
        @keyframes armL { 0%,100%{transform:rotate(0deg);} 50%{transform:rotate(-15deg);} }
        @keyframes armR { 0%,100%{transform:rotate(0deg);} 50%{transform:rotate(15deg);} }

        .arm-left-type  { transform-origin:right center; animation:armLType 0.4s ease-in-out infinite alternate; }
        .arm-right-type { transform-origin:left center;  animation:armRType 0.4s ease-in-out infinite alternate; }
        @keyframes armLType { from{transform:rotate(-5deg);} to{transform:rotate(-20deg);} }
        @keyframes armRType { from{transform:rotate(5deg);}  to{transform:rotate(20deg);} }

        .mouth-excited { animation: mouthPulse 0.5s ease-in-out infinite alternate; }
        @keyframes mouthPulse {
          from { stroke-width: 3; }
          to   { stroke-width: 4; filter: drop-shadow(0 0 4px #7c3aed); }
        }

        .star-eye { animation: starSpin 1s linear infinite; fill: #a78bfa; }
        @keyframes starSpin {
          from { transform: rotate(0deg) scale(1); }
          to   { transform: rotate(360deg) scale(1.2); }
        }

        .sparkle {
          fill: #a78bfa;
          animation: sparkleAnim 0.8s ease-in-out infinite alternate;
        }
        .s1 { animation-delay: 0s; }
        .s2 { animation-delay: 0.2s; }
        .s3 { animation-delay: 0.4s; }
        .s4 { animation-delay: 0.1s; }
        @keyframes sparkleAnim {
          from { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
          to   { opacity: 1;   transform: scale(1.2) rotate(20deg); }
        }

        .thumb { animation: thumbPop 0.5s ease-in-out; fill: white; }
        @keyframes thumbPop {
          0%   { transform: scale(0); }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .robot-label {
          font-size: 11px;
          font-family: 'Orbitron', monospace;
          letter-spacing: 0.5px;
          color: var(--purple);
          margin-top: 4px;
          opacity: 0.9;
          text-align: center;
          transition: all 0.3s ease;
          min-height: 20px;
        }

        /* ========== FORM ========== */
        .auth-card h2 {
          font-family: 'Orbitron', monospace;
          font-size: 18px;
          text-align: center;
          margin-bottom: 18px;
          letter-spacing: 2px;
          background: linear-gradient(90deg, white, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .error {
          background: rgba(255,77,77,0.15);
          border: 1px solid rgba(255,77,77,0.4);
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 12px;
          text-align: center;
          font-size: 13px;
          color: #ff8080;
        }

        form { display: flex; flex-direction: column; gap: 12px; }

        .input-group { position: relative; display: flex; align-items: center; }

        .input-icon {
          position: absolute;
          left: 14px;
          font-size: 13px;
          z-index: 1;
          pointer-events: none;
          opacity: 0.7;
        }

        input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          border-radius: 12px;
          border: 1px solid var(--border);
          outline: none;
          background: rgba(255,255,255,0.05);
          color: white;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        input::placeholder { color: rgba(255,255,255,0.3); }

        input:focus {
          background: rgba(124,58,237,0.08);
          border-color: rgba(124,58,237,0.5);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.12), 0 0 20px rgba(124,58,237,0.1);
        }

        .password-box input { padding-right: 48px; }

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

        /* Password Strength */
        .pw-strength {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: -4px;
        }
        .pw-bars { display: flex; gap: 4px; flex: 1; }
        .pw-bar {
          height: 4px;
          flex: 1;
          border-radius: 2px;
          transition: background 0.3s ease;
        }

        /* Button */
        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #7c3aed, #00c8ff);
          color: white;
          font-family: 'Orbitron', monospace;
          font-size: 12px;
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
          box-shadow: 0 8px 30px rgba(124,58,237,0.4), 0 0 0 1px rgba(255,255,255,0.1);
        }
        .submit-btn:active { transform: translateY(0); }

        .btn-arrow { font-size: 18px; transition: transform 0.3s; }
        .submit-btn:hover .btn-arrow { transform: translateX(4px); }

        .login-link {
          margin-top: 16px;
          text-align: center;
          font-size: 13px;
          color: #64748b;
        }
        .login-link a {
          color: #a78bfa;
          text-decoration: none;
          font-weight: 600;
        }
        .login-link a:hover { opacity: 0.8; }

        /* ========== BACKGROUND ========== */
        .bg-blur {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          opacity: 0.22;
          pointer-events: none;
        }
        .b1 {
          width: 400px; height: 400px;
          background: var(--purple);
          top: -100px; left: -100px;
          animation: drift1 12s ease-in-out infinite;
        }
        .b2 {
          width: 400px; height: 400px;
          background: var(--cyan);
          bottom: -100px; right: -100px;
          animation: drift2 14s ease-in-out infinite;
        }
        .b3 {
          width: 250px; height: 250px;
          background: #a78bfa;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          opacity: 0.08;
          animation: drift1 8s ease-in-out infinite reverse;
        }
        @keyframes drift1 { 0%,100%{transform:translate(0,0);} 50%{transform:translate(30px,20px);} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0);} 50%{transform:translate(-20px,-30px);} }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 820px) {
          .auth-wrapper {
            flex-direction: column;
            overflow-y: auto;
            position: relative;
            min-height: 100vh;
          }
          .auth-left { padding: 36px 24px 16px; justify-content: flex-start; }
          .auth-left h1 { font-size: 34px; }
          .stats-row { gap: 14px; padding: 14px 18px; }
          .stat-num { font-size: 16px; }
          .auth-right { padding: 0 20px 36px; }
          .auth-card { padding: 22px 22px 28px; }
          .char-wrap { width: 120px; height: 131px; }
        }
      `}</style>
    </>
  );
}