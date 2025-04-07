// src/app/about/page.tsx
import type { Metadata } from "next";
import FadeInStagger from '@/components/FadeInStagger';
import WordFadeIn from '@/components/WordFadeIn'; // Import WordFadeIn

export const metadata: Metadata = { // Page-specific metadata
  title: "About Me - Ruben Swarts",
  description: "Ruben Swarts",
};

// About page component, default export to make file consumable by Next.js
export default function AboutPage() {
  // Define the poem text
  const poem = `I write, erase, rewrite<br />
Erase again, and then<br />
A thought takes shape.<br /><br />
I write, erase, rewrite<br />
A bug arises.<br /><br />
I write, erase, rewrite.<br />
Until at last<br />
The code speaks back.`;

  return (
    <FadeInStagger staggerDelay={500} animationDuration={1500}>
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="mb-4">
        With my background in Physics BSc. and Applied Data Science MSc., coupled with my experience and interest in programming and GIS, I have done many projects that I am passionate to share. On this website I aim to both demonstrate my experience, and also to track the things I have learnt.
      </p>

      {/* Add the poem section here */}
      <div className="flex justify-center my-8"> {/* Centered container */}
        <div className="inline-block p-6 bg-gray-100 dark:bg-gray-900 rounded-md text-center">
          <WordFadeIn
            text={poem}
            wordDelay={300}
            lineDelay={2000} // Keep delays from homepage or adjust as needed
            animationDuration={1500}
            className="text-lg italic text-gray-500 dark:text-gray-300"
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Skills</h2>
      {/* Use FadeInStagger with 'as="ul"' and apply list styles */}
      <FadeInStagger as="ul" className="list-disc list-inside mb-4" staggerDelay={150} animationDuration={400}>
        <li>Python</li>
        <li>GIS</li>
        <li>Physics</li>
        <li>Git & GitHub</li>
      </FadeInStagger>
      <h2 className="text-2xl font-semibold mb-2">Techstack of this website:</h2>
      {/* Use FadeInStagger with 'as="ul"' and apply list styles */}
      <FadeInStagger as="ul" className="list-disc list-inside" staggerDelay={150} animationDuration={400}>
        <li>React / Next.js</li>
        <li>Node.js</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
      </FadeInStagger>
    </FadeInStagger> // Close the outer wrapper
  );
}
