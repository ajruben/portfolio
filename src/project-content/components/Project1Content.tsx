import React from 'react';
import { Project } from '@/data/projects'; // Assuming Project type is exported

interface ProjectContentProps {
  project: Project; // Receive project data as a prop
}

const Project1Content: React.FC<ProjectContentProps> = ({ project }) => {
  return (
    <div>
      {/* Start adding your custom TSX content for Project 1 here */}
      <p>
        This is the custom content area for **{project.title}**.
      </p>
      <p>
        You can add any React components, specific layouts, images,
        or interactive elements relevant to this project.
      </p>

      {/* Example: Displaying a specific detail */}
      <h3 className="text-xl font-semibold mt-6 mb-2">Key Challenge</h3>
      <p>
        One of the main challenges in the {project.title} project was...
        [Describe a challenge specific to project 1].
      </p>

      {/* You can add more sections, custom components, etc. */}
      {/* <MyCustomChart data={...} /> */}
      {/* <Image src="/path/to/specific/image.jpg" alt="Detail" width={500} height={300} /> */}

    </div>
  );
};

export default Project1Content;
