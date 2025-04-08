'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css'; // Import KaTeX CSS

interface KatexRendererProps {
  latexString: string;
  displayMode?: boolean; // Use displayMode for block equations
  className?: string; // Allow passing custom classes
}

const KatexRenderer: React.FC<KatexRendererProps> = ({
  latexString,
  displayMode = false, // Default to inline
  className = '',
}) => {
  const renderedHtml = useMemo(() => {
    try {
      // Replace newline characters from template literals/strings with LaTeX line breaks \\
      // Also handle escaped newlines if necessary
      const formattedLatex = latexString.replace(/\\n|\n/g, '\\\\');

      return katex.renderToString(formattedLatex, {
        throwOnError: false, // Don't throw errors, display fallback
        displayMode: displayMode,
        output: 'html', // Ensure HTML output
        // Add any KaTeX options you need, e.g., macros
      });
    } catch (error) {
      console.error('KaTeX rendering error:', error);
      return `<span style="color: red;">Error rendering LaTeX</span>`; // Fallback
    }
  }, [latexString, displayMode]);

  // Use a span for inline and div for display mode, apply custom className
  const Tag = displayMode ? 'div' : 'span';

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export default KatexRenderer;
