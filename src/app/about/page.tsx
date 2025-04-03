// src/app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = { // Page-specific metadata
  title: "About Me - Ruben Swarts",
  description: "Learn more about my background, skills, and experience.",
};

// About page component, default export to make file consumable by Next.js
export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="mb-4">
        [Write about your background, passion for development, education, experience...]
      </p>
      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      <ul className="list-disc list-inside">
        <li>JavaScript (ES6+)</li>
        <li>TypeScript</li>
        <li>React / Next.js</li>
        <li>HTML5 & CSS3</li>
        <li>Tailwind CSS</li>
        <li>Git & GitHub</li>
        <li>Node.js</li>
        <li>[Python]</li>
        <li>[Physics]</li>
        <li>[GIS]</li>
      </ul>
    </div>
  );
}