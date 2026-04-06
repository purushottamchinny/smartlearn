// src/App.js
import React, { useEffect, useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import LandingPage from "./components/LandingPage";
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import QuizPage from './components/QuizPage';
import QuizRules from './components/QuizRules';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import ChatBotPage from "./components/ChatBotPage";
import StudyMaterials from "./components/StudyMaterials";

// ✅ Use BUILT_IN_COURSES directly — they already have quiz arrays embedded
import { BUILT_IN_COURSES } from './data/courseData';
import { loadProgress, saveProgress } from './utils/storage';

function AppRoutes() {
  const { user } = useContext(AuthContext);

  // ✅ courses come straight from courseData — no fetch needed
  const courses = BUILT_IN_COURSES;

  const [progress, setProgress] = useState(() => loadProgress(user?.email));

  useEffect(() => {
    if (user) saveProgress(user.email, progress);
  }, [progress, user]);

  const handleQuizComplete = (courseId, score) => {
    const cp = progress[courseId] || {
      points: 0,
      roundsPlayed: 0,
      level: 1,
      completed: false,
    };

    if (score < 6) {
      alert(`😞 You scored ${score}/10. Retry Level ${cp.level}.`);
      return false;
    }

    const nextLevel = cp.level < 5 ? cp.level + 1 : 5;
    const completed = cp.level === 5 && score >= 6;

    const updated = {
      ...cp,
      points: cp.points + score,
      roundsPlayed: cp.roundsPlayed + 1,
      level: nextLevel,
      completed,
    };

    setProgress(prev => ({ ...prev, [courseId]: updated }));

    // ✅ String comparison so IDs like "js-101" work
    const courseTitle = courses.find(c => String(c.id) === String(courseId))?.title || courseId;
    alert(`🎉 You scored ${score}/10 on "${courseTitle}" Level ${cp.level}!`);

    const lbKey = `quiz_leaderboard_${courseId}`;
    const lb = JSON.parse(localStorage.getItem(lbKey) || '[]');
    const entry = { name: user.name, points: updated.points, level: updated.level };

    const idx = lb.findIndex(u => u.name === user.name);
    if (idx >= 0) lb[idx] = entry;
    else lb.push(entry);

    lb.sort((a, b) => b.points - a.points);
    localStorage.setItem(lbKey, JSON.stringify(lb));

    return true;
  };

  const handleQuizRestart = (courseId) => {
    setProgress(prev => ({
      ...prev,
      [courseId]: {
        points: 0,
        roundsPlayed: 0,
        level: 1,
        completed: false,
      },
    }));

    const lbKey = `quiz_leaderboard_${courseId}`;
    const lb = JSON.parse(localStorage.getItem(lbKey) || '[]');
    const filtered = lb.filter(entry => entry.name !== user?.name);
    localStorage.setItem(lbKey, JSON.stringify(filtered));
  };

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>

            <Route
              path="/dashboard"
              element={<CourseList courses={courses} />}
            />

            <Route
              path="/courses/:courseId"
              element={<CourseDetail courses={courses} />}
            />

            {/* ✅ courses prop passed so QuizRules can find & verify the course */}
            <Route
              path="/courses/:courseId/rules"
              element={<QuizRules courses={courses} />}
            />

            <Route
              path="/courses/:courseId/quiz"
              element={
                <QuizPage
                  courses={courses}
                  progress={progress}
                  onQuizComplete={handleQuizComplete}
                  onRestart={handleQuizRestart}
                />
              }
            />

            <Route
              path="/leaderboard"
              element={<Leaderboard courses={courses} />}
            />

            <Route
              path="/profile"
              element={<Profile prog={progress} courses={courses} />}
            />

            <Route path="/chatbot" element={<ChatBotPage />} />
            <Route path="/materials" element={<StudyMaterials />} />

          </Route>

          {/* Fallback */}
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}