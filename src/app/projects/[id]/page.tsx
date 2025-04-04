// src/app/projects/[id]/page.tsx
import { projectsData, Project } from '@/data/projects';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// --- Imports for MDX ---
import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote/rsc'; // Import RSC version for server components

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

// --- Helper function to load and compile MDX ---
async function getMdxSource(projectId: string) {
  const mdxFilePath = path.join(process.cwd(), 'src', 'project-content', `${projectId}.mdx`);
  console.log(`[getMdxSource] Checking for MDX file at: ${mdxFilePath}`); // Log file path

  try {
    if (fs.existsSync(mdxFilePath)) {
      console.log(`[getMdxSource] Found MDX file for ID ${projectId}. Reading...`);
      const fileContents = fs.readFileSync(mdxFilePath, 'utf8');
      console.log(`[getMdxSource] Read ${fileContents.length} characters. Serializing...`);
      // Compile the MDX string
      const source = await serialize(fileContents, {
        // parseFrontmatter: true, // Uncomment if you add YAML frontmatter to MDX
      });
      console.log(`[getMdxSource] Serialization successful for ID ${projectId}.`);
      return source;
    } else {
       console.log(`[getMdxSource] No MDX file found for ID ${projectId}.`);
       return null;
    }
  } catch (error) {
    console.error(`[getMdxSource] Error processing MDX for ID ${projectId}:`, error);
    return null; // Return null on error
  }
}


// --- The Page Component - Marked as async ---
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  console.log("[ProjectDetailPage] Received params:", params); // Log received params
  const projectId = params.id; // Access param ID

  // Find project summary data
  const project = projectsData.find(p => p.id.toString() === projectId);
  console.log("[ProjectDetailPage] Found project:", project?.title);

  if (!project) {
     console.log(`[ProjectDetailPage] Project with ID ${projectId} not found in projectsData.`);
     notFound();
  }

  // Load and compile the MDX content using the helper function
  const mdxSource = await getMdxSource(projectId);

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

        {/* Render MDX or Fallback Description */}
        <div className="prose prose-invert prose-lg max-w-none mb-8 text-gray-300">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4 border-b border-gray-600 pb-2">About this Project</h2>
          {mdxSource ? (
             // Use the RSC version of MDXRemote here
             <MDXRemote source={mdxSource?.compiledSource} />
          ) : (
             // Fallback to the short description
             <p>{project.description}</p>
             // Maybe add other details from projects.ts here if needed as fallback
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