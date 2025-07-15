'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ResponsiveShowcase only in development
const ResponsiveShowcase = dynamic(() => import('@/components/ResponsiveShowcase'), {
  ssr: false,
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Show responsive debug tool in development */}
      {process.env.NODE_ENV === 'development' && <ResponsiveShowcase />}
    </>
  );
}