// src/app/projects/page.tsx - Server Component
import type { Metadata } from "next";
import TopProjectBillboard from "@/components/TopProjectBillboard";
import ProjectListClient from "@/components/ProjectListClient"; // Import the client component
import { projectsData } from "@/data/projects";

// Metadata can be defined in Server Components
export const metadata: Metadata = {
  title: "My Projects - Ruben Swarts",
  description: "A showcase of projects I've built, demonstrating modern web technologies.",
};

// Page component receives searchParams prop
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectsPage(props: any) {
  const { searchParams } = props;
  // Extract initial search term from server-side props
  const initialSearchTerm = typeof searchParams?.search === 'string' ? searchParams.search : '';

  return (
    // Main container for the projects page content with responsive padding
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl fullhd:text-5xl 2k:text-6xl font-bold mb-6 sm:mb-8 text-center text-gray-100">My Projects</h1>

      {/* --- Project Carousel (remains static) --- */}
      {projectsData.length > 0 && (
        <TopProjectBillboard projects={projectsData} />
      )}
      {/* --- End Carousel --- */}

      {/* --- Render the Client Component for Filtering and Listing --- */}
      {/* Pass all projects and the initial search term */}
      <ProjectListClient projects={projectsData} initialSearchTerm={initialSearchTerm} />

      {/* Scroll indicator removed from here, now handled within ProjectListClient */}

    </div>
  );
}
