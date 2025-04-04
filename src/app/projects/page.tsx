// src/app/projects/page.tsx
import type { Metadata } from "next";
import ProjectSection from "@/components/ProjectSection"; // Import the NEW component
import { projectsData } from "@/data/projects";   // Import project data

export const metadata: Metadata = {
  title: "My Projects - Ruben Swarts",
  description: "A showcase of projects I've built, demonstrating modern web technologies.",
};

export default function ProjectsPage() {
  return (
    // Main container for the projects page content
    <div>
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">My Projects</h1>

      {/* Container for the vertical list of project sections */}
      <div className="flex flex-col"> {/* Vertical layout */}
        {projectsData.length > 0 ? (
          projectsData.map((project, index) => (
            <ProjectSection key={project.id} project={project} /> // Render each project using the section component
          ))
        ) : (
          <p className="text-center text-gray-500">More projects coming soon!</p>
        )}
      </div>
    </div>
  );
}