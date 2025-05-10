import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrendingMovies } from '../redux/slices/moviesSlice';
import { getImageUrl } from '../services/movieService';
import MovieGrid from '../components/movies/MovieGrid';
import SearchBar from '../components/movies/SearchBar';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const { trending, loading, error } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  useEffect(() => {
    if (trending.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(trending.length, 5));
      setFeaturedMovie(trending[randomIndex]);
    }
  }, [trending]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredMovie ? (
        <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat" 
            style={{ 
              backgroundImage: `url(${getImageUrl(featuredMovie.backdrop_path, 'original')})`,
            }}
          >

            <div 
              className="absolute inset-0" 
              style={{ 
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
              }}
            ></div>
          </div>


          <div className="absolute inset-0 flex items-center">
            <div className="container-custom">
              <div className="max-w-2xl">
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {featuredMovie.title}
                </h1>
                <div className="mb-4 flex items-center">
                  <span className="text-yellow-400 mr-2">{featuredMovie.vote_average.toFixed(1)}/10</span>
                  <span className="text-neutral-300 mr-2">•</span>
                  <span className="text-neutral-300">
                    {new Date(featuredMovie.release_date).getFullYear()}
                  </span>
                </div>
                <p className="text-neutral-200 text-lg mb-6 line-clamp-3">
                  {featuredMovie.overview}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to={`/movie/${featuredMovie.id}`} 
                    className="btn-accent px-6 py-3 flex items-center"
                  >
                    <FaPlay className="mr-2" /> Watch Trailer
                  </Link>
                  <Link 
                    to={`/movie/${featuredMovie.id}`} 
                    className="btn-secondary px-6 py-3 flex items-center"
                  >
                    <FaInfoCircle className="mr-2" /> More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="relative h-[50vh] bg-neutral-900 flex items-center">
          <div className="container-custom">
            <div className="max-w-xl">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
                Discover Your Favorite Movies
              </h1>
              <div className="w-full max-w-md">
                <SearchBar className="w-full" />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Trending Movies</h2>
          <MovieGrid 
            movies={trending}
            loading={loading}
            error={error}
          />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-neutral-100 dark:bg-neutral-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MovieFlix?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              The ultimate destination for movie enthusiasts to discover, track, and enjoy films from around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-neutral-700 p-6 rounded-card shadow-card">
              <div className="text-netflix-red text-3xl mb-4">
                <FaPlay />
              </div>
              <h3 className="text-xl font-semibold mb-3">Extensive Collection</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Access thousands of movies from classics to the latest releases, all in one place.
              </p>
            </div>
            
            <div className="bg-white dark:bg-neutral-700 p-6 rounded-card shadow-card">
              <div className="text-netflix-red text-3xl mb-4">
                <FaInfoCircle />
              </div>
              <h3 className="text-xl font-semibold mb-3">Detailed Information</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Get comprehensive details about movies, including cast, crew, ratings, and trailers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-neutral-700 p-6 rounded-card shadow-card">
              <div className="text-netflix-red text-3xl mb-4">
                <FaHeart />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Experience</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Save your favorites, get personalized recommendations, and keep track of what you want to watch.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Import FaHeart from react-icons/fa at the top of the file
import { FaHeart } from 'react-icons/fa';

export default Home;
