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
    videoSrc?: string; // Optional video source URL
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
        title: "MandelBrot", 
        description: "A Mandelbrot set visualisation using a CUDA kernel in Python. Both generating images and videos.",
        technologies: ["Python", "cupy", "CUDA", "ffmpeg", "datashader"],
        imageUrl: "/images_project3/mandelbrot_black_and_yellow_you_know_what_it_is.png", 
        // liveUrl: "https://your-deployed-portfolio-url.com", 
        repoUrl: "https://github.com/ajruben/mandelbrot_vis_cupy.git", 
    },
    {
       id: 4,
       title: 'Medical Text Simplification',
       description: "Finetuning encoder-decoder models for simplifying medical texts filled with jargon.",
       technologies: ["Python", "transformers", "nlp"]
    }
];
