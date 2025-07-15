'use client';

import React from 'react';
import { useBreakpoint } from '@/utils/responsive';

export default function ResponsiveShowcase() {
  const breakpoint = useBreakpoint();
  
  const getScreenInfo = () => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 0;
    const height = typeof window !== 'undefined' ? window.innerHeight : 0;
    
    const screenType = 
      width >= 3840 ? '4K' :
      width >= 2560 ? '2K (Your Dev Screen)' :
      width >= 1920 ? 'Full HD' :
      width >= 1536 ? '2XL' :
      width >= 1280 ? 'XL' :
      width >= 1024 ? 'Large' :
      width >= 768 ? 'Medium' :
      width >= 640 ? 'Small' :
      width >= 475 ? 'Extra Small' :
      'Mobile';
    
    return { width, height, screenType };
  };
  
  const [screenInfo, setScreenInfo] = React.useState(getScreenInfo());
  
  React.useEffect(() => {
    const handleResize = () => setScreenInfo(getScreenInfo());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg z-50 font-mono text-xs">
      <div className="mb-2 text-green-400">Responsive Debug</div>
      <div>Screen: {screenInfo.screenType}</div>
      <div>Size: {screenInfo.width} × {screenInfo.height}</div>
      <div>Breakpoint: {breakpoint}</div>
      
      <div className="mt-3 pt-3 border-t border-gray-600">
        <div className="text-yellow-400 mb-1">Text Sizes:</div>
        <div className="space-y-1 text-[10px]">
          <div>H1: text-2xl → 6xl</div>
          <div>H2: text-xl → 5xl</div>
          <div>Body: text-sm → lg</div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-600">
        <div className="text-blue-400 mb-1">Key Breakpoints:</div>
        <div className="space-y-1 text-[10px]">
          <div className={screenInfo.width >= 1920 ? 'text-green-400' : ''}>
            fullhd: 1920px {screenInfo.width >= 1920 && '✓'}
          </div>
          <div className={screenInfo.width >= 2560 ? 'text-green-400' : ''}>
            2k: 2560px {screenInfo.width >= 2560 && '✓'}
          </div>
        </div>
      </div>
    </div>
  );
}