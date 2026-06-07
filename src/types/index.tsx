export interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  caption: string;
  description: string;
  videoUrl: string;
  category: string;
  subcategory: string;
  createdAt: string;
  views?: number;
  duration?: string;
}

export interface Category {
  _id: string;
  name: string;
  subcategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    _id: "web-dev",
    name: "Web Development",
    subcategories: [
      "HTML & CSS",
      "JavaScript",
      "React",
      "Next.js",
      "Vue.js",
      "Angular",
    ],
  },
  {
    _id: "backend",
    name: "Backend Development",
    subcategories: ["Node.js", "Python", "Java", "Go", "Rust", "PHP"],
  },
  {
    _id: "mobile",
    name: "Mobile Development",
    subcategories: [
      "React Native",
      "Flutter",
      "iOS (Swift)",
      "Android (Kotlin)",
    ],
  },
  {
    _id: "data-science",
    name: "Data Science",
    subcategories: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "Data Analysis",
      "Statistics",
    ],
  },
  {
    _id: "devops",
    name: "DevOps",
    subcategories: ["Docker", "Kubernetes", "CI/CD", "AWS", "Azure", "GCP"],
  },
  {
    _id: "design",
    name: "UI/UX Design",
    subcategories: ["Figma", "Adobe XD", "Prototyping", "User Research"],
  },
];

export const MOCK_VIDEOS: Video[] = [
  {
    _id: "1",
    title: "Mastering Next.js 15: Complete Guide",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    caption: "Build production-ready apps with the latest Next.js features",
    description:
      "<p>In this comprehensive course, we'll explore everything Next.js 15 has to offer, from server components to the new app router. You'll learn how to build scalable, performant web applications.</p>",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Web Development",
    subcategory: "Next.js",
    createdAt: "2024-01-15",
    views: 12400,
    duration: "4h 32m",
  },
  {
    _id: "2",
    title: "React Hooks Deep Dive",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    caption: "Master useState, useEffect, useContext and custom hooks",
    description:
      "<p>Deep dive into React hooks with real-world examples and best practices. Learn how to write cleaner, more maintainable React code.</p>",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Web Development",
    subcategory: "React",
    createdAt: "2024-01-20",
    views: 8900,
    duration: "2h 15m",
  },
  {
    _id: "3",
    title: "Python for Data Science Bootcamp",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    caption: "From zero to data scientist with Python",
    description:
      "<p>Complete Python for Data Science course covering pandas, numpy, matplotlib, and machine learning fundamentals.</p>",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Data Science",
    subcategory: "Python",
    createdAt: "2024-02-01",
    views: 21000,
    duration: "8h 45m",
  },
  {
    _id: "4",
    title: "Docker & Kubernetes Mastery",
    thumbnail:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
    caption: "Container orchestration for modern applications",
    description:
      "<p>Learn how to containerize applications with Docker and manage them at scale with Kubernetes.</p>",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "DevOps",
    subcategory: "Docker",
    createdAt: "2024-02-10",
    views: 5600,
    duration: "6h 20m",
  },
  {
    _id: "5",
    title: "TypeScript Advanced Patterns",
    thumbnail:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&q=80",
    caption: "Level up your TypeScript skills with advanced type patterns",
    description:
      "<p>Explore advanced TypeScript patterns including generics, conditional types, mapped types, and more.</p>",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Web Development",
    subcategory: "JavaScript",
    createdAt: "2024-02-18",
    views: 7200,
    duration: "3h 10m",
  },
  {
    _id: "6",
    title: "Figma UI Design Masterclass",
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    caption: "Design stunning interfaces from scratch",
    description:
      "<p>Complete guide to Figma for UI/UX designers. Learn components, auto-layout, prototyping and handoff workflows.</p>",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "UI/UX Design",
    subcategory: "Figma",
    createdAt: "2024-03-01",
    views: 9800,
    duration: "5h 30m",
  },
  {
    _id: "7",
    title: "Flutter Mobile Development",
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    caption: "Build beautiful cross-platform mobile apps",
    description:
      "<p>Complete Flutter development course. Build iOS and Android apps from a single codebase with beautiful Material Design.</p>",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Mobile Development",
    subcategory: "Flutter",
    createdAt: "2024-03-10",
    views: 6400,
    duration: "7h 15m",
  },
  {
    _id: "8",
    title: "Node.js API Development",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    caption: "Build scalable REST APIs with Node.js and Express",
    description:
      "<p>Learn to build production-ready REST APIs with Node.js, Express, MongoDB and JWT authentication.</p>",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Backend Development",
    subcategory: "Node.js",
    createdAt: "2024-03-15",
    views: 11200,
    duration: "4h 50m",
  },
];
