// src/app/projects/page.tsx
import type { Metadata } from "next";
import ProjectSection from "@/components/ProjectSection";
import TopProjectBillboard from "@/components/TopProjectBillboard"; // Use your NEW component name
import { projectsData } from "@/data/projects";

// Define metadata (can be done in server components or client components like this)
export const metadata: Metadata = {
  title: "My Projects - Ruben Swarts",
  description: "A showcase of projects I've built, demonstrating modern web technologies.",
};

export default function ProjectsPage() {
  return (
    // Main container for the projects page content
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-100">My Projects</h1>

      {/* --- Project Carousel (remains) --- */}
      {projectsData.length > 0 && (
        <TopProjectBillboard projects={projectsData} />
      )}
      {/* --- End Carousel --- */}


      {/* --- Container for the standard vertical list of project sections --- */}
      <div className="flex flex-col gap-8 md:gap-16"> {/* Added gap for spacing between sections */}
        {projectsData.length > 0 ? (
          projectsData.map((project) => (
            // Render each project section directly
            <ProjectSection key={project.id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-400">More projects coming soon!</p>
        )}
      </div>
      {/* --- End Vertical List --- */}

    </div>
  );
}
