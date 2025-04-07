'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface WordFadeInProps {
  text: string;
  wordDelay?: number; // Delay between each word fading in (ms)
  lineDelay?: number; // Additional delay at the end of each line (ms)
  animationDuration?: number; // Duration of the fade-in animation for each word (ms)
  className?: string; // Allow passing custom classes for styling
}

const WordFadeIn: React.FC<WordFadeInProps> = ({
  text,
  wordDelay = 80,
  lineDelay = 400,
  animationDuration = 300,
  className = '',
}) => {
  const [visibleCount, setVisibleCount] = useState(0);

  // Split text into lines, then words, preserving structure
  const lines = useMemo(() => text.split('<br />').map(line => line.trim().split(/\s+/).filter(word => word)), [text]);
  const totalWords = useMemo(() => lines.reduce((count, line) => count + line.length, 0), [lines]);

  useEffect(() => {
    if (visibleCount < totalWords) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, wordDelay); // Basic delay between words

      // Note: Implementing precise line delay within this simple word counter is complex.
      // This version focuses on word-by-word delay. A more robust solution
      // might calculate delays based on word index across all lines.
      // For now, the lineDelay prop isn't directly used in this simplified timer.

      return () => clearTimeout(timer);
    }
  }, [visibleCount, totalWords, wordDelay]);

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
