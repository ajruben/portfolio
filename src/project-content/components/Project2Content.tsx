import React from 'react';
import { Project } from '@/data/projects'; // Assuming Project type is exported

interface ProjectContentProps {
  project: Project; // Receive project data as a prop
}

const Project2Content: React.FC<ProjectContentProps> = ({ project }) => {
  return (
    <div>
      {/* Start adding your custom TSX content for Project 2 here */}
      <p>
        This is the custom content area for **{project.title}**.
      </p>
      <p>
        Here you can describe the London Crime Data project in detail using React components.
      </p>

      {/* Example: Maybe embed an interactive map or chart component */}
      {/* <LondonCrimeMap data={...} /> */}

      <h3 className="text-xl font-semibold mt-6 mb-2">Data Sources</h3>
      <p>
        The data for this project was sourced from... [Describe data sources].
      </p>

    </div>
  );
};

export default Project2Content;
