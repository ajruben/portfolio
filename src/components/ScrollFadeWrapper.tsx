"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './ScrollFadeWrapper.module.css';

interface ScrollFadeWrapperProps {
  children: React.ReactNode;
  fadeHeight?: number; // Height of the fade gradient in pixels
}

const ScrollFadeWrapper: React.FC<ScrollFadeWrapperProps> = ({ 
  children, 
  fadeHeight = 150 
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const element = contentRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      
      // Show top fade if scrolled down
      setShowTopFade(scrollTop > 10);
      
      // Show bottom fade if not at bottom
      setShowBottomFade(scrollTop < scrollHeight - clientHeight - 10);
    };

    const element = contentRef.current;
    if (element) {
      handleScroll(); // Initial check
      element.addEventListener('scroll', handleScroll);
      
      // Also check on resize
      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(element);
      
      return () => {
        element.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div 
        className={`${styles.fadeTop} ${showTopFade ? styles.visible : ''}`}
        style={{ height: `${fadeHeight}px` }}
      />
      
      <div ref={contentRef} className={styles.content}>
        {children}
      </div>
      
      <div 
        className={`${styles.fadeBottom} ${showBottomFade ? styles.visible : ''}`}
        style={{ height: `${fadeHeight}px` }}
      />
    </div>
  );
};

export default ScrollFadeWrapper; 