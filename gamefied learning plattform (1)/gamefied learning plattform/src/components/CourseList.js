// src/components/CourseList.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  BUILT_IN_COURSES,
  courseThemes,
  defaultTheme,
  courseImages,
  getKey,
} from "../data/courseData";

const DIFFICULTY_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const DURATION_OPTIONS  = ["3 Hours", "5 Hours", "8 Hours", "12 Hours", "10 Hours", "15 Hours", "6 Hours"];

// ── COURSE CARD ────────────────────────────────────────────────────────────────
function CourseCard({ course, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const key    = getKey(course.title);
  const theme  = courseThemes[key] || defaultTheme;
  const imgSrc = courseImages[key] || courseImages.html;
  const level  = DIFFICULTY_LEVELS[index % DIFFICULTY_LEVELS.length];
  const dur    = DURATION_OPTIONS[index % DURATION_OPTIONS.length];
  const lessons = 8 + (index % 8) * 2;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <Link
      to={`/courses/${course.id}`}
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)"
          : "translateY(30px) scale(0.97)",
        transition: visible
          ? "transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease, opacity 0.1s"
          : `opacity 0.55s ${index * 0.08}s ease, transform 0.55s ${index * 0.08}s ease`,
        boxShadow: hovered
          ? `0 24px 60px ${theme.glow}, 0 0 0 1px ${theme.accent}55`
          : "0 8px 32px rgba(0,0,0,0.35)",
        borderTop: `3px solid ${theme.accent}`,
      }}
    >
      {/* GLOW ORB */}
      <div style={{ ...styles.orb, background: theme.accent, opacity: hovered ? 0.12 : 0.06, transition: "opacity 0.4s" }} />

      {/* HEADER ROW */}
      <div style={styles.headerRow}>
        <div style={{ ...styles.iconWrap, boxShadow: `0 0 18px ${theme.glow}` }}>
          <img src={imgSrc} alt={course.title} style={styles.icon} />
        </div>
        <div style={{ ...styles.levelBadge, background: theme.accent + "22", color: theme.accent, border: `1px solid ${theme.accent}55` }}>
          {level}
        </div>
      </div>

      {/* CATEGORY */}
      <p style={{ ...styles.categoryLabel, color: theme.accent }}>{theme.emoji} {theme.label}</p>

      {/* TITLE */}
      <h3 style={{ ...styles.title, color: hovered ? theme.accent : "#f0f4ff", transition: "color 0.3s" }}>
        {course.title}
      </h3>

      {/* DESC */}
      <p style={styles.desc}>{course.description}</p>

      {/* DIVIDER */}
      <div style={{ ...styles.divider, background: `linear-gradient(90deg, ${theme.accent}66, transparent)` }} />

      {/* META */}
      <div style={styles.metaRow}>
        <span style={styles.metaItem}><span style={styles.metaIcon}>📚</span> {lessons} Lessons</span>
        <span style={styles.metaItem}><span style={styles.metaIcon}>⏱</span> {dur}</span>
        <span style={styles.metaItem}><span style={styles.metaIcon}>👥</span> {(2.4 + index * 0.3).toFixed(1)}k</span>
      </div>

      {/* PROGRESS BAR */}
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: hovered ? "100%" : "0%", background: theme.accent, transition: "width 0.6s ease" }} />
      </div>

      {/* CTA */}
      <div style={{
        ...styles.cta,
        background: hovered ? theme.accent : "transparent",
        color: hovered ? "#000" : theme.accent,
        border: `1.5px solid ${theme.accent}`,
        transition: "all 0.3s ease",
      }}>
        {hovered ? "Start Learning →" : "View Course"}
      </div>
    </Link>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function CourseList({ courses = [] }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Merge built-in + passed-in, de-dupe by id
  const allCourses = [...BUILT_IN_COURSES];
  courses.forEach(c => {
    if (!allCourses.find(b => b.id === c.id)) allCourses.push(c);
  });

  const categories = ["All", ...Array.from(new Set(
    allCourses.map(c => (courseThemes[getKey(c.title)] || defaultTheme).label)
  ))];

  const filtered = allCourses.filter(c => {
    const theme = courseThemes[getKey(c.title)] || defaultTheme;
    const matchCat    = filter === "All" || theme.label === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                        c.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={styles.page}>

      {/* AMBIENT BG */}
      <div style={styles.bgBlob1} />
      <div style={styles.bgBlob2} />

      {/* HEADER */}
      <div style={styles.header}>
        <p style={styles.headerEyebrow}>LEARNING PLATFORM</p>
        <h1 style={styles.headerTitle}>Master New Skills</h1>
        <p style={styles.headerSub}>
          Explore <strong style={{ color: "#00fff7" }}>{allCourses.length}</strong> expert-crafted courses and level up your career.
        </p>
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        <div style={styles.searchWrap}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          {search && (
            <span onClick={() => setSearch("")} style={{ cursor: "pointer", opacity: 0.5, fontSize: "13px" }}>✕</span>
          )}
        </div>

        <div style={styles.filters}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                ...styles.pill,
                background: filter === cat ? "#00fff7" : "rgba(255,255,255,0.06)",
                color: filter === cat ? "#000" : "#a0b4c8",
                border: filter === cat ? "none" : "1px solid rgba(255,255,255,0.12)",
                transform: filter === cat ? "scale(1.04)" : "scale(1)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* RESULT COUNT */}
      <p style={styles.resultCount}>
        Showing <strong style={{ color: "#00fff7" }}>{filtered.length}</strong> course{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* GRID */}
      {filtered.length ? (
        <div style={styles.grid}>
          {filtered.map((c, i) => <CourseCard key={c.id} course={c} index={i} />)}
        </div>
      ) : (
        <div style={styles.empty}>
          <span style={{ fontSize: "40px" }}>😶</span>
          <p style={{ color: "#a0b4c8", marginTop: "12px" }}>No courses match your search.</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── STYLES ─────────────────────────── */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px 40px 80px",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#080d14",
    overflowX: "hidden",
    position: "relative",
  },
  bgBlob1: {
    position: "fixed", top: "-160px", left: "-160px",
    width: "500px", height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,255,247,0.07) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  bgBlob2: {
    position: "fixed", bottom: "-160px", right: "-160px",
    width: "500px", height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,195,255,0.06) 0%, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  header: {
    textAlign: "center", marginBottom: "48px",
    position: "relative", zIndex: 1,
  },
  headerEyebrow: {
    letterSpacing: "4px", fontSize: "11px",
    color: "#00fff7", marginBottom: "12px", fontWeight: 700,
  },
  headerTitle: {
    fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 800, color: "#f0f4ff",
    margin: "0 0 16px", lineHeight: 1.1,
  },
  headerSub: {
    fontSize: "16px", color: "#6b7f99",
    maxWidth: "500px", margin: "0 auto",
  },
  controls: {
    display: "flex", flexWrap: "wrap",
    gap: "16px", alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    position: "relative", zIndex: 1,
  },
  searchWrap: {
    display: "flex", alignItems: "center",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", padding: "10px 16px",
    gap: "10px", flex: "1 1 260px", maxWidth: "340px",
  },
  searchIcon: { fontSize: "15px", opacity: 0.6 },
  searchInput: {
    background: "none", border: "none", outline: "none",
    color: "#f0f4ff", fontSize: "14px", width: "100%",
  },
  filters: { display: "flex", flexWrap: "wrap", gap: "8px" },
  pill: {
    padding: "8px 18px", borderRadius: "50px",
    fontSize: "13px", fontWeight: 600,
    cursor: "pointer", transition: "all 0.2s ease",
  },
  resultCount: {
    textAlign: "center", color: "#5a6a7e",
    fontSize: "13px", marginBottom: "36px",
    position: "relative", zIndex: 1,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "28px",
    position: "relative", zIndex: 1,
  },
  card: {
    position: "relative",
    background: "rgba(255,255,255,0.035)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "20px",
    padding: "24px",
    textDecoration: "none",
    color: "#f0f4ff",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex", flexDirection: "column", gap: "10px",
  },
  orb: {
    position: "absolute", top: "-60px", right: "-60px",
    width: "160px", height: "160px",
    borderRadius: "50%", pointerEvents: "none",
  },
  headerRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
  },
  iconWrap: {
    width: "54px", height: "54px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "14px",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  icon: { width: "34px", height: "34px", objectFit: "contain" },
  levelBadge: {
    fontSize: "11px", fontWeight: 700,
    padding: "4px 12px", borderRadius: "50px",
    letterSpacing: "0.5px",
  },
  categoryLabel: {
    fontSize: "11px", fontWeight: 700,
    letterSpacing: "1.5px", textTransform: "uppercase",
  },
  title: {
    fontSize: "18px", fontWeight: 700,
    margin: 0, lineHeight: 1.3,
  },
  desc: {
    fontSize: "13px", color: "#6b7f99",
    lineHeight: 1.6, margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  divider: { height: "1px", borderRadius: "1px", marginTop: "4px" },
  metaRow: {
    display: "flex", gap: "16px",
    fontSize: "12px", color: "#6b7f99", flexWrap: "wrap",
  },
  metaItem: { display: "flex", alignItems: "center", gap: "5px" },
  metaIcon: { fontSize: "13px" },
  progressTrack: {
    height: "3px", background: "rgba(255,255,255,0.07)",
    borderRadius: "2px", overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: "2px" },
  cta: {
    marginTop: "4px", padding: "11px",
    borderRadius: "12px", textAlign: "center",
    fontSize: "14px", fontWeight: 700,
    letterSpacing: "0.3px",
  },
  empty: {
    textAlign: "center", padding: "80px 20px", color: "#fff",
  },
};