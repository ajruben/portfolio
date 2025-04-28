"use client"; // Mark as a Client Component

import React from 'react';
import { Project } from '@/data/projects'; // Import Project type

// Define the props interface
interface ProjectContentProps {
  project: Project; // Receive project data as a prop
}

// Simplified component template
const Project4Content: React.FC<ProjectContentProps> = ({ project }) => {
  return (
    <div>
      {/* Render the project description */}
      <p>{project.description}</p>

      {/* Add more project-specific content here as needed */}
      <p className="mt-4 italic text-gray-500">
        (Detailed content for Project 4 is pending.)
      </p>

      {/* Conditionally render the video element if videoSrc exists in project data */}
      {project.videoSrc && (
        <div className="my-6">
          <video
            controls
            width="100%"
            className="rounded-lg shadow-md"
          >
            <source src={project.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* You can add image galleries, specific sections, etc., below */}

    </div>
  );
};

export default Project4Content;
