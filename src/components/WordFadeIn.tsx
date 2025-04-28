'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface WordFadeInProps {
  text: string;
  wordDelay?: number; // Delay between each word fading in (ms)
  lineDelay?: number; // Additional delay at the end of each line (ms) - Note: Not fully implemented in current logic
  animationDuration?: number; // Duration of the fade-in animation for each word (ms)
  startDelay?: number; // Delay before the *first* word starts animating (ms)
  className?: string; // Allow passing custom classes for styling
  renderAsHTML?: boolean; // New prop to control HTML rendering
}

const WordFadeIn: React.FC<WordFadeInProps> = ({
  text,
  wordDelay = 80,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lineDelay = 400, // Keep prop even if not fully used, disable lint rule for this line
  animationDuration = 300,
  startDelay = 0, // Default start delay to 0
  className = '',
  renderAsHTML = false, // Default to false
}) => {
  // --- Hooks must be called at the top level ---
  const [isMounted, setIsMounted] = useState(false); // State for mount/HTML fade animation
  const [visibleCount, setVisibleCount] = useState(0); // State for word count
  const [isStarted, setIsStarted] = useState(false); // State for word animation start delay

  // Memoize lines and totalWords calculation
  const lines = useMemo(() => text.split('<br />').map(line => line.trim().split(/\s+/).filter(word => word)), [text]);
  const totalWords = useMemo(() => lines.reduce((count, line) => count + line.length, 0), [lines]);

  // Effect for initial mount animation (used for HTML mode fade-in)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect to handle the word animation start delay
  useEffect(() => {
    // Only run if not rendering as HTML
    if (!renderAsHTML) {
      if (startDelay > 0) {
        const startTimer = setTimeout(() => {
          setIsStarted(true);
        }, startDelay);
        return () => clearTimeout(startTimer);
      } else {
        setIsStarted(true); // Start immediately if no delay
      }
    }
  }, [startDelay, renderAsHTML]); // Add renderAsHTML dependency

  // Effect to handle word-by-word animation *after* the start delay
  useEffect(() => {
    // Only run if not rendering as HTML, start delay passed, and words left
    if (!renderAsHTML && isStarted && visibleCount < totalWords) {
      const wordTimer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, wordDelay);
      return () => clearTimeout(wordTimer);
    }
  }, [isStarted, visibleCount, totalWords, wordDelay, renderAsHTML]); // Add renderAsHTML dependency


  // --- Conditional Rendering Logic ---
  if (renderAsHTML) {
    // Render HTML with a simple container fade-in
    return (
      <div
        className={className}
        style={{
          opacity: isMounted ? 1 : 0,
          transition: `opacity ${animationDuration}ms ease-out ${startDelay}ms`, // Apply duration and start delay
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  // --- Render word-by-word animation ---
  let wordCounter = 0;
  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {line.map((word, wordIndex) => {
            const currentWordIndex = wordCounter;
            wordCounter++;
            const isVisible = currentWordIndex < visibleCount;
            return (
              <span
                key={`${lineIndex}-${wordIndex}`}
                style={{
                  display: 'inline-block', // Needed for transform
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(5px)',
                  transition: `opacity ${animationDuration}ms ease-out, transform ${animationDuration}ms ease-out`,
                  // transitionDelay is implicitly handled by the order of visibility updates
                  marginRight: '0.3em', // Add space between words
                }}
              >
                {word}
              </span>
            );
          })}
          {/* Add a line break element if it's not the last line */}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WordFadeIn;
