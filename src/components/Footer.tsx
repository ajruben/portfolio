// src/components/Footer.tsx
const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get current year dynamically
    return (
        <footer className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white text-center text-sm p-4 mt-8">{/* Tailwind */}
        © {currentYear} Ruben Swarts. All rights reserved.
      </footer>
    );
  };
  
  export default Footer;