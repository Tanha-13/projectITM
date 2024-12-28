import { createSlice } from "@reduxjs/toolkit";

const supervisorSlice = createSlice({
  name: "supervisor",
  initialState: {
    semesters:[]
  },
  reducers: {
    totalSemesters: (state,action) => {
      state.semesters = action.payload;
    }
  },
});

export const {
  totalSemesters,
} = supervisorSlice.actions;
export default supervisorSlice.reducer;
