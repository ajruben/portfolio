// src/components/ProjectSection.tsx
"use client"; // Required for hooks like useRef, useScroll
import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion'; // Import scroll hooks
import { Project } from '@/data/projects';
import Image from 'next/image'; // Import Image

interface ProjectSectionProps {
  project: Project;
  prevProjectId?: number | null; // ID of the previous project in the filtered list
  nextProjectId?: number | null; // ID of the next project in the filtered list
  scrollToProject: (id: number) => void; // Function to scroll to a specific project ID
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  project,
  prevProjectId,
  nextProjectId,
  scrollToProject
}) => {
  const sectionRef = useRef<HTMLElement>(null); // Ref for the section element

  // Track scroll progress relative to this section within the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Animate from section entering viewport bottom to leaving viewport top
  });

  // Transform scroll progress (0 to 1) into other values for animation
  // Example 1: Scale (Zoom effect) - Increased zoom range
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.1, 0.7]); // Increased range from 0.8-1.05 to 0.7-1.1
  // Example 2: Opacity (Fade effect) - Fades slightly at edges
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.7, 1, 1, 0.7]);

  return (
    // Apply ref and make the section a motion component. Apply dynamic styles.
    // Includes snap-start and min-h-screen if using page-specific snapping
    <motion.section
      ref={sectionRef}
      id={`project-${project.id}`} // ID for potential linking
      // Apply the transformed styles for scroll-linked animation:
      style={{
          scale,
          opacity
      }}
      // Base styling for the section (DARK THEME APPLIED):
      // Removed min-h-screen, added rounded-lg, adjusted padding
      // Added relative positioning for arrow buttons
      className="py-12 px-4 flex items-center justify-center bg-gray-800 scroll-mt-16 snap-start relative rounded-lg shadow-xl my-12" // Added rounded-lg, shadow, vertical margin
    >
      {/* --- Navigation Arrows --- */}
      {/* Up Arrow (Moved to Left Border) */}
      {prevProjectId !== null && prevProjectId !== undefined && (
        <button
          onClick={() => scrollToProject(prevProjectId)}
          aria-label="Scroll to previous project"
          // Positioned vertically center, just outside the left edge
          className="absolute top-1/2 left-[-1rem] md:left-[-1.5rem] transform -translate-y-1/2 z-10 p-2 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 transition-colors backdrop-blur-sm" // Changed left-4 to negative value
        >
          {/* Standard Chevron Up Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      )}
      {/* Down Arrow (Moved to Right Border) */}
      {nextProjectId !== null && nextProjectId !== undefined && (
         <button
          onClick={() => scrollToProject(nextProjectId)}
          aria-label="Scroll to next project"
          // Positioned vertically center, just outside the right edge
          className="absolute top-1/2 right-[-1rem] md:right-[-1.5rem] transform -translate-y-1/2 z-10 p-2 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 transition-colors backdrop-blur-sm" // Changed right-4 to negative value
        >
          {/* Standard Chevron Down Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      )}

      {/* Inner container - scales/fades with the section */}
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* --- Column 1: Text Content --- */}
        <div>
          {/* Dark Theme Text Colors */}
          <h3 className="text-3xl font-bold mb-4 text-gray-100">{project.title}</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-2 text-gray-400 uppercase tracking-wider">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                // Dark Theme Tag Colors
                <span key={tech} className="bg-slate-700 text-slate-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* --- Links --- */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-700">
            {/* View Live Button */}
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                View Live
              </Link>
            )}
            {/* View Repo Button */}
            {project.repoUrl && (
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-800 transition-colors duration-200 text-sm font-medium">
                View Repo
              </Link>
            )}
            {/* Learn More Button */}
            <Link
              href={`/projects/${project.id}`} // Dynamic link using project ID
              className="inline-block bg-teal-600 text-white px-5 py-2 rounded hover:bg-teal-700 transition-colors duration-200 text-sm font-medium" // Example styling
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* --- Column 2: Visual --- */}
        <div
          // Dark Theme Placeholder Styling - Added relative positioning
          className="relative mt-8 md:mt-0 flex items-center justify-center aspect-video bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg shadow-lg overflow-hidden"
        >
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              fill={true} // Use fill to cover the container
              style={{ objectFit: 'cover' }} // Maintain aspect ratio and cover
            />
          ) : (
              // Dark Theme Placeholder Text
            <span className="text-gray-400">Project Visual Placeholder</span>
          )}
        </div>

      </div>
    </motion.section>
  );
};

export default ProjectSection; // Ensure default export is present
