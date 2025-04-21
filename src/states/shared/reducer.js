import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setLoading} = sharedSlice.actions;
export default sharedSlice.reducer;
