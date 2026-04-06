export async function fetchCourses() {
  const res = await fetch('/db.json');
  if (!res.ok) throw new Error(`Failed to load courses: ${res.status}`);
  const data = await res.json();
  return data.courses;
}