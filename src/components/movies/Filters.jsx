import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../../redux/slices/moviesSlice';
import movieService from '../../services/movieService';
import PropTypes from 'prop-types'; // Import PropTypes

const Filters = ({ onApplyFilters }) => {
  const [genres, setGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { filters } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  const [localFilters, setLocalFilters] = useState({
    genre: filters.genre,
    year: filters.year,
    rating: filters.rating,
  });

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await movieService.getGenres();
        setGenres(genreList);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    dispatch(setFilters(localFilters));
    if (onApplyFilters) onApplyFilters(localFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setLocalFilters({
      genre: null,
      year: null,
      rating: null,
    });
    if (onApplyFilters) onApplyFilters({});
    setIsOpen(false);
  };

  // Generate last 70 years for the year select
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 70; i++) {
    years.push(currentYear - i);
  }

  return (
      <div className="relative">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn-secondary px-4 py-2 text-sm"
        >
          Filters {Object.values(filters).some(Boolean) && '(Active)'}
        </button>

        {isOpen && (
            <div className="absolute z-10 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <h4 className="font-semibold mb-3">Filter Movies</h4>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Genre</label>
                  <select
                      name="genre"
                      value={localFilters.genre || ''}
                      onChange={handleChange}
                      className="input-field text-sm"
                  >
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <select
                      name="year"
                      value={localFilters.year || ''}
                      onChange={handleChange}
                      className="input-field text-sm"
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Minimum Rating: {localFilters.rating || 'Any'}
                  </label>
                  <input
                      type="range"
                      name="rating"
                      min="0"
                      max="10"
                      step="0.5"
                      value={localFilters.rating || 0}
                      onChange={handleChange}
                      className="w-full"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                      onClick={handleReset}
                      className="btn-secondary px-3 py-1 text-sm"
                  >
                    Reset
                  </button>
                  <button
                      onClick={handleApply}
                      className="btn-primary px-3 py-1 text-sm"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

// Add prop validation for onApplyFilters
Filters.propTypes = {
  onApplyFilters: PropTypes.func, // Validate onApplyFilters as a function
};

export default Filters;

