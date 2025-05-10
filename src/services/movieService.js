import axios from 'axios';

// TMDb API configuration
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c'; // This is a demo key for TMDb API
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Helper for image URLs
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image+Available';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Get trending movies
const getTrendingMovies = async (timeWindow = 'day') => {
  try {
    const response = await api.get(`/trending/movie/${timeWindow}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Search movies
const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Get movie details
const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'recommendations,similar',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Get movie credits (cast and crew)
const getMovieCredits = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

// Get movie videos (trailers, teasers, etc.)
const getMovieVideos = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    throw error;
  }
};

// Get movie genres
const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Discover movies by filters
const discoverMovies = async (filters = {}, page = 1) => {
  try {
    const { year, genre, rating } = filters;
    
    const params = {
      page,
      include_adult: false,
      sort_by: 'popularity.desc',
    };
    
    if (year) params.primary_release_year = year;
    if (genre) params.with_genres = genre;
    if (rating) params.vote_average_gte = rating;
    
    const response = await api.get('/discover/movie', { params });
    return response.data;
  } catch (error) {
    console.error('Error discovering movies:', error);
    throw error;
  }
};

export default {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getGenres,
  discoverMovies,
  getImageUrl,
};