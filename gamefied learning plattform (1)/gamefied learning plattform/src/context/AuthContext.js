import React, { createContext, useState, useEffect } from 'react';

const USERS_KEY   = 'quiz_users';
const SESSION_KEY = 'quiz_session';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On mount, read session
  useEffect(() => {
    const s = localStorage.getItem(SESSION_KEY);
    if (s) setUser(JSON.parse(s));
  }, []);

  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    setUser(found);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}