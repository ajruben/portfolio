// src/data/projects.ts
export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    imageUrl?: string; // Optional image URL (place in /public/images/)
    liveUrl?: string;  // Optional live demo link
    repoUrl?: string;   // GitHub repository link
    detailImages?: string[]; // Optional array of detail image URLs
  }
  
export const projectsData: Project[] = [
    {
        id: 1,
        title: "Development of Qgis Plugin - ", 
        description: "tooling and data management for accoustic consulting",
        technologies: ["Python", "Qgis", "GDAL", "Geopandas", "SQL", "GPKG (sqlite)", "shapely"],
        imageUrl: "/images_project1/QdB.jpg", 
        // liveUrl: "https://your-deployed-portfolio-url.com", 
        repoUrl: "https://github.com/your-username/your-portfolio-repo", 
        detailImages: [
            "/images_project1/QdB.jpg",
            "/images_project1/hoogte_ipol1.png",
            "/images_project1/snippet.png",
        ],
    },
    {
        id: 2,
        title: "London Crime Data Project", 
        description: "Using data visualisations and spatial models to explain crime occurences in London.",
        technologies: ["Python", "R", "GeoPandas", "cuDf", "datashader", "dask"],
        imageUrl: "/images_project2/crime_distribution_blue_yellow_aggr_uhard.png", 
        // liveUrl: "https://your-deployed-portfolio-url.com", 
        repoUrl: "https://github.com/your-username/your-portfolio-repo", 
    },
    {
        id: 3,
        title: "Interactive Portfolio Website", 
        description: "A dynamic personal portfolio built with Next.js, TypeScript, and Tailwind CSS, featuring scroll-triggered animations using Framer Motion. Deployed on Vercel.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
        // imageUrl: "/images/portfolio-screenshot.jpg", 
        // liveUrl: "https://your-deployed-portfolio-url.com", 
        repoUrl: "https://github.com/your-username/your-portfolio-repo", 
    },
    {
        id: 4,
        title: "Project Two Title",
        description: "Another cool project showcasing different skills or technologies. Describe what makes it interesting.",
        technologies: ["React", "Node.js", "Express", "CSS Modules"],
        //imageUrl: "/images/project-two.jpg", // Make sure image exists in public/images
        //liveUrl: "https://project-two-live-demo.com",
        repoUrl: "https://github.com/your-username/project-two-repo",
    },
    {
        id: 5,
        title: "Placeholder Project Three",
        description: "Description for the third project, highlighting key features and technologies used.",
        technologies: ["Vue.js", "Firebase", "SCSS"],
        // imageUrl: "/images/project-three.jpg", // Add image later
        // liveUrl: "https://project-three-live.com",
        repoUrl: "https://github.com/your-username/project-three-repo",
    },
    {
        id: 6,
        title: "Data Visualization Dashboard",
        description: "An interactive dashboard built with D3.js to visualize complex datasets.",
        technologies: ["D3.js", "JavaScript", "HTML5", "CSS3"],
        //imageUrl: "/images/project-four.png", // Add image later
        // liveUrl: "https://data-viz-demo.com",
        repoUrl: "https://github.com/your-username/data-viz-repo",
    },
    {
        id: 7,
        title: "E-commerce Store Backend",
        description: "A RESTful API for an e-commerce platform using Python and Django.",
        technologies: ["Python", "Django", "PostgreSQL", "REST API"],
        // imageUrl: "/images/project-five.svg", // Add image later
        // liveUrl: null, // No live demo for backend usually
        repoUrl: "https://github.com/your-username/ecommerce-backend-repo",
    }
];
