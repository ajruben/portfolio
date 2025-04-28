// src/components/CodeBlock.tsx
'use client'; // Required for using react-syntax-highlighter

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Or choose another theme

interface CodeBlockProps {
  code: string;
  language?: string; // Optional language prop, defaults to 'python'
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'python' }) => {
  return (
    <div className="my-4 rounded-md overflow-hidden text-sm"> {/* Added text-sm for smaller font */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus} // Apply the chosen theme
        showLineNumbers // Optionally show line numbers
        wrapLines={true} // Optionally wrap long lines
        customStyle={{ margin: 0, padding: '1rem' }} // Remove default margin and add padding
      >
        {code.trim()} {/* Trim whitespace */}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
