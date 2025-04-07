// src/app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = { // Page-specific metadata
  title: "About Me - Ruben Swarts",
  description: "Ruben Swarts",
};

// About page component, default export to make file consumable by Next.js
export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="mb-4">
        [With my background in Physics BSc. and Applied Data Science MSc., coupled with my experience and interest in programming and GIS,
        I have done many projects that I am passionate to share. On this website I aim to both demonstrate my experience, and also
        to track the things I have learnt.]
      </p>
      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      <ul className="list-disc list-inside">
        <li>Python</li>
        <li>GIS</li>
        <li>Physics</li>
        <li>Git & GitHub</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Techstack of this website:</h2>
        <li>React / Next.js</li>
        <li>Node.js</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>      
      </ul>
    </div>
  );
}