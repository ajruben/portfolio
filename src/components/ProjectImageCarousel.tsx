// src/components/ProjectImageCarousel.tsx
"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Zoom } from 'swiper/modules'; // Added Zoom module
import Image from 'next/image'; // Use Next.js Image

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom'; // Import zoom styles

interface ProjectImageCarouselProps {
  images: string[]; // Expects an array of image URLs
  projectTitle: string;
}

const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({ images, projectTitle }) => {
  // Don't render if no images are provided
  if (!images || images.length === 0) {
    return null;
  }

  return (
    // Added margin below, relative positioning for arrows/pagination
    <div className="mb-10 relative project-detail-carousel">
      <Swiper
        modules={[Pagination, Navigation, Zoom]} // Added Zoom
        spaceBetween={10}
        slidesPerView={1}
        loop={images.length > 1} // Only loop if more than one image
        pagination={{ clickable: true }}
        navigation={true} // Use Swiper's default arrows for simplicity here
        zoom={true} // Enable zoom functionality
        className="rounded-lg overflow-hidden shadow-xl" // Styling for the container
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            {/* Added swiper-zoom-container */}
            <div className="swiper-zoom-container aspect-video relative bg-gray-700">
              <Image
                src={imageUrl}
                alt={`${projectTitle} - Detail Image ${index + 1}`}
                fill
                style={{ objectFit: 'contain' }} // Use 'contain' to see whole image, 'cover' to fill
                sizes="100vw" // Adjust sizes as needed for optimization
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Default arrows/pagination will be styled via CSS */}
    </div>
  );
};

export default ProjectImageCarousel;