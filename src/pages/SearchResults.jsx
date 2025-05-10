import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, clearSearchResults } from '../redux/slices/moviesSlice';
import MovieGrid from '../components/movies/MovieGrid';
import Filters from '../components/movies/Filters';
import SearchBar from '../components/movies/SearchBar';

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { searchResults, loading, error, pagination, lastSearch, filters } = useSelector(state => state.movies);
  const [currentQuery, setCurrentQuery] = useState('');

  // Get query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    
    if (query) {
      setCurrentQuery(query);
      
      // Only search if it's a new query or if there are no results
      if (query !== lastSearch || searchResults.length === 0) {
        dispatch(clearSearchResults());
        dispatch(searchMovies(query));
      }
    }
  }, [location.search, dispatch, lastSearch]);

  const handleLoadMore = () => {
    if (pagination.currentPage < pagination.totalPages) {
      dispatch(searchMovies(currentQuery, pagination.currentPage + 1, true));
    }
  };

  const handleApplyFilters = () => {
    // When filters change, we need to search again
    if (currentQuery) {
      dispatch(clearSearchResults());
      dispatch(searchMovies(currentQuery));
    }
  };

  const hasMore = pagination.currentPage < pagination.totalPages;

  return (
    <div className="min-h-screen pt-24">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {currentQuery ? `Search Results for "${currentQuery}"` : 'Search Movies'}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <SearchBar />
            </div>
            <div className="flex-shrink-0">
              <Filters onApplyFilters={handleApplyFilters} />
            </div>
          </div>
          
          {searchResults.length > 0 && (
            <div className="mt-4 text-neutral-600 dark:text-neutral-400">
              Found {pagination.totalResults} results
              {Object.values(filters).some(Boolean) && ' (filtered)'}
            </div>
          )}
        </div>

        <MovieGrid 
          movies={searchResults}
          loading={loading}
          error={error}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
};

export default SearchResults;