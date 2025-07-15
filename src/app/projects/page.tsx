'use client';

import React from 'react';
import { projectsData } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import FadeInStagger from '@/components/FadeInStagger';
import { motion } from 'framer-motion';
import { typography, containers } from '@/utils/responsive';

export default function ProjectsPage() {
  return (
    <div className={`min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8`}>
      <div className={`${containers.standard} mx-auto`}>
        <FadeInStagger staggerDelay={75} animationDuration={1000}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl fullhd:text-5xl 2k:text-6xl font-bold mb-6 sm:mb-8 text-center text-gray-100">My Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </FadeInStagger>
      </div>
    </div>
  );
}
