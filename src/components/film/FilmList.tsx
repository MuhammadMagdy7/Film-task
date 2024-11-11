//src/components/FilmList.tsx

'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getFilms } from '@/store/features/filmsSlice';
import FilmCard from './FilmCard';


export default function FilmsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { films, initialized } = useSelector((state: RootState) => state.films);

  useEffect(() => {
    // Check if the movies are empty or not
    if (!initialized && films.length === 0) {
      dispatch(getFilms());
    }
  }, [dispatch, films.length, initialized]);

  return (    
    <main className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              Discover Amazing Films
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection of the latest and greatest films from around the world
            </p>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </main>
  );
}
