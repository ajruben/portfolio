'use client'; // Needs client hooks for state and router

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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


  return (
    <main className="min-h-screen bg-gray-900 text-white px-4 py-8">
      {/* Hero section */}
      <section className="mb-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl fullhd:text-5xl 2k:text-6xl font-bold mb-4 text-center">Welcome to My Portfolio</h1>
            <p className="text-base sm:text-lg md:text-xl fullhd:text-lg 2k:text-xl mb-4 text-center">
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
      </section>

      {/* Spacer Div - Stays outside staggering, handles layout */}
      <div className="flex-grow"></div>

      {/* Featured Projects section */}
      <section className="max-w-5xl lg:max-w-6xl xl:max-w-7xl fullhd:max-w-6xl 2k:max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl fullhd:text-4xl 2k:text-5xl font-bold mb-6 text-center">Featured Projects</h2>
          {projectsData.length > 0 && (
            <TopProjectBillboard projects={projectsData} />
          )}
      </section>
    </main>
  );
}
