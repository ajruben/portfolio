import React from 'react';
import Image from 'next/image';
import { Project } from '@/data/projects'; // Assuming Project type is exported
import ProjectImageCarousel from '@/components/ProjectImageCarousel'; // Import the carousel component

interface ProjectContentProps {
  project: Project; // Receive project data as a prop
}

// Revert back to using a modal state
const Project1Content: React.FC<ProjectContentProps> = ({ project }) => {

  // Define image sets for carousels - now arrays of strings
  const etlImageSrcs = [
    '/images_project1/shp_2_gpkg.png',
    '/images_project1/resultaat_shp_2_gpkg.png',
  ];

  const splittingToolImageSrcs = [
    '/images_project1/snijtool_start.png',
    '/images_project1/snijtool_start2.png',
    '/images_project1/snijtool_start3.png',
    '/images_project1/snijtool_start4.png',
  ];

  const heightInterpolationImageSrcs = [
    '/images_project1/hoogte_ipol1.png',
    '/images_project1/hoogte_ipol2.png',
    '/images_project1/hoogte_ipol3.png',
  ];

   const validationImageSrcs = [
    '/images_project1/validate_model.png',
  ];


  return (
    <div className="space-y-8 text-gray-300">
                              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl fullhd:text-3xl 2k:text-4xl font-bold border-b border-gray-600 pb-3 text-gray-100">
        QGIS Plugin for Acoustic Modeling & Analysis (dBvision)
      </h3>

      <p className="text-lg leading-relaxed">
        Developed and maintained the "QdB" QGIS plugin and an associated Python package (`dBvisionPackage`) for dBvision. This project established a comprehensive geospatial data pipeline tailored for acoustic consultants, streamlining their workflow for noise modeling, analysis, and compliance with Dutch environmental regulations (SWUNG/WMB) using the RIVM 'Rekenhart Geluid' calculation engine.
      </p>

      <div className="my-4 flex justify-center">
        <figure>
          <Image
            src="/images_project1/QdB.jpg"
            alt="QdB Plugin Interface in QGIS"
            width={700}
            height={450}
            className="rounded-md shadow-lg"
          />
          <figcaption className="text-center text-sm text-gray-600 mt-2">
            The QdB plugin dock widget within QGIS, organizing the workflow.
          </figcaption>
        </figure>
      </div>

      <h4 className="text-2xl font-semibold mt-10 mb-4 text-gray-100">Key Contributions & Technical Features:</h4>

      {/* Use styled containers for sections */}
      <section className="space-y-6">
        {/* Section 1: ETL */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h5 className="text-xl font-semibold mb-3 text-cyan-400">Geospatial Data Engineering & ETL Pipeline</h5>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Designed and implemented a specialized GeoPackage-based data model (&quot;dBvisionDM&quot;) optimized for acoustic features, utilizing &quot;sqlite3&quot; and &quot;osgeo.ogr&quot; (GDAL).</li>
            <li>Engineered robust ETL (Extract, Transform, Load) processes within the &quot;dBvisionPackage&quot; to ingest data from diverse sources (Shapefiles, GML, Geomilieu, CVGG, WinHavik).</li>
            <li>Developed complex data transformations using JSON-defined profiles for schema mapping, coded value translation, and unit conversions between external standards and the internal model.</li>
            <li>Ensured data integrity by programmatically creating and enforcing the data model structure (tables, fields, data types, constraints, spatial reference systems - EPSG:28992) within the GeoPackage.</li>
            <li>Focused on efficient data handling within the pipeline, balancing processing speed with data integrity, considering optimizations for large datasets (e.g., exploring efficient libraries like PyArrow for future scalability).</li>
          </ul>
          {/* ETL Carousel - Pass string array and project title */}
          <ProjectImageCarousel images={etlImageSrcs} projectTitle={project.title} />
        </div>

        {/* Section 2: Processing & Analysis */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
           <h5 className="text-xl font-semibold mb-3 text-cyan-400">Advanced Geospatial Processing & Analysis</h5>
           <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Developed a custom QGIS geometry splitting tool (&quot;Intersector&quot;) using PyQt, &quot;shapely&quot;, and direct GDAL/SQL. This tool addressed native QGIS limitations by preserving and accurately interpolating Z (height) and M (measure) values during the splitting of LineStringZM/PolygonZM features, crucial for 3D/4D acoustic data fidelity.</li>
            <li>Implemented height interpolation algorithms (&quot;dBvisionPackage.hoogteInterpolatie&quot;) using spatial analysis techniques to enrich 2D datasets with elevation (Z) values from reference height maps.</li>
            <li>Integrated data validation checks (&quot;CheckDialog&quot;) to verify model consistency and adherence to standards before calculation, ensuring reliable analysis inputs.</li>
          </ul>
           {/* Splitting Tool Carousel */}
           <h6 className="text-lg font-medium mb-2 text-gray-400">Custom Geometry Splitting Tool (Z/M Preserving):</h6>
           <ProjectImageCarousel images={splittingToolImageSrcs} projectTitle={project.title} />
           {/* Height Interpolation Carousel */}
           <h6 className="text-lg font-medium mt-6 mb-2 text-gray-400">Height Interpolation:</h6>
           <ProjectImageCarousel images={heightInterpolationImageSrcs} projectTitle={project.title} />
            {/* Validation Carousel */}
           <h6 className="text-lg font-medium mt-6 mb-2 text-gray-400">Data Validation:</h6>
           <ProjectImageCarousel images={validationImageSrcs} projectTitle={project.title} />
        </div>

         {/* Section 3: Automation */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h5 className="text-xl font-semibold mb-3 text-cyan-400">Automation, Integration & Reporting</h5>
          <ul className="list-disc list-inside space-y-2">
            <li>Orchestrated the end-to-end workflow within the QGIS plugin, managing the data pipeline from ingestion and validation to calculation preparation.</li>
            <li>Automated the interaction with the external 'Rekenhart' calculation engine (data submission, results retrieval).</li>
            <li>Integrated SWUNG standard functionalities for results analysis: scenario comparison, mitigation assessment, cumulative calculations, and compliance checks against Dutch environmental laws (Wet milieubeheer).</li>
            <li>Enabled generation of standardized PDF reports and visualization of model data and results as QGIS layers.</li>
          </ul>
        </div>
      </section>

      {/* Technical Stack Section */}
       <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h4 className="text-xl font-semibold mb-3 text-cyan-400">Technical Stack</h4>
        <p className="leading-relaxed">
          <strong className="text-gray-100">Languages & Libraries:</strong> Python, SQL
          <br />
          <strong className="text-gray-100">Geospatial:</strong> QGIS API/PyQt, osgeo/GDAL, Shapely, GeoPackage, SQLite (SpatiaLite)
          <br />
          <strong className="text-gray-100">Data Handling:</strong> Pandas, NumPy (with considerations for libraries like PyArrow for performance)
          <br />
          <strong className="text-gray-100">Environment:</strong> QGIS Plugin Development
        </p>
      </div>

      {/* Final Summary */}
      <p className="mt-8 text-lg italic text-gray-400 leading-relaxed">
        This project highlights significant data engineering challenges within the geospatial domain, including designing complex ETL pipelines, ensuring data integrity across systems, performing advanced spatial analysis, balancing efficiency and scalability, and developing custom tooling to overcome platform limitations for 3D/4D data processing.
      </p>

    </div>
  );
};

export default Project1Content;
