import React, { useState, useEffect, useRef } from 'react';

const MEDALS = ['🥇', '🥈', '🥉'];
const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
const RANK_GLOWS = [
  '0 0 20px rgba(255,215,0,0.6)',
  '0 0 20px rgba(192,192,192,0.5)',
  '0 0 20px rgba(205,127,50,0.5)',
];

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');`;

export default function Leaderboard({ courses = [] }) {
  const [data, setData] = useState({});
  const [activeCard, setActiveCard] = useState(null);
  const [animIn, setAnimIn] = useState(false);
  const styleRef = useRef(null);

  useEffect(() => {
    if (!styleRef.current) {
      const style = document.createElement('style');
      style.textContent = FONTS + CSS_ANIMATIONS;
      document.head.appendChild(style);
      styleRef.current = style;
    }
    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const all = {};
    courses.forEach(c => {
      const key = `quiz_leaderboard_${c.id}`;
      all[c.id] = JSON.parse(localStorage.getItem(key) || '[]');
    });
    setData(all);
    setTimeout(() => setAnimIn(true), 100);
  }, [courses]);

  return (
    <div style={styles.root}>
      {/* Ambient background layers */}
      <div style={styles.bgNoise} />
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.bgGrid} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logoMark}>
            <span style={styles.logoIcon}>◈</span>
          </div>
          <div>
            <p style={styles.headerEyebrow}>LIVE RANKINGS</p>
            <h1 style={styles.headerTitle}>Leaderboard</h1>
          </div>
          <div style={styles.headerBadge}>
            <span style={styles.liveDot} />
            LIVE
          </div>
        </div>
        <div style={styles.headerDivider} />
      </header>

      {/* Cards */}
      <div style={styles.grid}>
        {courses.map((course, idx) => {
          const entries = data[course.id] || [];
          const top3 = entries.slice(0, 3);
          const isActive = activeCard === idx;
          const delay = idx * 80;

          return (
            <div
              key={course.id}
              style={{
                ...styles.card,
                ...(animIn ? {
                  opacity: 1,
                  transform: isActive
                    ? 'translateY(-8px) scale(1.02)'
                    : 'translateY(0) scale(1)',
                  transitionDelay: `${delay}ms`,
                } : {
                  opacity: 0,
                  transform: 'translateY(30px)',
                }),
                boxShadow: isActive
                  ? '0 30px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(0,210,255,0.3)'
                  : '0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
              onMouseEnter={() => setActiveCard(idx)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card inner glow on hover */}
              <div style={{
                ...styles.cardGlow,
                opacity: isActive ? 1 : 0,
              }} />

              {/* Card top stripe */}
              <div style={styles.cardStripe} />

              {/* Card header */}
              <div style={styles.cardHeader}>
                <div style={styles.cardIndex}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div style={styles.cardTitleWrap}>
                  <h3 style={styles.cardTitle}>{course.title}</h3>
                  <span style={styles.cardSub}>
                    {entries.length} {entries.length === 1 ? 'player' : 'players'}
                  </span>
                </div>
                <div style={styles.cardArrow}>›</div>
              </div>

              {/* Separator */}
              <div style={styles.cardSep} />

              {/* Rankings */}
              {top3.length > 0 ? (
                <div style={styles.rankList}>
                  {top3.map((u, i) => (
                    <div key={i} style={{
                      ...styles.rankRow,
                      borderLeft: `3px solid ${RANK_COLORS[i]}`,
                      boxShadow: isActive ? RANK_GLOWS[i] : 'none',
                    }}>
                      <div style={styles.rankLeft}>
                        <span style={{ ...styles.rankMedal, color: RANK_COLORS[i] }}>
                          {MEDALS[i]}
                        </span>
                        <span style={styles.rankName}>{u.name}</span>
                      </div>
                      <div style={styles.rankRight}>
                        <span style={{ ...styles.rankPts, color: RANK_COLORS[i] }}>
                          {u.points.toLocaleString()}
                        </span>
                        <span style={styles.rankPtsLabel}>PTS</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>◯</div>
                  <p style={styles.emptyTitle}>No Players Yet</p>
                  <p style={styles.emptySub}>Complete a quiz to appear here</p>
                </div>
              )}

              {/* Bottom bar */}
              {top3.length > 0 && (
                <div style={styles.cardFooter}>
                  <span style={styles.footerText}>Top {Math.min(3, entries.length)} of {entries.length}</span>
                  <span style={styles.footerChevron}>→ View All</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={styles.footerNote}>◈ Rankings update in real-time</span>
      </footer>
    </div>
  );
}

/* ── Styles ── */
const styles = {
  root: {
    minHeight: '100vh',
    background: '#080C14',
    fontFamily: "'Rajdhani', sans-serif",
    color: '#E8EDF5',
    padding: '0 0 60px',
    position: 'relative',
    overflow: 'hidden',
  },
  bgNoise: {
    position: 'fixed', inset: 0, zIndex: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '128px 128px',
    pointerEvents: 'none',
  },
  bgGrid: {
    position: 'fixed', inset: 0, zIndex: 0,
    backgroundImage: `
      linear-gradient(rgba(0,210,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,210,255,0.03) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    pointerEvents: 'none',
  },
  bgOrb1: {
    position: 'fixed', top: '-200px', right: '-200px',
    width: '600px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,80,160,0.25) 0%, transparent 70%)',
    zIndex: 0, pointerEvents: 'none',
  },
  bgOrb2: {
    position: 'fixed', bottom: '-150px', left: '-150px',
    width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,160,100,0.15) 0%, transparent 70%)',
    zIndex: 0, pointerEvents: 'none',
  },
  header: {
    position: 'relative', zIndex: 10,
    padding: '50px 50px 0',
    marginBottom: '48px',
  },
  headerInner: {
    display: 'flex', alignItems: 'center', gap: '20px',
    marginBottom: '30px',
  },
  logoMark: {
    width: '52px', height: '52px',
    background: 'linear-gradient(135deg, #003A5C, #006699)',
    borderRadius: '14px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 0 20px rgba(0,150,255,0.3)',
    border: '1px solid rgba(0,200,255,0.2)',
  },
  logoIcon: {
    fontFamily: "'Orbitron', monospace",
    fontSize: '22px', color: '#00D2FF',
  },
  headerEyebrow: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '11px', letterSpacing: '0.3em',
    color: '#00D2FF', margin: 0, marginBottom: '4px',
    opacity: 0.8,
  },
  headerTitle: {
    fontFamily: "'Orbitron', monospace",
    fontSize: '38px', fontWeight: 900,
    margin: 0, letterSpacing: '0.05em',
    background: 'linear-gradient(90deg, #ffffff 0%, #a0c8e8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerBadge: {
    marginLeft: 'auto',
    display: 'flex', alignItems: 'center', gap: '7px',
    background: 'rgba(0,210,100,0.1)',
    border: '1px solid rgba(0,210,100,0.3)',
    borderRadius: '100px',
    padding: '6px 14px',
    fontFamily: "'Space Mono', monospace",
    fontSize: '11px', letterSpacing: '0.15em',
    color: '#00D264',
  },
  liveDot: {
    display: 'inline-block',
    width: '7px', height: '7px',
    borderRadius: '50%',
    background: '#00D264',
    boxShadow: '0 0 8px #00D264',
    animation: 'pulse 2s infinite',
  },
  headerDivider: {
    height: '1px',
    background: 'linear-gradient(90deg, rgba(0,210,255,0.5), rgba(0,210,255,0.05) 70%, transparent)',
  },

  /* Grid */
  grid: {
    position: 'relative', zIndex: 10,
    padding: '0 50px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },

  /* Card */
  card: {
    background: 'linear-gradient(160deg, #0D1826 0%, #0A1220 100%)',
    borderRadius: '18px',
    border: '1px solid rgba(255,255,255,0.07)',
    padding: '0',
    overflow: 'hidden',
    cursor: 'pointer',
    opacity: 0,
    transition: 'opacity 0.5s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease',
    position: 'relative',
  },
  cardGlow: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at top, rgba(0,150,255,0.06) 0%, transparent 60%)',
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  },
  cardStripe: {
    height: '3px',
    background: 'linear-gradient(90deg, #0066CC, #00D2FF, #006644)',
  },
  cardHeader: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '20px 22px 16px',
  },
  cardIndex: {
    fontFamily: "'Orbitron', monospace",
    fontSize: '13px', fontWeight: 700,
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: '0.05em',
    flexShrink: 0,
  },
  cardTitleWrap: { flex: 1, minWidth: 0 },
  cardTitle: {
    fontFamily: "'Orbitron', monospace",
    fontSize: '15px', fontWeight: 700,
    color: '#E8EDF5', margin: 0,
    letterSpacing: '0.03em',
    whiteSpace: 'nowrap', overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardSub: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '10px', color: 'rgba(255,255,255,0.35)',
    letterSpacing: '0.1em',
  },
  cardArrow: {
    fontSize: '20px', color: 'rgba(0,210,255,0.4)',
    fontWeight: 300, flexShrink: 0,
  },
  cardSep: {
    height: '1px', margin: '0 22px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)',
  },

  /* Rankings */
  rankList: {
    padding: '16px 22px',
    display: 'flex', flexDirection: 'column', gap: '10px',
  },
  rankRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '10px',
    padding: '11px 14px',
    transition: 'box-shadow 0.4s ease',
  },
  rankLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
  rankMedal: { fontSize: '18px', flexShrink: 0 },
  rankName: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: '16px', fontWeight: 600,
    color: '#D0D8E8',
    letterSpacing: '0.02em',
  },
  rankRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  rankPts: {
    fontFamily: "'Orbitron', monospace",
    fontSize: '16px', fontWeight: 700,
    letterSpacing: '0.05em',
  },
  rankPtsLabel: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '9px', color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.15em',
  },

  /* Empty */
  emptyState: {
    padding: '30px 22px 24px',
    textAlign: 'center',
  },
  emptyIcon: {
    fontFamily: "'Orbitron', monospace",
    fontSize: '36px', color: 'rgba(255,255,255,0.1)',
    marginBottom: '12px', lineHeight: 1,
  },
  emptyTitle: {
    fontFamily: "'Orbitron', monospace",
    fontSize: '14px', fontWeight: 700,
    color: 'rgba(255,255,255,0.35)',
    margin: '0 0 6px', letterSpacing: '0.05em',
  },
  emptySub: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '10px', color: 'rgba(255,255,255,0.2)',
    margin: 0, letterSpacing: '0.08em',
  },

  /* Card footer */
  cardFooter: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    padding: '12px 22px',
    marginTop: '4px',
  },
  footerText: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '10px', color: 'rgba(255,255,255,0.25)',
    letterSpacing: '0.1em',
  },
  footerChevron: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '10px', color: 'rgba(0,210,255,0.5)',
    letterSpacing: '0.08em',
  },

  /* Page footer */
  footer: {
    position: 'relative', zIndex: 10,
    marginTop: '50px', textAlign: 'center',
  },
  footerNote: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '11px', letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.15)',
  },
};

const CSS_ANIMATIONS = `
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }
`;