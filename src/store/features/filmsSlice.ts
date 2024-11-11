
// store/features/filmSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from '@/types/film';
import { fetchFilms } from '@/services/filmService';
import { findFilmById } from '@/utils/filmFilters';
import { RootState } from '../store';

// Type of initialState
interface FilmsState {
  films: Film[];
  loading: boolean;
  error: string | null;
  selectedFilm: Film | null;
  initialized: boolean;
  filmCache: Record<string, Film>;
}

// InitialState 
const initialState: FilmsState = {
  films: [],
  loading: false,
  error: null,
  selectedFilm: null,
  initialized: false,
  filmCache: {},
};

// Get all films
export const getFilms = createAsyncThunk(
  'films/getFilms',
  async (_, { getState }) => {
    const state = getState() as RootState;
    // If the data is available, we return it directly
    if (state.films.initialized && state.films.films.length > 0) {
      return { data: state.films.films };
    }
    const response = await fetchFilms();
    return response;
  },
  {
    // Prevent repeated reloads
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      if (state.films.loading || (state.films.initialized && state.films.films.length > 0)) {
        return false;
      }
      return true;
    },
  }
);

// Get one film
export const getFilmById = createAsyncThunk(
  'films/getFilmById',
  async (id: string, { getState, dispatch }) => {
    const state = getState() as RootState;

    // Check cache first
    if (state.films.filmCache[id]) {
      return state.films.filmCache[id];
    }

    if (!state.films.initialized) {
      await dispatch(getFilms());
    }

    const film = findFilmById(state.films.films, id);
    if (!film) {
      throw new Error('Film not found');
    }
    
    return film;
  },
  {
    // Prevent repeated reload for film
    condition: (id, { getState }) => {
      const state = getState() as RootState;
      const currentSelectedFilm = state.films.selectedFilm;
      if (state.films.loading || (currentSelectedFilm && currentSelectedFilm.id === id)) {
        return false;
      }
      return true;
    },
  }
);

// Selector to get a specific movie
export const selectFilmById = (state: RootState, id: string) => 
  findFilmById(state.films.films, id);

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilms.fulfilled, (state, action) => {
        state.loading = false;
        state.films = action.payload.data;
        state.initialized = true; 
        state.error = null;
      })
      .addCase(getFilms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch films';
        state.initialized = false;
      })
      
      .addCase(getFilmById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilmById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedFilm = action.payload;
        state.error = null;
      })
      .addCase(getFilmById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch film';
        state.selectedFilm = null;
      });
  },
});

export default filmsSlice.reducer;