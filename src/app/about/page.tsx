'use client';

import React, { useState } from 'react';
import FadeInStagger from '@/components/FadeInStagger';
import WordFadeIn from '@/components/WordFadeIn';
import JourneyTimeline from '@/components/JourneyTimeline';
import { motion } from 'framer-motion';

interface JourneyPhase {
  id: string;
  title: string;
  content: string;
  sidebarContent?: string;
}

const journeyPhases: JourneyPhase[] = [
  {
    id: 'origin',
    title: 'Origin',
    content: 'My roots are on the island of Goeree-Overflakkee...',
    sidebarContent: `Latitude: 51.75° N<br />Longitude: 4.10° E`,
  },
  {
    id: 'bachelor',
    title: 'BSc Physics',
    content: 'Driven by curiosity, I pursued Physics...',
    sidebarContent: `// Einstein Field Equations (EFE):<br />
G<sub>μν</sub> ≡ R<sub>μν</sub> - ½ g<sub>μν</sub> R = (8πG / c<sup>4</sup>) T<sub>μν</sub><br /><br />
// Metric Perturbation:<br />
g<sub>μν</sub> ≈ η<sub>μν</sub> + h<sub>μν</sub>, &nbsp; |h<sub>μν</sub>| ≪ 1<br /><br />
// Linearized Field Equations (vacuum):<br />
□ h<sub>μν</sub> = 0<br /><br />
// Gravitational Wave Strain (TT gauge):<br />
h<sub>ij</sub><sup>TT</sup>(t, z) = h<sub>+</sub>(t - z/c) e<sub>ij</sub><sup>+</sup> + h<sub>×</sub>(t - z/c) e<sub>ij</sub><sup>×</sup><br /><br />
// Gauge Conditions (Lorenz):<br />
∂<sup>μ</sup> h<sub>μν</sub> = 0`,
  },
  {
    id: 'internship',
    title: 'Internship ASML',
    content: 'Gained valuable industry experience at ASML...',
    sidebarContent: `% [REDACTED] Simulation<br />[REDACTED] = [REDACTED] * [REDACTED];<br />[REDACTED] = [REDACTED]([REDACTED]);<br /><br />for [REDACTED] = 1:[REDACTED]<br />  [REDACTED] = [REDACTED] + [REDACTED];<br />  if [REDACTED] > [REDACTED]<br />    [REDACTED] = [REDACTED]([REDACTED], '[REDACTED]');<br />  else<br />    [REDACTED]([REDACTED]);<br />  end<br />end<br /><br />disp('[REDACTED] complete.');`,
  },
  {
    id: 'masters',
    title: 'MSc Data Science',
    content: 'Data is what you get. Insight is what you build.',
    sidebarContent: `import pandas as pd<br />import numpy as np<br />from sklearn.model_selection import train_test_split<br />from sklearn.ensemble import RandomForestClassifier<br /><br /># Load data<br />df = pd.read_csv('data.csv')<br /><br /># Preprocess...<br />X_train, X_test, y_train, y_test = train_test_split(X, y)<br /><br /># Train model<br />model = RandomForestClassifier(n_estimators=100)<br />model.fit(X_train, y_train)`,
  },
  {
    id: 'current-job',
    title: 'Geo IT Dev',
    content: 'Applying my skills in the Geo IT domain...',
    // Updated Geo IT content with Python class example
    sidebarContent: `class GeoPoint:<br />&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, lat, lon, name=""):<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.latitude = lat<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.longitude = lon<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;def to_geojson(self):<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return {<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"type": "Point",<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"coordinates": [self.longitude, self.latitude]<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br /><br /># Example<br />amsterdam = GeoPoint(52.379, 4.900, "Amsterdam")<br />print(amsterdam.to_geojson())`,
  },
];

export default function AboutPage() {
  const allSections = [
    { id: 'about-top', title: 'Intro' },
    ...journeyPhases,
  ];

  const [activeSection, setActiveSection] = useState<string | null>(
    allSections[0]?.id || null
  );

  const poem = `I write, erase, rewrite<br />
Erase again, and then<br />
A thought takes shape.<br /><br />
I write, erase, rewrite<br />
A bug arises.<br /><br />
I write, erase, rewrite.<br />
Until at last<br />
The code speaks back.`;

  // Smooth scrolling
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    // Removed overflow from here. Let the page/window handle scrolling.
    <div className="flex flex-row min-h-screen">
      {/* --- Timeline (Sticky) --- */}
      <div
        className="
          w-64 xl:w-80
          flex-shrink-0
          sticky top-16
          hidden md:block
          dark:border-gray-700
          p-0 pr-8
          -translate-x-35
          // This container is no longer scrolled; it's pinned relative to the viewport
        "
        style={{ height: 'calc(100vh - 4rem)' }} // or something that suits your layout
      >
        <FadeInStagger staggerDelay={500} animationDuration={1500}>
          <JourneyTimeline
            sections={allSections}
            scrollToSection={scrollToSection}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </FadeInStagger>
      </div>

      {/* --- Main Content (No overflow-y-auto) --- */}
      <div className="flex-grow px-4 md:px-8 lg:px-16">
        {/* Intro / About Section */}
        <section
          id="about-top"
          className="min-h-screen flex flex-col items-center p-4 md:p-8 pt-16 pb-16 text-center"
        >
          {/* Use FadeInStagger for the rest, but remove second fade from the button */}
          <FadeInStagger
            staggerDelay={300}
            animationDuration={500}
            className="w-full flex flex-col items-center"
          >
            <div className="max-w-3xl w-full">
              <h1 className="text-3xl font-bold mb-4">About Me</h1>
              <p className="mb-4">
                With my background in Physics BSc. and Applied Data Science MSc., coupled
                with my experience and interest in programming and GIS ...
              </p>
            </div>

            <div className="flex-grow flex flex-col justify-center translate-y-20 items-center w-full max-w-3xl my-8">
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

            {/* Skills + Tech Stack */}
            <div className="max-w-3xl w-full mb-8 translate-y-45">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left md:text-center">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Skills</h2>
                  <FadeInStagger
                    as="ul"
                    className="list-disc list-inside mb-4 text-left mx-auto md:inline-block"
                    staggerDelay={150}
                    animationDuration={400}
                  >
                    <li>Python</li>
                    <li>GIS</li>
                    <li>Physics</li>
                    <li>Git & GitHub</li>
                  </FadeInStagger>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Website Tech Stack</h2>
                  <FadeInStagger
                    as="ul"
                    className="list-disc list-inside text-left mx-auto md:inline-block"
                    staggerDelay={150}
                    animationDuration={400}
                  >
                    <li>React / Next.js</li>
                    <li>Node.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                  </FadeInStagger>
                </div>
              </div>
            </div>

            {/* Single animation on "Discover my journey" */}
            <div className = "translate-y-95"/* no second fade in/out; just one animation or none */>
              <p className="text-base font-medium tracking-wide  mb-3">
                Discover my journey
              </p>
              <motion.button
                onClick={() => scrollToSection(journeyPhases[0].id)}
                aria-label="Scroll down to journey"
                className="p-2 rounded-full text-blue-800 dark:text-blue-200 bg-white/50 dark:bg-black/30 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-black/50 ring-1 ring-inset ring-blue-500/20 dark:ring-blue-400/30 hover:ring-blue-500/40 dark:hover:ring-blue-400/50 hover:scale-110 transform transition-all duration-300 ease-out"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  times: [0, 0.06, 0.1],
                  delay: 1.0,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5
                       M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </motion.button>
            </div>
          </FadeInStagger>
        </section>

        {/* Journey Phases */}
        {journeyPhases.map((phase, index) => (
          <section
            key={phase.id}
            id={phase.id}
            className={`min-h-screen flex flex-col justify-center items-center p-4 md:p-8 relative ${
              index % 2 === 0
                ? 'bg-gray-50 dark:bg-gray-800'
                : 'bg-white dark:bg-gray-900'
            }`}
          >
            <div className="max-w-5xl w-full md:flex md:flex-row md:items-start md:justify-center">
              {/* Main content */}
              <div className="md:w-2/3 text-center md:text-left">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-bold mb-6"
                >
                  {phase.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-gray-700 dark:text-gray-300"
                >
                  {phase.content}
                </motion.p>
              </div>

              {/* Conditionally show sidebar text if active */}
              {phase.sidebarContent && activeSection === phase.id && (
                <div className="md:w-1/3 md:pl-12 mt-8 translate-x-100 md:mt-0 flex justify-center md:justify-start">
                  <div className="text-left w-full">
                    <WordFadeIn
                      key={phase.id}
                      text={phase.sidebarContent}
                      wordDelay={150}
                      lineDelay={1000}
                      animationDuration={1500}
                      className="font-mono text-x text-gray-500 dark:text-gray-400 whitespace-pre-wrap"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Scroll-down button (to next) */}
            {index < journeyPhases.length - 1 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={() => scrollToSection(journeyPhases[index + 1].id)}
                  aria-label={`Scroll down to ${journeyPhases[index + 1].title}`}
                  className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5
                         M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
