'use client';

import React from 'react';
import { useBreakpoint, typography, spacing, containers } from '@/utils/responsive';

// Example component demonstrating responsive design patterns
export default function ResponsiveExample() {
  const breakpoint = useBreakpoint();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Show current breakpoint for development */}
      <div className="fixed top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-md text-sm z-50">
        Current: {breakpoint}
      </div>

      {/* Example 1: Responsive Typography using Tailwind classes */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">1. Responsive Typography</h2>
        
        {/* Traditional responsive classes */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl fullhd:text-5xl 2k:text-6xl font-bold mb-4">
          Responsive Heading
        </h1>
        
        {/* Fluid typography using clamp() */}
        <h1 className="text-fluid-4xl font-bold mb-4">
          Fluid Heading (scales smoothly)
        </h1>
        
        {/* Using the typography utility */}
        <h3 className={`${typography.h3} mb-2`}>Subheading using utility</h3>
        <p className={typography.body}>Body text that scales appropriately across devices.</p>
      </section>

      {/* Example 2: Responsive Containers */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">2. Responsive Containers</h2>
        
        <div className={`${containers.narrow} mx-auto bg-gray-800 p-6 rounded-lg mb-4`}>
          <p>Narrow container - good for text content</p>
        </div>
        
        <div className={`${containers.standard} mx-auto bg-gray-800 p-6 rounded-lg mb-4`}>
          <p>Standard container - general purpose</p>
        </div>
        
        <div className={`${containers.wide} mx-auto bg-gray-800 p-6 rounded-lg`}>
          <p>Wide container - for full-width layouts</p>
        </div>
      </section>

      {/* Example 3: Responsive Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">3. Responsive Grid</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 fullhd:grid-cols-3 2k:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-gray-800 p-6 rounded-lg text-center">
              <p className="text-fluid-lg">Item {item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example 4: Responsive Spacing */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">4. Responsive Spacing</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-800 p-2 sm:p-4 md:p-6 lg:p-8 fullhd:p-6 2k:p-8 rounded-lg">
            <p>Traditional responsive padding</p>
          </div>
          
          <div className="bg-gray-800 p-fluid-md rounded-lg">
            <p>Fluid padding (scales smoothly)</p>
          </div>
        </div>
      </section>

      {/* Example 5: Responsive Images */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">5. Responsive Images</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Fixed aspect ratio</h3>
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">16:9 Aspect Ratio</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Responsive sizing</h3>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-gray-800 rounded-lg p-8">
              <p className="text-gray-400">Responsive max-width</p>
            </div>
          </div>
        </div>
      </section>

      {/* Example 6: Best Practices Summary */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">6. Best Practices</h2>
        
        <div className="bg-gray-800 rounded-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">DO:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Use relative units (rem, em, %) instead of fixed pixels</li>
              <li>Design mobile-first (start with smallest screen)</li>
              <li>Test on actual devices, not just browser resize</li>
              <li>Use CSS Grid and Flexbox for layouts</li>
              <li>Consider touch targets for mobile (min 44x44px)</li>
              <li>Use viewport meta tag for proper mobile rendering</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">DON'T:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Use fixed pixel widths for containers</li>
              <li>Forget about landscape orientation</li>
              <li>Assume everyone has a high-resolution screen</li>
              <li>Neglect testing on different screen sizes</li>
              <li>Use text smaller than 16px on mobile</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}