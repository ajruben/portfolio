// src/app/projects/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Projects - Ruben Swarts",
  description: "A showcase of projects I've built.",
};

// We will add project cards here in the next step
export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project Cards will go here */}
        <p>Project cards coming soon...</p>
      </div>
    </div>
  );
}