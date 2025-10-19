import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: new Set(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const itemId = action.payload;
      if (state.favorites.has(itemId)) {
        state.favorites.delete(itemId);
      } else {
        state.favorites.add(itemId);
      }
    },
    addToFavorites: (state, action) => {
      state.favorites.add(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites.delete(action.payload);
    },
    clearFavorites: (state) => {
      state.favorites.clear();
    },
  },
});

export const { toggleFavorite, addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;

