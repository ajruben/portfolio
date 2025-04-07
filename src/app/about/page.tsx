'use client'; // Required for hooks and event handlers

import React from 'react';
import FadeInStagger from '@/components/FadeInStagger';
import WordFadeIn from '@/components/WordFadeIn';
import { motion } from 'framer-motion';

// --- Assume CSS variables from Step 1 are added ---

// Define the structure for each journey phase
interface JourneyPhase {
  id: string;
  title: string;
  content: string; // Placeholder for now
}

// Define the journey phases data
const journeyPhases: JourneyPhase[] = [
  { id: 'origin', title: 'Origin: Goeree-Overflakkee', content: 'My roots are on the island of Goeree-Overflakkee...' },
  { id: 'bachelor', title: 'Bachelor Studies: Physics at Utrecht University', content: 'Driven by curiosity, I pursued Physics...' },
  { id: 'internship', title: 'Internship: ASML', content: 'Gained valuable industry experience at ASML...' },
  { id: 'masters', title: 'Master Studies: Applied Data Science', content: 'Deepened my expertise in data...' },
  { id: 'current-job', title: 'Current Role: Geo IT Developer/Consultant at DBVision', content: 'Applying my skills in the Geo IT domain...' },
];

// About page component
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

  // Function to handle smooth scrolling
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    // Main container for vertical sections
    <div className="flex flex-col">

      {/* --- Section 1: Existing About Content --- */}
      <section id="about-top" className="min-h-screen flex flex-col items-center p-4 md:p-8 pt-16 pb-16 text-center">
        {/* ... (Top Content Area) ... */}
         <div className="max-w-3xl w-full">
          <FadeInStagger staggerDelay={500} animationDuration={1500}>
            <h1 className="text-3xl font-bold mb-4">About Me</h1>
            <p className="mb-4">
              With my background in Physics BSc. and Applied Data Science MSc., coupled with my experience and interest in programming and GIS, I have done many projects that I am passionate to share. On this website I aim to both demonstrate my experience, and also to track the things I have learnt.
            </p>
          </FadeInStagger>
        </div>

        {/* ... (Centered Poem Area) ... */}
        <div className="flex-grow flex flex-col justify-center items-center w-full max-w-3xl my-8">
          <div className="inline-block p-6 bg-gray-100 dark:bg-gray-900 rounded-md text-center shadow-md">
            <WordFadeIn
              text={poem}
                  wordDelay={300}
                  lineDelay={2000}
                  animationDuration={1500}
                  className="text-lg italic text-gray-500 dark:text-gray-300"
                />
              </div>
        </div>

        {/* ... (Skills/Tech Stack Area) ... */}
        <div className="max-w-3xl w-full mb-8">
          <FadeInStagger staggerDelay={150} animationDuration={400}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left md:text-center">
              <div className="md:text-center">
                <h2 className="text-2xl font-semibold mb-2">Skills</h2>
                <FadeInStagger as="ul" className="list-disc list-inside mb-4 text-left mx-auto md:inline-block" staggerDelay={150} animationDuration={400}>
                  <li>Python</li> <li>GIS</li> <li>Physics</li> <li>Git & GitHub</li>
                </FadeInStagger>
              </div>
              <div className="md:text-center">
                <h2 className="text-2xl font-semibold mb-2">Website Tech Stack</h2>
                <FadeInStagger as="ul" className="list-disc list-inside text-left mx-auto md:inline-block" staggerDelay={150} animationDuration={400}>
                  <li>React / Next.js</li> <li>Node.js</li> <li>TypeScript</li> <li>Tailwind CSS</li>
                </FadeInStagger>
              </div>
            </div>
          </FadeInStagger>
        </div>


        {/* --- Invitation and Scroll Down Arrow --- */}
        <motion.div
           className="mt-16 text-center"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <div className="inline-block p-4 -translate-y-2 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700 overflow-hidden">
            {/* Apply color animation using CSS variables */}
            <motion.p
              // Use the CSS class that applies the base color variable
              // Remove specific Tailwind color classes (text-gray-700 dark:text-gray-200)
              className="journey-text-element text-base font-medium tracking-wide mb-3"
              animate={{
                  // Animate the color property using the CSS variable values
                  color: [
                      "var(--journey-text-color-base)",   // Start with base color
                      "var(--journey-text-color-shadow)", // Transition to shadow color
                      "var(--journey-text-color-base)"    // Return to base color
                  ]
              }}
              transition={{
                  duration: 0.5,        // Duration for one sweep (base -> shadow -> base)
                  repeat: Infinity,     // Repeat forever
                  repeatType: "loop",   // Loop the sequence
                  ease: "easeInOut",    // Smooth the color change
                  repeatDelay: 4,       // Wait 4 seconds between sweeps
                  delay: 1.5            // Initial delay after fade-in
               }}
            >
              Discover my journey
            </motion.p>
            {/* Button with intermittent jump */}
            <motion.button
              onClick={() => scrollToSection(journeyPhases[0].id)}
              aria-label="Scroll down to journey"
              className="p-2 rounded-full text-blue-800 dark:text-blue-200 bg-white/50 dark:bg-black/30 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-black/50 ring-1 ring-inset ring-blue-500/20 dark:ring-blue-400/30 hover:ring-blue-500/40 dark:hover:ring-blue-400/50 hover:scale-110 transform transition-all duration-300 ease-out"
              animate={{ y: [0, -12, 0] }}
              transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  times: [0, 0.06, 0.1],
                  delay: 1.0
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </motion.button>
          </div>
        </motion.div> {/* End of fade-in wrapper */}
      </section>

      {/* --- Journey Sections --- */}
      {/* ... (Journey sections remain the same) ... */}
        {journeyPhases.map((phase, index) => (
        <section
          key={phase.id}
          id={phase.id}
          className={`min-h-screen flex flex-col justify-center items-center p-4 md:p-8 relative ${
            index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
          }`}
        >
          <div className="max-w-3xl w-full text-center">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }} className="text-3xl font-bold mb-6">
              {phase.title}
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg text-gray-700 dark:text-gray-300">
              {phase.content}
            </motion.p>
          </div>
          {index < journeyPhases.length - 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => scrollToSection(journeyPhases[index + 1].id)}
                aria-label={`Scroll down to ${journeyPhases[index + 1].title}`}
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                   <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </div>
          )}
        </section>
      ))}

    </div> // Close main container
  );
}