'use client'; // Need client-side hooks for state

import Link from 'next/link';
import { useState, useRef } from 'react'; // Import useRef
import { projectsData } from '@/data/projects'; // Import project data

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timeout ID

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear any pending close timer
      timeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Set a timer to close the dropdown after a short delay
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150); // 150ms delay, adjust as needed
  };


  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-50">
      {/* Use justify-center on the nav container */}
      <nav className="container mx-auto flex justify-center items-center relative"> {/* Added relative for potential absolute positioning if needed later */}
        {/* Keep logo aligned left (or adjust as needed) */}
        <div className="absolute left-4"> {/* Position logo absolutely to the left */}
           <Link href="/" className="font-bold text-xl">Ruben Swarts</Link>
        </div>
        {/* Navigation links will now be centered */}
        <ul className="flex space-x-6 items-center"> {/* Increased space-x slightly */}
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
          {/* Projects Dropdown */}
          {/* Wrap trigger and dropdown in a li with hover handlers */}
          <li
            className="relative"
            onMouseEnter={handleMouseEnter} // Use new handler
            onMouseLeave={handleMouseLeave} // Use new handler
          >
            {/* Wrap the trigger content in a Link, keep button structure for aria if needed, or simplify */}
            {/* Let's try simplifying by making the Link the main element */}
            <Link href="/projects" className="hover:text-gray-300 focus:outline-none flex items-center" aria-haspopup="true" aria-expanded={isDropdownOpen}>
              Projects
              {/* Simple dropdown arrow */}
              <svg className="w-4 h-4 ml-1 fill-current pointer-events-none" viewBox="0 0 20 20"> {/* Added pointer-events-none to SVG */}
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </Link>
            {/* Keep dropdown logic */}
            {isDropdownOpen && (
               // Add hover handlers to the dropdown itself to keep it open
              <ul
                className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-50" // Adjusted margin-top slightly
                onMouseEnter={handleMouseEnter} // Keep open if mouse enters dropdown
                onMouseLeave={handleMouseLeave} // Start close timer if mouse leaves dropdown
              >
                {projectsData.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={`/projects/${project.id}`}
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
                      onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
                 {/* Optional: Link to main projects page */}
                 <li>
                    <Link
                      href="/projects"
                      className="block px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600 border-t border-gray-600 mt-1 pt-2" // Separator style
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      All Projects
                    </Link>
                  </li>
              </ul>
            )}
          </li>
          {/* End Projects Dropdown */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
