// src/components/CourseDetail.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BUILT_IN_COURSES,
  COURSE_VIDEOS,
  courseThemes,
  courseImages,
  defaultTheme,
  getKey,
} from "../data/courseData";

export default function CourseDetail({ courses = [] }) {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Merge built-in + passed-in courses, de-dupe by id
  const allCourses = [...BUILT_IN_COURSES];
  courses.forEach(c => {
    if (!allCourses.find(b => b.id === c.id)) allCourses.push(c);
  });

  // Find course by string id (supports both string and numeric ids)
  const course = allCourses.find(c => String(c.id) === String(courseId));

  const [activeVideo, setActiveVideo] = useState(0);

  if (!course) {
    return (
      <div style={styles.notFound}>
        <span style={{ fontSize: "48px" }}>😕</span>
        <p style={{ color: "#a0b4c8", marginTop: "16px", fontSize: "18px" }}>Course not found.</p>
        <button style={styles.backBtnDefault} onClick={() => navigate("/courses")}>← Back to Courses</button>
      </div>
    );
  }

  const key     = getKey(course.title);
  const theme   = courseThemes[key] || defaultTheme;
  const imgSrc  = courseImages[key] || courseImages.html;
  const videos  = COURSE_VIDEOS[course.id] || [];
  const current = videos[activeVideo];

  return (
    <div style={styles.page}>

      {/* AMBIENT BG */}
      <div style={{ ...styles.bgBlob1, background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)` }} />
      <div style={styles.bgBlob2} />

      {/* BACK BUTTON */}
      <button
        style={{ ...styles.backBtn, borderColor: theme.accent, color: theme.accent }}
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Courses
      </button>

      {/* COURSE HEADER */}
      <div style={styles.courseHeader}>
        <div style={{ ...styles.iconWrap, boxShadow: `0 0 24px ${theme.glow}` }}>
          <img src={imgSrc} alt={course.title} style={styles.icon} />
        </div>
        <div>
          <p style={{ ...styles.categoryLabel, color: theme.accent }}>{theme.emoji} {theme.label}</p>
          <h1 style={styles.courseTitle}>{course.title}</h1>
          <p style={styles.courseDesc}>{course.description}</p>
        </div>
      </div>

      {/* MAIN CONTENT: player + playlist side by side */}
      <div style={styles.contentWrap}>

        {/* LEFT: VIDEO PLAYER */}
        <div style={styles.playerSection}>
          {current ? (
            <>
              {/* ── iframe – same pattern as original CourseDetail ── */}
              <div style={styles.iframeContainer}>
                <iframe
                  key={current.videoId}
                  src={`https://www.youtube.com/embed/${current.videoId}?autoplay=1&rel=0`}
                  title={current.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={styles.iframe}
                  className="course-iframe"
                />
              </div>

              {/* Now playing label */}
              <div style={{ ...styles.nowPlaying, borderLeft: `3px solid ${theme.accent}` }}>
                <span style={{ color: theme.accent, fontSize: "11px", fontWeight: 700, letterSpacing: "1px" }}>
                  ▶ NOW PLAYING
                </span>
                <p style={styles.nowPlayingTitle}>{current.title}</p>
              </div>

              {/* Prev / Next navigation */}
              <div style={styles.navRow}>
                <button
                  disabled={activeVideo === 0}
                  onClick={() => setActiveVideo(v => v - 1)}
                  style={{
                    ...styles.navBtn,
                    borderColor: theme.accent,
                    color: theme.accent,
                    opacity: activeVideo === 0 ? 0.3 : 1,
                  }}
                >
                  ← Prev
                </button>
                <span style={styles.navCount}>{activeVideo + 1} / {videos.length}</span>
                <button
                  disabled={activeVideo === videos.length - 1}
                  onClick={() => setActiveVideo(v => v + 1)}
                  style={{
                    ...styles.navBtn,
                    borderColor: theme.accent,
                    color: theme.accent,
                    opacity: activeVideo === videos.length - 1 ? 0.3 : 1,
                  }}
                >
                  Next →
                </button>
              </div>
            </>
          ) : (
            <div style={styles.noVideo}>
              <span style={{ fontSize: "40px" }}>🎬</span>
              <p style={{ color: "#6b7f99", marginTop: "12px" }}>No videos available for this course yet.</p>
            </div>
          )}
        </div>

        {/* RIGHT: PLAYLIST */}
        {videos.length > 0 && (
          <div style={styles.playlist}>
            <p style={styles.playlistLabel}>📋 Course Playlist</p>
            {videos.map((v, i) => (
              <div
                key={v.videoId}
                onClick={() => setActiveVideo(i)}
                style={{
                  ...styles.playlistItem,
                  background: i === activeVideo ? theme.accent + "18" : "rgba(255,255,255,0.03)",
                  borderLeft: `3px solid ${i === activeVideo ? theme.accent : "transparent"}`,
                  color: i === activeVideo ? theme.accent : "#a0b4c8",
                }}
              >
                <span style={styles.playlistNum}>{i + 1}</span>
                <span style={styles.playlistTitle}>{v.title}</span>
                {i === activeVideo && <span style={{ fontSize: "12px", flexShrink: 0 }}>▶</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* START QUIZ BUTTON — same as original */}
      <div style={styles.quizRow}>
        <button
          className="strt_btn"
          style={{ ...styles.quizBtn, background: theme.accent, boxShadow: `0 8px 32px ${theme.glow}` }}
          onClick={() => navigate(`/courses/${course.id}/rules`)}
        >
          Start Quiz →
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── STYLES ─────────────────────────── */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "32px 40px 80px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#080d14",
    overflowX: "hidden",
    position: "relative",
  },

  bgBlob1: {
    position: "fixed", top: "-200px", left: "-200px",
    width: "600px", height: "600px",
    borderRadius: "50%",
    pointerEvents: "none", zIndex: 0,
  },
  bgBlob2: {
    position: "fixed", bottom: "-160px", right: "-160px",
    width: "500px", height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,195,255,0.05) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },

  backBtn: {
    position: "relative", zIndex: 1,
    background: "transparent",
    border: "1.5px solid",
    borderRadius: "10px",
    padding: "8px 18px",
    fontSize: "13px", fontWeight: 700,
    cursor: "pointer",
    marginBottom: "28px",
    display: "inline-block",
    transition: "opacity 0.2s",
  },
  backBtnDefault: {
    background: "transparent",
    border: "1.5px solid #00fff7",
    borderRadius: "10px",
    padding: "8px 18px",
    fontSize: "13px", fontWeight: 700,
    color: "#00fff7",
    cursor: "pointer",
    marginTop: "16px",
  },

  courseHeader: {
    display: "flex", alignItems: "flex-start", gap: "20px",
    marginBottom: "32px",
    position: "relative", zIndex: 1,
    flexWrap: "wrap",
  },
  iconWrap: {
    width: "64px", height: "64px", flexShrink: 0,
    background: "rgba(255,255,255,0.08)",
    borderRadius: "16px",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  icon: { width: "40px", height: "40px", objectFit: "contain" },
  categoryLabel: {
    fontSize: "11px", fontWeight: 700,
    letterSpacing: "1.5px", textTransform: "uppercase",
    margin: "0 0 6px",
  },
  courseTitle: {
    fontSize: "clamp(22px, 3vw, 36px)",
    fontWeight: 800, color: "#f0f4ff",
    margin: "0 0 8px", lineHeight: 1.2,
  },
  courseDesc: {
    fontSize: "14px", color: "#6b7f99",
    margin: 0, lineHeight: 1.6, maxWidth: "600px",
  },

  contentWrap: {
    display: "flex", gap: "24px",
    position: "relative", zIndex: 1,
    alignItems: "flex-start",
    flexWrap: "wrap",
  },

  // ── PLAYER ──────────────────────────────────────────────────
  playerSection: {
    flex: "1 1 480px",
    display: "flex", flexDirection: "column", gap: "16px",
  },

  // Responsive 16:9 wrapper — mirrors .iframe-container in original CSS
  iframeContainer: {
    position: "relative",
    width: "100%",
    paddingBottom: "56.25%",  // 16:9
    height: 0,
    borderRadius: "16px",
    overflow: "hidden",
    background: "#000",
    boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
  },
  // Fills the container absolutely — mirrors .course-iframe in original CSS
  iframe: {
    position: "absolute",
    top: 0, left: 0,
    width: "100%", height: "100%",
    border: "none",
  },

  nowPlaying: {
    background: "rgba(255,255,255,0.04)",
    borderRadius: "10px",
    padding: "12px 16px",
    display: "flex", flexDirection: "column", gap: "4px",
  },
  nowPlayingTitle: {
    color: "#f0f4ff", fontSize: "15px", fontWeight: 600,
    margin: 0,
  },

  navRow: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between", gap: "12px",
  },
  navBtn: {
    background: "transparent",
    border: "1.5px solid",
    borderRadius: "10px",
    padding: "8px 20px",
    fontSize: "13px", fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  navCount: { color: "#5a6a7e", fontSize: "13px" },

  noVideo: {
    textAlign: "center", padding: "60px 20px", color: "#fff",
  },

  // ── PLAYLIST ─────────────────────────────────────────────────
  playlist: {
    flex: "0 0 260px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    overflow: "hidden",
    maxHeight: "420px",
    overflowY: "auto",
  },
  playlistLabel: {
    color: "#5a6a7e", fontSize: "11px",
    fontWeight: 700, letterSpacing: "1px",
    padding: "14px 16px 10px",
    textTransform: "uppercase",
    margin: 0,
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  playlistItem: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "12px 14px",
    fontSize: "13px",
    transition: "background 0.2s",
    lineHeight: 1.4,
    cursor: "pointer",
  },
  playlistNum: {
    minWidth: "20px", color: "#5a6a7e",
    fontSize: "11px", fontWeight: 700, flexShrink: 0,
  },
  playlistTitle: { flex: 1 },

  // ── QUIZ BUTTON ──────────────────────────────────────────────
  quizRow: {
    marginTop: "40px",
    position: "relative", zIndex: 1,
  },
  quizBtn: {
    padding: "14px 40px",
    borderRadius: "14px",
    border: "none",
    fontSize: "16px", fontWeight: 800,
    color: "#000",
    cursor: "pointer",
    letterSpacing: "0.3px",
    transition: "transform 0.2s, box-shadow 0.2s",
  },

  notFound: {
    minHeight: "100vh",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    background: "#080d14",
    fontFamily: "'DM Sans','Segoe UI',sans-serif",
  },
};