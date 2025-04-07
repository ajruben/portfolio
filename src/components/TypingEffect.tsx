'use client'; // This component needs client-side hooks

import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number; // Milliseconds delay between sentences
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 150 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Split text into sentences or meaningful chunks.
  // This regex tries to split by sentence-ending punctuation followed by space or end of string.
  // It keeps the punctuation as part of the sentence.
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];

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
