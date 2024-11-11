// components/FilmCard.tsx
import Link from 'next/link'
import { Film } from '@/types/film'
import BlurImage from '../common/BlurImage';
import { useEffect } from 'react';
import { memo } from 'react';
import { useRouter } from 'next/navigation';

interface FilmCardProps {
  film: Film
}

const FilmCard = memo( function FilmCard({ film }: FilmCardProps) {
  const router = useRouter();

    useEffect(() => {
      // Preload the image
      const img = new Image();
      img.src = film.poster_path;
    }, [film.poster_path]);

    // Preload the film
    const handleMouseEnter = () => {
      router.prefetch(`/films/${film.id}`);
    };

  return (
    <Link href={`/films/${film.id}`} className="film-card"  onMouseEnter={handleMouseEnter}
>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-64">
          <BlurImage
            src={film.poster_path}
            alt={film.original_title}
            className="w-full h-full"
          />
          <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-lg text-sm">
            {film.vote_average.toFixed(1)}
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">
            {film.original_title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {film.overview}
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-600">
              {new Date(film.release_date).getFullYear()}
            </span>
            <button className="text-purple-500 hover:text-purple-600 font-medium">
              Learn More →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
})

export default FilmCard
