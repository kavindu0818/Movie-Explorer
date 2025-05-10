import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ className = '', expandable = false }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(!expandable);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      if (expandable) setIsExpanded(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex items-center ${className}`}
    >
      {expandable ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500 p-2"
          >
            <FaSearch />
          </button>
          
          <div 
            className={`absolute right-0 top-full mt-2 transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded ? 'w-64 opacity-100' : 'w-0 opacity-0'
            }`}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              className="input-field w-full pr-10 py-2 text-sm"
              onBlur={() => !query && setIsExpanded(false)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-primary-600"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      ) : (
        <>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="input-field w-full pr-10 py-2"
          />
          <button
            type="submit"
            className="absolute right-3 text-neutral-500 hover:text-primary-600"
          >
            <FaSearch />
          </button>
        </>
      )}
    </form>
  );
};

export default SearchBar;
