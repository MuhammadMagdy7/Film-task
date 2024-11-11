//app/page.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getFilms } from '@/store/features/filmsSlice';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import FilmsList from '@/components/film/FilmList';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.films);

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

    return (
      <main>
        {!loading && <FilmsList /> }
      </main>
    );
}
