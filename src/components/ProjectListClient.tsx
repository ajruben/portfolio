'use client'; // This component handles client-side state and filtering

import React, { useState, useEffect, useMemo, useRef } from 'react'; // Added useRef
import ProjectSection from "@/components/ProjectSection";
import { Project } from "@/data/projects"; // Import Project type

interface ProjectListClientProps {
  projects: Project[]; // Receive all projects as a prop
  initialSearchTerm?: string; // Receive initial search term from server
}

const ProjectListClient: React.FC<ProjectListClientProps> = ({ projects, initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedTech, setSelectedTech] = useState<string>(''); // State for technology filter
  const hasScrolledRef = useRef(false); // Ref to track if initial scroll happened

  // Update search term state if initialSearchTerm changes (e.g., navigation)
  useEffect(() => {
    // Reset scroll tracking if the initial search term changes (new navigation)
    if (initialSearchTerm !== searchTerm) {
        hasScrolledRef.current = false;
    }
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm, searchTerm]); // Added searchTerm dependency

  // Get unique technologies for the filter dropdown
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]); // Depend on projects prop

  // Filter projects based on search term and selected technology
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchTerm
        ? project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
        : true; // If no search term, always true

      const matchesTech = selectedTech
        ? project.technologies.includes(selectedTech)
        : true; // If no tech selected, always true

      return matchesSearch && matchesTech;
    });
  }, [searchTerm, selectedTech, projects]); // Depend on projects prop

  // Effect to scroll to the first project on initial search load
  useEffect(() => {
    // Only run if there was an initial search term, projects are filtered, and we haven't scrolled yet
    if (initialSearchTerm && filteredProjects.length > 0 && !hasScrolledRef.current) {
      const firstProjectId = filteredProjects[0].id;
      const targetElementId = `project-${firstProjectId}`;
      const targetElement = document.getElementById(targetElementId);

      if (targetElement) {
        // Use setTimeout to ensure the element is rendered and layout is stable
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center', // Try to center the element vertically
          });
          hasScrolledRef.current = true; // Mark that we've scrolled
        }, 100); // Small delay might be needed
      } else {
          // Fallback or log if element not found immediately
          console.warn(`Target element ${targetElementId} not found for initial scroll.`);
          // Optionally, try again after a longer delay or just accept it didn't scroll
      }
    }
    // Reset scroll flag if the search term is cleared or changes away from initial
    if (!searchTerm || (initialSearchTerm && searchTerm !== initialSearchTerm)) {
        hasScrolledRef.current = false;
    }

  }, [filteredProjects, initialSearchTerm, searchTerm]); // Rerun when filtered projects or search term changes

  // Function to scroll to a specific project section
  const scrollToProject = (id: number) => {
    const element = document.getElementById(`project-${id}`);
    if (element) {
      // Use 'center' to try and vertically center the section
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      {/* --- Filtering Controls --- */}
      <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        {/* Search Input (controls local state) */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter projects..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full sm:w-auto"
        />
        {/* Technology Filter Dropdown */}
        <select
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full sm:w-auto"
        >
          <option value="">All Technologies</option>
          {allTechnologies.map(tech => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </select>
      </div>
      {/* --- End Filtering Controls --- */}

      {/* --- Scroll Down Indicator (Moved here) --- */}
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

      {/* --- Container for the FILTERED vertical list of project sections --- */}
      <div className="flex flex-col gap-8 md:gap-16 mt-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => {
            // Determine previous and next project IDs in the filtered list
            const prevProjectId = index > 0 ? filteredProjects[index - 1].id : null;
            const nextProjectId = index < filteredProjects.length - 1 ? filteredProjects[index + 1].id : null;

            return (
              // Render filtered project sections, passing navigation props
              <ProjectSection
                key={project.id}
                project={project}
                prevProjectId={prevProjectId}
                nextProjectId={nextProjectId}
                scrollToProject={scrollToProject} // Pass the scroll handler function
              />
            );
          })
        ) : (
          <p className="text-center text-gray-400 mt-8">No projects match your criteria.</p>
        )}
      </div>
      {/* --- End Vertical List --- */}
    </>
  );
};

export default ProjectListClient;
