// components/FilmSkeleton.tsx

// That component is not currently used
export default function FilmSkeleton() {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
        <div className="h-64 bg-gray-200"></div>
        <div className="p-5">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }