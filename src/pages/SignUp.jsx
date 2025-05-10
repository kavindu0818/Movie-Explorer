import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { signupUser, clearError } from '../redux/slices/authSlice';
import { FaUser, FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  
  const { isAuthenticated, loading, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';
  
  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    
    if (!validateForm()) {
      return;
    }
    
    const success = await dispatch(signupUser({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }));
    
    if (success) {
      setRedirectToReferrer(true);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  if (isAuthenticated || redirectToReferrer) {
    return <Navigate to={from} replace />;
  }
  
  return (
    <div className="min-h-screen pt-20 pb-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white dark:bg-neutral-800 rounded-card shadow-card p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded flex items-center">
              <FaExclamationCircle className="mr-2" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label 
                htmlFor="username" 
                className="block text-sm font-medium mb-1"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                  <FaUser />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`input-field pl-10 ${
                    formErrors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Choose a username"
                />
              </div>
              {formErrors.username && (
                <p className="mt-1 text-sm text-red-600">{formErrors.username}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field pl-10 ${
                    formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                  <FaLock />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field pl-10 ${
                    formErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Choose a password"
                />
              </div>
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
                  <FaLock />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-field pl-10 ${
                    formErrors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Confirm your password"
                />
              </div>
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`btn-accent w-full py-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
