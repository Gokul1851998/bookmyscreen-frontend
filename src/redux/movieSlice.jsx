import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movieId: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    selectId: (state, action) => {
      state.movieId = action.payload;
    },
  },
});

export const { selectId } = movieSlice.actions;

export default movieSlice.reducer;