'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ResponsiveTestPage() {
  const [screenInfo, setScreenInfo] = useState({
    width: 0,
    height: 0,
    type: '',
    scale: 1
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale = window.devicePixelRatio || 1;
      
      let type = '';
      if (width >= 3840) type = '4K (3840px+)';
      else if (width >= 2560) type = '2K/QHD (2560px) - Your Dev Screen';
      else if (width >= 1920) type = 'Full HD (1920px) - Target Screen';
      else if (width >= 1536) type = '2XL (1536px)';
      else if (width >= 1280) type = 'XL (1280px)';
      else if (width >= 1024) type = 'LG (1024px)';
      else if (width >= 768) type = 'MD (768px)';
      else if (width >= 640) type = 'SM (640px)';
      else if (width >= 475) type = 'XS (475px)';
      else type = 'Mobile (< 475px)';
      
      setScreenInfo({ width, height, type, scale });
    };
    
    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);
    return () => window.removeEventListener('resize', updateScreenInfo);
  }, []);

  const textSamples = [
    { 
      name: 'Hero Title', 
      original: 'text-4xl',
      responsive: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl fullhd:text-4xl 2k:text-5xl 4k:text-6xl'
    },
    { 
      name: 'Section Title', 
      original: 'text-3xl',
      responsive: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl fullhd:text-3xl 2k:text-4xl 4k:text-5xl'
    },
    { 
      name: 'Subsection Title', 
      original: 'text-2xl',
      responsive: 'text-lg sm:text-xl md:text-2xl lg:text-3xl fullhd:text-2xl 2k:text-3xl 4k:text-4xl'
    },
    { 
      name: 'Body Text', 
      original: 'text-base',
      responsive: 'text-sm sm:text-base md:text-lg fullhd:text-base 2k:text-lg 4k:text-xl'
    },
    { 
      name: 'Small Text', 
      original: 'text-sm',
      responsive: 'text-xs sm:text-sm md:text-base fullhd:text-sm 2k:text-base 4k:text-lg'
    }
  ];

  const layoutExamples = [
    {
      name: 'Container',
      original: 'max-w-7xl',
      responsive: 'max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl fullhd:max-w-5xl 2k:max-w-7xl'
    },
    {
      name: 'Padding',
      original: 'p-8',
      responsive: 'p-4 sm:p-6 md:p-8 lg:p-10 fullhd:p-8 2k:p-10 4k:p-12'
    },
    {
      name: 'Gap',
      original: 'gap-8',
      responsive: 'gap-4 sm:gap-6 md:gap-8 lg:gap-10 fullhd:gap-8 2k:gap-10 4k:gap-12'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      {/* Fixed info panel */}
      <div className="fixed top-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
        <h3 className="font-bold mb-2">Screen Info</h3>
        <p className="text-sm">Width: {screenInfo.width}px</p>
        <p className="text-sm">Height: {screenInfo.height}px</p>
        <p className="text-sm">Type: {screenInfo.type}</p>
        <p className="text-sm">DPR: {screenInfo.scale}x</p>
        <div className="mt-2 pt-2 border-t border-blue-500">
          <p className="text-xs opacity-80">
            {screenInfo.width >= 2560 ? '✅ Dev Screen' : ''}
            {screenInfo.width >= 1920 && screenInfo.width < 2560 ? '🎯 Full HD Target' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-block mb-8 text-blue-400 hover:text-blue-300">
          ← Back to Home
        </Link>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl fullhd:text-4xl 2k:text-5xl 4k:text-6xl font-bold mb-8">
          Responsive Design Test Page
        </h1>
        
        {/* Typography Examples */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-blue-400">
            Typography Scaling
          </h2>
          <div className="space-y-8">
            {textSamples.map((sample) => (
              <div key={sample.name} className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-400">{sample.name}</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Original (Fixed):</p>
                    <p className={`${sample.original} mb-2`}>The quick brown fox jumps</p>
                    <code className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                      {sample.original}
                    </code>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Responsive:</p>
                    <p className={`${sample.responsive} mb-2`}>The quick brown fox jumps</p>
                    <code className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded break-all">
                      {sample.responsive}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Layout Examples */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-blue-400">
            Layout & Spacing
          </h2>
          <div className="space-y-8">
            {layoutExamples.map((example) => (
              <div key={example.name} className="border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-400">{example.name}</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Original:</p>
                    <div className={`${example.original} bg-gray-800 p-4 rounded`}>
                      <div className="bg-gray-700 p-4 rounded">
                        Content with {example.name}
                      </div>
                    </div>
                    <code className="text-xs text-gray-500 mt-2 inline-block">{example.original}</code>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Responsive:</p>
                    <div className={`${example.responsive} bg-gray-800 rounded`}>
                      <div className="bg-gray-700 p-4 rounded">
                        Content with responsive {example.name}
                      </div>
                    </div>
                    <code className="text-xs text-gray-500 mt-2 inline-block break-all">{example.responsive}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-blue-400">
            Quick Reference
          </h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Tailwind Breakpoints:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><span className="text-gray-400">xs:</span> 475px</div>
              <div><span className="text-gray-400">sm:</span> 640px</div>
              <div><span className="text-gray-400">md:</span> 768px</div>
              <div><span className="text-gray-400">lg:</span> 1024px</div>
              <div><span className="text-gray-400">xl:</span> 1280px</div>
              <div><span className="text-gray-400">2xl:</span> 1536px</div>
              <div><span className="text-gray-400">fullhd:</span> 1920px</div>
              <div><span className="text-gray-400">2k:</span> 2560px</div>
            </div>
            
            <h3 className="text-lg font-semibold mb-4 mt-6">Responsive Pattern:</h3>
            <code className="text-sm bg-gray-900 p-3 rounded block">
              text-base sm:text-lg md:text-xl lg:text-2xl fullhd:text-xl 2k:text-2xl 4k:text-3xl
            </code>
          </div>
        </section>

        {/* Test Links */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-blue-400">
            Test Your Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <h3 className="font-semibold mb-2">Home Page</h3>
              <p className="text-sm text-gray-400">Test the main landing page</p>
            </Link>
            <Link href="/about" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <h3 className="font-semibold mb-2">About Page</h3>
              <p className="text-sm text-gray-400">Check the responsive timeline</p>
            </Link>
            <Link href="/projects" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <h3 className="font-semibold mb-2">Projects Page</h3>
              <p className="text-sm text-gray-400">View project cards scaling</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}