"use client"; // Required for Swiper hooks and interactivity

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Project } from '@/data/projects'; // Import the Project interface
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Optional: if you want navigation arrows

interface TopProjectBillboardProps {
  projects: Project[];
}

const TopProjectBillboard: React.FC<TopProjectBillboardProps> = ({ projects }) => {
  return (
    <div className="mb-16"> {/* Add some margin below the carousel */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]} // Add modules you want to use
        spaceBetween={30} // Space between slides
        slidesPerView={1} // Default slides per view
        loop={true} // Enable continuous loop mode
        autoplay={{
          delay: 3500, // Time between slides (in ms)
          disableOnInteraction: false, // Autoplay continues even after user interaction
        }}
        pagination={{
          clickable: true, // Allow clicking on pagination dots
        }}
        // navigation={true} // Uncomment to enable Next/Prev arrows
        breakpoints={{
          // Responsive breakpoints
          640: { // sm
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: { // lg
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="mySwiper" // Optional custom class for styling
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <Link href={`#project-${project.id}`} className="block"> {/* Link to the section below */}
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Visual Placeholder</span>
                )}
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h4>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopProjectBillboard;
