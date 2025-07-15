'use client';
import React, { useState, useEffect, useRef } from 'react';

interface Section {
  id: string;
  title: string;
}

interface JourneyTimelineProps {
  sections: Section[];
  scrollToSection: (id: string) => void;
  activeSection: string | null; // Accept activeSection as prop
  setActiveSection: (id: string | null) => void; // Accept setter as prop
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  sections,
  scrollToSection,
  activeSection,    // Use prop
  setActiveSection, // Use prop
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Removed internal activeSection state
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [isMounted, setIsMounted] = useState(false); // State for mount animation

  // ---- Intersection Observer Setup ----
  useEffect(() => {
    if (observerRef.current) {
      Object.values(sectionRefs.current).forEach((el) => {
        if (el) observerRef.current?.unobserve(el);
      });
    }
    sectionRefs.current = {};

    sections.forEach((section) => {
      try {
        const element = document.getElementById(section.id);
        sectionRefs.current[section.id] = element;
      } catch (e) {
        console.error(`Invalid ID for getElementById: ${section.id}`, e);
        sectionRefs.current[section.id] = null;
      }
    });

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Filter for intersecting entries first
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);

      if (intersectingEntries.length > 0) {
        // Sort intersecting entries by intersection ratio (descending)
        intersectingEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        // The entry with the highest ratio is the first one
        const bestEntry = intersectingEntries[0];

        // bestEntry is guaranteed to exist here because intersectingEntries.length > 0
        const targetElement = bestEntry.target;
        if (targetElement && targetElement.id) {
          setActiveSection(targetElement.id);
        }
      }
      // If no entries are intersecting, activeSection remains unchanged
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: [0, 0.1, 0.2, 0.5, 1],
    });

    const currentObserver = observerRef.current;
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) currentObserver.observe(el);
    });

    return () => {
      if (currentObserver) {
        Object.values(sectionRefs.current).forEach((el) => {
          if (el) currentObserver.unobserve(el);
        });
        currentObserver.disconnect();
        observerRef.current = null;
      }
    };
  }, [sections, setActiveSection]); // Added setActiveSection to dependencies

  // ---- Mount Fade-in Effect ----
  useEffect(() => {
    // Set mounted to true after a short delay to trigger the fade-in
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100); // 100ms delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Empty dependency array ensures this runs only once on mount

  // ---- Layout Constants ----
  const paddingTop = 20;
  const paddingBottom = 40;
  const nodeRadius = 14;
  const strokeWidth = 4;

  // Adjust vertical spacing to fill the available height better
  const verticalSpacing = 180; // Reduced to fit content better in 80vh

  // Widen the SVG so text has room. We’ll fill the container, so just keep a sensible ratio:
  const svgWidth = 400; // Increase width again
  const textPadding = 20; // Increase padding again
  const foreignObjectWidth = 200; // Decrease width again
  const nodeOffset = 150; // Increase node offset again

  // Center trunk
  const trunkX = 60; // Recalculate center
  const nodeXLeft = trunkX - nodeOffset;
  const nodeXRight = trunkX + nodeOffset;

  // Calculate height based on number of sections
  const contentHeight = (sections.length - 1) * verticalSpacing;
  const svgHeight = paddingTop + contentHeight + paddingBottom;

  // Colors
  const inactiveColor = '#4b5563';  // gray-600
  const activeColor   = '#3b82f6';  // blue-500
  const nodeFillInactive = '#0a0a0a';

  // Make text smaller and brighter
  const textClass = 'text-gray-200 text-sm'; // Reduced font size
  const activeTextClass = 'text-blue-400 text-sm'; // Reduced font size

  // A gentler wave
  const generateWavePathD = (
    startY: number,
    startX: number,
    endY: number,
    endX: number
  ) => {
    const deltaX = endX - startX;
    // Make the curve flatter by reducing the horizontal offset of control points
    const control1X = startX + deltaX * 0.1; // Changed 0.4 to 0.2
    const control1Y = startY + -50;
    const control2X = endX - deltaX * 0.1;   // Changed 0.4 to 0.2
    const control2Y = endY + 10;
    return `M ${startX},${startY} C ${control1X},${control1Y} ${control2X},${control2Y} ${endX},${endY}`;
  };

  return (
    // Add transition styles for fade-in effect
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out', // Adjust duration/easing as needed
      }}
    >
      <svg
        // Let the SVG fill the parent <div> in both directions
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        preserveAspectRatio="xMidYMin meet" // Align to top-middle
        // remove max-h-screen or any forced limiting:
        className="overflow-visible"
      >
        {/* Main trunk line */}
        <line
          x1={trunkX}
          y1={-200}
          x2={trunkX}
          y2={1700}
          stroke={inactiveColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          const currentStrokeColor = isActive ? activeColor : inactiveColor;
          const currentTextColorClass = isActive ? activeTextClass : textClass;

          const yPos = paddingTop + index * verticalSpacing;
          const isNodeLeft = index % 2 !== 0;
          const currentNodeX = isNodeLeft ? nodeXLeft : nodeXRight;

          // Determine path start coordinates
          const pathStartX = trunkX;
          // Start from the top for the first node, otherwise from the previous node's Y position
          const pathStartY = index === 0 ? paddingTop : paddingTop + (index - 1) * verticalSpacing;

          // Determine path end coordinates (connecting to the current node)
          const pathEndX = isNodeLeft ? currentNodeX + nodeRadius : currentNodeX - nodeRadius;
          const pathEndY = yPos; // Current node's Y position

          // Always generate a path, even for the first node
          const currentPathD = generateWavePathD(pathStartY, pathStartX, pathEndY, pathEndX);

          let foreignObjectX = isNodeLeft
            ? currentNodeX - nodeRadius - textPadding - foreignObjectWidth
            : currentNodeX + nodeRadius + textPadding;
          const textAlignClass = isNodeLeft ? 'text-right' : 'text-left';

          // Keep text from going off the SVG
          if (foreignObjectX < 0) {
            foreignObjectX = -315;
          } else if (foreignObjectX + foreignObjectWidth > svgWidth) {
            foreignObjectX = svgWidth - foreignObjectWidth + 35;
          }

          const foreignObjectHeight = 155; // Adjusted height (halfway between 60 and 250)
          const foreignObjectY = yPos - foreignObjectHeight / 2;

          return (
            <g key={section.id}>
              {currentPathD && (
                <path
                  d={currentPathD}
                  stroke={currentStrokeColor}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: 'stroke 0.3s ease-in-out' }}
                />
              )}

              <circle
                cx={currentNodeX}
                cy={yPos}
                r={nodeRadius}
                stroke={currentStrokeColor}
                strokeWidth={strokeWidth}
                fill={nodeFillInactive}
                style={{ transition: 'stroke 0.3s ease-in-out' }}
              />

              <foreignObject
                x={foreignObjectX}
                y={foreignObjectY}
                width={foreignObjectWidth}
                height={foreignObjectHeight}
                xmlns="http://www.w3.org/1999/xhtml"
              >
                <div
                  className={`p-2 sm:p-3 lg:p-4 font-medium text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl fullhd:text-2xl 2k:text-3xl cursor-pointer select-none ${textAlignClass} ${currentTextColorClass}`}
                  onClick={() => scrollToSection(section.id)}
                  style={{
                    transition: 'color 0.3s ease-in-out',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isNodeLeft ? 'flex-end' : 'flex-start',
                    wordBreak: 'break-word',
                    height: '100%',
                  }}
                >
                  {section.title}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default JourneyTimeline;
