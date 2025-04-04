// src/components/ProjectSection.tsx
"use client"; // Required for hooks like useRef, useScroll
import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion'; // Import scroll hooks
import { Project } from '@/data/projects';

interface ProjectSectionProps {
  project: Project;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ project }) => {
  const sectionRef = useRef<HTMLElement>(null); // Ref for the section element

  // Track scroll progress relative to this section within the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Animate from section entering viewport bottom to leaving viewport top
  });

  // Transform scroll progress (0 to 1) into other values for animation
  // Example 1: Scale (Zoom effect) - Scales up in the middle viewport, down at edges
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  // Example 2: Opacity (Fade effect) - Fades slightly at edges
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.7, 1, 1, 0.7]);

  return (
    // Apply ref and make the section a motion component. Apply dynamic styles.
    <motion.section
      ref={sectionRef}
      id={`project-${project.id}`} // ID for potential linking
      // Apply the transformed styles for scroll-linked animation:
      style={{
         scale,
         opacity
      }}
      // Base styling for the section (DARK THEME APPLIED):
      className="py-16 px-4 min-h-[70vh] flex items-center justify-center bg-gray-800 scroll-mt-16" // Dark background, scroll margin
    >
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

          {/* Links (Buttons already somewhat dark-theme friendly) */}
          <div className="flex flex-wrap gap-4 mt-auto">
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                View Live
              </Link>
            )}
            {project.repoUrl && (
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-800 transition-colors duration-200 text-sm font-medium">
                View Repo
              </Link>
            )}
          </div>
        </div>

        {/* --- Column 2: Visual --- */}
        <div
          // Dark Theme Placeholder Styling
          className="mt-8 md:mt-0 flex items-center justify-center aspect-video bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg shadow-lg overflow-hidden"
        >
          {project.imageUrl ? (
            <img src={project.imageUrl} alt={`${project.title} screenshot`} className="w-full h-full object-cover" />
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