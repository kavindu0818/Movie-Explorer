import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers
import authReducer from './slices/authSlice';
import moviesReducer from './slices/moviesSlice';
import uiReducer from './slices/uiSlice';

// Configure persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'movies'], // Only persist these reducers
};

const rootReducer = combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
