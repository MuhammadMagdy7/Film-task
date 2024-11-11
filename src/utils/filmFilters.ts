import { Film } from '@/types/film';


// Fillter on films to extract specific film using id

export const findFilmById = (films: Film[], id: string): Film | null => {
  const film = films.find(f => f.id === id);
  return film || null;
};
