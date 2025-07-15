// Responsive design utilities for handling different screen sizes
import { useEffect, useState } from 'react';

// Breakpoint values (should match Tailwind config)
export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  fullhd: 1920,
  '2k': 2560,
  '4k': 3840,
} as const;

// Custom hook to detect current breakpoint
export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('');

  useEffect(() => {
    const getBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < breakpoints.xs) return 'mobile';
      if (width < breakpoints.sm) return 'xs';
      if (width < breakpoints.md) return 'sm';
      if (width < breakpoints.lg) return 'md';
      if (width < breakpoints.xl) return 'lg';
      if (width < breakpoints['2xl']) return 'xl';
      if (width < breakpoints.fullhd) return '2xl';
      if (width < breakpoints['2k']) return 'fullhd';
      if (width < breakpoints['4k']) return '2k';
      return '4k';
    };

    const handleResize = () => {
      setCurrentBreakpoint(getBreakpoint());
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return currentBreakpoint;
}

// Custom hook for responsive values
export function useResponsiveValue<T>(values: {
  mobile?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
  fullhd?: T;
  '2k'?: T;
  '4k'?: T;
  default: T;
}) {
  const breakpoint = useBreakpoint();
  
  return values[breakpoint as keyof typeof values] || values.default;
}

// Utility function to generate responsive Tailwind classes
export function responsiveClass(
  baseClass: string,
  sizes: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
    fullhd?: string;
    '2k'?: string;
  }
): string {
  const classes = [baseClass];
  
  Object.entries(sizes).forEach(([breakpoint, size]) => {
    if (size) {
      classes.push(`${breakpoint}:${size}`);
    }
  });
  
  return classes.join(' ');
}

// Typography scale generator for consistent responsive text
export const typography = {
  h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl fullhd:text-5xl 2k:text-6xl 4k:text-7xl',
  h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl fullhd:text-4xl 2k:text-5xl 4k:text-6xl',
  h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl fullhd:text-3xl 2k:text-4xl 4k:text-5xl',
  h4: 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl fullhd:text-2xl 2k:text-3xl 4k:text-4xl',
  body: 'text-sm sm:text-base md:text-base lg:text-lg fullhd:text-base 2k:text-lg 4k:text-xl',
  small: 'text-xs sm:text-sm md:text-sm lg:text-base fullhd:text-sm 2k:text-base 4k:text-lg',
  
  // Fluid typography versions
  fluidH1: 'text-fluid-4xl',
  fluidH2: 'text-fluid-3xl',
  fluidH3: 'text-fluid-2xl',
  fluidH4: 'text-fluid-xl',
  fluidBody: 'text-fluid-base',
  fluidSmall: 'text-fluid-sm',
};

// Spacing scale for consistent responsive spacing
export const spacing = {
  xs: 'p-2 sm:p-3 md:p-4 fullhd:p-3 2k:p-4 4k:p-5',
  sm: 'p-3 sm:p-4 md:p-6 fullhd:p-4 2k:p-6 4k:p-8',
  md: 'p-4 sm:p-6 md:p-8 fullhd:p-6 2k:p-8 4k:p-10',
  lg: 'p-6 sm:p-8 md:p-12 fullhd:p-8 2k:p-12 4k:p-16',
  xl: 'p-8 sm:p-12 md:p-16 fullhd:p-12 2k:p-16 4k:p-20',
  
  // Fluid spacing versions
  fluidXs: 'p-fluid-xs',
  fluidSm: 'p-fluid-sm',
  fluidMd: 'p-fluid-md',
  fluidLg: 'p-fluid-lg',
  fluidXl: 'p-fluid-xl',
};

// Container widths for consistent layouts
export const containers = {
  narrow: 'max-w-2xl lg:max-w-3xl xl:max-w-4xl fullhd:max-w-3xl 2k:max-w-4xl 4k:max-w-5xl',
  standard: 'max-w-4xl lg:max-w-5xl xl:max-w-6xl fullhd:max-w-5xl 2k:max-w-6xl 4k:max-w-7xl',
  wide: 'max-w-6xl lg:max-w-7xl xl:max-w-[90rem] fullhd:max-w-7xl 2k:max-w-[90rem] 4k:max-w-[110rem]',
};