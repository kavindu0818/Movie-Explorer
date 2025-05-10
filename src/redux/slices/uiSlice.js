import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', // 'light' or 'dark'
  modalOpen: false,
  modalContent: null,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalContent = null;
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  openModal,
  closeModal,
  showNotification,
  clearNotification,
} = uiSlice.actions;

export default uiSlice.reducer;