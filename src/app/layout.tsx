// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Keep this for Tailwind
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

// Importing global styles and components
// Importing the Inter font from Google Fonts
const inter = Inter({ subsets: ["latin"] });

// generate metadata for the page
// This metadata will be used for SEO and social sharing
export const metadata: Metadata = {
  title: "Ruben Swarts - Portfolio",
  description: "Showcasing my projects and interests",
};

// Viewport configuration must be a separate export in Next.js 15
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // maximumScale: 1, // Optionally uncomment to prevent user zooming
};

// Root layout component
// This is the main layout for the application
// It wraps all pages and includes the header and footer
// The layout is styled using Tailwind CSS
// The layout also includes the Inter font from Google Fonts
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // React node type for children, representing the content of the page
}>) {
  return (
    <html lang="en">
      <body className={inter.className}> {/* Apply Inter font to the body */}
        {/* Tailwind CSS classes for styling */}
        <ClientProviders>
          <div className="flex flex-col min-h-screen"> {/* Flex layout for sticky footer */}
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 fullhd:max-w-fullhd 4k:max-w-4k"> {/* Main content area */}
              {children} {/* Page content will be rendered here */}
            </main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
