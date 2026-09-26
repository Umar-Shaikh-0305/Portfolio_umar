/* ============================================================
   CONTENT — separated from UI so it's easy to update later.
   Search for "PLACEHOLDER" to find spots that still need your input.
   ============================================================ */

export const LINKS = {
  github: "https://github.com/Umar-Shaikh-0305",
  linkedin: "https://www.linkedin.com/in/muhammad-umar-shaikh-886877386/",
  email: "mailto:umarshk0305@gmail.com",
};

export const PERSONAL = {
  name: "Muhammad Umar Shaikh",
  firstName: "Muhammad Umar",
  location: "Karachi, Pakistan",
  role: "Software Engineering Student",
  sub: "I'm Muhammad Umar, a Software Engineering student at FAST-NUCES. I spend my time writing code, working through data structures problems, and exploring how AI fits into modern software — building small systems end to end, from the logic to the interface.",
};

// Kept consistent with "Software Engineering Student" above — no job-title claims.
export const TYPED_PHRASES = ["Hi, I'm Muhammad Umar", "Software Engineering Student", "Aspiring Software Developer"];

export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export const ABOUT_CARDS = [
  { label: "Education", value: "Software Engineering, FAST-NUCES" },
  { label: "Focus", value: "Software Development" },
  { label: "Interests", value: "AI & Modern Web Technologies" },
  { label: "Currently learning", value: "DSA & Full-Stack Development" },
];

export const SKILLS = [
  {
    category: "Programming Languages",
    tags: ["C", "C++", "Java", "Python"],
  },
  {
    category: "Data Structures & Algorithms",
    tags: ["Arrays", "Queues", "Linked Lists", "Stacks", "Sorting", "Searching"],
  },
  {
    category: "Web Development",
    tags: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
];

// Two flagship projects get a full case-study treatment; the rest get a card.
export const FEATURED_PROJECTS = [
  {
    name: "Smart Navigation System",
    link: "https://github.com/Umar-Shaikh-0305/Smart-Navigation-System/tree/main/Navigation%20System(DSA)",
    Image: "/NVSys.jpg",
    description:
      "A Java navigation system that models locations and roads as a graph and finds the shortest path between them.",
    tech: ["Java", "Graph", "Shortest Path"],
    overview:
      "A DSA-focused project that models a map as a graph of connected locations, using a shortest-path algorithm to find the most efficient route between two points.",
    problem:
      "Naively searching through unordered location data doesn't scale, and doesn't reflect how real routing systems reason about connections and distances between points.",
    solution:
      "Built the system around a graph structure where locations are nodes and roads are weighted edges, then applied a shortest-path algorithm to compute the optimal route.",
    implementation:
      "Implemented in Java, focused on representing the graph correctly and running the shortest-path algorithm efficiently over it.",
    features: [
      "Graph-based location and road storage",
      "Shortest-path route calculation",
      "Support for multiple locations and connecting roads",
    ],
    learned:
      "How graph representation and shortest-path algorithms work together to solve real routing problems, and why picking the right structure matters before writing the algorithm.",
  },
  {
    name: "Restaurant Ordering Management System",
    link: "https://github.com/Umar-Shaikh-0305/Restaurant-Ordering-Management-System/tree/main/ROMS",
    Image: "/Roms.jpg",
    description:
      "A Java-based ordering system built as a 2nd-semester capstone, applying object-oriented programming to a real workflow.",
    tech: ["Java", "OOP", "GUI"],
    overview:
      "An end-to-end system for handling restaurant orders — from menu selection through to billing — built to demonstrate solid OOP fundamentals.",
    problem:
      "A restaurant's ordering process involves several moving parts — menu items, orders, discounts, billing — that need to stay consistent and easy to extend.",
    solution:
      "Modeled the system around classes for menu items, orders, and bills, using encapsulation and exception handling to keep the logic organized and predictable.",
    implementation:
      "Built in Java with a GUI layer on top of the core order-processing logic, keeping the interface and the business logic separated.",
    features: [
      "Menu and order management",
      "Billing with discount handling",
      "Exception handling for invalid input",
      "Graphical user interface",
    ],
    learned:
      "How to translate a real-world process into classes and objects, and why exception handling matters once a program has to deal with unpredictable input.",
  },
];

export const OTHER_PROJECTS = [
  {
    name: "Time-Table Management System",
    link: "https://github.com/Umar-Shaikh-0305/Smart-Timetable-management-System/tree/main",
    description:
      "A 1st-semester project for managing class schedules — creating, updating, and organizing timetable entries.",
    tech: ["C++"],
  },
  {
    name: "Amazon Clone",
    link: "https://github.com/Umar-Shaikh-0305/1st_sem-projects/tree/main/Projects/AmazonClone",
    description:
      "A static front-end replica of the Amazon homepage, focused on layout and styling accuracy.",
    tech: ["HTML", "CSS"],
  },
  {
    name: "Rock Paper Scissors",
    link: "https://github.com/Umar-Shaikh-0305/1st_sem-projects/tree/main/Projects/Rock_Papers_Scissors",
    description:
      "An interactive browser game with score tracking and game logic handled entirely on the front end.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "Tic Tac Toe",
    link: "https://github.com/Umar-Shaikh-0305/1st_sem-projects/tree/main/Projects/Tic_Tac_Toe",
    description:
      "A two-player browser game with win and draw detection built in vanilla JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "Pong Game",
    link: "https://github.com/Umar-Shaikh-0305/PONG-GAME",
    description:
      "A two-player game with live score tracking, built using Java Swing.",
    tech: ["Java", "Swing"],
  },
  {
    // PLACEHOLDER: confirm this description matches what Toolnest actually does,
    // and make sure the GitHub repo is set to Public — visitors can't view a private repo.
    name: "Toolnest",
    link: "https://github.com/Umar-Shaikh-0305/toolnest",
    description:
      "A TypeScript project — update this description to say what Toolnest actually does.",
    tech: ["TypeScript"],
  },
];

export const EXPERIENCE = [
  {
    role: "ACM SE Volunteer",
    org: "ACM FAST-NUCES Society",
    date: "Spring – Summer 2025",
    description:
      "Collaborated with the ACM FAST-NUCES chapter to help organize coding, design, and business-themed competitions for students.",
  },
  {
    role: "Freelance Graphic Designer",
    org: "Fiverr",
    date: "2024 – 2025",
    description:
      "Completed freelance design projects including posters, video thumbnails, and business card designs for clients.",
  },
];

export const EDUCATION = [
  {
    degree: "BS Software Engineering",
    school: "FAST-NUCES, Karachi Campus",
    date: "2025 – 2029",
    detail: "Currently in 3rd semester, building a foundation in programming and computer science fundamentals.",
    coursework: ["Programming Fundamentals", "Object-Oriented Programming", "Data Structures & Algorithms"],
  },
  {
    degree: "Diploma in Information Technology",
    school: "Microsoft Institute of Computer & English Language Center",
    date: "2024 – 2025",
    detail: "Completed with 80% from the Sindh Technical Board (STB).",
    coursework: [],
  },
  {
    degree: "Intermediate (ICS)",
    school: "IBA Community College, Khairpur Mir's",
    date: "2023 – 2025",
    detail: "Mathematics, Physics, and Computer Science — completed with 84% from the AKU-EB board.",
    coursework: [],
  },
];

// Coders Cup is the standout competitive achievement; Volunteering and Debate
// Session are kept too, at the person's request, as genuine participation.
export const ACHIEVEMENTS = [
  {
    title: "Coders Cup",
    image: "/cc.jpg",
    org: "ACM FAST-NUCES Society",
    description: "Solved real-world coding problems in a competitive setting, sharpening programming and problem-solving skills.",
  },
  {
    title: "Volunteering",
    image: "/moh.jpg",
    org: "Savaira Mental Health Organization & MOH (supervised by Youth Intelligentsia)",
    description: "Contributed to community-focused CCE projects as part of university coursework.",
  },
  {
    title: "Debate Session",
    image: "/icp.jpg",
    org: "ICP Class",
    description: "Took part in a PNA session simulation held over one week, practicing structured argument and communication.",
  },
];

export const LEARNING = [
  {
    title: "Data Structures & Algorithms",
    description: "Strengthening problem-solving and algorithmic thinking through consistent practice.",
  },
  {
    title: "Full-Stack Development",
    description: "Learning how modern frontend and backend systems work together end to end.",
  },
  {
    title: "Artificial Intelligence",
    description: "Exploring core AI concepts and how they apply to practical software problems.",
  },
];
