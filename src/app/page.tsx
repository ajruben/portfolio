'use client'; // Needs client hooks for state and router

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import FadeInStagger from '@/components/FadeInStagger'; // Remove FadeInStagger
import { motion } from 'framer-motion'; // Import motion
import TopProjectBillboard from '@/components/TopProjectBillboard';
import { projectsData } from '@/data/projects';
import Link from 'next/link'; // Import Link

// Removed metadata export as it's not allowed in Client Components
// export const metadata: Metadata = { ... };

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/projects?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Removed poem definition

  // Estimate header height (p-4 = 1rem = 16px => 4 * 16 = 64px)
  const headerHeight = '64px'; // Or adjust if header height changes

  // Framer Motion Variants
  const containerVariants = {
    hidden: {}, // Container doesn't animate itself, just orchestrates children
    visible: {
      transition: {
        staggerChildren: 0.4, // Time between each child animating
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };


  return (
    // Main container for full height layout - Use motion.div
    <motion.div
      className={`flex flex-col min-h-[calc(100vh-${headerHeight})]`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        {/* Child 1 for staggering: Top content area */}
        <motion.div variants={itemVariants} className="flex flex-col justify-center items-center px-4 pt-12 md:pt-16">
          <div className="w-full max-w-2xl"> {/* Keep width constraints */}
            <h1 className="text-4xl font-bold mb-4 text-center">Welcome to My Portfolio</h1>
            <p className="text-lg mb-4 text-center">
              Hi, I&apos;m Ruben.
            </p>
            {/* Link the paragraph and add a subtle icon */}
            {/* Increase margin below intro link */}
            <div className="text-center mb-12 md:mb-16"> {/* Center the link */}
              <Link href="/projects" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition duration-300 group"> {/* Subtle link styling */}
                Explore my projects and learn more about my skills.
                {/* Simple right arrow icon */}
                <svg className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </div>

            {/* Search Bar Section */}
            {/* Ensure search bar stays within the centered content */}
            {/* Increase top/bottom margin significantly */}
            <div className="my-12 md:my-16 max-w-md mx-auto"> {/* Centered search bar */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
                >
                  Search
                </button>
              </form>
            </div>
            {/* End Search Bar Section */}
          </div>
        </motion.div>

        {/* Spacer Div - Stays outside staggering, handles layout */}
        <div className="flex-grow"></div>

        {/* Child 2 for staggering: Bottom content area */}
        <motion.div variants={itemVariants} className="w-full px-4 pb-12 md:pb-16">
          <Link href="/projects" className="hover:underline">
            <h2 className="text-3xl font-bold mb-6 text-center">Featured Projects</h2>
          </Link>
          {projectsData.length > 0 && (
            <TopProjectBillboard projects={projectsData} />
          )}
        </motion.div>
    </motion.div>
  );
}
