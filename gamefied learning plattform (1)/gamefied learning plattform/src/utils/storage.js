const KEY = 'quiz_progress_';

export function loadProgress(email) {
  if (!email) return {};
  const raw = localStorage.getItem(KEY + email);
  return raw ? JSON.parse(raw) : {};
}

export function saveProgress(email, prog) {
  if (!email) return;
  localStorage.setItem(KEY + email, JSON.stringify(prog));
}