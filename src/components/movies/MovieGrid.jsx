import { useEffect} from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, loading, error, onLoadMore, hasMore = false }) => {

  useEffect(() => {
    const handleResize = () => {

      if (window.innerWidth < 640) {
        // Adjust grid for mobile devices
      } else if (window.innerWidth < 768) {
        // Adjust grid for tablets
      } else if (window.innerWidth < 1024) {
        // Adjust grid for smaller laptops
      } else {
        // Default grid layout for large screens
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading && movies.length === 0) {
    return (
        <div className="container-custom py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-neutral-200 dark:bg-neutral-700 aspect-[2/3] rounded-card"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 mt-4 rounded"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 mt-2 w-1/2 rounded"></div>
                </div>
            ))}
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="container-custom py-10">
          <div className="bg-error-500 bg-opacity-10 text-error-600 p-4 rounded-md">
            <p>Error: {error}</p>
          </div>
        </div>
    );
  }

  if (movies.length === 0 && !loading) {
    return (
        <div className="container-custom py-10">
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold mb-2">No movies found</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
    );
  }

  return (
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {loading && (
            <div className="text-center mt-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-primary-600"></div>
            </div>
        )}

        {hasMore && !loading && (
            <div className="text-center mt-8">
              <button onClick={onLoadMore} className="btn-primary px-6 py-2">
                Load More
              </button>
            </div>
        )}
      </div>
  );
};

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        title: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
      })
  ).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onLoadMore: PropTypes.func,
  hasMore: PropTypes.bool,
};

export default MovieGrid;

