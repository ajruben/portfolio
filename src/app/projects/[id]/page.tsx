// src/app/projects/[id]/page.tsx
import { projectsData, Project } from '@/data/projects';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectImageCarousel from '@/components/ProjectImageCarousel'; // Import the carousel component
import dynamic from 'next/dynamic'; // Import for dynamic loading

// Define props for the page component
interface ProjectDetailPageProps {
  params: { id: string; };
}

// --- generateMetadata remains the same ---
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
   // Added console logs for debugging the "params" error if it persists
   console.log("[generateMetadata] Received params:", params);
   const currentId = params.id;
   const project = projectsData.find(p => p.id.toString() === currentId);
   console.log("[generateMetadata] Found project:", project?.title);

   if (!project) { return { title: 'Project Not Found' }; }
   return { title: `${project.title} - Project Details`, description: project.description.substring(0, 160) };
}

// --- generateStaticParams remains the same ---
export async function generateStaticParams() {
  const paths = projectsData.map((project) => ({ id: project.id.toString() }));
  // console.log('[generateStaticParams] Generated:', paths); // Optional log
   return paths;
}

// --- Dynamically load project content components ---
// We'll create these components in the next step
const ProjectContentComponents: { [key: string]: React.ComponentType<any> } = {
  '1': dynamic(() => import('@/project-content/components/Project1Content').catch(() => () => <div>Error loading content for project 1.</div>)),
  '2': dynamic(() => import('@/project-content/components/Project2Content').catch(() => () => <div>Error loading content for project 2.</div>)),
  // Add entries for other project IDs as you create their components
  // '3': dynamic(() => import('@/project-content/components/Project3Content')),
};

// --- The Page Component - Marked as async ---
// No longer needs to be async unless fetching data directly here
export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  console.log("[ProjectDetailPage] Received params:", params); // Log received params
  const projectId = params.id; // Access param ID

  // Find project summary data
  const project = projectsData.find(p => p.id.toString() === projectId);
  console.log("[ProjectDetailPage] Found project:", project?.title);

  if (!project) {
     console.log(`[ProjectDetailPage] Project with ID ${projectId} not found in projectsData.`);
     notFound();
  }

  // Get the specific content component for this project ID
  const ProjectSpecificContent = ProjectContentComponents[projectId];

  // --- Render the project details ---
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Project Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-100">{project.title}</h1>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg">
        {/* Project Image */}
        <div className="mb-8 aspect-video bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg shadow-inner overflow-hidden">
          {/* ... image rendering ... */}
          {project.imageUrl ? ( <img src={project.imageUrl} alt={`${project.title}`} className="w-full h-full object-cover"/> ) : ( <div className="w-full h-full flex items-center justify-center"><span className="text-gray-400 italic">No Image Available</span></div> )}
        </div>

        {/* Image Carousel (if detailImages exist) */}
        {project.detailImages && project.detailImages.length > 0 && (
          <div className="mb-8">
            <ProjectImageCarousel images={project.detailImages} projectTitle={project.title} />
          </div>
        )}

        {/* Render the dynamically loaded project-specific component */}
        <div className="prose prose-invert prose-lg max-w-none mb-8 text-gray-300">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4 border-b border-gray-600 pb-2">About this Project</h2>
          {ProjectSpecificContent ? (
            <ProjectSpecificContent project={project} /> // Pass project data if needed
          ) : (
            // Fallback if no specific component is found for the ID
            <div>
              <p>{project.description}</p>
              <p className="mt-4 italic text-gray-500">Detailed content component not found for this project.</p>
            </div>
          )}
        </div>

        {/* Technologies Used */}
        <div className="mb-8">
           {/* ... technologies rendering ... */}
            <h3 className="text-2xl font-semibold mb-3 text-gray-200">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => ( <span key={tech} className="bg-slate-700 text-slate-200 text-sm font-medium px-3 py-1 rounded-md shadow">{tech}</span> ))}
            </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-700">
           {/* ... links rendering ... */}
            <Link href="/projects" className="inline-block bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition-colors duration-200 text-sm font-medium">Back to Projects</Link>
        </div>
      </div>
    </div>
  );
}
