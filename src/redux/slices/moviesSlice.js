import { createSlice } from '@reduxjs/toolkit';
import movieService from '../../services/movieService';

const initialState = {
  trending: [],
  searchResults: [],
  movieDetails: null,
  favorites: [],
  lastSearch: '',
  loading: false,
  error: null,
  filters: {
    genre: null,
    year: null,
    rating: null,
  },
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
  },
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMoviesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess: (state, action) => {
      state.loading = false;
      if (action.payload.type === 'trending') {
        state.trending = action.payload.results;
      } else if (action.payload.type === 'search') {
        state.searchResults = action.payload.append 
          ? [...state.searchResults, ...action.payload.results]
          : action.payload.results;
        
        state.lastSearch = action.payload.query || state.lastSearch;
        state.pagination = {
          currentPage: action.payload.page || 1,
          totalPages: action.payload.totalPages || 0,
          totalResults: action.payload.totalResults || 0,
        };
      }
    },
    fetchMoviesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchMovieDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMovieDetailsSuccess: (state, action) => {
      state.loading = false;
      state.movieDetails = action.payload;
    },
    fetchMovieDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToFavorites: (state, action) => {
      const movie = action.payload;
      if (!state.favorites.some(m => m.id === movie.id)) {
        state.favorites.push(movie);
      }
    },
    removeFromFavorites: (state, action) => {
      const movieId = action.payload;
      state.favorites = state.favorites.filter(movie => movie.id !== movieId);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.lastSearch = '';
      state.pagination = initialState.pagination;
    },
    clearMovieDetails: (state) => {
      state.movieDetails = null;
    },
  },
});

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  fetchMovieDetailsStart,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsFailure,
  addToFavorites,
  removeFromFavorites,
  setFilters,
  resetFilters,
  clearSearchResults,
  clearMovieDetails,
} = moviesSlice.actions;


export const fetchTrendingMovies = () => async (dispatch) => {
  try {
    dispatch(fetchMoviesStart());
    const data = await movieService.getTrendingMovies();
    dispatch(fetchMoviesSuccess({
      type: 'trending',
      results: data.results,
    }));
  } catch (error) {
    dispatch(fetchMoviesFailure(error.message));
  }
};

export const searchMovies = (query, page = 1, append = false) => async (dispatch, getState) => {
  try {
    const { lastSearch } = getState().movies;
    const isLoadingMore = lastSearch === query && append;
    
    if (!isLoadingMore) {
      dispatch(fetchMoviesStart());
    }
    
    const data = await movieService.searchMovies(query, page);
    
    dispatch(fetchMoviesSuccess({
      type: 'search',
      results: data.results,
      query,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      append,
    }));
  } catch (error) {
    dispatch(fetchMoviesFailure(error.message));
  }
};

export const fetchMovieDetails = (movieId) => async (dispatch) => {
  try {
    dispatch(fetchMovieDetailsStart());
    const details = await movieService.getMovieDetails(movieId);
    
    // Get additional movie data
    const [credits, videos] = await Promise.all([
      movieService.getMovieCredits(movieId),
      movieService.getMovieVideos(movieId),
    ]);
    

    const enrichedDetails = {
      ...details,
      credits,
      videos: videos.results,
    };
    
    dispatch(fetchMovieDetailsSuccess(enrichedDetails));
  } catch (error) {
    dispatch(fetchMovieDetailsFailure(error.message));
  }
};

export default moviesSlice.reducer;
