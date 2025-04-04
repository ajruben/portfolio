// src/components/TopProjectBillboard.tsx
"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Project } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image'; // <--- Import the Next.js Image component

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface TopProjectBillboardProps {
  projects: Project[];
}

const TopProjectBillboard: React.FC<TopProjectBillboardProps> = ({ projects }) => {
  return (
    <div className="mb-16 relative group/carousel px-12">
      <Swiper
          // ... other Swiper props (modules, spaceBetween, loop, autoplay, navigation, breakpoints, className) ...
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: true, /* pauseOnMouseEnter: true */ }} // Corrected disableOnInteraction value if needed
          pagination={{ clickable: true }}
          navigation={{ nextEl: '.swiper-button-next-custom', prevEl: '.swiper-button-prev-custom' }}
          breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="mySwiper"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group/slide"> {/* Adjusted for potential dark theme */}
            <Link href={`#project-${project.id}`} className="block group"> {/* Added group here too */}
              {/* --- Image Container --- */}
              <div className="aspect-video relative overflow-hidden"> {/* Ensure relative positioning for fill Image */}
                {project.imageUrl ? (
                  // --- Use Next.js Image component ---
                  <Image
                    src={project.imageUrl} // Assumes path like /images/project-one.jpg
                    alt={`${project.title} preview`}
                    fill // Automatically fill the parent container
                    style={{ objectFit: 'cover' }} // CSS for covering the container
                    className="transition-transform duration-300 group-hover:scale-105" // Apply hover effect class
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Helps browser choose optimal image size
                  />
                ) : (
                  // --- Placeholder when no image ---
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Visual Placeholder</span>
                  </div>
                )}
              </div>
              {/* --- Text Content --- */}
              <div className="p-4">
                 {/* Use dark theme text color */}
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h4>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Custom Arrow Buttons --- */}
      {/* ... buttons remain the same ... */}
      <button className="swiper-button-prev-custom ..."> {/* Button classes */}
         <svg /* ... icon ... */ />
      </button>
      <button className="swiper-button-next-custom ..."> {/* Button classes */}
         <svg /* ... icon ... */ />
      </button>
    </div>
  );
};

export default TopProjectBillboard;