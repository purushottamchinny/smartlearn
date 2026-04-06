const fs = require('fs');
const path = require('path');

function makeQuiz(prefix) {
  return Array.from({ length: 50 }, (_, i) => ({
    question: `${prefix} question #${i + 1}`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A"
  }));
}

const db = {
  courses: [
    // ── BUILT-IN 11 ──────────────────────────────────────────
    {
      id: "01",
      title: "HTML – Web Foundations",
      description: "Learn semantic HTML5, forms, tables, accessibility, and build your first web pages from scratch.",
      videoId: "pQN-pnXPaVg",
      quiz: makeQuiz("HTML")
    },
    {
      id: "02",
      title: "CSS – Beautiful Layouts",
      description: "Master CSS3, Flexbox, Grid, animations, and responsive design to make stunning web interfaces.",
      videoId: "1Rs2ND1ryYc",
      quiz: makeQuiz("CSS")
    },
    {
      id: "js-101",
      title: "JavaScript – Core Language",
      description: "Learn JS from the ground up: variables, functions, DOM, async/await, ES6+ features and more.",
      videoId: "PkZNo7MFNFg",
      quiz: makeQuiz("JavaScript")
    },
    {
      id: "python-101",
      title: "Python – Programming Basics",
      description: "Start coding with Python: syntax, data structures, OOP, file I/O, and practical scripting projects.",
      videoId: "_uQrJ0TkZlc",
      quiz: makeQuiz("Python")
    },
    {
      id: "react-101",
      title: "React – Build Modern UIs",
      description: "Master React hooks, component patterns, state management, and build real-world apps with modern React.",
      videoId: "bMknfKXIFA8",
      quiz: makeQuiz("React")
    },
    {
      id: "nodejs-101",
      title: "Node.js – Server Side JS",
      description: "Build fast, scalable REST APIs with Node.js, Express, and learn async programming & middleware patterns.",
      videoId: "f2EqECiTBL8",
      quiz: makeQuiz("Node.js")
    },
    {
      id: "java-101",
      title: "Java – OOP Fundamentals",
      description: "Learn Java from scratch: classes, inheritance, polymorphism, collections, and enterprise-grade patterns.",
      videoId: "eIrMbAQSU34",
      quiz: makeQuiz("Java")
    },
    {
      id: "cpp-101",
      title: "C++ – Systems Programming",
      description: "Deep dive into C++ memory management, pointers, STL, templates, and high-performance systems coding.",
      videoId: "GQp1zzTwrIg",
      quiz: makeQuiz("C++")
    },
    {
      id: "sql-101",
      title: "SQL / Database Mastery",
      description: "Write powerful SQL queries, design normalized schemas, master joins, indexes, and database optimization.",
      videoId: "HXV3zeQKqGY",
      quiz: makeQuiz("SQL")
    },
    {
      id: "git-101",
      title: "Git & GitHub – Version Control",
      description: "Master Git branching, merging, rebasing, pull requests, CI/CD workflows, and team collaboration skills.",
      videoId: "RGOj5yH7evk",
      quiz: makeQuiz("Git")
    },
    {
      id: "dsa-101",
      title: "DSA – Algorithms & Data Structures",
      description: "Crack coding interviews with arrays, trees, graphs, dynamic programming, sorting algorithms and more.",
      videoId: "8hly31xKli0",
      quiz: makeQuiz("DSA")
    },

    // ── CRASH COURSES (the 4 extra cards in your screenshot) ──
    {
      id: "html-crash",
      title: "HTML Crash Course",
      description: "Learn the structure of web pages with HTML tags & attributes.",
      videoId: "UB1O30fR-EE",
      quiz: makeQuiz("HTML")
    },
    {
      id: "css-crash",
      title: "CSS Crash Course",
      description: "Style your pages using selectors, properties & the box model.",
      videoId: "yfoY53QXEnI",
      quiz: makeQuiz("CSS")
    },
    {
      id: "js-crash",
      title: "JavaScript Crash Course",
      description: "Make your pages interactive with variables, functions & the DOM API.",
      videoId: "hdI2bqOjy3c",
      quiz: makeQuiz("JavaScript")
    },
    {
      id: "python-crash",
      title: "Python Crash Course",
      description: "Go from zero to writing real Python scripts covering loops, functions, and data structures.",
      videoId: "Wkp1HSfnM0c",
      quiz: makeQuiz("Python")
    },
  ]
};

const outPath = path.join(__dirname, '..', 'public', 'db.json');
fs.writeFileSync(outPath, JSON.stringify(db, null, 2));
console.log(`✅ Generated ${outPath} with ${db.courses.length} courses`);