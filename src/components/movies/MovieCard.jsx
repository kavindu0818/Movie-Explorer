import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { addToFavorites, removeFromFavorites } from '../../redux/slices/moviesSlice';
import { getImageUrl } from '../../services/movieService';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { favorites } = useSelector(state => state.movies);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <div 
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`} className="block relative">
        <div className="overflow-hidden aspect-[2/3] relative">
          <img 
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          {/* Hover overlay */}
          <div 
            className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-white text-lg font-semibold">View Details</span>
          </div>
          
          {/* Rating badge */}
          <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded-full flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
          </div>

          {/* Favorite button */}
          {isAuthenticated && (
            <button 
              onClick={handleFavoriteClick}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black bg-opacity-75 text-white hover:text-netflix-red transition-colors duration-200"
            >
              {isFavorite ? <FaHeart className="text-netflix-red" /> : <FaRegHeart />}
            </button>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">{movie.title}</h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
