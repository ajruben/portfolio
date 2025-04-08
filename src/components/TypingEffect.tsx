'use client'; // This component needs client-side hooks

import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo

interface TypingEffectProps {
  text: string;
  speed?: number; // Milliseconds delay between sentences
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 150 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Split text into sentences or meaningful chunks using useMemo
  const sentences = useMemo(() => {
    // This regex tries to split by sentence-ending punctuation followed by space or end of string.
    // It keeps the punctuation as part of the sentence.
    return text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
  }, [text]); // Dependency: only recalculate when text changes

  useEffect(() => {
    if (currentIndex < sentences.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + sentences[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      // Cleanup timer on component unmount or when currentIndex changes
      return () => clearTimeout(timer);
    }
  }, [currentIndex, sentences, speed]);

  // Render the text preserving line breaks from the original string
  return (
    <div style={{ whiteSpace: 'pre-line' }}>
      {displayedText}
    </div>
  );
};

export default TypingEffect;
