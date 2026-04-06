import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Certificate from './Certificate';

export default function Profile({ prog = {}, courses = [] }) {
  const { user } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(
    "https://i.pinimg.com/originals/a9/4c/a2/a94ca29ad65d886ea813953a8c36794b.jpg"
  );
  const [activeTab, setActiveTab] = useState('overview');
  const [accentColor, setAccentColor] = useState('#6366f1');
  const [bio, setBio] = useState('Learning enthusiast on a journey to master new skills.');
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(bio);
  const [selectedCert, setSelectedCert] = useState(null);
  const fileInputRef = useRef(null);

  if (!user) return <p style={{ color: '#fff', padding: 40 }}>Please log in to see your profile.</p>;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleBioSave = () => {
    setBio(bioInput);
    setEditingBio(false);
  };

  // ── Real tracking stats ──────────────────────────────────────────────────
  let totalPoints = 0;
  let completedCourses = 0;
  let totalRounds = 0;
  let totalVideosWatched = 0;
  let totalQuizzesTaken = 0;
  let totalQuizCorrect = 0;
  let totalVideoDuration = 0; // seconds watched

  courses.forEach((c) => {
    const cp = prog[c.id];
    if (cp) {
      totalPoints += cp.points || 0;
      totalRounds += cp.roundsPlayed || 0;
      if (cp.completed) completedCourses++;

      // Video tracking: expects cp.videos = [{ id, title, duration, watched, watchedSeconds }]
      if (cp.videos) {
        cp.videos.forEach(v => {
          if (v.watched) totalVideosWatched++;
          totalVideoDuration += v.watchedSeconds || 0;
        });
      }

      // Quiz tracking: expects cp.quizzes = [{ id, taken, correct, total }]
      if (cp.quizzes) {
        cp.quizzes.forEach(q => {
          if (q.taken) {
            totalQuizzesTaken++;
            totalQuizCorrect += q.correct || 0;
          }
        });
      }
    }
  });

  const completionRate = courses.length > 0
    ? Math.round((completedCourses / courses.length) * 100) : 0;
  const quizAccuracy = totalQuizzesTaken > 0
    ? Math.round((totalQuizCorrect / totalQuizzesTaken) * 100) : 0;
  const watchHours = Math.floor(totalVideoDuration / 3600);
  const watchMins = Math.floor((totalVideoDuration % 3600) / 60);

  const accentOptions = [
    { c: '#6366f1', name: 'Indigo' },
    { c: '#0ea5e9', name: 'Sky' },
    { c: '#10b981', name: 'Emerald' },
    { c: '#f43f5e', name: 'Rose' },
    { c: '#f59e0b', name: 'Amber' },
    { c: '#a855f7', name: 'Purple' },
  ];

  // Achievements with certificate unlock
  const achievements = [
    { icon: '🏅', name: 'First Step', desc: 'Complete your first course', unlocked: completedCourses >= 1, hasCert: true, certCourse: courses.find(c => prog[c.id]?.completed) },
    { icon: '🔥', name: 'On Fire', desc: 'Play 10+ rounds', unlocked: totalRounds >= 10, hasCert: false },
    { icon: '⚡', name: 'XP Hunter', desc: 'Earn 50+ XP', unlocked: totalPoints >= 50, hasCert: false },
    { icon: '🎓', name: 'Graduate', desc: 'Complete 3 courses', unlocked: completedCourses >= 3, hasCert: true, certCourse: courses.filter(c => prog[c.id]?.completed)[2] },
    { icon: '🎬', name: 'Binge Learner', desc: 'Watch 10+ videos', unlocked: totalVideosWatched >= 10, hasCert: false },
    { icon: '📝', name: 'Quiz Master', desc: '80%+ quiz accuracy', unlocked: quizAccuracy >= 80, hasCert: false },
    { icon: '🌟', name: 'Overachiever', desc: 'Complete 5+ courses', unlocked: completedCourses >= 5, hasCert: true, certCourse: courses.filter(c => prog[c.id]?.completed)[4] },
    { icon: '🧠', name: 'Brainiac', desc: 'Earn 200+ XP', unlocked: totalPoints >= 200, hasCert: false },
    { icon: '🎯', name: 'Dedicated', desc: 'Join 5+ courses', unlocked: courses.length >= 5, hasCert: false },
    { icon: '💎', name: 'Diamond', desc: '100% completion rate', unlocked: completionRate === 100, hasCert: true, certCourse: courses[0] },
    { icon: '⏱️', name: 'Time Investor', desc: 'Watch 5+ hours of content', unlocked: totalVideoDuration >= 18000, hasCert: false },
    { icon: '🏆', name: 'Champion', desc: 'All achievements unlocked', unlocked: completedCourses >= 5 && quizAccuracy >= 80 && totalVideosWatched >= 10, hasCert: true, certCourse: courses[0] },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pf-root {
          --accent: ${accentColor};
          --accent-dim: ${accentColor}22;
          --accent-mid: ${accentColor}55;
          --bg: #080c16;
          --surface: #0e1420;
          --surface2: #131929;
          --border: rgba(255,255,255,0.07);
          --border-hover: rgba(255,255,255,0.14);
          --text-primary: #f0f4ff;
          --text-secondary: #8892aa;
          --text-muted: #4a5568;
          min-height: 100vh;
          width: 100%;
          background: var(--bg);
          color: var(--text-primary);
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
        }

        /* ── BANNER ──────────────────────────────────────────────── */
        .pf-banner {
          width: 100%;
          height: 220px;
          position: relative;
          overflow: hidden;
          background: var(--surface);
        }

        .pf-banner-mesh {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 80% at 20% 50%, ${accentColor}33 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 80% 30%, ${accentColor}18 0%, transparent 60%),
            linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%);
        }

        .pf-banner-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .pf-banner-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0.5;
        }

        .pf-theme-bar {
          position: absolute;
          top: 18px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: 30px;
          padding: 7px 14px;
        }

        .pf-theme-label {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .color-dot {
          width: 18px; height: 18px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }

        .color-dot:hover, .color-dot.cd-active {
          transform: scale(1.3);
          border-color: #fff;
          box-shadow: 0 0 8px currentColor;
        }

        /* ── LAYOUT ─────────────────────────────────────────────── */
        .pf-layout {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 32px 80px;
        }

        /* ── PROFILE HEAD ───────────────────────────────────────── */
        .pf-head {
          display: flex;
          align-items: flex-end;
          gap: 28px;
          margin-top: -64px;
          margin-bottom: 44px;
          flex-wrap: wrap;
          position: relative;
          z-index: 10;
        }

        .pf-avatar-wrap { position: relative; flex-shrink: 0; }

        .pf-avatar-ring {
          width: 140px; height: 140px;
          border-radius: 50%;
          padding: 3px;
          background: conic-gradient(from 0deg, var(--accent), #818cf8, var(--accent));
          box-shadow: 0 0 40px ${accentColor}55;
          animation: spin-ring 8s linear infinite;
        }

        @keyframes spin-ring {
          to { background: conic-gradient(from 360deg, var(--accent), #818cf8, var(--accent)); }
        }

        .pf-avatar {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid var(--bg);
          display: block;
        }

        .pf-avatar-edit {
          position: absolute;
          bottom: 4px; right: 4px;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: var(--accent);
          border: 3px solid var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 12px ${accentColor}66;
        }

        .pf-avatar-edit:hover { transform: scale(1.1); box-shadow: 0 4px 20px ${accentColor}99; }

        .pf-head-info { flex: 1; padding-bottom: 6px; min-width: 220px; }

        .pf-role-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: var(--accent-dim);
          border: 1px solid var(--accent-mid);
          color: var(--accent);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 10px;
        }

        .pf-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 34px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 4px;
        }

        .pf-email { font-size: 13px; color: var(--text-muted); margin-bottom: 12px; }

        .pf-bio-wrap { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

        .pf-bio { font-size: 14px; color: var(--text-secondary); max-width: 460px; line-height: 1.6; }

        .pf-bio-edit-btn {
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--text-muted);
          border-radius: 8px;
          padding: 4px 10px;
          font-size: 11px;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.2s;
        }

        .pf-bio-edit-btn:hover { border-color: var(--accent); color: var(--accent); }

        .pf-bio-input {
          background: var(--surface2);
          border: 1px solid var(--accent-mid);
          color: var(--text-primary);
          border-radius: 10px;
          padding: 8px 14px;
          font-size: 14px;
          width: 320px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none;
        }

        .pf-bio-save {
          background: var(--accent);
          border: none;
          color: #fff;
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: filter 0.2s;
        }

        .pf-bio-save:hover { filter: brightness(1.15); }

        .pf-head-actions {
          display: flex;
          gap: 10px;
          padding-bottom: 6px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .pf-btn {
          padding: 10px 22px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.2s;
          border: none;
          display: flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
        }

        .pf-btn-primary {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 4px 20px ${accentColor}44;
        }

        .pf-btn-primary:hover { filter: brightness(1.15); transform: translateY(-2px); box-shadow: 0 6px 28px ${accentColor}66; }

        .pf-btn-ghost {
          background: var(--surface2);
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }

        .pf-btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }

        /* ── STATS BAR ──────────────────────────────────────────── */
        .pf-stats-bar {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 12px;
          margin-bottom: 36px;
        }

        .pf-stat {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 18px 14px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          transition: all 0.3s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .pf-stat::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .pf-stat:hover { border-color: var(--border-hover); transform: translateY(-3px); background: var(--surface2); }
        .pf-stat:hover::after { transform: scaleX(1); }

        .pf-stat-icon { font-size: 18px; }
        .pf-stat-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }

        .pf-stat-label { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }

        /* ── TABS ───────────────────────────────────────────────── */
        .pf-tabs {
          display: flex;
          gap: 2px;
          margin-bottom: 32px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 5px;
          width: fit-content;
        }

        .pf-tab {
          padding: 9px 22px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          border: none;
          background: transparent;
          font-family: 'Plus Jakarta Sans', sans-serif;
          border-radius: 10px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .pf-tab.tab-active {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 4px 14px ${accentColor}44;
        }

        .pf-tab:hover:not(.tab-active) { color: var(--text-primary); background: var(--surface2); }

        /* ── OVERVIEW GRID ──────────────────────────────────────── */
        .pf-overview-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 20px;
        }

        .pf-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 26px;
          transition: border-color 0.3s;
        }

        .pf-card:hover { border-color: var(--border-hover); }

        .pf-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Progress Ring */
        .progress-ring-wrap {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .progress-ring-svg { flex-shrink: 0; filter: drop-shadow(0 0 16px ${accentColor}44); }

        .xp-details { flex: 1; }

        .xp-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          font-size: 13px;
        }

        .xp-row:last-child { border-bottom: none; }
        .xp-row-label { color: var(--text-muted); }
        .xp-row-val { color: var(--text-primary); font-weight: 600; font-family: 'Space Grotesk', sans-serif; }
        .xp-row-accent { color: var(--accent); }

        /* Video & Quiz Progress Bars */
        .tracking-section { margin-bottom: 18px; }

        .tracking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .tracking-label { font-size: 13px; color: var(--text-secondary); font-weight: 500; }
        .tracking-val { font-size: 13px; color: var(--accent); font-weight: 700; font-family: 'Space Grotesk', sans-serif; }

        .track-bar {
          height: 8px;
          background: rgba(255,255,255,0.05);
          border-radius: 99px;
          overflow: hidden;
        }

        .track-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, var(--accent), #818cf8);
          transition: width 0.8s ease;
          position: relative;
        }

        .track-fill::after {
          content: '';
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 8px var(--accent);
        }

        /* Heatmap */
        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(14, 1fr);
          gap: 4px;
        }

        .hm-cell {
          aspect-ratio: 1;
          border-radius: 3px;
          background: rgba(255,255,255,0.04);
          transition: transform 0.15s;
        }

        .hm-cell:hover { transform: scale(1.4); }
        .hm-1 { background: ${accentColor}25; }
        .hm-2 { background: ${accentColor}50; }
        .hm-3 { background: ${accentColor}80; }
        .hm-4 { background: ${accentColor}; }

        /* ── COURSES TAB ────────────────────────────────────────── */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 18px;
        }

        .course-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .course-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent), #818cf8);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .course-card:hover { transform: translateY(-5px); border-color: var(--border-hover); }
        .course-card:hover::before { transform: scaleX(1); }

        .course-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          gap: 12px;
        }

        .course-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .course-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          flex-shrink: 0;
        }

        .badge-completed { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.25); }
        .badge-progress { background: var(--accent-dim); color: var(--accent); border: 1px solid var(--accent-mid); }
        .badge-start { background: rgba(255,255,255,0.05); color: var(--text-muted); border: 1px solid var(--border); }

        .course-track-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }

        .course-track-item {
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px;
        }

        .cti-label { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .cti-val { font-size: 18px; font-weight: 700; color: var(--text-primary); font-family: 'Space Grotesk', sans-serif; }
        .cti-sub { font-size: 11px; color: var(--text-muted); margin-top: 1px; }

        .course-meta { display: flex; gap: 14px; margin-bottom: 16px; flex-wrap: wrap; }
        .meta-pill { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--text-secondary); }

        .progress-bar {
          height: 6px;
          background: rgba(255,255,255,0.05);
          border-radius: 99px;
          overflow: hidden;
          margin-bottom: 6px;
        }

        .progress-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, var(--accent), #818cf8);
          transition: width 0.8s ease;
        }

        .progress-fill-done { background: linear-gradient(90deg, #10b981, #34d399); }
        .progress-label { font-size: 11px; color: var(--text-muted); text-align: right; font-weight: 500; }

        /* Video list in course card */
        .video-list { margin-top: 14px; border-top: 1px solid var(--border); padding-top: 14px; }
        .video-list-title { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: 600; }

        .video-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0;
          font-size: 12px;
          color: var(--text-secondary);
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }

        .video-item:last-child { border-bottom: none; }
        .vi-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .vi-dot-done { background: #34d399; }
        .vi-dot-pending { background: rgba(255,255,255,0.15); }
        .vi-title { flex: 1; }
        .vi-time { color: var(--text-muted); font-size: 11px; }

        /* Quiz list */
        .quiz-list { margin-top: 10px; }
        .quiz-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 10px;
          border-radius: 8px;
          background: var(--surface2);
          margin-bottom: 6px;
          font-size: 12px;
        }

        .qi-name { color: var(--text-secondary); }
        .qi-score {
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
        }

        .qi-good { color: #34d399; }
        .qi-mid { color: var(--accent); }
        .qi-low { color: #f43f5e; }
        .qi-pending { color: var(--text-muted); }

        .cert-wrap {
          margin-top: 16px;
          border-top: 1px solid var(--border);
          padding-top: 16px;
        }

        .cert-preview-box {
          width: 100%;
          overflow: hidden;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: #f8f5ee;
          position: relative;
        }

        .cert-preview-box .cert-scale-inner {
          width: 200%;
          transform: scale(0.5);
          transform-origin: top left;
          pointer-events: none;
        }

        .cert-open-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          width: 100%;
          margin-top: 10px;
          padding: 9px 0;
          border-radius: 10px;
          border: 1px solid var(--accent-mid);
          background: var(--accent-dim);
          color: var(--accent);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.5px;
          transition: all 0.2s;
        }

        .cert-open-btn:hover {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
        }

        /* ── ACHIEVEMENTS TAB ───────────────────────────────────── */
        .ach-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 16px;
        }

        .ach-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .ach-card.unlocked {
          border-color: ${accentColor}44;
          background: linear-gradient(135deg, var(--surface) 0%, ${accentColor}08 100%);
        }

        .ach-card.unlocked:hover { transform: translateY(-5px); border-color: ${accentColor}88; box-shadow: 0 12px 40px ${accentColor}22; }
        .ach-card.locked { opacity: 0.45; filter: grayscale(1); }

        .ach-icon-wrap {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: var(--accent-dim);
          border: 2px solid var(--accent-mid);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 32px;
        }

        .ach-card.locked .ach-icon-wrap { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.07); }

        .ach-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .ach-desc { font-size: 12px; color: var(--text-muted); line-height: 1.6; margin-bottom: 12px; }

        .ach-unlocked-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(16,185,129,0.15);
          border: 1px solid rgba(16,185,129,0.25);
          color: #34d399;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 14px;
        }

        .ach-locked-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 14px;
        }

        /* Certificate section inside achievement */
        .ach-cert-section {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }

        .ach-cert-label {
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .cert-thumb {
          width: 100%;
          height: 90px;
          background: linear-gradient(135deg, #fdf8ee 0%, #f5ead0 100%);
          border-radius: 10px;
          border: 1px solid #d4a843;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin-bottom: 8px;
          position: relative;
          overflow: hidden;
        }

        .cert-thumb::before {
          content: '';
          position: absolute;
          inset: 4px;
          border: 1px solid #d4a84366;
          border-radius: 7px;
          pointer-events: none;
        }

        .cert-thumb-icon { font-size: 24px; }

        .cert-thumb-title {
          font-size: 10px;
          color: #8b6914;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .cert-thumb-name {
          font-size: 13px;
          color: #3d2800;
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
        }

        /* ── MODAL ──────────────────────────────────────────────── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

        .modal-inner {
          background: var(--surface);
          border: 1px solid var(--border-hover);
          border-radius: 24px;
          padding: 32px;
          max-width: 720px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease;
          position: relative;
        }

        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }

        .modal-close {
          position: absolute;
          top: 20px; right: 20px;
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--surface2);
          color: var(--text-muted);
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .modal-close:hover { border-color: #f43f5e; color: #f43f5e; }

        .modal-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        /* ── MISC ───────────────────────────────────────────────── */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-muted);
          grid-column: 1/-1;
        }

        .empty-state-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
        .empty-state-text { font-size: 15px; }

        @media (max-width: 1100px) {
          .pf-stats-bar { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 900px) {
          .pf-stats-bar { grid-template-columns: repeat(3, 1fr); }
          .pf-overview-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .pf-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .pf-layout { padding: 0 16px 60px; }
          .pf-name { font-size: 26px; }
          .pf-head { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="pf-root">

        {/* BANNER */}
        <div className="pf-banner">
          <div className="pf-banner-mesh" />
          <div className="pf-banner-dots" />
          <div className="pf-banner-line" />
          <div className="pf-theme-bar">
            <span className="pf-theme-label">Theme</span>
            {accentOptions.map(({ c, name }) => (
              <div
                key={c}
                className={`color-dot ${accentColor === c ? 'cd-active' : ''}`}
                style={{ background: c }}
                onClick={() => setAccentColor(c)}
                title={name}
              />
            ))}
          </div>
        </div>

        <div className="pf-layout">

          {/* PROFILE HEAD */}
          <div className="pf-head">
            <div className="pf-avatar-wrap">
              <div className="pf-avatar-ring">
                <img src={avatar} className="pf-avatar" alt="avatar" />
              </div>
              <div className="pf-avatar-edit" onClick={() => fileInputRef.current?.click()} title="Change photo">✏️</div>
              <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleImageChange} />
            </div>

            <div className="pf-head-info">
              <div className="pf-role-pill">🎓 Student</div>
              <div className="pf-name">{user.name}</div>
              <div className="pf-email">{user.email || 'student@example.com'}</div>
              <div className="pf-bio-wrap">
                {editingBio ? (
                  <>
                    <input className="pf-bio-input" value={bioInput} onChange={e => setBioInput(e.target.value)} maxLength={120} autoFocus />
                    <button className="pf-bio-save" onClick={handleBioSave}>Save</button>
                    <button className="pf-bio-edit-btn" onClick={() => setEditingBio(false)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span className="pf-bio">{bio}</span>
                    <button className="pf-bio-edit-btn" onClick={() => { setBioInput(bio); setEditingBio(true); }}>✏️ Edit</button>
                  </>
                )}
              </div>
            </div>

            <div className="pf-head-actions">
              <button className="pf-btn pf-btn-ghost" onClick={() => fileInputRef.current?.click()}>📷 Photo</button>
              <button className="pf-btn pf-btn-primary">🚀 Share Profile</button>
            </div>
          </div>

          {/* STATS BAR */}
          <div className="pf-stats-bar">
            {[
              { icon: '⚡', val: totalPoints, label: 'Total XP' },
              { icon: '📚', val: courses.length, label: 'Courses' },
              { icon: '✅', val: completedCourses, label: 'Completed' },
              
              
              { icon: '📈', val: `${completionRate}%`, label: 'Completion' },
            ].map(s => (
              <div className="pf-stat" key={s.label}>
                <div className="pf-stat-icon">{s.noIcon ? '' : s.icon}</div>
                <div className="pf-stat-value" style={{ color: s.noIcon ? accentColor : '' }}>
                  {s.noIcon ? s.icon : s.val}
                </div>
                <div className="pf-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* TABS */}
          <div className="pf-tabs">
            {[
              { key: 'overview', icon: '🏠', label: 'Overview' },
              { key: 'courses', icon: '📚', label: 'Courses' },
              { key: 'achievements', icon: '🏆', label: 'Achievements' },
            ].map(t => (
              <button
                key={t.key}
                className={`pf-tab ${activeTab === t.key ? 'tab-active' : ''}`}
                onClick={() => setActiveTab(t.key)}
              >
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>

          {/* ── OVERVIEW TAB ─────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div className="pf-overview-grid">
              {/* Progress Summary */}
              <div className="pf-card">
                <div className="pf-card-title">⚡ Progress Summary</div>
                <div className="progress-ring-wrap">
                  <svg className="progress-ring-svg" width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="50"
                      fill="none"
                      stroke={accentColor}
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - completionRate / 100)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                    <text x="60" y="56" textAnchor="middle" dominantBaseline="middle" fill="#f0f4ff" fontSize="20" fontFamily="Space Grotesk" fontWeight="700">{completionRate}%</text>
                    <text x="60" y="72" textAnchor="middle" dominantBaseline="middle" fill="#4a5568" fontSize="10" fontFamily="Plus Jakarta Sans">complete</text>
                  </svg>
                  <div className="xp-details">
                    {[
                      ['XP Points', totalPoints, true],
                      ['Courses', `${completedCourses}/${courses.length}`, false],
                      ['Videos', totalVideosWatched, false],
                      ['Quizzes', totalQuizzesTaken, false],
                      ['Watch Time', `${watchHours}h ${watchMins}m`, false],
                    ].map(([label, val, accent]) => (
                      <div className="xp-row" key={label}>
                        <span className="xp-row-label">{label}</span>
                        <span className={`xp-row-val ${accent ? 'xp-row-accent' : ''}`}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tracking Bars */}
              <div className="pf-card">
                <div className="pf-card-title">📊 Learning Tracker</div>
                <div>
                  {[
                    
                    { label: '🎯 Quiz Accuracy', val: quizAccuracy, max: 100, display: `${quizAccuracy}%` },
                    { label: '✅ Course Completion', val: completionRate, max: 100, display: `${completionRate}%` },
                  ].map(t => (
                    <div className="tracking-section" key={t.label}>
                      <div className="tracking-header">
                        <span className="tracking-label">{t.label}</span>
                        <span className="tracking-val">{t.display}</span>
                      </div>
                      <div className="track-bar">
                        <div
                          className="track-fill"
                          style={{ width: `${Math.min((t.val / t.max) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Heatmap (full width) */}
              <div className="pf-card" style={{ gridColumn: '1 / -1' }}>
                <div className="pf-card-title">🔥 Activity Heatmap — Last 70 Days</div>
                <div className="heatmap-grid">
                  {Array.from({ length: 70 }).map((_, i) => {
                    const r = Math.random();
                    const cls = r > 0.85 ? 'hm-4' : r > 0.7 ? 'hm-3' : r > 0.55 ? 'hm-2' : r > 0.35 ? 'hm-1' : '';
                    return <div key={i} className={`hm-cell ${cls}`} title={`Day ${70 - i}`} />;
                  })}
                </div>
                <div style={{ marginTop: 14, display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: 'var(--text-muted)' }}>
                  <span>Less</span>
                  {['hm-1', 'hm-2', 'hm-3', 'hm-4'].map(c => (
                    <div key={c} className={`hm-cell ${c}`} style={{ width: 14, height: 14 }} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </div>
          )}

          {/* ── COURSES TAB ──────────────────────────────────────── */}
          {activeTab === 'courses' && (
            <div className="courses-grid">
              {courses.map((c) => {
                const cp = prog[c.id] || { points: 0, roundsPlayed: 0, level: 1, completed: false, videos: [], quizzes: [] };
                const videos = cp.videos || [];
                const quizzes = cp.quizzes || [];
                const watchedVids = videos.filter(v => v.watched).length;
                const takenQuizzes = quizzes.filter(q => q.taken);
                const avgQuizScore = takenQuizzes.length > 0
                  ? Math.round(takenQuizzes.reduce((s, q) => s + (q.correct / (q.total || 1)) * 100, 0) / takenQuizzes.length) : null;
                const progressPercent = cp.completed ? 100 : Math.min((cp.points / 100) * 100, 100);
                const status = cp.completed ? 'completed' : cp.points > 0 ? 'progress' : 'start';

                return (
                  <div key={c.id} className="course-card">
                    <div className="course-card-header">
                      <div className="course-title">{c.title}</div>
                      <div className={`course-badge badge-${status}`}>
                        {status === 'completed' ? '✓ Done' : status === 'progress' ? 'In Progress' : 'Not Started'}
                      </div>
                    </div>

                    {/* Tracking grid */}
                    <div className="course-track-grid">
                      <div className="course-track-item">
                        <div className="cti-label">🎬 Videos</div>
                        <div className="cti-val">{watchedVids}<span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>/{videos.length || 0}</span></div>
                        <div className="cti-sub">watched</div>
                      </div>
                      <div className="course-track-item">
                        <div className="cti-label">📝 Quizzes</div>
                        <div className="cti-val">{avgQuizScore !== null ? `${avgQuizScore}%` : '—'}</div>
                        <div className="cti-sub">{takenQuizzes.length} taken</div>
                      </div>
                    </div>

                    <div className="course-meta">
                      <div className="meta-pill">⚡ <span>{cp.points} XP</span></div>
                      <div className="meta-pill">🎯 <span>Lv.{cp.level || 1}</span></div>
                      <div className="meta-pill">🎮 <span>{cp.roundsPlayed || 0} rounds</span></div>
                    </div>

                    <div className="progress-bar">
                      <div className={`progress-fill ${cp.completed ? 'progress-fill-done' : ''}`} style={{ width: `${progressPercent}%` }} />
                    </div>
                    <div className="progress-label">{Math.round(progressPercent)}% complete</div>

                    {/* Video list */}
                    {videos.length > 0 && (
                      <div className="video-list">
                        <div className="video-list-title">📹 Video Progress</div>
                        {videos.slice(0, 4).map((v, i) => (
                          <div key={v.id || i} className="video-item">
                            <div className={`vi-dot ${v.watched ? 'vi-dot-done' : 'vi-dot-pending'}`} />
                            <span className="vi-title">{v.title || `Video ${i + 1}`}</span>
                            <span className="vi-time">{v.watched ? '✓' : `${Math.round((v.watchedSeconds || 0) / 60)}m`}</span>
                          </div>
                        ))}
                        {videos.length > 4 && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>+{videos.length - 4} more videos</div>}
                      </div>
                    )}

                    {/* Quiz list */}
                    {quizzes.length > 0 && (
                      <div className="video-list">
                        <div className="video-list-title">📝 Quiz Scores</div>
                        {quizzes.map((q, i) => {
                          const score = q.taken ? Math.round((q.correct / (q.total || 1)) * 100) : null;
                          return (
                            <div key={q.id || i} className="quiz-item">
                              <span className="qi-name">{q.title || `Quiz ${i + 1}`}</span>
                              <span className={`qi-score ${score === null ? 'qi-pending' : score >= 80 ? 'qi-good' : score >= 50 ? 'qi-mid' : 'qi-low'}`}>
                                {score === null ? 'Not taken' : `${score}%`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Certificate */}
                    {cp.completed && (
                      <div className="cert-wrap">
                        <div className="cert-thumb">
                          <div className="cert-thumb-icon">🏆</div>
                          <div className="cert-thumb-title">Certificate of Completion</div>
                          <div className="cert-thumb-name">{c.title}</div>
                        </div>
                        <button className="cert-open-btn" onClick={() => setSelectedCert({ course: c, progress: cp })}>
                          🎓 View Full Certificate
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {courses.length === 0 && (
                <div className="empty-state">
                  <div className="empty-state-icon">📚</div>
                  <div className="empty-state-text">No courses joined yet. Start learning! 🚀</div>
                </div>
              )}
            </div>
          )}

          {/* ── ACHIEVEMENTS TAB ─────────────────────────────────── */}
          {activeTab === 'achievements' && (
            <>
              <div style={{ marginBottom: 24, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {achievements.filter(a => a.unlocked).length} / {achievements.length} unlocked
                </span>
                <div style={{ flex: 1, maxWidth: 200, height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 99, background: `linear-gradient(90deg, ${accentColor}, #818cf8)`, width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%`, transition: 'width 0.8s ease' }} />
                </div>
              </div>

              <div className="ach-grid">
                {achievements.map(a => (
                  <div key={a.name} className={`ach-card ${a.unlocked ? 'unlocked' : 'locked'}`}>
                    <div className="ach-icon-wrap">{a.icon}</div>
                    <div className="ach-name">{a.name}</div>
                    <div className="ach-desc">{a.desc}</div>

                    {a.unlocked
                      ? <div className="ach-unlocked-badge">✓ Unlocked</div>
                      : <div className="ach-locked-badge">🔒 Locked</div>
                    }

                    {/* Certificate inside achievement if applicable */}
                    {a.unlocked && a.hasCert && a.certCourse && (
                      <div className="ach-cert-section">
                        <div className="ach-cert-label">🎓 Certificate Earned</div>
                        <div className="cert-thumb">
                          <div className="cert-thumb-icon">🏆</div>
                          <div className="cert-thumb-title">Certificate of Completion</div>
                          <div className="cert-thumb-name">{a.certCourse.title}</div>
                        </div>
                        <button className="cert-open-btn" onClick={() => setSelectedCert({ course: a.certCourse, progress: prog[a.certCourse?.id] || {} })}>
                          🎓 View Full Certificate
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      {/* CERTIFICATE MODAL */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="modal-inner" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCert(null)}>✕</button>
            <div className="modal-title">🎓 Certificate of Completion</div>
            <Certificate
              course={selectedCert.course}
              user={user}
              progress={selectedCert.progress}
            />
          </div>
        </div>
      )}
    </>
  );
}