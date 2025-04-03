// src/components/Header.tsx
import Link from 'next/link'; // Use Next.js Link for client-side navigation

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4"> {/* Tailwind classes */}
      <nav className="container mx-auto flex justify-between"> {/* More Tailwind */}
        <Link href="/" className="font-bold text-xl">Ruben Swarts</Link>
        <ul className="flex space-x-4">
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link href="/projects" className="hover:text-gray-300">Projects</Link></li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;