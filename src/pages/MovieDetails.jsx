import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, addToFavorites, removeFromFavorites } from '../redux/slices/moviesSlice';
import { getImageUrl } from '../services/movieService';
import { FaStar, FaHeart, FaRegHeart, FaPlay, FaClock, FaCalendarAlt, FaLanguage } from 'react-icons/fa';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, loading, error, favorites } = useSelector(state => state.movies);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
      window.scrollTo(0, 0);
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (movieDetails?.videos) {
      // Find a trailer
      const trailerVideo = movieDetails.videos.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      );
      setTrailer(trailerVideo);
    }
  }, [movieDetails]);

  const isFavorite = favorites.some(movie => movie.id === Number(id));

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(Number(id)));
    } else if (movieDetails) {
      dispatch(addToFavorites({
        id: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path,
        vote_average: movieDetails.vote_average,
        release_date: movieDetails.release_date,
      }));
    }
  };

  if (loading && !movieDetails) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary-600 motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-lg">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="bg-error-500 bg-opacity-10 text-error-600 p-6 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Error Loading Movie</h2>
          <p>{error}</p>
          <Link to="/" className="btn-primary mt-4 inline-block px-4 py-2">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Movie Not Found</h2>
          <Link to="/" className="btn-primary mt-4 inline-block px-4 py-2">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Backdrop */}
      <div 
        className="relative h-[50vh] md:h-[70vh] bg-center bg-cover" 
        style={{ 
          backgroundImage: `url(${getImageUrl(movieDetails.backdrop_path, 'original')})`,
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)',
          }}
        ></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Poster */}
              <div className="w-40 md:w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-lg border-4 border-white">
                <img 
                  src={getImageUrl(movieDetails.poster_path)} 
                  alt={movieDetails.title}
                  className="w-full h-auto"
                />
              </div>
              
              {/* Title and basic info */}
              <div className="text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  {movieDetails.title}
                </h1>
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{movieDetails.vote_average?.toFixed(1)}/10</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    <span>
                      {movieDetails.release_date ? new Date(movieDetails.release_date).getFullYear() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-1" />
                    <span>{formatRuntime(movieDetails.runtime)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaLanguage className="mr-1" />
                    <span>{movieDetails.original_language?.toUpperCase()}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {movieDetails.genres?.map(genre => (
                    <span 
                      key={genre.id}
                      className="bg-neutral-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {trailer && (
                    <a 
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-accent px-6 py-3 flex items-center"
                    >
                      <FaPlay className="mr-2" /> Watch Trailer
                    </a>
                  )}
                  
                  {isAuthenticated && (
                    <button 
                      onClick={handleFavoriteToggle}
                      className={`btn-secondary px-6 py-3 flex items-center ${
                        isFavorite ? 'bg-opacity-70' : ''
                      }`}
                    >
                      {isFavorite ? (
                        <>
                          <FaHeart className="mr-2 text-netflix-red" /> 
                          Favorited
                        </>
                      ) : (
                        <>
                          <FaRegHeart className="mr-2" /> 
                          Add to Favorites
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container-custom py-8">
        <div className="flex border-b border-neutral-200 dark:border-neutral-700 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-medium ${
              activeTab === 'overview' 
                ? 'text-netflix-red border-b-2 border-netflix-red' 
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('cast')}
            className={`px-4 py-3 font-medium ${
              activeTab === 'cast' 
                ? 'text-netflix-red border-b-2 border-netflix-red' 
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            Cast
          </button>
          <button
            onClick={() => setActiveTab('similar')}
            className={`px-4 py-3 font-medium ${
              activeTab === 'similar' 
                ? 'text-netflix-red border-b-2 border-netflix-red' 
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            Similar Movies
          </button>
        </div>
        
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-lg leading-relaxed mb-8">{movieDetails.overview}</p>
            
            {trailer && (
              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-4">Trailer</h3>
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                  <iframe 
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Trailer"
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Details</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-32 text-neutral-600 dark:text-neutral-400">Status:</span>
                    <span>{movieDetails.status}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-neutral-600 dark:text-neutral-400">Budget:</span>
                    <span>{movieDetails.budget ? `$${movieDetails.budget.toLocaleString()}` : 'N/A'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-neutral-600 dark:text-neutral-400">Revenue:</span>
                    <span>{movieDetails.revenue ? `$${movieDetails.revenue.toLocaleString()}` : 'N/A'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-neutral-600 dark:text-neutral-400">Release Date:</span>
                    <span>
                      {movieDetails.release_date
                        ? new Date(movieDetails.release_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Production</h3>
                <div className="space-y-4">
                  {movieDetails.production_companies?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium mb-2">Companies</h4>
                      <div className="flex flex-wrap gap-4">
                        {movieDetails.production_companies.map(company => (
                          <div key={company.id} className="text-center">
                            {company.logo_path ? (
                              <img 
                                src={getImageUrl(company.logo_path, 'w200')} 
                                alt={company.name}
                                className="h-12 object-contain dark:bg-white dark:bg-opacity-90 p-1 rounded"
                              />
                            ) : (
                              <div className="h-12 flex items-center justify-center">
                                <span>{company.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {movieDetails.production_countries?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium mb-2">Countries</h4>
                      <div className="flex flex-wrap gap-2">
                        {movieDetails.production_countries.map(country => (
                          <span 
                            key={country.iso_3166_1}
                            className="bg-neutral-200 dark:bg-neutral-700 px-3 py-1 rounded-full text-sm"
                          >
                            {country.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'cast' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movieDetails.credits?.cast?.slice(0, 10).map(person => (
                <div key={person.id} className="bg-white dark:bg-neutral-800 rounded-card overflow-hidden shadow-card">
                  <div className="aspect-[2/3] overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                    <img 
                      src={person.profile_path 
                        ? getImageUrl(person.profile_path) 
                        : 'https://via.placeholder.com/300x450?text=No+Image'
                      } 
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm">{person.name}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs">
                      {person.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {movieDetails.credits?.crew?.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6">Key Crew</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {movieDetails.credits.crew
                    ?.filter(person => ['Director', 'Producer', 'Screenplay', 'Writer'].includes(person.job))
                    .slice(0, 8)
                    .map((person, index) => (
                      <div key={`${person.id}-${index}`} className="bg-white dark:bg-neutral-800 p-4 rounded-card shadow-card">
                        <h3 className="font-semibold">{person.name}</h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                          {person.job}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'similar' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movieDetails.similar?.results?.slice(0, 10).map(movie => (
                <Link 
                  key={movie.id} 
                  to={`/movie/${movie.id}`}
                  className="bg-white dark:bg-neutral-800 rounded-card overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-[2/3] overflow-hidden">
                    <img 
                      src={getImageUrl(movie.poster_path)} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
                    <div className="flex items-center mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{movie.vote_average?.toFixed(1)}</span>
                      <span className="mx-1">•</span>
                      <span>
                        {movie.release_date 
                          ? new Date(movie.release_date).getFullYear() 
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;