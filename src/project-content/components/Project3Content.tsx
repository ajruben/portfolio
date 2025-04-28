"use client"; // Mark as a Client Component

import React, { useState } from 'react'; // Import useState
import Image from 'next/image'; // Import the Next.js Image component
import { Project } from '@/data/projects'; // Re-add Project type import

// Re-add interface
interface ProjectContentProps {
  project: Project; // Receive project data as a prop
}

// Re-add props to component signature and FC type
const Project3Content: React.FC<ProjectContentProps> = ({ project }) => {
  // Add eslint-disable comment for the unused 'project' prop to avoid new linting errors
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unusedProject = project; // Assign to a variable prefixed with _ to indicate it's intentionally unused

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null); // State for selected image index

  const imageNames = [
    '07401318_red.png',
    'elephant_red.png',
    'fullzoom_bw.png',
    'mandelbrot_black_and_yellow_you_know_what_it_is.png',
    'spiral.png',
    'tapijt.png',
  ];
  const imageSources = imageNames.map(name => `/images_project3/${name}`);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal close
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === 0 ? imageSources.length - 1 : (prevIndex ?? 0) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal close
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) =>
        prevIndex === imageSources.length - 1 ? 0 : (prevIndex ?? 0) + 1
      );
    }
  };


  return (
    <div>
      <p>
      In this small project I made some visualisations using a CUDA kernel in Python via cupy.
      Visualisations are made using datashader, a library that allows for fast rendering of large datasets.
      </p>
      <p>
      The visualisation is made of the mandelbrot set, this famous set follows
      from a simple, but yet interesting equation. The set is defined as the set of complex numbers c for which function f(z) = z^2 + c remains bounded.
      In this case, visualisations speake louder than words.
      </p>

      {/* Conditionally render the video element if videoSrc exists */}
      {project.videoSrc && (
        <div className="my-6"> {/* Add some margin */}
          <video
            controls
            width="100%" // Make it responsive
            className="rounded-lg shadow-md" // Optional styling
          >
            <source src={project.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Image Gallery Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-200">Visualisations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {imageSources.map((imgSrc, index) => { // Use curly braces for explicit return block
            return ( // Add explicit return statement
              <div
                key={imgSrc} // Use imgSrc as key
                // Removed bg-gray-700, relative, and group class
                className="aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer flex items-center justify-center" // Removed group class
                onClick={() => openModal(index)} // Pass index to openModal
              >
                <Image
                  src={imgSrc}
                  alt={`Visualization ${index + 1}`} // Simplified alt text
                  width={300} // Explicit width
                  height={300} // Explicit height
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }} // Contain within the flex container
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Optimize image loading
                  className="transition-transform duration-300 ease-in-out" // Removed group-hover:scale-105
                />
                {/* Removed the overlay div that showed "View" on hover */}
              </div>
            ); // Semicolon after return
          })}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-md p-4" // Increased z-index and opacity
          onClick={closeModal} // Close modal on background click (backdrop)
        >
          {/* Modal Content Container */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content area
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-[110] text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity" // Increased z-index
              aria-label="Close image viewer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous image"
              // disabled={selectedImageIndex === 0} // Optional: disable at start
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next image"
              // disabled={selectedImageIndex === imageSources.length - 1} // Optional: disable at end
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="relative w-auto h-auto max-w-[90vw] max-h-[90vh] flex items-center justify-center">
              <Image
                key={selectedImageIndex} // Add key to force re-render on index change
                src={imageSources[selectedImageIndex]}
                alt="Fullscreen visualization"
                width={1920} // Provide large base width
                height={1080} // Provide large base height
                style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} // Responsive sizing
                sizes="90vw"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project3Content;
