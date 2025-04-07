// src/app/projects/page.tsx - Now a Server Component
import type { Metadata } from "next";
import TopProjectBillboard from "@/components/TopProjectBillboard";
import ProjectListClient from "@/components/ProjectListClient"; // Import the new client component
import { projectsData } from "@/data/projects";

// Metadata can be defined in Server Components
export const metadata: Metadata = {
  title: "My Projects - Ruben Swarts",
  description: "A showcase of projects I've built, demonstrating modern web technologies.",
};

// Page component receives searchParams prop
export default function ProjectsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Extract initial search term from server-side props
  const initialSearchTerm = typeof searchParams?.search === 'string' ? searchParams.search : '';

  return (
    // Main container for the projects page content
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-100">My Projects</h1>

      {/* --- Project Carousel (remains static) --- */}
      {projectsData.length > 0 && (
        <TopProjectBillboard projects={projectsData} />
      )}
      {/* --- End Carousel --- */}

      {/* --- Scroll Down Indicator (remains static) --- */}
      <div className="my-8 text-center">
        <svg
          className="inline-block w-6 h-6 text-gray-400 animate-bounce"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
        <p className="text-sm text-gray-400 mt-1">Scroll down for more</p>
      </div>
      {/* --- End Scroll Down Indicator --- */}

      {/* --- Render the Client Component for Filtering and Listing --- */}
      {/* Pass all projects and the initial search term */}
      <ProjectListClient projects={projectsData} initialSearchTerm={initialSearchTerm} />

    </div>
  );
}
