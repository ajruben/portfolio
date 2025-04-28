import React from 'react';
import { Project } from '@/data/projects'; // Assuming Project type is exported

interface ProjectContentProps {
  project: Project; // Receive project data as a prop
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Project2Content: React.FC<ProjectContentProps> = ({ project: _project }) => { // Prefix unused project prop
  return (
    <div>
      {/* Start adding your custom TSX content for Project 2 here */}
      <p>
        WIP, stage: finishing project <br></br>
        In this project, crime data and variables of interest are gather for the Greater London Area. In particular, the effects of temperature, space and 
        time are investigated. This is done by gathering temperature data between 2011-2019, and performing Geographically temporally weighted regression, alongside other regression models.
      </p>
      <p>
      In addition to data wrangling, exploration and modelling, I introduced more efficient code in the R package 'GWmodel' by leveraging vectorized operations and 
      multiprocessing, speeding up certain operations up to 99.82%. (To be pushed to open source GitHub, finishing up code).
      </p>
      <p>
      I am in process of cleaning up the code to be shared on Github. In this project, several techniques were tried to increase the perfomance, such as implementing multiprocesing via dask and using columnar file formats.
      Also, I explored using my GPU for several operations and visualisations. In the future, I will describe the data wrangling process on this page.
       </p>

      {/* Example: Maybe embed an interactive map or chart component */}
      {/* <LondonCrimeMap data={...} /> */}

      <h3 className="text-xl font-semibold mt-6 mb-2">Data Sources</h3>
      <p>
        The data for this project was sourced from X [TODO: Describe data sources].
      </p>

    </div>
  );
};

export default Project2Content;
