import { configureStore, createSlice } from '@reduxjs/toolkit';


const dataSlice = createSlice({
  name: 'data',
  initialState: [],
  reducers: {
    addData: (state, action) => {
      state.push(action.payload);
    },
    deleteData: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    updateData: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index].name = action.payload.name;
      }
    },
  },
});


const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});


export const { addData, deleteData, updateData } = dataSlice.actions;


export default store;
