// src/components/ProjectSection.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import motion component
import { Project } from '@/data/projects'; // Import the interface

interface ProjectSectionProps {
  project: Project;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ project }) => {
  // Define animation variants (optional, but good for organization)
  // Or use inline props as shown below

  return (
    // Section container - added padding, min-height for spacing, and alternating background example
    <section className="py-16 px-4 min-h-[70vh] flex items-center justify-center odd:bg-slate-50">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Column 1: Text Content - Animating from left */}
        <motion.div
          initial={{ opacity: 0, x: -80 }} // Start invisible and 80px to the left
          whileInView={{ opacity: 1, x: 0 }} // Animate to fully visible and original position
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% of element is visible
          transition={{ duration: 0.7, ease: "easeOut" }} // Control animation timing and easing
        >
          <h3 className="text-3xl font-bold mb-4 text-gray-800">{project.title}</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-2 text-gray-500 uppercase tracking-wider">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="bg-sky-100 text-sky-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-auto">
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                View Live
              </Link>
            )}
            {/* --- SOLUTION: Conditionally render the Repo Link --- */}
            {project.repoUrl && (
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-800 transition-colors duration-200 text-sm font-medium">
                View Repo {/* Changed link text */}
              </Link>
            )}
            {/* --- End of Fix --- */}
          </div>
        </motion.div>

        {/* Column 2: Visual (Image/Placeholder) - Animating scale/opacity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Start invisible and slightly smaller
          whileInView={{ opacity: 1, scale: 1 }} // Animate to fully visible and original size
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }} // Slight delay
          className="mt-8 md:mt-0 flex items-center justify-center aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-lg overflow-hidden" // Placeholder styling
        >
          {project.imageUrl ? (
            <img src={project.imageUrl} alt={`${project.title} screenshot`} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500">Project Visual Placeholder</span>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectSection;