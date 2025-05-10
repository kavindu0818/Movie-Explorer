import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../redux/slices/uiSlice';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-neutral-600" />}
    </button>
  );
};

export default ThemeToggle;