import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NAV_LINKS = [
  { to: "/dashboard",   label: "Dashboard",       icon: "⊞" },
  { to: "/materials",   label: "Study Materials",  icon: "📚" },
  { to: "/leaderboard", label: "Leaderboard",      icon: "🏆" },
  { to: "/profile",     label: "Profile",          icon: "◉" },
  { to: "/chatbot",     label: "ChatBot",          icon: "🤖" },
];

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const nav      = useNavigate();
  const location = useLocation();

  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  /* scroll glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    nav('/login');
  };

  const initials = user?.name
    ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <>
      <style>{CSS}</style>

      <nav className={`nb-root${scrolled ? " nb-scrolled" : ""}`}>

        {/* ── LOGO ── */}
        <Link to="/dashboard" className="nb-logo">
          <span className="nb-logo-icon">⚡</span>
          <span className="nb-logo-text">SmartLearn</span>
        </Link>

        {/* ── DESKTOP LINKS ── */}
        <div className="nb-links">
          {NAV_LINKS.map(({ to, label, icon }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} className={`nb-link${active ? " nb-link-active" : ""}`}>
                <span className="nb-link-icon">{icon}</span>
                <span>{label}</span>
                {active && <span className="nb-link-dot" />}
              </Link>
            );
          })}
        </div>

        {/* ── RIGHT ── */}
        <div className="nb-right">
          {user ? (
            <div className="nb-user" ref={dropdownRef}>
              <button className="nb-avatar-btn" onClick={() => setDropdownOpen(o => !o)}>
                <span className="nb-avatar">{initials}</span>
                <span className="nb-user-name">Hi, {user.name.split(" ")[0]}</span>
                <span className={`nb-chevron${dropdownOpen ? " nb-chevron-open" : ""}`}>›</span>
              </button>

              {dropdownOpen && (
                <div className="nb-dropdown">
                  <div className="nb-dropdown-header">
                    <span className="nb-avatar nb-avatar-lg">{initials}</span>
                    <div>
                      <p className="nb-dd-name">{user.name}</p>
                      <p className="nb-dd-email">{user.email || "student@learnx.io"}</p>
                    </div>
                  </div>
                  <div className="nb-dropdown-divider" />
                  <Link to="/profile"  className="nb-dd-item" onClick={() => setDropdownOpen(false)}>◉ &nbsp;View Profile</Link>
                  <Link to="/settings" className="nb-dd-item" onClick={() => setDropdownOpen(false)}>⚙ &nbsp;Settings</Link>
                  <div className="nb-dropdown-divider" />
                  <button className="nb-dd-logout" onClick={handleLogout}>⏻ &nbsp;Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nb-login-btn">Sign In →</Link>
          )}

          {/* HAMBURGER */}
          <button
            className={`nb-hamburger${menuOpen ? " nb-hamburger-open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`nb-drawer${menuOpen ? " nb-drawer-open" : ""}`}>
        {NAV_LINKS.map(({ to, label, icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to} to={to}
              className={`nb-drawer-link${active ? " nb-drawer-link-active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <span>{icon}</span><span>{label}</span>
            </Link>
          );
        })}
        {user && (
          <button className="nb-drawer-logout" onClick={handleLogout}>⏻ Logout</button>
        )}
      </div>

      {/* overlay */}
      {menuOpen && <div className="nb-overlay" onClick={() => setMenuOpen(false)} />}
    </>
  );
}

/* ─────────────────────── CSS ─────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

.nb-root {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 80px;
  background: rgba(8, 13, 22, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  font-family: 'DM Sans', 'Segoe UI', sans-serif;
  transition: box-shadow 0.3s, background 0.3s;
}

.nb-scrolled {
  background: rgba(8, 13, 22, 0.92);
  box-shadow: 0 4px 32px rgba(0,0,0,0.45);
}

/* LOGO */
.nb-logo {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  flex-shrink: 0;
}
.nb-logo-icon {
  font-size: 20px;
  filter: drop-shadow(0 0 6px #00fff7);
}
.nb-logo-text {
  font-size: 18px;
  font-weight: 800;
  color: #f0f4ff;
  letter-spacing: -0.3px;
}

/* DESKTOP LINKS */
.nb-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.nb-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 13px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 500;
  color: #7a8fa6;
  transition: color 0.2s, background 0.2s;
}
.nb-link:hover {
  color: #f0f4ff;
  background: rgba(255,255,255,0.06);
}
.nb-link-active {
  color: #00fff7 !important;
  background: rgba(0,255,247,0.08) !important;
}
.nb-link-icon {
  font-size: 14px;
  opacity: 0.7;
}
.nb-link-dot {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #00fff7;
  box-shadow: 0 0 6px #00fff7;
}

/* RIGHT */
.nb-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

/* AVATAR BUTTON */
.nb-avatar-btn {
  display: flex;
  align-items: center;
  gap: 9px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50px;
  padding: 5px 14px 5px 5px;
  cursor: pointer;
  color: #d0dce8;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  transition: background 0.2s, border-color 0.2s;
}
.nb-avatar-btn:hover {
  background: rgba(255,255,255,0.09);
  border-color: rgba(0,255,247,0.3);
  color: #f0f4ff;
}
.nb-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00fff7, #007cf0);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
}
.nb-avatar-lg {
  width: 40px;
  height: 40px;
  font-size: 14px;
}
.nb-user-name { max-width: 100px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.nb-chevron {
  font-size: 18px;
  line-height: 1;
  transition: transform 0.25s;
  display: inline-block;
  margin-left: -2px;
  color: #5a6a7e;
}
.nb-chevron-open { transform: rotate(90deg); }

/* DROPDOWN */
.nb-user { position: relative; }
.nb-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 240px;
  background: #0e1724;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,255,247,0.05);
  animation: nb-fadein 0.18s ease;
}
@keyframes nb-fadein {
  from { opacity:0; transform: translateY(-6px) scale(0.97); }
  to   { opacity:1; transform: translateY(0)   scale(1); }
}
.nb-dropdown-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px 12px;
}
.nb-dd-name  { font-size: 14px; font-weight: 700; color: #f0f4ff; margin: 0; }
.nb-dd-email { font-size: 12px; color: #5a6a7e; margin: 2px 0 0; }
.nb-dropdown-divider {
  height: 1px;
  background: rgba(255,255,255,0.07);
  margin: 4px 0;
}
.nb-dd-item {
  display: block;
  padding: 9px 12px;
  border-radius: 10px;
  font-size: 13.5px;
  color: #8a9ab0;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}
.nb-dd-item:hover { background: rgba(255,255,255,0.06); color: #f0f4ff; }
.nb-dd-logout {
  width: 100%;
  text-align: left;
  padding: 9px 12px;
  border-radius: 10px;
  background: none;
  border: none;
  font-size: 13.5px;
  font-family: inherit;
  color: #e05c5c;
  cursor: pointer;
  transition: background 0.15s;
}
.nb-dd-logout:hover { background: rgba(224,92,92,0.1); }

/* LOGIN BTN */
.nb-login-btn {
  padding: 8px 18px;
  border-radius: 10px;
  background: linear-gradient(90deg, #00fff7, #007cf0);
  color: #000;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
}
.nb-login-btn:hover { opacity: 0.88; transform: translateY(-1px); }

/* HAMBURGER */
.nb-hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 6px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 9px;
  cursor: pointer;
}
.nb-hamburger span {
  display: block;
  height: 2px;
  background: #a0b4c8;
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
  transform-origin: center;
}
.nb-hamburger-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nb-hamburger-open span:nth-child(2) { opacity: 0; }
.nb-hamburger-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* MOBILE DRAWER */
.nb-drawer {
  position: fixed;
  top: 64px;
  left: 0; right: 0;
  background: #0b1220;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  z-index: 999;
  padding: 12px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transform: translateY(-110%);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.nb-drawer-open { transform: translateY(0); opacity: 1; }
.nb-drawer-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  text-decoration: none;
  color: #7a8fa6;
  font-size: 15px;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}
.nb-drawer-link:hover { background: rgba(255,255,255,0.05); color: #f0f4ff; }
.nb-drawer-link-active { color: #00fff7; background: rgba(0,255,247,0.07); }
.nb-drawer-logout {
  margin-top: 8px;
  padding: 12px 14px;
  background: rgba(224,92,92,0.08);
  border: 1px solid rgba(224,92,92,0.18);
  border-radius: 12px;
  color: #e05c5c;
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s;
}
.nb-drawer-logout:hover { background: rgba(224,92,92,0.16); }

/* OVERLAY */
.nb-overlay {
  position: fixed;
  inset: 0;
  z-index: 998;
  background: rgba(0,0,0,0.4);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .nb-links { display: none; }
  .nb-hamburger { display: flex; }
  .nb-user-name { display: none; }
}
@media (max-width: 480px) {
  .nb-root { padding: 0 18px; }
}
`;