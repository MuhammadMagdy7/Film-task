// src/services/film.ts

import axios from 'axios';
import { ApiResponse } from '@/types/film';

// Fatch films using asios

const api = axios.create({
  baseURL: 'https://jsonfakery.com/movies',
  timeout: 5000,
});

export const fetchFilms = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/paginated');
    return response.data;
  } catch (error) {
    console.error('Error fetching films:', error);
    throw error;
  }
};
