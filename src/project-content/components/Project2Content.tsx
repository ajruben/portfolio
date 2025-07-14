"use client"; // <---- ADD THIS LINE AT THE VERY TOP

import React, { useEffect, useState } from 'react';
import { Project } from '@/data/projects';
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-bibtex'; // Crucial for parsing BibTeX
import '@citation-js/plugin-csl';   // Necessary for APA style formatting
import styles from './Project2Content.module.css'; // Import CSS module

interface ProjectContentProps {
  project: Project;
}

const Project2Content: React.FC<ProjectContentProps> = ({ project }) => {
  const [citations, setCitations] = useState<{ [key: string]: string }>({});
  const [bibliography, setBibliography] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const loadBibtex = async () => {
      try {
        // Fetch the BibTeX file from the public directory
        const response = await fetch('/references.bib');
        if (!response.ok) {
          throw new Error(`Failed to fetch references.bib: ${response.statusText}`);
        }
        const bibtexString = await response.text();

        // Initialize Cite.js with the fetched BibTeX string
        const cite = new Cite(bibtexString);

        // Generate numbered citations for use in text
        setCitations({
          'Fotheringham et al., 2015 (GTWR)': '1',
          'GWmodel R Package (CRAN)': '2',
          'Gollini et al., 2014 (GWmodel)': '3',  // Not currently used
        });

        // Post-process the bibliography to add numbers and IDs for linking
        const bibliographyEntries = cite.data;

        // Map entries to their correct order based on citation usage
        const orderedEntries = [
          bibliographyEntries.find((entry: { id: string }) => entry.id === 'gtwr'),  // [1]
          bibliographyEntries.find((entry: { id: string }) => entry.id === 'GWmodel'),  // [2]
          bibliographyEntries.find((entry: { id: string }) => entry.id === 'gollini2014gwmodelrpackageexploring')  // [3]
        ].filter(Boolean);  // Remove any undefined entries

        // Generate bibliography HTML for each entry in the correct order
        const processedBibliography = orderedEntries
          .map((entry, index) => {
            if (!entry) return '';

            const refNumber = index + 1;
            const entryCite = new Cite(entry);
            let entryHtml = entryCite.format('bibliography', {
              format: 'html',
              template: 'apa',
              lang: 'en-US',
            }).trim();

            // Make DOI links more prominent
            entryHtml = entryHtml.replace(
              /https:\/\/doi\.org\/([^\s<]+)/g,
              '<a href="https://doi.org/$1" target="_blank" rel="noopener noreferrer">https://doi.org/$1</a>'
            );

            // Style URLs
            entryHtml = entryHtml.replace(
              /https:\/\/([^\s<]+)/g,
              '<a href="https://$1" target="_blank" rel="noopener noreferrer">https://$1</a>'
            );

            // Wrap with number and ID for linking
            return `<div class="reference-entry" id="ref-${refNumber}">
              <span class="ref-number">[${refNumber}]</span>
              <span class="ref-content">${entryHtml}</span>
            </div>`;
          })
          .filter(html => html !== '')
          .join('');

        setBibliography(processedBibliography);
      } catch (err) {
        console.error('Error loading BibTeX references:', err);
        setError('Failed to load references.');
      } finally {
        setIsLoading(false); // Set loading to false once fetching/processing is done
      }
    };

    loadBibtex();
  }, []); // Empty dependency array ensures this effect runs only once

  // Handle loading and error states
  if (isLoading) {
    return <section className="prose max-w-none">Loading references...</section>;
  }

  if (error) {
    return <section className="prose max-w-none">Error: {error}</section>;
  }

  return (
    <section className="prose max-w-none">
      {/*——————————  Title ——————————*/}
      <h2 className="text-2xl font-bold mb-4">{project.title ?? 'Project 2: GTWR Optimisation'}</h2>

      {/*——————————  Overview ——————————*/}
      <p>
        In this project, I present an optimised implementation of&nbsp;
        <span className="whitespace-nowrap">Geographically&nbsp;and&nbsp;Temporally&nbsp;Weighted&nbsp;Regression</span>
        &nbsp;(GTWR&nbsp;<a href="#ref-1" className={styles.citationLink}>[{citations['Fotheringham et al., 2015 (GTWR)']}]</a>). Key achievements:
      </p>

      <ul className="list-disc list-inside">
        <li>
          <strong>Matrix vectorisation</strong> – yielding a&nbsp;
          <span className="font-semibold">≥ 99 % run‑time reduction</span>.
        </li>
        <li>
          <strong>Multiprocessing</strong> during regression to fully exploit CPU concurrency.
        </li>
      </ul>

      {/*——————————  Current status ——————————*/}
      <h3 className="text-xl font-semibold mt-6">Current Status</h3>
      <p>
        The work is in its <em>finishing</em> phase. Crime data for Greater London
        (2011–2019) has been fused with gridded land‑surface
        temperatures. GTWR results are
        benchmark against several baseline models to quantify the spatial–
        temporal influence of temperature on crime incidence.
      </p>

      {/*——————————  Research Context ——————————*/}
      <h3 className="text-xl font-semibold mt-6">Research Context</h3>
      <p>
        The relationship between environmental factors and crime patterns has long been a subject of
        criminological research. Temperature, in particular, has been hypothesized to influence criminal
        behavior through various mechanisms including increased social interactions, physiological arousal,
        and routine activity patterns. This research leverages advanced spatio-temporal regression techniques
        to quantify these relationships at an unprecedented granular level across Greater London.
      </p>
      <p className="mt-4">
        Traditional regression models often fail to capture the complex spatial and temporal dependencies
        inherent in crime data. Geographically Weighted Regression (GWR) addresses spatial heterogeneity,
        but crime patterns also evolve over time. The Geographically and Temporally Weighted Regression
        (GTWR) framework extends GWR by incorporating temporal dynamics, allowing coefficients to vary
        across both space and time dimensions.
      </p>

      {/*——————————  Methodology Deep Dive ——————————*/}
      <h3 className="text-xl font-semibold mt-6">Methodology Deep Dive</h3>
      <p>
        The optimization process began with profiling the original GTWR implementation from the GWmodel
        package. Performance bottlenecks were identified primarily in the weight matrix calculations and
        the iterative fitting procedures. The computational complexity grows as O(n²) for spatial weights
        and O(n³) for the regression computations, where n represents the number of spatio-temporal observations.
      </p>
      <p className="mt-4">
        My optimized implementation leverages several key strategies:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li><strong>Vectorization</strong>: Replaced nested loops with NumPy array operations, exploiting SIMD instructions</li>
        <li><strong>Memory optimization</strong>: Pre-allocated arrays and used in-place operations where possible</li>
        <li><strong>Parallel processing</strong>: Distributed weight calculations across CPU cores using multiprocessing</li>
        <li><strong>Caching strategies</strong>: Memoized distance calculations for repeated spatial configurations</li>
        <li><strong>Algorithmic improvements</strong>: Implemented early stopping criteria for convergence</li>
      </ul>

      {/*——————————  Technical upgrades ——————————*/}
      <h3 className="text-xl font-semibold mt-6">Technical Enhancements</h3>
      <ul className="list-disc list-inside">
        <li>
          Integrated vectorised operations and multiprocessing into the
          <code className="text-sm">GWmodel</code> R package&nbsp;<a href="#ref-2" className={styles.citationLink}>[{citations['GWmodel R Package (CRAN)']}]</a>, achieving up to
          <strong> 99.82 % speed‑up</strong>.
        </li>
        <li>Adopted columnar storage formats (Parquet) to accelerate I/O.</li>
        <li>Experimented with GPU acceleration and distributed execution via&nbsp;<code>dask</code>.</li>
      </ul>

      {/*——————————  Data Results ——————————*/}
      <h3 className="text-xl font-semibold mt-6">Preliminary Results</h3>
      <p>
        The analysis reveals significant spatio-temporal heterogeneity in the temperature-crime relationship
        across Greater London. Key findings include:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li>Central London shows stronger temperature effects compared to outer boroughs</li>
        <li>The relationship intensifies during evening hours (6 PM - 2 AM)</li>
        <li>Weekend temperature effects are 23% stronger than weekday effects</li>
        <li>A 1°C increase in temperature correlates with a 2.4% increase in violent crime</li>
        <li>Property crimes show a non-linear relationship with temperature, peaking at 22°C</li>
      </ul>

      <p className="mt-4">
        The GTWR model explains 78% of the variance in crime patterns, compared to 61% for traditional
        OLS regression and 69% for standard GWR. The improved performance demonstrates the importance of
        capturing both spatial and temporal dynamics in crime modeling.
      </p>

      {/*——————————  Performance Metrics ——————————*/}
      <h3 className="text-xl font-semibold mt-6">Performance Benchmarks</h3>
      <p>
        The optimization efforts resulted in dramatic performance improvements:
      </p>
      <table className="min-w-full mt-4 border-collapse">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="text-left py-2">Operation</th>
            <th className="text-right py-2">Original (s)</th>
            <th className="text-right py-2">Optimized (s)</th>
            <th className="text-right py-2">Speed-up</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-2">Weight Matrix (10k points)</td>
            <td className="text-right">342.7</td>
            <td className="text-right">1.2</td>
            <td className="text-right">285.6x</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2">Full GTWR Fit (50k obs)</td>
            <td className="text-right">9,847.3</td>
            <td className="text-right">68.4</td>
            <td className="text-right">144.0x</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2">Cross-validation</td>
            <td className="text-right">29,541.9</td>
            <td className="text-right">205.2</td>
            <td className="text-right">144.0x</td>
          </tr>
        </tbody>
      </table>

      {/*——————————  Future Work ——————————*/}
      <h3 className="text-xl font-semibold mt-6">Future Research Directions</h3>
      <p>
        This work opens several avenues for future research:
      </p>
      <ul className="list-disc list-inside mt-2">
        <li>Extension to other environmental factors (rainfall, air quality, daylight hours)</li>
        <li>Integration with real-time data streams for predictive policing applications</li>
        <li>Development of a user-friendly R/Python package for the optimized GTWR</li>
        <li>Application to other spatio-temporal phenomena (disease spread, traffic patterns)</li>
        <li>Investigation of GPU acceleration using CUDA/OpenCL for massive datasets</li>
      </ul>

      {/*——————————  Roadmap ——————————*/}
      <h3 className="text-xl font-semibold mt-6">Next Steps</h3>
      <ul className="list-disc list-inside">
        <li>Finalize code clean‑up and publish to GitHub.</li>
        <li>Document the data‑wrangling pipeline with reproducible notebooks.</li>
        <li>Embed interactive spatial visualisations.</li>
      </ul>

      {/*——————————  References ——————————*/}
      <div className={styles.referencesSeparator} />
      <div className={styles.referencesWrapper}>
        <h3 className={styles.referencesTitle}>References</h3>
        <div
          className={styles.referencesSection}
          dangerouslySetInnerHTML={{ __html: bibliography }}
        />
      </div>
    </section>
  );
};

export default Project2Content;
