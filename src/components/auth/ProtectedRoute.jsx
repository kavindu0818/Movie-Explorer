import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'; // Import PropTypes

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Add prop validation for children
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate children as a node (can be any valid JSX)
};

export default ProtectedRoute;
