import { createSlice } from '@reduxjs/toolkit';

// Helper function to check if user is admin from token
const checkAdminFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Decode the token to get email
      const decoded = atob(token);
      const [email] = decoded.split(':');
      // For now, we'll check if it's the admin email
      // In a real app, you'd verify this with the server
      return email === 'samvel1973@seznam.cz';
    } catch (error) {
      return false;
    }
  }
  return false;
};

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isAdmin: checkAdminFromToken(),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAdmin = action.payload.user.role === 'admin';
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
      localStorage.removeItem('token');
    },
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
    checkAdminStatus: (state) => {
      state.isAdmin = checkAdminFromToken();
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  clearError,
  checkAdminStatus,
} = authSlice.actions;

export default authSlice.reducer;
