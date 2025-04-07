'use client'; // This component handles client-side state and filtering

import React, { useState, useEffect, useMemo } from 'react';
import ProjectSection from "@/components/ProjectSection";
import { Project } from "@/data/projects"; // Import Project type

interface ProjectListClientProps {
  projects: Project[]; // Receive all projects as a prop
  initialSearchTerm?: string; // Receive initial search term from server
}

const ProjectListClient: React.FC<ProjectListClientProps> = ({ projects, initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedTech, setSelectedTech] = useState<string>(''); // State for technology filter

  // Update search term state if initialSearchTerm changes (e.g., navigation)
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

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

      {/* --- Container for the FILTERED vertical list of project sections --- */}
      <div className="flex flex-col gap-8 md:gap-16 mt-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            // Render filtered project sections
            <ProjectSection key={project.id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-400 mt-8">No projects match your criteria.</p>
        )}
      </div>
      {/* --- End Vertical List --- */}
    </>
  );
};

export default ProjectListClient;
