import React, { useEffect, useRef, useState } from "react";

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Removed heavy mousemove listener — was the main lag source
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "⚡",
      title: "Adaptive AI Engine",
      desc: "Our neural system maps your strengths, gaps, and pace in real time — your curriculum evolves as you do. No two learners ever share the same path.",
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.08)",
    },
    {
      icon: "🎮",
      title: "Gamified Mastery",
      desc: "Every lesson is a level. Every quiz is a boss battle. Earn XP, unlock achievements, and climb skill tiers — because learning should feel like playing.",
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.08)",
    },
    {
      icon: "🏆",
      title: "Global Leaderboards",
      desc: "Weekly challenges, team leagues, and live rankings keep you sharp. Your rank is your reputation — built lesson by lesson.",
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.08)",
    },
    {
      icon: "📊",
      title: "Deep Analytics",
      desc: "Track your retention curves, expose blind spots, and receive AI-generated improvement plans. Data-driven growth, every single day.",
      color: "#34d399",
      bg: "rgba(52,211,153,0.08)",
    },
  ];

  const steps = [
    { num: "01", title: "Skill Assessment", desc: "Sign up and let our AI map exactly where you stand across any subject in under 5 minutes.", icon: "🔍" },
    { num: "02", title: "Get Your Roadmap", desc: "Receive a personalized path built from 1,200+ courses — your goals, timeline, and pace.", icon: "🗺️" },
    { num: "03", title: "Learn & Play", desc: "Bite-sized lessons, gamified quizzes, and live simulations. Never boring, always effective.", icon: "🧠" },
    { num: "04", title: "Level Up & Earn", desc: "Earn verified certificates, badges, and real rewards. Share achievements and unlock premium content.", icon: "🎯" },
  ];

  const navigate = (path) => { window.location.href = path; };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Instrument+Sans:ital,wght@0,400;0,500;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #040812;
          --surface: #07101f;
          --surface2: #0b1628;
          --border: rgba(255,255,255,0.06);
          --border2: rgba(255,255,255,0.1);
          --cyan: #22d3ee;
          --violet: #a78bfa;
          --amber: #fbbf24;
          --emerald: #34d399;
          --text: #f0f4ff;
          --muted: #6b7fa3;
          --muted2: #4a5a78;
          --grad: linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%);
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Instrument Sans', sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ── */
        .nav {
          position: fixed;
          top: 16px; left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          width: calc(100% - 48px);
          max-width: 1100px;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(7,16,31,0.75);
          backdrop-filter: blur(24px);
          border: 1px solid var(--border2);
          border-radius: 16px;
          transition: background 0.3s;
        }

        .nav-logo {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          background: var(--grad);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.3px;
        }

        .nav-links {
          display: flex;
          gap: 28px;
          list-style: none;
        }

        .nav-links a {
          color: var(--muted);
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--text); }

        .nav-actions { display: flex; gap: 10px; align-items: center; }

        .btn-nav-ghost {
          padding: 8px 18px;
          background: transparent;
          border: 1px solid var(--border2);
          color: var(--text);
          border-radius: 8px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.86rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-nav-ghost:hover { background: rgba(255,255,255,0.05); }

        .btn-nav-solid {
          padding: 8px 20px;
          background: var(--cyan);
          border: none;
          color: #040812;
          border-radius: 8px;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 0.86rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-nav-solid:hover { opacity: 0.88; transform: translateY(-1px); }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 140px 24px 80px;
          position: relative;
          overflow: hidden;
        }

        /* Noise overlay */
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        /* Grid lines */
        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent);
          pointer-events: none;
        }

        /* Orbs - CSS-only animation, GPU-composited */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          will-change: transform;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 70%);
          top: -120px; left: -80px;
          animation: orbDrift1 18s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%);
          bottom: -60px; right: -60px;
          animation: orbDrift2 22s ease-in-out infinite alternate;
        }
        .orb-3 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%);
          top: 40%; left: 55%;
          animation: orbDrift3 14s ease-in-out infinite alternate;
        }

        @keyframes orbDrift1 {
          from { transform: translate(0, 0); }
          to { transform: translate(60px, 40px); }
        }
        @keyframes orbDrift2 {
          from { transform: translate(0, 0); }
          to { transform: translate(-50px, -30px); }
        }
        @keyframes orbDrift3 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-30px, 20px) scale(1.15); }
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px 5px 8px;
          background: rgba(34,211,238,0.08);
          border: 1px solid rgba(34,211,238,0.2);
          border-radius: 100px;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--cyan);
          letter-spacing: 0.6px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .tag-pip {
          width: 6px; height: 6px;
          background: var(--cyan);
          border-radius: 50%;
          animation: pip 2s ease-in-out infinite;
        }
        @keyframes pip {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.5); }
          50% { box-shadow: 0 0 0 5px rgba(34,211,238,0); }
        }

        .hero-h1 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 3.4rem;
          font-weight: 800;
          line-height: 1.07;
          letter-spacing: -2px;
          margin-bottom: 22px;
        }

        .hero-h1 .hl {
          background: var(--grad);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-sub {
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 38px;
          max-width: 430px;
        }

        .hero-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 48px;
        }

        .btn-primary {
          padding: 14px 28px;
          background: var(--grad);
          color: #040812;
          border: none;
          border-radius: 10px;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.25s;
          letter-spacing: 0.1px;
        }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 16px 48px rgba(34,211,238,0.25); }

        .btn-outline {
          padding: 14px 28px;
          background: transparent;
          color: var(--text);
          border: 1px solid var(--border2);
          border-radius: 10px;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 500;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-outline:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }

        .play-ring {
          width: 22px; height: 22px;
          border: 1.5px solid var(--muted);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.55rem;
        }

        .hero-social-proof {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .avatars {
          display: flex;
        }
        .avatar {
          width: 34px; height: 34px;
          border-radius: 50%;
          border: 2px solid var(--bg);
          margin-right: -10px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
        }
        .av1 { background: linear-gradient(135deg, #22d3ee, #6366f1); }
        .av2 { background: linear-gradient(135deg, #a78bfa, #ec4899); }
        .av3 { background: linear-gradient(135deg, #34d399, #22d3ee); }
        .av4 { background: linear-gradient(135deg, #fbbf24, #f472b6); }

        .proof-text { color: var(--muted); font-size: 0.82rem; padding-left: 6px; }
        .proof-text strong { color: var(--text); }

        /* ── HERO CARD ── */
        .hero-card-wrap {
          position: relative;
        }

        .hero-card {
          background: var(--surface);
          border: 1px solid var(--border2);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
          animation: cardFloat 7s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0) rotate(-0.5deg); }
          50% { transform: translateY(-14px) rotate(0.5deg); }
        }

        .card-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }

        .card-user-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .card-avi {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: var(--grad);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.8rem;
          color: #040812;
        }

        .card-name {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .card-sub { font-size: 0.73rem; color: var(--muted); margin-top: 1px; }

        .xp-pill {
          padding: 5px 12px;
          background: rgba(34,211,238,0.08);
          border: 1px solid rgba(34,211,238,0.18);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--cyan);
          font-family: 'Bricolage Grotesque', sans-serif;
        }

        /* Goal ring visual */
        .goal-section {
          background: var(--surface2);
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .ring-wrap {
          position: relative;
          width: 60px;
          height: 60px;
          flex-shrink: 0;
        }

        .ring-wrap svg { transform: rotate(-90deg); }

        .ring-track { fill: none; stroke: rgba(255,255,255,0.05); stroke-width: 4; }
        .ring-fill {
          fill: none;
          stroke: url(#ringGrad);
          stroke-width: 4;
          stroke-linecap: round;
          stroke-dasharray: 163;
          stroke-dashoffset: 36;
          animation: ringIn 1.5s ease-out forwards;
        }
        @keyframes ringIn {
          from { stroke-dashoffset: 163; }
          to { stroke-dashoffset: 36; }
        }

        .ring-label {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: 0.9rem;
          color: var(--cyan);
        }

        .goal-info { flex: 1; }
        .goal-title { font-weight: 600; font-size: 0.82rem; margin-bottom: 4px; }
        .goal-sub { font-size: 0.72rem; color: var(--muted); }

        /* Stats row */
        .card-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }

        .card-stat {
          background: var(--surface2);
          border-radius: 12px;
          padding: 12px 10px;
          text-align: center;
        }

        .cs-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: 1.35rem;
          background: var(--grad);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .cs-lbl { font-size: 0.66rem; color: var(--muted); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.5px; }

        /* Current course */
        .card-course {
          background: var(--surface2);
          border-radius: 14px;
          padding: 14px;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .cc-icon {
          width: 44px; height: 44px;
          background: rgba(167,139,250,0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .cc-title { font-weight: 600; font-size: 0.82rem; margin-bottom: 6px; }

        .mini-bar {
          height: 4px;
          background: rgba(255,255,255,0.06);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 4px;
        }
        .mini-fill {
          height: 100%;
          width: 67%;
          background: var(--violet);
          border-radius: 4px;
          animation: barSlide 1.2s ease-out forwards;
        }
        @keyframes barSlide {
          from { width: 0%; }
          to { width: 67%; }
        }
        .cc-pct { font-size: 0.7rem; color: var(--muted); }

        /* Floating chips — CSS transform only */
        .chip {
          position: absolute;
          padding: 7px 14px;
          background: rgba(7,16,31,0.95);
          border-radius: 100px;
          font-size: 0.77rem;
          font-weight: 600;
          white-space: nowrap;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          border: 1px solid;
        }
        .chip-a {
          top: -18px; right: -24px;
          color: var(--amber);
          border-color: rgba(251,191,36,0.25);
          animation: chipUp 5s ease-in-out infinite;
        }
        .chip-b {
          bottom: 40px; left: -32px;
          color: var(--emerald);
          border-color: rgba(52,211,153,0.25);
          animation: chipUp 5s ease-in-out infinite 1.2s;
        }

        @keyframes chipUp {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        /* ── STRIP ── */
        .strip {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 36px 24px;
          overflow: hidden;
        }

        .strip-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }

        .strip-item {
          text-align: center;
          position: relative;
          padding: 10px 0;
        }
        .strip-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 10%; bottom: 10%;
          width: 1px;
          background: var(--border);
        }

        .strip-num {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 2.6rem;
          font-weight: 800;
          background: var(--grad);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          margin-bottom: 4px;
        }
        .strip-lbl { color: var(--muted); font-size: 0.85rem; }

        /* ── FEATURES ── */
        .features-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 100px 24px;
        }

        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--cyan);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .section-tag::before {
          content: '';
          width: 18px; height: 1px;
          background: var(--cyan);
          display: block;
        }

        .section-h2 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-bottom: 14px;
        }

        .section-p {
          color: var(--muted);
          font-size: 0.96rem;
          line-height: 1.75;
          max-width: 480px;
          margin-bottom: 0;
        }

        .features-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          margin-top: 56px;
        }

        .feat-tabs { display: flex; flex-direction: column; gap: 3px; }

        .feat-tab {
          padding: 18px 20px;
          border-radius: 14px;
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s;
          border: 1px solid transparent;
        }
        .feat-tab:hover { background: rgba(255,255,255,0.02); }
        .feat-tab.active {
          background: rgba(255,255,255,0.04);
          border-color: var(--border2);
        }

        .ft-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 0;
        }

        .ft-icon {
          width: 34px; height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          transition: background 0.3s;
        }

        .ft-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          transition: color 0.3s;
        }

        .ft-desc {
          color: var(--muted);
          font-size: 0.84rem;
          line-height: 1.7;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.3s, margin-top 0.3s;
          opacity: 0;
          margin-top: 0;
          padding-left: 46px;
        }
        .feat-tab.active .ft-desc {
          max-height: 120px;
          opacity: 1;
          margin-top: 10px;
        }

        .ft-bar {
          height: 2px;
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
          margin-top: 14px;
          overflow: hidden;
        }
        .ft-bar-fill {
          height: 100%;
          border-radius: 2px;
          animation: ftFill 3.2s linear infinite;
        }
        @keyframes ftFill {
          from { width: 0%; }
          to { width: 100%; }
        }

        /* Feature showcase panel */
        .feat-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 40px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.4s;
        }

        .panel-rings {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .pr {
          position: absolute;
          border-radius: 50%;
          border: 1px solid;
          animation: pulsering 3s ease-out infinite;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }
        .pr1 { width: 120px; height: 120px; animation-delay: 0s; }
        .pr2 { width: 200px; height: 200px; animation-delay: 0.6s; }
        .pr3 { width: 290px; height: 290px; animation-delay: 1.2s; }
        @keyframes pulsering {
          0% { opacity: 0.15; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.06); }
        }

        .panel-icon {
          font-size: 3.6rem;
          display: block;
          margin-bottom: 18px;
          animation: iconPop 3s ease-in-out infinite;
          position: relative;
          z-index: 2;
        }
        @keyframes iconPop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .panel-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 8px;
          position: relative;
          z-index: 2;
        }
        .panel-desc {
          color: var(--muted);
          font-size: 0.85rem;
          max-width: 260px;
          line-height: 1.65;
          position: relative;
          z-index: 2;
        }

        /* ── HOW IT WORKS ── */
        .how-wrap {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 100px 24px;
        }

        .how-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 56px;
          position: relative;
        }

        .steps-grid::after {
          content: '';
          position: absolute;
          height: 1px;
          left: 12%;
          right: 12%;
          top: 52px;
          background: linear-gradient(90deg, transparent, var(--border2) 20%, var(--border2) 80%, transparent);
        }

        .step {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 26px 22px;
          position: relative;
          transition: all 0.25s;
        }
        .step:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 255, 255, 0.97);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
        }

        .step-n {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 2.6rem;
          font-weight: 800;
          color: rgba(0, 238, 242, 0.64);
          line-height: 1;
          margin-bottom: 14px;
        }

        .step-icon {
          width: 48px; height: 48px;
          background: rgba(54, 132, 144, 0.3);
          border: 1px solid rgba(34,211,238,0.12);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          margin-bottom: 16px;
        }

        .step-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 8px;
        }
        .step-desc { color: var(--muted); font-size: 0.82rem; line-height: 1.7; }

        /* ── CTA ── */
        .cta-wrap { padding: 100px 24px; }

        .cta-inner {
          max-width: 780px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-box {
          background: linear-gradient(160deg, rgba(34,211,238,0.05) 0%, rgba(167,139,250,0.05) 100%);
          border: 1px solid rgba(34,211,238,0.14);
          border-radius: 28px;
          padding: 72px 56px;
          position: relative;
          overflow: hidden;
        }

        .cta-box::before {
          content: '';
          position: absolute;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%);
          top: -120px; left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          pointer-events: none;
        }

        .cta-h2 {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-bottom: 16px;
          position: relative;
        }

        .cta-p {
          color: var(--muted);
          font-size: 0.96rem;
          line-height: 1.75;
          margin-bottom: 36px;
          position: relative;
        }

        .cta-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
        }

        .cta-note {
          font-size: 0.78rem;
          color: var(--muted2);
          margin-top: 18px;
          position: relative;
        }

        /* ── FOOTER ── */
        .footer {
          background: var(--bg);
          border-top: 1px solid var(--border);
          padding: 32px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .footer-logo {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          background: var(--grad);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-copy { color: var(--muted2); font-size: 0.8rem; }

        .footer-links {
          display: flex;
          gap: 22px;
          list-style: none;
        }
        .footer-links a {
          color: var(--muted2);
          text-decoration: none;
          font-size: 0.8rem;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--muted); }

        @media (max-width: 860px) {
          .hero-inner, .features-layout { grid-template-columns: 1fr; }
          .hero-card-wrap { display: none; }
          .strip-inner { grid-template-columns: repeat(2, 1fr); }
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid::after { display: none; }
          .nav-links { display: none; }
          .hero-h1 { font-size: 2.6rem; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-logo">Smart Learn</div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#courses">Courses</a></li>
        </ul>
        <div className="nav-actions">
          <button className="btn-nav-ghost" onClick={() => navigate("/login")}>Sign In</button>
          <button className="btn-nav-solid" onClick={() => navigate("/signup")}>Get Started Free</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="hero-inner">
          <div>
            <div className="hero-tag">
              <span className="tag-pip" />
              AI-Powered · Gamified · Certified. chatgpt-3.5turbo powered
            </div>

            <h1 className="hero-h1">
              The Smart AI Powered Learning Plattform to <span className="hl">Learn, Play</span> and Level Up.<br />
               
              
            </h1>

            <p className="hero-sub">
              SmartLearn blends adaptive AI with gamification to build skills that stick.
              Your personalized roadmap. Real credentials. Zero fluff.
            </p>

            <div className="hero-btns">
              <button className="btn-primary" onClick={() => navigate("/Login")}>
                Start for Free →
              </button>
              <button className="btn-outline" onClick={() => navigate("/demo")}>
                <span className="play-ring">▶</span>
                Watch Demo
              </button>
            </div>

            <div className="hero-social-proof">
              <div className="avatars">
                <div className="avatar av1">RK</div>
                <div className="avatar av2">SA</div>
                <div className="avatar av3">JP</div>
                <div className="avatar av4">ML</div>
              </div>
              <p className="proof-text"><strong></strong> </p>
            </div>
          </div>

          <div className="hero-card-wrap">
            <div className="hero-card">
              {/* SVG gradient def */}
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="card-topbar">
                <div className="card-user-row">
                  <div className="card-avi">RK</div>
                  <div>
                    <div className="card-name">vikky</div>
                    <div className="card-sub">Level 2 · python Track</div>
                  </div>
                </div>
                <div className="xp-pill">2,450 XP</div>
              </div>

              <div className="goal-section">
                <div className="ring-wrap">
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle className="ring-track" cx="30" cy="30" r="26" />
                    <circle className="ring-fill" cx="30" cy="30" r="26" />
                  </svg>
                  <div className="ring-label">78%</div>
                </div>
                <div className="goal-info">
                  <div className="goal-title">Weekly Goal Progress</div>
                  <div className="goal-sub">4 of 5 lessons done · 1 remaining</div>
                </div>
              </div>

              <div className="card-stats">
                <div className="card-stat">
                  <div className="cs-num">12</div>
                  <div className="cs-lbl">Courses</div>
                </div>
                <div className="card-stat">
                  <div className="cs-num">50</div>
                  <div className="cs-lbl">Streak 🔥</div>
                </div>
                <div className="card-stat">
                  <div className="cs-num">#3</div>
                  <div className="cs-lbl">Global</div>
                </div>
              </div>

              <div className="card-course">
                <div className="cc-icon">🧠</div>
                <div style={{ flex: 1 }}>
                  <div className="cc-title">Deep Learning Fundamentals</div>
                  <div className="mini-bar"><div className="mini-fill" /></div>
                  <div className="cc-pct">67% complete · ~2h left</div>
                </div>
              </div>
            </div>

            <div className="chip chip-a">🏆 Rank #3 Global</div>
            <div className="chip chip-b">🔥 8-day streak</div>
          </div>
        </div>
      </div>

      {/* ── STRIP ── */}
      <div className="strip">
        <div className="strip-inner">
          {[
           
          ].map((s, i) => (
            <div className="strip-item" key={i}>
              <div className="strip-num">{s.num}</div>
              <div className="strip-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div className="features-section" id="features">
        <div className="section-tag">Core Features</div>
        <h2 className="section-h2">Everything you need<br />to master any skill</h2>
        <p className="section-p">Built AI-first — not AI-bolted-on. Every feature works together to make learning feel inevitable.</p>

        <div className="features-layout">
          <div className="feat-tabs">
            {features.map((f, i) => (
              <div
                key={i}
                className={`feat-tab ${activeFeature === i ? "active" : ""}`}
                onMouseEnter={() => setActiveFeature(i)}
              >
                <div className="ft-head">
                  <div className="ft-icon" style={{ background: f.bg }}>
                    {f.icon}
                  </div>
                  <div
                    className="ft-title"
                    style={{ color: activeFeature === i ? f.color : "var(--text)" }}
                  >
                    {f.title}
                  </div>
                </div>
                <div className="ft-desc">{f.desc}</div>
                {activeFeature === i && (
                  <div className="ft-bar">
                    <div className="ft-bar-fill" style={{ background: f.color }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className="feat-panel"
            style={{ borderColor: `${features[activeFeature].color}22` }}
          >
            <div className="panel-rings">
              {[1, 2, 3].map(n => (
                <div
                  key={n}
                  className={`pr pr${n}`}
                  style={{ borderColor: `${features[activeFeature].color}20` }}
                />
              ))}
            </div>
            <span className="panel-icon">{features[activeFeature].icon}</span>
            <div className="panel-title" style={{ color: features[activeFeature].color }}>
              {features[activeFeature].title}
            </div>
            <div className="panel-desc">{features[activeFeature].desc}</div>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="how-wrap" id="how">
        <div className="how-inner">
          <div className="section-tag">The Process</div>
          <h2 className="section-h2">From zero to certified<br />in 4 simple steps</h2>
          <p className="section-p">No fluff. A clear path from where you are to where you want to be.</p>

          <div className="steps-grid">
            {steps.map((s, i) => (
              <div className="step" key={i}>
                <div className="step-n">{s.num}</div>
                <div className="step-icon">{s.icon}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cta-wrap">
        <div className="cta-inner">
          <div className="cta-box">
            <h2 className="cta-h2">
              Your future self<br />
              <span style={{ background: "var(--grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                starts today.
              </span>
            </h2>
            <p className="cta-p">
              <br />
              Free forever plan. No credit card required.
            </p>
            <div className="cta-btns">
              <button className="btn-primary" onClick={() => navigate("/Login")}>
                Start Learning Free →
              </button>
              <button className="btn-outline" onClick={() => navigate("/courses")}>
                Browse Courses
              </button>
            </div>
            <p className="cta-note">✓ Free plan · ✓ No card needed · ✓ Cancel anytime</p>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">Smart AI Powered Learning Plattform</div>
        <div className="footer-copy">© 2026 SmartLearn. All rights reserved.</div>
        <ul className="footer-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </footer>
    </>
  );
}