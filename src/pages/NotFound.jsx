import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center px-4">
        <div className="text-netflix-red text-9xl font-bold mb-4">404</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn-primary px-6 py-3">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;