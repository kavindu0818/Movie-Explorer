import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  clearError,
} = authSlice.actions;

// Async thunk actions
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.username === 'user' && credentials.password === 'password') {
      const user = {
        id: '1',
        username: credentials.username,
        name: 'Demo User',
      };
      dispatch(loginSuccess(user));
      return true;
    } else {
      dispatch(loginFailure('Invalid credentials'));
      return false;
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    return false;
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());

    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = {
      id: '1',
      username: userData.username,
      name: userData.name || 'New User',
    };
    
    dispatch(signupSuccess(user));
    return true;
  } catch (error) {
    dispatch(signupFailure(error.message));
    return false;
  }
};

export default authSlice.reducer;
