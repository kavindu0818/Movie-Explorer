import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { logout } from '../../redux/slices/authSlice';
import SearchBar from '../movies/SearchBar';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on location change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-neutral-900 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-netflix-red">MovieFlix</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link hover:text-netflix-red">Home</Link>
            {isAuthenticated && (
              <Link to="/favorites" className="nav-link hover:text-netflix-red">Favorites</Link>
            )}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block w-1/3 max-w-md">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center ml-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 hover:text-netflix-red">
                    <FaUserCircle className="text-2xl" />
                    <span>{user?.username}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                    <div className="py-1">
                      <Link to="/favorites" className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700">
                        My Favorites
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary px-4 py-2 text-sm">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn-accent ml-2 px-4 py-2 text-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="ml-4 p-2 rounded-md md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 shadow-lg">
          <div className="container-custom py-4">
            <div className="mb-4">
              <SearchBar />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="py-2 hover:text-netflix-red">Home</Link>
              {isAuthenticated && (
                <Link to="/favorites" className="py-2 hover:text-netflix-red">Favorites</Link>
              )}
              {isAuthenticated ? (
                <>
                  <div className="py-2 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center space-x-2 mb-2">
                      <FaUserCircle className="text-2xl" />
                      <span>{user?.username}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-red-600 py-1"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-2 py-2 border-t border-neutral-200 dark:border-neutral-700">
                  <Link to="/login" className="btn-secondary py-2 text-center">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn-accent py-2 text-center">
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;