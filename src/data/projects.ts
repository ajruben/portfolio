// src/data/projects.ts
export interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    imageUrl?: string; // Optional image URL (place in /public/images/)
    liveUrl?: string;  // Optional live demo link
    repoUrl?: string;   // GitHub repository link
  }
  
export const projectsData: Project[] = [
    {
        id: 1,
        title: "Interactive Portfolio Website", // Example: Your portfolio itself!
        description: "A dynamic personal portfolio built with Next.js, TypeScript, and Tailwind CSS, featuring scroll-triggered animations using Framer Motion. Deployed on Vercel.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
        // imageUrl: "/images/portfolio-screenshot.jpg", // Add a screenshot later!
        // liveUrl: "https://your-deployed-portfolio-url.com", // Add later
        repoUrl: "https://github.com/your-username/your-portfolio-repo", // Use your actual repo link
    },
    {
        id: 2,
        title: "Project Two Title",
        description: "Another cool project showcasing different skills or technologies. Describe what makes it interesting.",
        technologies: ["React", "Node.js", "Express", "CSS Modules"],
        imageUrl: "/images/project-two.jpg", // Make sure image exists in public/images
        liveUrl: "https://project-two-live-demo.com",
        repoUrl: "https://github.com/your-username/project-two-repo",
    },
    {
        id: 3,
        title: "Placeholder Project Three",
        description: "Description for the third project, highlighting key features and technologies used.",
        technologies: ["Vue.js", "Firebase", "SCSS"],
        // imageUrl: "/images/project-three.jpg", // Add image later
        // liveUrl: "https://project-three-live.com",
        repoUrl: "https://github.com/your-username/project-three-repo",
    },
    {
        id: 4,
        title: "Data Visualization Dashboard",
        description: "An interactive dashboard built with D3.js to visualize complex datasets.",
        technologies: ["D3.js", "JavaScript", "HTML5", "CSS3"],
        imageUrl: "/images/project-four.png", // Add image later
        // liveUrl: "https://data-viz-demo.com",
        repoUrl: "https://github.com/your-username/data-viz-repo",
    },
    {
        id: 5,
        title: "E-commerce Store Backend",
        description: "A RESTful API for an e-commerce platform using Python and Django.",
        technologies: ["Python", "Django", "PostgreSQL", "REST API"],
        // imageUrl: "/images/project-five.svg", // Add image later
        // liveUrl: null, // No live demo for backend usually
        repoUrl: "https://github.com/your-username/ecommerce-backend-repo",
    }
    // Add more of your actual projects...
];
