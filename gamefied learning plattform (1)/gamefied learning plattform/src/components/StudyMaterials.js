import React, { useState, useEffect } from "react";

/* ══════════════════════════════════════════════
   SHARED CONSTANTS
══════════════════════════════════════════════ */

const TOPIC_COLORS = {
  react: "#61dafb", node: "#68a063", java: "#f89820",
  cpp: "#00599c",   sql: "#f29111",  git: "#f05032",
  dsa: "#a855f7",   html: "#e44d26", css: "#264de4",
  js: "#f7df1e",    py: "#3776ab",
};
const getColor = (topic) => TOPIC_COLORS[topic] || "#00fff7";

/* ══════════════════════════════════════════════
   STUDY MATERIALS DATA (Page 1)
══════════════════════════════════════════════ */

const TOPICS = [
  { id: "all",  label: "All",          emoji: "🌐" },
  { id: "react",label: "React",        emoji: "⚛️" },
  { id: "node", label: "Node.js",      emoji: "🟢" },
  { id: "java", label: "Java",         emoji: "☕" },
  { id: "cpp",  label: "C++",          emoji: "⚙️" },
  { id: "sql",  label: "SQL",          emoji: "🗄️" },
  { id: "git",  label: "Git & GitHub", emoji: "🌿" },
  { id: "dsa",  label: "DSA",          emoji: "🧠" },
  { id: "html", label: "HTML",         emoji: "🌐" },
  { id: "css",  label: "CSS",          emoji: "🎨" },
  { id: "js",   label: "JavaScript",   emoji: "⚡" },
  { id: "py",   label: "Python",       emoji: "🐍" },
];

const VIDEOS = [
  { id: 1, topic: "react",  title: "React Hooks Explained",           channel: "Fireship",          duration: "12:34",   views: "2.1M",  ytId: "TNhaISOUy6Q" },
  { id: 2, topic: "react",  title: "React in 100 Seconds",            channel: "Fireship",          duration: "2:20",    views: "1.8M",  ytId: "Tn6-PIqc4UM" },
  { id: 3, topic: "node",   title: "Node.js Crash Course",            channel: "Traversy Media",    duration: "1:30:00", views: "3.2M",  ytId: "fBNz5xF-Kx4" },
  { id: 4, topic: "node",   title: "REST API with Node & Express",    channel: "Net Ninja",         duration: "45:00",   views: "980K",  ytId: "vjf774RKrLc" },
  { id: 5, topic: "java",   title: "Java Full Course for Beginners",  channel: "BroCode",           duration: "3:00:00", views: "4.5M",  ytId: "xk4_1vDrzzo" },
  { id: 6, topic: "java",   title: "Java OOP in 10 Minutes",          channel: "Fireship",          duration: "9:58",    views: "900K",  ytId: "m_MQYyJpIjg" },
  { id: 7, topic: "cpp",    title: "C++ Tutorial for Beginners",      channel: "freeCodeCamp",      duration: "4:00:00", views: "6.1M",  ytId: "vLnPwxZdW4Y" },
  { id: 8, topic: "cpp",    title: "C++ in 100 Seconds",              channel: "Fireship",          duration: "2:50",    views: "720K",  ytId: "MNeX4EGtR5Y" },
  { id: 9, topic: "sql",    title: "SQL Tutorial – Full Course",      channel: "freeCodeCamp",      duration: "4:20:00", views: "5.8M",  ytId: "HXV3zeQKqGY" },
  { id: 10,topic: "sql",    title: "MySQL Crash Course",              channel: "Traversy Media",    duration: "45:00",   views: "2.1M",  ytId: "9ylj9NR0Lcg" },
  { id: 11,topic: "git",    title: "Git & GitHub Crash Course",       channel: "Traversy Media",    duration: "32:41",   views: "3.4M",  ytId: "SWYqp7iY_Tc" },
  { id: 12,topic: "git",    title: "Git in 100 Seconds",              channel: "Fireship",          duration: "2:00",    views: "1.5M",  ytId: "hwP7WQkmECE" },
  { id: 13,topic: "dsa",    title: "Data Structures Easy to Advanced",channel: "freeCodeCamp",      duration: "8:03:37", views: "4.2M",  ytId: "RBSGKlAvoiM" },
  { id: 14,topic: "dsa",    title: "Sorting Algorithms Visualized",   channel: "Clement Mihailescu",duration: "1:00:00", views: "880K",  ytId: "lyZQPjUT5B4" },
  { id: 15,topic: "html",   title: "HTML Full Course",                channel: "BroCode",           duration: "1:00:00", views: "3.1M",  ytId: "HD13eq_Pmp8" },
  { id: 16,topic: "css",    title: "CSS Tutorial for Beginners",      channel: "Net Ninja",         duration: "2:00:00", views: "2.3M",  ytId: "I9XRrlOOazo" },
  { id: 17,topic: "js",     title: "JavaScript Crash Course",         channel: "Traversy Media",    duration: "1:40:00", views: "5.0M",  ytId: "hdI2bqOjy3c" },
  { id: 18,topic: "py",     title: "Python for Beginners",            channel: "freeCodeCamp",      duration: "4:26:51", views: "7.2M",  ytId: "rfscVS0vtbw" },
];

const PDFS = [
  { id: 1,  topic: "react",  title: "React Official Docs",              type: "Docs",       pages: "∞",   url: "https://react.dev",                                                                   size: "Online" },
  { id: 2,  topic: "react",  title: "React Hooks Cheatsheet PDF",       type: "Cheatsheet", pages: "4",   url: "https://www.codecademy.com/learn/react-101",                                          size: "1.2 MB" },
  { id: 3,  topic: "node",   title: "Node.js Official Docs",            type: "Docs",       pages: "∞",   url: "https://nodejs.org/en/docs",                                                          size: "Online" },
  { id: 4,  topic: "node",   title: "Express.js Guide PDF",             type: "Guide",      pages: "28",  url: "https://expressjs.com/en/guide/routing.html",                                         size: "2.1 MB" },
  { id: 5,  topic: "java",   title: "Java SE 17 Documentation",         type: "Docs",       pages: "∞",   url: "https://docs.oracle.com/en/java/javase/17/",                                          size: "Online" },
  { id: 6,  topic: "java",   title: "Java OOP Concepts PDF",            type: "Guide",      pages: "45",  url: "https://www.tutorialspoint.com/java/pdf/java_tutorial.pdf",                           size: "3.5 MB" },
  { id: 7,  topic: "cpp",    title: "C++ Reference Manual",             type: "Docs",       pages: "∞",   url: "https://en.cppreference.com/w/",                                                      size: "Online" },
  { id: 8,  topic: "cpp",    title: "C++ STL Cheatsheet",               type: "Cheatsheet", pages: "6",   url: "https://hackingcpp.com/cpp/cheat_sheets.html",                                        size: "Online" },
  { id: 9,  topic: "sql",    title: "SQL Cheatsheet PDF",               type: "Cheatsheet", pages: "3",   url: "https://www.sqltutorial.org/wp-content/uploads/2016/04/SQL-cheat-sheet.pdf",          size: "0.8 MB" },
  { id: 10, topic: "sql",    title: "PostgreSQL Documentation",         type: "Docs",       pages: "∞",   url: "https://www.postgresql.org/docs/",                                                    size: "Online" },
  { id: 11, topic: "git",    title: "Git Reference Manual",             type: "Docs",       pages: "∞",   url: "https://git-scm.com/docs",                                                            size: "Online" },
  { id: 12, topic: "git",    title: "GitHub Flow Guide PDF",            type: "Guide",      pages: "12",  url: "https://guides.github.com/introduction/flow/",                                        size: "1.0 MB" },
  { id: 13, topic: "dsa",    title: "Big-O Cheatsheet",                 type: "Cheatsheet", pages: "2",   url: "https://www.bigocheatsheet.com/",                                                     size: "Online" },
  { id: 14, topic: "dsa",    title: "Algorithms PDF – MIT OpenCourse",  type: "Textbook",   pages: "120", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",              size: "8.2 MB" },
  { id: 15, topic: "html",   title: "MDN HTML Reference",               type: "Docs",       pages: "∞",   url: "https://developer.mozilla.org/en-US/docs/Web/HTML",                                   size: "Online" },
  { id: 16, topic: "css",    title: "CSS Tricks Complete Guide",        type: "Guide",      pages: "∞",   url: "https://css-tricks.com/guides/",                                                      size: "Online" },
  { id: 17, topic: "js",     title: "JavaScript.info – Free Book",      type: "Textbook",   pages: "∞",   url: "https://javascript.info/",                                                            size: "Online" },
  { id: 18, topic: "py",     title: "Python Docs – Official",           type: "Docs",       pages: "∞",   url: "https://docs.python.org/3/",                                                          size: "Online" },
];

const QUIZZES = [
  { id: 1,  topic: "react",  title: "React Fundamentals Quiz",        questions: 15, difficulty: "Beginner",     time: "10 min" },
  { id: 2,  topic: "react",  title: "React Hooks Deep Dive",          questions: 20, difficulty: "Intermediate", time: "15 min" },
  { id: 3,  topic: "node",   title: "Node.js Basics Quiz",            questions: 12, difficulty: "Beginner",     time: "8 min"  },
  { id: 4,  topic: "node",   title: "Express & REST API Quiz",        questions: 18, difficulty: "Intermediate", time: "12 min" },
  { id: 5,  topic: "java",   title: "Java OOP Quiz",                  questions: 20, difficulty: "Beginner",     time: "15 min" },
  { id: 6,  topic: "java",   title: "Java Collections & Generics",    questions: 15, difficulty: "Advanced",     time: "12 min" },
  { id: 7,  topic: "cpp",    title: "C++ Pointers & Memory Quiz",     questions: 15, difficulty: "Intermediate", time: "12 min" },
  { id: 8,  topic: "cpp",    title: "STL Containers Quiz",            questions: 12, difficulty: "Advanced",     time: "10 min" },
  { id: 9,  topic: "sql",    title: "SQL Queries Quiz",               questions: 20, difficulty: "Beginner",     time: "15 min" },
  { id: 10, topic: "sql",    title: "SQL Joins & Indexing",           questions: 15, difficulty: "Intermediate", time: "12 min" },
  { id: 11, topic: "git",    title: "Git Commands Quiz",              questions: 15, difficulty: "Beginner",     time: "10 min" },
  { id: 12, topic: "git",    title: "Git Branching & Merging",        questions: 12, difficulty: "Intermediate", time: "10 min" },
  { id: 13, topic: "dsa",    title: "Arrays & Linked Lists Quiz",     questions: 20, difficulty: "Beginner",     time: "15 min" },
  { id: 14, topic: "dsa",    title: "Graphs & Dynamic Programming",   questions: 25, difficulty: "Advanced",     time: "20 min" },
  { id: 15, topic: "html",   title: "HTML Tags & Semantics Quiz",     questions: 15, difficulty: "Beginner",     time: "10 min" },
  { id: 16, topic: "css",    title: "CSS Flexbox & Grid Quiz",        questions: 15, difficulty: "Intermediate", time: "10 min" },
  { id: 17, topic: "js",     title: "JavaScript Basics Quiz",         questions: 20, difficulty: "Beginner",     time: "15 min" },
  { id: 18, topic: "py",     title: "Python Fundamentals Quiz",       questions: 20, difficulty: "Beginner",     time: "15 min" },
];

const DIFF_COLORS = {
  Beginner: "#22c55e",
  Intermediate: "#f59e0b",
  Advanced: "#ef4444",
};

const TYPE_ICONS = {
  Docs: "📄", Cheatsheet: "📋", Guide: "📖", Textbook: "📕", PDF: "📄",
};

/* ══════════════════════════════════════════════
   STUDY HUB DATA (Page 2)
══════════════════════════════════════════════ */

/* ── Official DTE Karnataka C20 Syllabus PDF URLs ── */
const SYLLABUS_12 = "https://dtek.karnataka.gov.in/storage/pdf-files/C-20%20syllabus/C_20_CSE_1_2_Sem.pdf";
const SYLLABUS_34 = "https://dtek.karnataka.gov.in/storage/pdf-files/C-20%20syllabus/C-20%20Diploma%20in%20CS%20and%20E.pdf";
const SYLLABUS_56 = "https://dtek.karnataka.gov.in/storage/pdf-files/C-20%20syllabus/C-20%20Diploma%20in%20CS%20and%20E.pdf";

/* ── DTE Question Papers portal ── */
const QP_PORTAL    = "https://dteupdates.blogspot.com/p/question-papers.html";
const SVPB_PAPERS  = "https://svpb.in/previous-pappers/";

const semesterData = {
  1: {
    label: "First Semester",
    theme: "#6366f1",
    notes: [
      {
        name: "Engineering Mathematics – I (20SC01T)",
        desc: "Algebra, Trigonometry, Differential Calculus — C20 official syllabus unit-wise",
        icon: "📐",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Fundamentals of Electrical & Electronics Engg. (20EE12T)",
        desc: "DC circuits, AC fundamentals, semiconductor devices, basic logic gates",
        icon: "⚡",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "IT Skills (20CS11T)",
        desc: "Computer fundamentals, MS Office, internet & email, basic programming concepts",
        icon: "💻",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "English Communication (20HS11T)",
        desc: "Reading, writing, grammar, technical communication & presentation skills",
        icon: "🗣️",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Environmental Studies (20SC01T – Audit)",
        desc: "Ecosystems, biodiversity, environmental pollution, sustainability",
        icon: "🌿",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "IT Skills Lab (20CS11P)",
        desc: "Hands-on MS Office, internet browsing, basic typing & computer operations",
        icon: "🖥️",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "Lab Manual",
      },
    ],
    papers: [
      { name: "Sem 1 & 2 Official Syllabus PDF",     desc: "C20 CSE – DTE Karnataka Government Official",       icon: "📋", file: SYLLABUS_12,   size: "DTE Official" },
      { name: "C20 All Sem Previous Question Papers", desc: "DTE Updates blog — All branches & semesters",       icon: "📄", file: QP_PORTAL,     size: "Online" },
      { name: "SVPB Previous Question Papers",        desc: "Swamy Vivekananda Polytechnic — Sem 1 papers",      icon: "📄", file: SVPB_PAPERS,   size: "Online" },
      { name: "Mathematics – I Model QP",             desc: "Unit-wise important questions & model papers",      icon: "📄", file: "https://www.mathsisfun.com/calculus/derivatives-introduction.html", size: "Online" },
    ],
    videos: [
      { name: "Engineering Maths – I Full Course",     desc: "Algebra, Trig & Differential Calculus",           icon: "🎬", file: "https://www.youtube.com/watch?v=WUvTyaaNkzM", dur: "12h+" },
      { name: "Basic Electrical Engineering",          desc: "DC circuits, Ohm's law, AC fundamentals",          icon: "🎬", file: "https://www.youtube.com/watch?v=mc979OhitAg", dur: "2h 10m" },
      { name: "IT Skills – MS Office Complete",        desc: "Word, Excel, PowerPoint full tutorials",           icon: "🎬", file: "https://www.youtube.com/watch?v=Cx4B0n6BhpU", dur: "3h 30m" },
      { name: "English Communication Skills",          desc: "Grammar, writing & speaking for engineers",        icon: "🎬", file: "https://www.youtube.com/watch?v=5ZdT8xvvs5Q", dur: "1h 20m" },
    ],
  },

  2: {
    label: "Second Semester",
    theme: "#ec4899",
    notes: [
      {
        name: "Engineering Mathematics – II (20SC02T)",
        desc: "Integral Calculus, Differential Equations, Statistics & Probability",
        icon: "📐",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Computer Aided Engineering Graphics (20ME02P)",
        desc: "Engineering drawing, orthographic projections, AutoCAD basics",
        icon: "📏",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Multimedia & Animation (20CS21T)",
        desc: "Photoshop, image editing, animation principles, Flash/Animate basics",
        icon: "🎨",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Project Management Skills (20PM01T)",
        desc: "Project planning, scheduling, PERT/CPM, team management basics",
        icon: "📊",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Statistics & Analytics (20SC02P)",
        desc: "Data collection, mean/median/mode, graphs, basic probability",
        icon: "📈",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Multimedia Lab (20CS21P)",
        desc: "Practical sessions on Photoshop, animation, audio & video editing",
        icon: "🎬",
        file: SYLLABUS_12,
        size: "Official PDF",
        badge: "Lab Manual",
      },
    ],
    papers: [
      { name: "Sem 1 & 2 Official Syllabus PDF",     desc: "C20 CSE – DTE Karnataka Government Official",       icon: "📋", file: SYLLABUS_12,  size: "DTE Official" },
      { name: "C20 All Sem Previous Question Papers", desc: "DTE Updates blog — All branches & semesters",       icon: "📄", file: QP_PORTAL,    size: "Online" },
      { name: "SVPB Previous Question Papers",        desc: "Swamy Vivekananda Polytechnic — Sem 2 papers",      icon: "📄", file: SVPB_PAPERS,  size: "Online" },
      { name: "Maths – II Important Questions",       desc: "Integral calculus, stats previous year questions",   icon: "📄", file: "https://www.mathsisfun.com/calculus/integration-introduction.html", size: "Online" },
    ],
    videos: [
      { name: "Engineering Maths – II",               desc: "Integral calculus, DE & statistics",                icon: "🎬", file: "https://www.youtube.com/watch?v=WUvTyaaNkzM", dur: "8h+" },
      { name: "AutoCAD Full Course for Beginners",    desc: "2D drawings, commands & engineering graphics",       icon: "🎬", file: "https://www.youtube.com/watch?v=gH4JtMlMf9I", dur: "2h 45m" },
      { name: "Photoshop for Beginners – Full",       desc: "Layers, filters, effects & image editing",           icon: "🎬", file: "https://www.youtube.com/watch?v=IyR_uYssometime", dur: "2h 00m" },
      { name: "Project Management Basics",            desc: "PERT/CPM, scheduling, Gantt charts",                icon: "🎬", file: "https://www.youtube.com/watch?v=ZKOL-rZ79gs", dur: "1h 10m" },
    ],
  },

  3: {
    label: "Third Semester",
    theme: "#10b981",
    notes: [
      {
        name: "Python Programming (20CS31T)",
        desc: "Variables, control structures, functions, OOP, file handling, modules",
        icon: "🐍",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Database Management Systems (20CS32T)",
        desc: "ER model, relational algebra, SQL – DDL/DML/DCL, normalization, transactions",
        icon: "🗄️",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Computer Hardware (20CS33T)",
        desc: "PC assembly, motherboard, RAM, storage, troubleshooting & maintenance",
        icon: "🔧",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Digital Electronics (20EC31T)",
        desc: "Number systems, Boolean algebra, logic gates, combinational & sequential circuits",
        icon: "🔌",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Kannada / Additional Language (20KN31T)",
        desc: "Kannada language, literature and communication for engineering students",
        icon: "📖",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Python & DBMS Lab (20CS31P / 20CS32P)",
        desc: "Python programming practicals + SQL queries: DDL, DML, DCL & TCL",
        icon: "💻",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "Lab Manual",
      },
    ],
    papers: [
      { name: "Sem 3 & 4 Official Syllabus PDF",     desc: "C20 CSE – DTE Karnataka Government Official",        icon: "📋", file: SYLLABUS_34,  size: "DTE Official" },
      { name: "DBMS Previous Question Papers",        desc: "SVPB – C20 3rd Sem DBMS-305 papers",                icon: "📄", file: SVPB_PAPERS,  size: "Online" },
      { name: "Python Programming Papers",            desc: "DTE C20 3rd Sem Python question papers",            icon: "📄", file: QP_PORTAL,    size: "Online" },
      { name: "Digital Electronics Papers",           desc: "DTE C20 3rd Sem DE previous papers",               icon: "📄", file: QP_PORTAL,    size: "Online" },
    ],
    videos: [
      { name: "Python for Beginners – freeCodeCamp",  desc: "Full Python course – 4h 26m, 7.2M+ views",          icon: "🎬", file: "https://www.youtube.com/watch?v=rfscVS0vtbw", dur: "4h 26m" },
      { name: "SQL Tutorial – Full Course",           desc: "Complete SQL for beginners – freeCodeCamp",          icon: "🎬", file: "https://www.youtube.com/watch?v=HXV3zeQKqGY", dur: "4h 20m" },
      { name: "Digital Electronics Full Course",      desc: "Logic gates, Boolean algebra, flip-flops",           icon: "🎬", file: "https://www.youtube.com/watch?v=M0mx8S05v60", dur: "3h 15m" },
      { name: "Computer Hardware & Maintenance",      desc: "PC assembly, upgrading & troubleshooting guide",     icon: "🎬", file: "https://www.youtube.com/watch?v=EqNcqBdrNyI", dur: "1h 30m" },
    ],
  },

  4: {
    label: "Fourth Semester",
    theme: "#f59e0b",
    notes: [
      {
        name: "Computer Networks (20CS41T)",
        desc: "OSI & TCP/IP model, LAN/WAN, IP addressing, routing, HTTP, DNS, security basics",
        icon: "🌐",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "OOP Through C++ (20CS42T)",
        desc: "Classes, objects, inheritance, polymorphism, templates, STL, exception handling",
        icon: "⚙️",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Web Technologies (20CS43T)",
        desc: "HTML5, CSS3, JavaScript, Bootstrap, PHP basics, MySQL integration",
        icon: "🌍",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Data Structures (20CS44T)",
        desc: "Arrays, linked lists, stacks, queues, trees, graphs, searching & sorting",
        icon: "🌳",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Computer Organization & Microprocessors (20CS45T / COM-403)",
        desc: "CPU architecture, instruction sets, 8085/8086 microprocessor, memory interfacing",
        icon: "🖥️",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "C++ & Web Tech Lab (20CS42P / 20CS43P)",
        desc: "C++ OOP programs + HTML/CSS/JS/PHP web development practicals",
        icon: "💻",
        file: SYLLABUS_34,
        size: "Official PDF",
        badge: "Lab Manual",
      },
    ],
    papers: [
      { name: "Sem 3 & 4 Official Syllabus PDF",     desc: "C20 CSE – DTE Karnataka Government Official",        icon: "📋", file: SYLLABUS_34,  size: "DTE Official" },
      { name: "Web Technologies Papers (C20)",        desc: "SVPB – 4th Sem Web Technologies question papers",    icon: "📄", file: SVPB_PAPERS,  size: "Online" },
      { name: "OOP Through C++ Papers",               desc: "SVPB – 4th Sem C++ (404) question papers",           icon: "📄", file: SVPB_PAPERS,  size: "Online" },
      { name: "Computer Networks Papers (C20)",       desc: "SVPB – 4th Sem CN-405 question papers",              icon: "📄", file: SVPB_PAPERS,  size: "Online" },
      { name: "COM-403 Question Papers",              desc: "SVPB – 4th Sem Computer Org & MP papers",            icon: "📄", file: SVPB_PAPERS,  size: "Online" },
    ],
    videos: [
      { name: "C++ Tutorial for Beginners",           desc: "freeCodeCamp – 4h full course, 6.1M views",          icon: "🎬", file: "https://www.youtube.com/watch?v=vLnPwxZdW4Y", dur: "4h 00m" },
      { name: "Computer Networks – Full Course",      desc: "Gate Smashers – OSI, TCP/IP, routing & more",        icon: "🎬", file: "https://www.youtube.com/watch?v=IPvYjXCsTg8", dur: "5h 30m" },
      { name: "Data Structures – Full Course",        desc: "freeCodeCamp – Arrays, trees, graphs & algorithms",  icon: "🎬", file: "https://www.youtube.com/watch?v=RBSGKlAvoiM", dur: "8h 03m" },
      { name: "HTML CSS JS Full Course",              desc: "Traversy Media – Web development crash course",       icon: "🎬", file: "https://www.youtube.com/watch?v=UB1O30fR-EE", dur: "2h 00m" },
    ],
  },

  5: {
    label: "Fifth Semester",
    theme: "#8b5cf6",
    notes: [
      {
        name: "AI & Machine Learning (20CS51I – Pathway)",
        desc: "AI concepts, ML algorithms, data analysis, model training & evaluation",
        icon: "🤖",
        file: SYLLABUS_56,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Full Stack Development (20CS52I – Pathway)",
        desc: "React.js, Node.js, Express, MongoDB, REST APIs, deployment",
        icon: "🌐",
        file: SYLLABUS_56,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Cloud Computing (20CS53I – Pathway)",
        desc: "AWS, Azure, GCP, virtualization, containers, Docker, deployment models",
        icon: "☁️",
        file: SYLLABUS_56,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Cyber Security (20CS54I – Pathway)",
        desc: "Network security, cryptography, ethical hacking, firewalls, cyber laws",
        icon: "🔒",
        file: SYLLABUS_56,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Entrepreneurship & Startup (20ET51I)",
        desc: "Startup ecosystem, business plan, funding, IPR, government schemes for entrepreneurs",
        icon: "🚀",
        file: SYLLABUS_56,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "5th Sem Full C20 Scheme Sheet",
        desc: "Complete credits, CIE/SEE marks table for all 5th sem pathways",
        icon: "📋",
        file: "https://www.studocu.com/in/document/srinivas-university/artificial-flowers/c20-5-6-sem-cse/44502560",
        size: "Online",
        badge: "Scheme Chart",
      },
    ],
    papers: [
      { name: "Sem 5 & 6 Official Syllabus PDF",    desc: "C20 CSE – DTE Karnataka Government Official",         icon: "📋", file: SYLLABUS_56,  size: "DTE Official" },
      { name: "5th Sem Scheme Chart (Studocu)",     desc: "Pathway credit table, CIE/SEE distribution",          icon: "📄", file: "https://www.studocu.com/in/document/srinivas-university/artificial-flowers/c20-5-6-sem-cse/44502560", size: "Online" },
      { name: "C20 All Sem Question Papers",        desc: "DTE Updates blog – previous year question papers",     icon: "📄", file: QP_PORTAL,    size: "Online" },
      { name: "Machine Learning Previous Papers",   desc: "GATE ML questions & university exam papers",           icon: "📄", file: "https://www.geeksforgeeks.org/machine-learning/", size: "Online" },
    ],
    videos: [
      { name: "Machine Learning Full Course",        desc: "Simplilearn – supervised, unsupervised, algorithms",  icon: "🎬", file: "https://www.youtube.com/watch?v=GwIo3gDZCVQ", dur: "4h 45m" },
      { name: "Full Stack MERN – Complete",          desc: "Traversy Media – React, Node, Express, MongoDB",       icon: "🎬", file: "https://www.youtube.com/watch?v=7CqJlxBYj-M", dur: "2h 10m" },
      { name: "AWS Cloud Practitioner – Full",       desc: "freeCodeCamp – AWS fundamentals & certification",      icon: "🎬", file: "https://www.youtube.com/watch?v=SOTamWNgDKc", dur: "13h 45m" },
      { name: "Cyber Security Full Course",          desc: "Simplilearn – Ethical hacking & network security",    icon: "🎬", file: "https://www.youtube.com/watch?v=nzZkKoREEGo", dur: "8h 00m" },
    ],
  },

  6: {
    label: "Sixth Semester",
    theme: "#ef4444",
    notes: [
      {
        name: "AI & ML – Advanced (20CS61I)",
        desc: "Deep learning, neural networks, NLP, computer vision, model deployment",
        icon: "🤖",
        file: SYLLABUS_56,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Full Stack – Advanced (20CS62I)",
        desc: "Advanced React, Next.js, TypeScript, CI/CD, microservices, cloud deployment",
        icon: "🌐",
        file: SYLLABUS_56,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Cloud – Advanced (20CS63I)",
        desc: "DevOps, Kubernetes, serverless, cloud security, cost optimization",
        icon: "☁️",
        file: SYLLABUS_56,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Cyber Security – Advanced (20CS64I)",
        desc: "Penetration testing, digital forensics, malware analysis, VAPT, cyber laws",
        icon: "🔒",
        file: SYLLABUS_56,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Project Work (20CS65P)",
        desc: "Final year project — design, development, testing, documentation & viva",
        icon: "📋",
        file: SYLLABUS_56,
        size: "Official PDF",
        badge: "DTE Official",
      },
      {
        name: "Industrial Training / Internship (20CS66I)",
        desc: "6-week industry training report, certificate & presentation guidelines",
        icon: "🏢",
        file: SYLLABUS_56,
        size: "Official PDF",
        badge: "DTE Official",
      },
    ],
    papers: [
      { name: "Sem 5 & 6 Official Syllabus PDF",    desc: "C20 CSE – DTE Karnataka Government Official",          icon: "📋", file: SYLLABUS_56,  size: "DTE Official" },
      { name: "C20 All Sem Question Papers",         desc: "DTE Updates blog – previous year question papers",      icon: "📄", file: QP_PORTAL,    size: "Online" },
      { name: "Project Report Format Guide",         desc: "How to write & format Diploma final year project",      icon: "📄", file: "https://www.scribd.com/document/544925364/C20-CSE-III-IV-Draftfinal", size: "Online" },
      { name: "DCET Revised Syllabus (DTE)",        desc: "Diploma CET 2023 revised syllabus – official DTE page", icon: "📄", file: "https://dtek.karnataka.gov.in/info-2/Diploma+Syllabus/C-20+Syllabus/en", size: "Online" },
    ],
    videos: [
      { name: "Deep Learning – Full Course",         desc: "freeCodeCamp – Neural networks & deep learning",       icon: "🎬", file: "https://www.youtube.com/watch?v=tPYj3fFJGjk", dur: "6h 14m" },
      { name: "Kubernetes – Full Course",            desc: "TechWorld with Nana – Docker, K8s & DevOps",           icon: "🎬", file: "https://www.youtube.com/watch?v=X48VuDVv0do", dur: "3h 10m" },
      { name: "Ethical Hacking Full Course",         desc: "freeCodeCamp – Penetration testing & security",        icon: "🎬", file: "https://www.youtube.com/watch?v=3Kq1MIfTWCE", dur: "15h 00m" },
      { name: "How to Write a Project Report",       desc: "Structure, formatting & viva tips for Diploma project", icon: "🎬", file: "https://www.youtube.com/watch?v=o7CYMr6kp9w", dur: "45m" },
    ],
  },
};

const categoryMeta = {
  notes:  { label: "Notes",           emoji: "📘", color: "#6366f1" },
  papers: { label: "Question Papers", emoji: "📄", color: "#f59e0b" },
  videos: { label: "Video Lectures",  emoji: "🎬", color: "#ec4899" },
};

/* ══════════════════════════════════════════════
   VIDEO PLAYER MODAL
══════════════════════════════════════════════ */

function VideoPlayerModal({ video, onClose }) {
  const color = getColor(video.topic);
  const topicInfo = TOPICS.find(t => t.id === video.topic);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div style={vpStyles.overlay} onClick={onClose}>
      <div style={vpStyles.modal} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ ...vpStyles.header, borderBottomColor: color + "33" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
            <span style={{ ...vpStyles.topicBadge, background: color + "18", color }}>
              {topicInfo?.emoji} {video.topic.toUpperCase()}
            </span>
            <h3 style={vpStyles.title}>{video.title}</h3>
          </div>
          <button onClick={onClose} style={vpStyles.closeBtn} title="Close (Esc)">✕</button>
        </div>

        {/* YouTube Embed */}
        <div style={vpStyles.playerWrap}>
          <iframe
            style={vpStyles.iframe}
            src={`https://www.youtube.com/embed/${video.ytId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Footer meta */}
        <div style={{ ...vpStyles.footer, borderTopColor: color + "22" }}>
          <div style={vpStyles.metaRow}>
            <span style={vpStyles.metaItem}>📺 {video.channel}</span>
            <span style={vpStyles.metaItem}>⏱ {video.duration}</span>
            <span style={vpStyles.metaItem}>👁 {video.views} views</span>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.ytId}`}
            target="_blank"
            rel="noreferrer"
            style={{ ...vpStyles.ytLink, color }}
          >
            ↗ Open on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

const vpStyles = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(8px)",
    zIndex: 9999,
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "20px",
  },
  modal: {
    background: "#0e1420",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "860px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
    padding: "16px 20px",
    borderBottom: "1px solid",
  },
  topicBadge: {
    fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px",
    padding: "4px 10px", borderRadius: "50px", whiteSpace: "nowrap", flexShrink: 0,
  },
  title: {
    fontSize: "14px", fontWeight: 700, color: "#f0f4ff",
    lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
  },
  closeBtn: {
    background: "rgba(255,255,255,0.07)", border: "none",
    color: "#8a9bb0", width: "34px", height: "34px",
    borderRadius: "8px", cursor: "pointer", fontSize: "15px",
    flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
  },
  playerWrap: {
    position: "relative", width: "100%", paddingTop: "56.25%", /* 16:9 */
    background: "#000",
  },
  iframe: {
    position: "absolute", top: 0, left: 0,
    width: "100%", height: "100%",
    border: "none",
  },
  footer: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 20px", borderTop: "1px solid", gap: "12px", flexWrap: "wrap",
  },
  metaRow: { display: "flex", gap: "20px", flexWrap: "wrap" },
  metaItem: { fontSize: "12px", color: "#5a6a7e" },
  ytLink: {
    fontSize: "12px", fontWeight: 700, textDecoration: "none",
    opacity: 0.85, transition: "opacity 0.2s",
  },
};

/* ══════════════════════════════════════════════
   QUIZ MODAL (used by StudyMaterials page)
══════════════════════════════════════════════ */

function QuizModal({ quiz, onClose }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const generateQuestions = (quiz) => {
    const banks = {
      react: [
        { q: "What hook is used to manage state in React?",        opts: ["useEffect","useState","useRef","useContext"],       ans: 1 },
        { q: "What does JSX stand for?",                           opts: ["JavaScript XML","Java Syntax Ext","JSON XML","None"],ans: 0 },
        { q: "Which hook runs after every render?",                opts: ["useState","useMemo","useEffect","useCallback"],     ans: 2 },
        { q: "How do you pass data to a child component?",         opts: ["State","Context","Props","Hooks"],                 ans: 2 },
        { q: "What is the virtual DOM?",                           opts: ["Real DOM copy","Browser API","Database","CSS tool"],ans: 0 },
      ],
      node: [
        { q: "Node.js is built on which engine?",                  opts: ["SpiderMonkey","V8","Chakra","Hermes"],             ans: 1 },
        { q: "Which module handles file I/O in Node?",             opts: ["http","path","fs","url"],                          ans: 2 },
        { q: "npm stands for?",                                    opts: ["Node Package Manager","New Package Module","None","Node Program Manager"], ans: 0 },
        { q: "Express is a _____ framework for Node.js",           opts: ["Database","Frontend","Web","Mobile"],              ans: 2 },
        { q: "Which method reads a file asynchronously?",          opts: ["readFileSync","readFile","getFile","loadFile"],    ans: 1 },
      ],
      java: [
        { q: "Java runs on which virtual machine?",                opts: ["CLR","JVM","V8","DVM"],                            ans: 1 },
        { q: "Which keyword prevents inheritance?",                opts: ["static","abstract","final","private"],             ans: 2 },
        { q: "What is encapsulation?",                             opts: ["Hiding data","Multiple inheritance","Overloading","None"], ans: 0 },
        { q: "Which collection allows duplicates?",                opts: ["Set","Map","List","TreeSet"],                      ans: 2 },
        { q: "Java is _____ typed?",                               opts: ["Dynamically","Weakly","Strongly","None"],          ans: 2 },
      ],
      cpp: [
        { q: "Which operator is used for dynamic memory in C++?",  opts: ["malloc","alloc","new","create"],                   ans: 2 },
        { q: "What does STL stand for?",                           opts: ["Standard Type Library","Standard Template Library","None","Static Template Library"], ans: 1 },
        { q: "What is a pointer?",                                 opts: ["A variable","Memory address holder","A loop","A class"], ans: 1 },
        { q: "Which is NOT an STL container?",                     opts: ["vector","deque","queue","scanf"],                  ans: 3 },
        { q: "How do you free memory allocated with new?",         opts: ["free()","remove","delete","dispose"],              ans: 2 },
      ],
      sql: [
        { q: "What does SELECT * do?",                             opts: ["Delete all","Select all columns","Update all","None"], ans: 1 },
        { q: "Which JOIN returns all rows from left table?",       opts: ["INNER","RIGHT","LEFT","FULL"],                     ans: 2 },
        { q: "Which command adds a new row?",                      opts: ["UPDATE","INSERT","ADD","PUSH"],                    ans: 1 },
        { q: "What does PRIMARY KEY do?",                          opts: ["Allows duplicates","Uniquely identifies rows","Joins tables","None"], ans: 1 },
        { q: "What is an INDEX used for?",                         opts: ["Backup","Faster queries","Delete data","Security"], ans: 1 },
      ],
      git: [
        { q: "Which command initializes a git repo?",              opts: ["git start","git init","git new","git create"],     ans: 1 },
        { q: "What does git clone do?",                            opts: ["Deletes repo","Creates backup","Copies remote repo","Commits"], ans: 2 },
        { q: "What does git merge do?",                            opts: ["Deletes a branch","Combines branches","Fetches changes","None"], ans: 1 },
        { q: "Which command stages all changes?",                  opts: ["git commit","git push","git add .","git pull"],    ans: 2 },
        { q: "What is a pull request?",                            opts: ["Download request","Code review request","Delete request","None"], ans: 1 },
      ],
      dsa: [
        { q: "What is Big-O of binary search?",                    opts: ["O(n)","O(n²)","O(log n)","O(1)"],                 ans: 2 },
        { q: "Which data structure uses LIFO?",                    opts: ["Queue","Stack","Tree","Graph"],                    ans: 1 },
        { q: "What is a linked list node made of?",                opts: ["Key only","Data + pointer","Array + key","None"],  ans: 1 },
        { q: "Which algorithm is used in Dijkstra?",               opts: ["BFS","DFS","Greedy","Divide & Conquer"],           ans: 2 },
        { q: "What is the worst case of bubble sort?",             opts: ["O(n)","O(n log n)","O(n²)","O(1)"],               ans: 2 },
      ],
    };
    const bank = banks[quiz.topic] || banks.react;
    return bank.slice(0, Math.min(5, quiz.questions));
  };

  const questions = generateQuestions(quiz);
  const color = getColor(quiz.topic);

  const handleSelect = (idx) => setSelected(idx);
  const handleNext = () => {
    const newAnswers = [...answers, selected];
    if (current + 1 >= questions.length) {
      setAnswers(newAnswers);
      setFinished(true);
    } else {
      setAnswers(newAnswers);
      setSelected(null);
      setCurrent(current + 1);
    }
  };

  const score = finished ? answers.filter((a, i) => a === questions[i].ans).length : 0;

  return (
    <div style={smStyles.modalOverlay} onClick={onClose}>
      <div style={{ ...smStyles.modal, borderColor: color + "44" }} onClick={e => e.stopPropagation()}>
        <div style={{ ...smStyles.modalHeader, borderBottomColor: color + "33" }}>
          <div>
            <p style={{ ...smStyles.modalTopic, color }}>{quiz.title}</p>
            {!finished && <p style={smStyles.modalProgress}>{current + 1} / {questions.length} questions</p>}
          </div>
          <button onClick={onClose} style={smStyles.closeBtn}>✕</button>
        </div>

        {!finished ? (
          <div style={smStyles.modalBody}>
            <div style={smStyles.quizProgress}>
              <div style={{ ...smStyles.quizProgressFill, width: `${(current / questions.length) * 100}%`, background: color }} />
            </div>
            <p style={smStyles.questionText}>{questions[current].q}</p>
            <div style={smStyles.optionsGrid}>
              {questions[current].opts.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    ...smStyles.optionBtn,
                    background: selected === i ? color + "22" : "rgba(255,255,255,0.04)",
                    border: selected === i ? `1.5px solid ${color}` : "1.5px solid rgba(255,255,255,0.1)",
                    color: selected === i ? color : "#c0cfe0",
                  }}
                >
                  <span style={{ ...smStyles.optionLetter, background: selected === i ? color : "rgba(255,255,255,0.1)", color: selected === i ? "#000" : "#fff" }}>
                    {["A","B","C","D"][i]}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={selected === null}
              style={{
                ...smStyles.nextBtn,
                background: selected !== null ? color : "rgba(255,255,255,0.06)",
                color: selected !== null ? "#000" : "#5a6a7e",
                cursor: selected !== null ? "pointer" : "not-allowed",
              }}
            >
              {current + 1 === questions.length ? "Finish Quiz →" : "Next Question →"}
            </button>
          </div>
        ) : (
          <div style={smStyles.resultBody}>
            <div style={{ fontSize: "56px", marginBottom: "12px" }}>
              {score >= questions.length * 0.8 ? "🏆" : score >= questions.length * 0.5 ? "👍" : "📚"}
            </div>
            <h3 style={{ fontSize: "28px", fontWeight: 800, color: "#f0f4ff", marginBottom: "8px" }}>
              {score} / {questions.length}
            </h3>
            <p style={{ color, fontWeight: 700, fontSize: "16px", marginBottom: "24px" }}>
              {score >= questions.length * 0.8 ? "Excellent work! 🎉" : score >= questions.length * 0.5 ? "Good job! Keep going 💪" : "Keep studying! You got this 🚀"}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%", maxHeight: "200px", overflowY: "auto" }}>
              {questions.map((q, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "13px" }}>
                  <span style={{ color: answers[i] === q.ans ? "#22c55e" : "#ef4444", flexShrink: 0, marginTop: "2px" }}>
                    {answers[i] === q.ans ? "✓" : "✗"}
                  </span>
                  <div>
                    <p style={{ color: "#8a9bb0", marginBottom: "2px" }}>{q.q}</p>
                    {answers[i] !== q.ans && <p style={{ color: "#22c55e" }}>Correct: {q.opts[q.ans]}</p>}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={onClose} style={{ ...smStyles.nextBtn, background: color, color: "#000", cursor: "pointer", marginTop: "20px" }}>
              Close Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE 1 — STUDY MATERIALS
══════════════════════════════════════════════ */

function StudyMaterials() {
  const [activeTopic, setActiveTopic] = useState("all");
  const [activeTab,   setActiveTab]   = useState("videos");
  const [quizModal,   setQuizModal]   = useState(null);
  const [videoModal,  setVideoModal]  = useState(null);
  const [search,      setSearch]      = useState("");

  const filter = (arr) => {
    const byTopic = activeTopic === "all" ? arr : arr.filter(i => i.topic === activeTopic);
    return search ? byTopic.filter(i => i.title.toLowerCase().includes(search.toLowerCase())) : byTopic;
  };

  const filteredVideos  = filter(VIDEOS);
  const filteredPDFs    = filter(PDFS);
  const filteredQuizzes = filter(QUIZZES);

  return (
    <div style={smStyles.page}>
      <div style={smStyles.bgBlob1} />
      <div style={smStyles.bgBlob2} />

      <div style={smStyles.header}>
        <p style={smStyles.eyebrow}>📚 STUDY MATERIALS</p>
        <h1 style={smStyles.title}>Your Learning Hub</h1>
        <p style={smStyles.subtitle}>Videos, notes, and quizzes — everything you need to master any topic.</p>
      </div>

      <div style={smStyles.searchRow}>
        <div style={smStyles.searchBox}>
          <span style={{ opacity: 0.5 }}>🔍</span>
          <input
            style={smStyles.searchInput}
            placeholder="Search materials..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <span onClick={() => setSearch("")} style={{ cursor:"pointer", opacity:0.4, fontSize:"13px" }}>✕</span>}
        </div>
      </div>

      <div style={smStyles.topicRow}>
        {TOPICS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTopic(t.id)}
            style={{
              ...smStyles.topicPill,
              background: activeTopic === t.id ? (getColor(t.id) || "#00fff7") : "rgba(255,255,255,0.05)",
              color: activeTopic === t.id ? "#000" : "#8a9bb0",
              border: activeTopic === t.id ? "none" : "1px solid rgba(255,255,255,0.1)",
              transform: activeTopic === t.id ? "scale(1.05)" : "scale(1)",
            }}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      <div style={smStyles.tabBar}>
        {[
          { key: "videos",  label: "🎬 Videos",          count: filteredVideos.length  },
          { key: "pdfs",    label: "📄 Notes & Docs",     count: filteredPDFs.length   },
          { key: "quizzes", label: "🧠 Practice Quizzes", count: filteredQuizzes.length },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...smStyles.tab,
              color: activeTab === tab.key ? "#fff" : "#5a6a7e",
              borderBottom: activeTab === tab.key ? "2px solid #00fff7" : "2px solid transparent",
              background: activeTab === tab.key ? "rgba(0,255,247,0.06)" : "transparent",
            }}
          >
            {tab.label}
            <span style={{ ...smStyles.tabCount, background: activeTab === tab.key ? "#00fff7" : "rgba(255,255,255,0.1)", color: activeTab === tab.key ? "#000" : "#5a6a7e" }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div style={smStyles.content}>
        {activeTab === "videos" && (
          <div style={smStyles.grid}>
            {filteredVideos.length === 0 && <EmptyState />}
            {filteredVideos.map(v => {
              const color = getColor(v.topic);
              const thumb = `https://img.youtube.com/vi/${v.ytId}/mqdefault.jpg`;
              return (
                <div
                  key={v.id}
                  onClick={() => setVideoModal(v)}
                  className="video-card"
                  style={{ ...smStyles.videoCard, borderTop: `3px solid ${color}`, cursor: "pointer" }}
                >
                  <div style={smStyles.thumbWrap}>
                    <img src={thumb} alt={v.title} style={smStyles.thumb} onError={e => { e.target.src="https://via.placeholder.com/320x180/1a1f2e/00fff7?text=Video"; }} />
                    {/* Play button overlay */}
                    <div className="play-overlay" style={smStyles.playOverlay}>
                      <div style={{ ...smStyles.playBtn, background: color }}>▶</div>
                    </div>
                    <div style={smStyles.durationBadge}>{v.duration}</div>
                  </div>
                  <div style={smStyles.videoInfo}>
                    <p style={{ ...smStyles.videoTopic, color }}>{TOPICS.find(t=>t.id===v.topic)?.emoji} {v.topic.toUpperCase()}</p>
                    <h4 style={smStyles.videoTitle}>{v.title}</h4>
                    <div style={smStyles.videoMeta}>
                      <span>📺 {v.channel}</span>
                      <span>👁 {v.views}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "pdfs" && (
          <div style={smStyles.grid}>
            {filteredPDFs.length === 0 && <EmptyState />}
            {filteredPDFs.map(p => {
              const color = getColor(p.topic);
              return (
                <a key={p.id} href={p.url} target="_blank" rel="noreferrer" style={{ ...smStyles.pdfCard, borderLeft: `3px solid ${color}` }}>
                  <div style={{ ...smStyles.pdfIcon, background: color + "18", color }}>
                    {TYPE_ICONS[p.type] || "📄"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                      <h4 style={smStyles.pdfTitle}>{p.title}</h4>
                      <span style={{ ...smStyles.typeBadge, background: color + "20", color }}>{p.type}</span>
                    </div>
                    <div style={smStyles.pdfMeta}>
                      <span>{TOPICS.find(t=>t.id===p.topic)?.emoji} {p.topic.toUpperCase()}</span>
                      {p.pages !== "∞" && <span>📄 {p.pages} pages</span>}
                      <span>💾 {p.size}</span>
                    </div>
                  </div>
                  <div style={{ ...smStyles.downloadBtn, color }}>↗</div>
                </a>
              );
            })}
          </div>
        )}

        {activeTab === "quizzes" && (
          <div style={smStyles.grid}>
            {filteredQuizzes.length === 0 && <EmptyState />}
            {filteredQuizzes.map(q => {
              const color = getColor(q.topic);
              const diffColor = DIFF_COLORS[q.difficulty] || "#00fff7";
              return (
                <div
                  key={q.id}
                  onClick={() => setQuizModal(q)}
                  style={{ ...smStyles.quizCard, borderTop: `3px solid ${color}`, cursor: "pointer" }}
                >
                  <div style={smStyles.quizHeader}>
                    <span style={{ ...smStyles.quizTopicBadge, background: color + "18", color }}>
                      {TOPICS.find(t=>t.id===q.topic)?.emoji} {q.topic.toUpperCase()}
                    </span>
                    <span style={{ ...smStyles.diffBadge, background: diffColor + "18", color: diffColor }}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h4 style={smStyles.quizTitle}>{q.title}</h4>
                  <div style={smStyles.quizMeta}>
                    <span>❓ {q.questions} Qs</span>
                    <span>⏱ {q.time}</span>
                  </div>
                  <div style={{ ...smStyles.startQuizBtn, background: color + "18", color, borderColor: color + "44" }}>
                    Start Quiz →
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {quizModal  && <QuizModal quiz={quizModal} onClose={() => setQuizModal(null)} />}
      {videoModal && <VideoPlayerModal video={videoModal} onClose={() => setVideoModal(null)} />}
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: "40px", marginBottom: "12px" }}>😶</div>
      <p style={{ color: "#5a6a7e" }}>No materials found for this topic.</p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE 2 — STUDY HUB
══════════════════════════════════════════════ */

function StudyHub() {
  const [semester, setSemester] = useState(1);
  const [category, setCategory] = useState("notes");
  const [search,   setSearch]   = useState("");
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [semester, category]);

  const semInfo = semesterData[semester];
  const items   = semInfo[category].filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.desc.toLowerCase().includes(search.toLowerCase())
  );
  const accent = semInfo.theme;

  return (
    <div style={{ ...shStyles.root, "--accent": accent }}>
      <style>{`
        .sem-btn {
          position: relative; padding: 10px 14px; border-radius: 10px;
          cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500;
          font-size: 13px; color: #6b6b8a; transition: all 0.25s ease;
          border: 1px solid transparent; background: transparent;
          text-align: left; display: flex; align-items: center; gap: 10px; width: 100%;
        }
        .sem-btn:hover { color: #e8e8f0; background: #1c1c2e; }
        .sem-btn.active { background: color-mix(in srgb, var(--accent) 15%, transparent); border-color: color-mix(in srgb, var(--accent) 40%, transparent); color: white; }
        .sem-dot { width: 8px; height: 8px; border-radius: 50%; background: #6b6b8a; flex-shrink: 0; transition: background 0.25s; }
        .sem-btn.active .sem-dot { background: var(--accent); box-shadow: 0 0 8px var(--accent); }
        .cat-pill {
          padding: 9px 20px; border-radius: 100px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 13.5px;
          transition: all 0.25s ease; border: 1px solid rgba(255,255,255,0.07);
          background: #1c1c2e; color: #6b6b8a;
          display: flex; align-items: center; gap: 7px;
        }
        .cat-pill:hover { color: #e8e8f0; border-color: rgba(255,255,255,0.15); }
        .cat-pill.active { background: var(--accent); border-color: var(--accent); color: white; box-shadow: 0 4px 20px color-mix(in srgb, var(--accent) 40%, transparent); }
        .hub-card {
          background: #13131f; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px;
          padding: 24px; cursor: pointer; transition: all 0.3s ease; position: relative;
          overflow: hidden; display: flex; flex-direction: column; gap: 10px;
        }
        .hub-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: var(--accent); opacity: 0; transition: opacity 0.3s; }
        .hub-card:hover { transform: translateY(-4px); border-color: color-mix(in srgb, var(--accent) 30%, transparent); box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
        .hub-card:hover::before { opacity: 1; }
        .open-btn {
          margin-top: auto; padding: 10px 18px; border-radius: 10px;
          border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          color: var(--accent); font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s ease;
          display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%;
        }
        .open-btn:hover { background: var(--accent); color: white; border-color: var(--accent); }
        .hub-search {
          background: #1c1c2e; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 12px 18px; color: #e8e8f0;
          font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none;
          width: 300px; transition: border-color 0.2s;
        }
        .hub-search::placeholder { color: #6b6b8a; }
        .hub-search:focus { border-color: var(--accent); }
        .hub-badge {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          background: color-mix(in srgb, var(--accent) 15%, transparent);
          color: var(--accent);
          border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
        }
        .stat-card {
          background: #13131f; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 18px 22px;
          display: flex; flex-direction: column; gap: 4px; cursor: pointer;
        }
      `}</style>

      <div style={shStyles.layout}>
        {/* SIDEBAR */}
        <aside style={shStyles.sidebar}>
          <div style={shStyles.logo}>
            <div style={{ ...shStyles.logoIcon, background: accent }}>S</div>
            <div>
              <div style={shStyles.logoTitle}>Study Hub</div>
              <div style={shStyles.logoSub}>CSE · C20 Scheme · Karnataka DTE</div>
            </div>
          </div>
          <div style={shStyles.sideSection}>
            <div style={shStyles.sideLabel}>SEMESTERS</div>
            {[1,2,3,4,5,6].map(s => (
              <button
                key={s}
                className={`sem-btn${semester === s ? " active" : ""}`}
                onClick={() => { setSemester(s); setSearch(""); }}
              >
                <span className="sem-dot" />
                <span>Semester {s}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, opacity: 0.5 }}>
                  {semesterData[s].notes.length + semesterData[s].papers.length + semesterData[s].videos.length}
                </span>
              </button>
            ))}
          </div>
          <div style={shStyles.sideFooter}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#9090b0" }}>🎓 Diploma in CSE</div>
            <div style={{ fontSize: 11, color: "#6b6b8a", marginTop: 3, marginBottom: 12 }}>Board of Technical Education · Karnataka</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { label: "📋 DTE Syllabus Page",   url: "https://dtek.karnataka.gov.in/info-2/Diploma+Syllabus/C-20+Syllabus/en" },
                { label: "📄 Question Papers",      url: "https://dteupdates.blogspot.com/p/question-papers.html" },
                { label: "📝 SVPB QP Archive",      url: "https://svpb.in/previous-pappers/" },
                { label: "🌐 BTELinx Results",      url: "https://btelinx.karnataka.gov.in" },
              ].map(lnk => (
                <a
                  key={lnk.label}
                  href={lnk.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 11, color: "#5a5a8a", textDecoration: "none", padding: "4px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#9090c0"}
                  onMouseLeave={e => e.target.style.color = "#5a5a8a"}
                >
                  {lnk.label}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main style={shStyles.main}>
          <div style={shStyles.topBar}>
            <div>
              <div style={shStyles.pageTitle}>{semInfo.label}</div>
              <div style={{ fontSize: 13, color: "#6b6b8a", marginTop: 4 }}>Browse materials, papers & lectures</div>
            </div>
            <input
              className="hub-search"
              placeholder="🔍  Search resources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Official Syllabus Banner */}
          <div style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))",
            border: "1px solid rgba(99,102,241,0.35)",
            borderRadius: 14, padding: "14px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 12,
          }}>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#e0e0ff", marginBottom: 3 }}>
                🏛️ Official DTE Karnataka C20 Syllabus
              </div>
              <div style={{ fontSize: 12, color: "#6b6b8a" }}>
                Download official PDFs directly from dtek.karnataka.gov.in
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "Sem 1 & 2", url: "https://dtek.karnataka.gov.in/storage/pdf-files/C-20%20syllabus/C_20_CSE_1_2_Sem.pdf" },
                { label: "Sem 3 & 4", url: "https://dtek.karnataka.gov.in/storage/pdf-files/C-20%20syllabus/C-20%20Diploma%20in%20CS%20and%20E.pdf" },
                { label: "Sem 5 & 6", url: "https://dtek.karnataka.gov.in/storage/pdf-files/C-20%20syllabus/C-20%20Diploma%20in%20CS%20and%20E.pdf" },
                { label: "DTE Portal", url: "https://dtek.karnataka.gov.in/info-2/Diploma+Syllabus/C-20+Syllabus/en" },
              ].map(btn => (
                <a
                  key={btn.label}
                  href={btn.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                    background: "rgba(99,102,241,0.2)", color: "#a5b4fc",
                    border: "1px solid rgba(99,102,241,0.4)", textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  📥 {btn.label}
                </a>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div style={shStyles.statsRow}>
            {Object.entries(categoryMeta).map(([key, meta]) => (
              <div key={key} className="stat-card" style={{ border: category === key ? `1px solid ${meta.color}40` : undefined }} onClick={() => setCategory(key)}>
                <div style={{ fontSize: 22 }}>{meta.emoji}</div>
                <div style={{ fontSize: 22, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: meta.color }}>
                  {semInfo[key].length}
                </div>
                <div style={{ fontSize: 12, color: "#6b6b8a", fontFamily: "'DM Sans', sans-serif" }}>{meta.label}</div>
              </div>
            ))}
            <div className="stat-card" style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}05)`, borderColor: `${accent}30` }}>
              <div style={{ fontSize: 22 }}>📚</div>
              <div style={{ fontSize: 22, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: accent }}>
                {semInfo.notes.length + semInfo.papers.length + semInfo.videos.length}
              </div>
              <div style={{ fontSize: 12, color: "#6b6b8a", fontFamily: "'DM Sans', sans-serif" }}>Total Resources</div>
            </div>
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {Object.entries(categoryMeta).map(([key, meta]) => (
              <button
                key={key}
                className={`cat-pill${category === key ? " active" : ""}`}
                style={{ "--accent": meta.color }}
                onClick={() => setCategory(key)}
              >
                <span>{meta.emoji}</span>
                <span>{meta.label}</span>
                <span style={{ background: category === key ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)", borderRadius: 100, padding: "1px 7px", fontSize: 11 }}>
                  {semInfo[key].length}
                </span>
              </button>
            ))}
          </div>

          {/* Section heading */}
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: "#c0c0d8", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: accent }}>{categoryMeta[category].emoji}</span>
            &nbsp;{categoryMeta[category].label}
            {search && <span style={{ fontSize: 13, color: "#6b6b8a" }}>&nbsp;· "{search}"</span>}
          </div>

          {/* Cards */}
          {items.length > 0 ? (
            <div style={shStyles.grid}>
              {items.map((item, i) => (
                <div
                  key={i}
                  className="hub-card"
                  style={{ animationDelay: `${i * 60}ms`, "--accent": accent }}
                  onClick={() => item.file && item.file !== "#" && window.open(item.file)}
                >
                  <div style={{ fontSize: 32 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#f0f0ff", marginBottom: 4, lineHeight: 1.35 }}>{item.name}</div>
                    <div style={{ fontSize: 12.5, color: "#6b6b8a", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 2 }}>
                    {item.badge && (
                      <span className="hub-badge" style={{ background: accent + "22", color: accent, border: `1px solid ${accent}44` }}>
                        ✅ {item.badge}
                      </span>
                    )}
                    {item.size && !item.badge && <span className="hub-badge">📁 {item.size}</span>}
                    {item.dur  && <span className="hub-badge">⏱ {item.dur}</span>}
                  </div>
                  <button
                    className="open-btn"
                    onClick={e => { e.stopPropagation(); if (item.file && item.file !== "#") window.open(item.file); }}
                  >
                    {category === "videos" ? "▶ Watch on YouTube" : item.badge === "DTE Official" ? "📥 Download PDF" : "Open →"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 20px", color: "#6b6b8a" }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>{search ? "🔍" : "🚫"}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#4a4a6a", marginBottom: 8 }}>
                {search ? `No results for "${search}"` : `No ${categoryMeta[category].label} Yet`}
              </div>
              <div style={{ fontSize: 13, color: "#3a3a5a" }}>
                {search ? "Try a different keyword." : "Content will be added soon. Check back later!"}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ROOT APP — NAV + PAGE SWITCHER
══════════════════════════════════════════════ */

export default function App() {
  const [page, setPage] = useState("materials");

  return (
    <div style={{ minHeight: "100vh", background: "#080d14", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Orbitron:wght@700;900&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,247,0.3); border-radius: 2px; }

        /* Video card hover effects */
        .video-card:hover .play-overlay { opacity: 1 !important; }
        .video-card:hover img { transform: scale(1.04); }
        .video-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .video-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
      `}</style>

      {/* ── TOP NAV BAR ── */}
      <nav style={navStyles.bar}>
        <div style={navStyles.brand}>
          <span style={navStyles.brandIcon}>🎓</span>
          <span style={navStyles.brandName}>SmartLearn</span>
        </div>
        <div style={navStyles.tabs}>
          <button
            onClick={() => setPage("materials")}
            style={{
              ...navStyles.tab,
              background: page === "materials" ? "rgba(0,255,247,0.12)" : "transparent",
              color:      page === "materials" ? "#00fff7" : "#5a6a7e",
              borderBottom: page === "materials" ? "2px solid #00fff7" : "2px solid transparent",
            }}
          >
            📚 Study Materials
          </button>
          <button
            onClick={() => setPage("hub")}
            style={{
              ...navStyles.tab,
              background: page === "hub" ? "rgba(99,102,241,0.12)" : "transparent",
              color:      page === "hub" ? "#6366f1" : "#5a6a7e",
              borderBottom: page === "hub" ? "2px solid #6366f1" : "2px solid transparent",
            }}
          >
            🏫 Study Hub (Semester)
          </button>
        </div>
      </nav>

      {/* ── PAGE CONTENT ── */}
      {page === "materials" ? <StudyMaterials /> : <StudyHub />}
    </div>
  );
}

/* ══════════════════════════════════════════════
   STYLES — STUDY MATERIALS (sm prefix)
══════════════════════════════════════════════ */

const smStyles = {
  page: {
    minHeight: "100vh", background: "#080d14", color: "#f0f4ff",
    fontFamily: "'DM Sans', sans-serif", padding: "40px 32px 80px",
    position: "relative", overflowX: "hidden",
  },
  bgBlob1: { position: "fixed", top: "-120px", left: "-120px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,247,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 },
  bgBlob2: { position: "fixed", bottom: "-120px", right: "-120px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 },
  header: { textAlign: "center", marginBottom: "36px", position: "relative", zIndex: 1 },
  eyebrow: { fontFamily: "'Orbitron', monospace", fontSize: "11px", letterSpacing: "4px", color: "#00fff7", marginBottom: "12px", fontWeight: 700 },
  title: { fontFamily: "'Orbitron', monospace", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, background: "linear-gradient(135deg,#fff,#00fff7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "12px" },
  subtitle: { color: "#5a6a7e", fontSize: "15px", maxWidth: "480px", margin: "0 auto" },
  searchRow: { display: "flex", justifyContent: "center", marginBottom: "24px", position: "relative", zIndex: 1 },
  searchBox: { display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "10px 16px", width: "100%", maxWidth: "400px" },
  searchInput: { background: "none", border: "none", outline: "none", color: "#f0f4ff", fontSize: "14px", width: "100%" },
  topicRow: { display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "32px", position: "relative", zIndex: 1 },
  topicPill: { padding: "7px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: 700, cursor: "pointer", transition: "all 0.2s ease", whiteSpace: "nowrap" },
  tabBar: { display: "flex", gap: "4px", marginBottom: "32px", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 1, overflowX: "auto" },
  tab: { padding: "12px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer", border: "none", background: "transparent", whiteSpace: "nowrap", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "8px", borderRadius: "8px 8px 0 0" },
  tabCount: { fontSize: "11px", fontWeight: 700, padding: "2px 7px", borderRadius: "50px" },
  content: { position: "relative", zIndex: 1 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
  videoCard: { background: "rgba(255,255,255,0.035)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.25s ease, box-shadow 0.25s ease", color: "inherit" },
  thumbWrap: { position: "relative", aspectRatio: "16/9", overflow: "hidden" },
  thumb: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" },
  playOverlay: {
    position: "absolute", inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    opacity: 0, transition: "opacity 0.25s",
    cursor: "pointer",
  },
  playBtn: {
    width: "52px", height: "52px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px", color: "#000", fontWeight: 700,
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
  },
  durationBadge: { position: "absolute", bottom: "8px", right: "8px", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "2px 7px", borderRadius: "6px", background: "rgba(0,0,0,0.8)" },
  videoInfo: { padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: "6px" },
  videoTopic: { fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px" },
  videoTitle: { fontSize: "14px", fontWeight: 700, color: "#f0f4ff", lineHeight: 1.4 },
  videoMeta: { display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#5a6a7e" },
  pdfCard: { background: "rgba(255,255,255,0.035)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "14px", color: "inherit", transition: "transform 0.2s ease" },
  pdfIcon: { width: "44px", height: "44px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 },
  pdfTitle: { fontSize: "14px", fontWeight: 700, color: "#f0f4ff", lineHeight: 1.3, marginBottom: "6px" },
  pdfMeta: { display: "flex", gap: "12px", fontSize: "11px", color: "#5a6a7e", flexWrap: "wrap" },
  typeBadge: { fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "50px", whiteSpace: "nowrap", flexShrink: 0 },
  downloadBtn: { fontSize: "20px", fontWeight: 700, flexShrink: 0 },
  quizCard: { background: "rgba(255,255,255,0.035)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", transition: "transform 0.25s ease" },
  quizHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  quizTopicBadge: { fontSize: "10px", fontWeight: 700, letterSpacing: "1px", padding: "3px 10px", borderRadius: "50px" },
  diffBadge: { fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "50px" },
  quizTitle: { fontSize: "15px", fontWeight: 700, color: "#f0f4ff", lineHeight: 1.3 },
  quizMeta: { display: "flex", gap: "16px", fontSize: "12px", color: "#5a6a7e" },
  startQuizBtn: { marginTop: "4px", padding: "10px", borderRadius: "10px", textAlign: "center", fontSize: "13px", fontWeight: 700, border: "1.5px solid", transition: "all 0.2s ease" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  modal: { background: "#0e1420", border: "1px solid", borderRadius: "20px", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid" },
  modalTopic: { fontSize: "15px", fontWeight: 700, marginBottom: "4px" },
  modalProgress: { fontSize: "12px", color: "#5a6a7e" },
  closeBtn: { background: "rgba(255,255,255,0.07)", border: "none", color: "#8a9bb0", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" },
  modalBody: { padding: "24px", display: "flex", flexDirection: "column", gap: "16px", overflowY: "auto" },
  quizProgress: { height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" },
  quizProgressFill: { height: "100%", borderRadius: "2px", transition: "width 0.4s ease" },
  questionText: { fontSize: "16px", fontWeight: 700, color: "#f0f4ff", lineHeight: 1.5 },
  optionsGrid: { display: "flex", flexDirection: "column", gap: "10px" },
  optionBtn: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", cursor: "pointer", fontSize: "14px", fontWeight: 500, transition: "all 0.2s ease", textAlign: "left" },
  optionLetter: { width: "26px", height: "26px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", flexShrink: 0 },
  nextBtn: { padding: "13px", borderRadius: "12px", border: "none", fontSize: "14px", fontWeight: 700, transition: "all 0.2s ease", marginTop: "4px" },
  resultBody: { padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto" },
};

/* ══════════════════════════════════════════════
   STYLES — STUDY HUB (sh prefix)
══════════════════════════════════════════════ */

const shStyles = {
  root: { minHeight: "100vh", background: "#0a0a12", color: "#e8e8f0", fontFamily: "'DM Sans', sans-serif" },
  layout: { display: "flex", minHeight: "100vh" },
  sidebar: { width: 230, flexShrink: 0, background: "#0d0d1a", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "24px 14px", display: "flex", flexDirection: "column", gap: 28, position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  logo: { display: "flex", alignItems: "center", gap: 12, padding: "4px 6px" },
  logoIcon: { width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "white", flexShrink: 0 },
  logoTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#e8e8f0" },
  logoSub: { fontSize: 11, color: "#6b6b8a", marginTop: 1 },
  sideSection: { display: "flex", flexDirection: "column", gap: 4 },
  sideLabel: { fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#6b6b8a", padding: "0 14px", marginBottom: 6 },
  sideFooter: { marginTop: "auto", padding: "16px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" },
  main: { flex: 1, padding: "36px 40px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 28 },
  topBar: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 },
  pageTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: "#f0f0ff", letterSpacing: "-0.02em" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 },
};

/* ══════════════════════════════════════════════
   STYLES — NAV BAR
══════════════════════════════════════════════ */

const navStyles = {
  bar: { display: "flex", alignItems: "center", gap: "24px", padding: "0 32px", background: "#0a0d18", borderBottom: "1px solid rgba(255,255,255,0.07)", height: "60px", position: "sticky", top: 0, zIndex: 1000 },
  brand: { display: "flex", alignItems: "center", gap: "10px", marginRight: "8px" },
  brandIcon: { fontSize: "22px" },
  brandName: { fontFamily: "'Orbitron', monospace", fontSize: "14px", fontWeight: 700, color: "#00fff7", letterSpacing: "2px" },
  tabs: { display: "flex", gap: "4px", height: "100%" },
  tab: { padding: "0 20px", fontSize: "13px", fontWeight: 600, cursor: "pointer", border: "none", height: "100%", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s ease", whiteSpace: "nowrap" },
};