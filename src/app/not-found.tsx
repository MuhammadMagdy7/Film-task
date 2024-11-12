import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-red-500 text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
        <p className="text-gray-600">Page not found</p>

        
        <Link href={'/'}className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors duration-300"
        >
            Back to Home
        </Link>
      </div>
    );
  }