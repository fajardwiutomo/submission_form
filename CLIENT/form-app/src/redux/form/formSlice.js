import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: [],
    data: []
  };
  
  export const statusSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
      getStatus: (state, { payload }) => {
        state.status = payload;
      },
      getData: (state, { payload }) => {
        state.data = payload;
      }
    
    },
  });
  
  export const { 
    getStatus,
    getData
  } = statusSlice.actions;
  
  export default statusSlice.reducer;
  