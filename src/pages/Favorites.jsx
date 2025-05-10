import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MovieGrid from '../components/movies/MovieGrid';
import { FaHeart } from 'react-icons/fa';

const Favorites = () => {
  const { favorites } = useSelector(state => state.movies);

  return (
    <div className="min-h-screen pt-24">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your Favorite Movies
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Your personal collection of favorite movies
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="py-10 text-center">
            <div className="h-20 w-20 mx-auto mb-6 text-neutral-300 dark:text-neutral-600">
              <FaHeart className="w-full h-full" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Start exploring movies and add them to your favorites
            </p>
            <Link to="/" className="btn-primary px-6 py-2">
              Discover Movies
            </Link>
          </div>
        ) : (
          <MovieGrid movies={favorites} />
        )}
      </div>
    </div>
  );
};

export default Favorites;