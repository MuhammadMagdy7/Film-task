//src/components/Header.tsx

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-purple-400 transition-colors duration-300">
            <span className="text-purple-400">Film</span>Web
          </Link>
          <div className="space-x-6">
            <Link href="/" className="hover:text-purple-400 transition-colors duration-300 font-medium">Home</Link>

          </div>
        </nav>
      </div>
    </header>
  );
}