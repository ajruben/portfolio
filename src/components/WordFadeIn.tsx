'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface WordFadeInProps {
  text: string;
  wordDelay?: number; // Delay between each word fading in (ms)
  lineDelay?: number; // Additional delay at the end of each line (ms) - Note: Not fully implemented in current logic
  animationDuration?: number; // Duration of the fade-in animation for each word (ms)
  startDelay?: number; // Delay before the *first* word starts animating (ms)
  className?: string; // Allow passing custom classes for styling
}

const WordFadeIn: React.FC<WordFadeInProps> = ({
  text,
  wordDelay = 80,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lineDelay = 400, // Keep prop even if not fully used, disable lint rule for this line
  animationDuration = 300,
  startDelay = 0, // Default start delay to 0
  className = '',
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false); // Track if the start delay has passed

  // Split text into lines, then words, preserving structure
  const lines = useMemo(() => text.split('<br />').map(line => line.trim().split(/\s+/).filter(word => word)), [text]);
  const totalWords = useMemo(() => lines.reduce((count, line) => count + line.length, 0), [lines]);

  // Effect to handle the initial start delay
  useEffect(() => {
    if (startDelay > 0) {
      const startTimer = setTimeout(() => {
        setIsStarted(true);
      }, startDelay);
      return () => clearTimeout(startTimer);
    } else {
      setIsStarted(true); // Start immediately if no delay
    }
  }, [startDelay]);

  // Effect to handle word-by-word animation *after* the start delay
  useEffect(() => {
    // Only run if the start delay has passed and there are words left to show
    if (isStarted && visibleCount < totalWords) {
      const wordTimer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, wordDelay);

      // Note: lineDelay logic remains complex with this structure.

      return () => clearTimeout(wordTimer);
    }
  }, [isStarted, visibleCount, totalWords, wordDelay]);


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
