import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginUser, clearError } from '../redux/slices/authSlice';
import { FaLock, FaUser, FaExclamationCircle } from 'react-icons/fa';

// Using class component for Login
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
      formErrors: {
        username: '',
        password: '',
      },
    };
  }

  componentDidMount() {
    // Clear any existing auth errors when component mounts
    this.props.clearError();
  }

  validateForm = () => {
    let isValid = true;
    const formErrors = {
      username: '',
      password: '',
    };

    if (!this.state.username.trim()) {
      formErrors.username = 'Username is required';
      isValid = false;
    }

    if (!this.state.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (this.state.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    this.setState({ formErrors });
    return isValid;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    const { username, password } = this.state;
    const success = await this.props.loginUser({ username, password });

    if (success) {
      this.setState({ redirectToReferrer: true });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      formErrors: {
        ...this.state.formErrors,
        [name]: '', // Clear the error for this field
      },
    });
  };

  render() {
    const { isAuthenticated, loading, error } = this.props;
    const { from } = this.props.location?.state || { from: { pathname: '/' } };
    const { formErrors } = this.state;

    // If user is already authenticated or login was successful, redirect
    if (isAuthenticated || this.state.redirectToReferrer) {
      return <Navigate to={from} replace />;
    }

    return (
      <div className="min-h-screen pt-20 pb-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white dark:bg-neutral-800 rounded-card shadow-card p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded flex items-center">
                <FaExclamationCircle className="mr-2" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={this.handleSubmit}>
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
                    value={this.state.username}
                    onChange={this.handleChange}
                    className={`input-field pl-10 ${
                      formErrors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                    placeholder="Enter your username"
                  />
                </div>
                {formErrors.username && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.username}</p>
                )}
              </div>

              <div className="mb-6">
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
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={`input-field pl-10 ${
                      formErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                    placeholder="Enter your password"
                  />
                </div>
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
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
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
              For demo: username "user" and password "password"
            </p>

            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  error: state.auth.error,
  location: state.router?.location,
});

export default connect(mapStateToProps, { loginUser, clearError })(Login);