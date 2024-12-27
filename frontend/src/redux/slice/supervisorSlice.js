import { createSlice } from "@reduxjs/toolkit";

const supervisorSlice = createSlice({
  name: "supervisor",
  initialState: {
    semesters: [],
    filteredSemesters: [],
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: 1,
    searchTerm: "",
    totalStudentCount: 0,
    totalProjectCount: 0,
    totalThesisCount: 0,
  },
  reducers: {
    setSemesters: (state, action) => {
      state.semesters = action.payload;
      state.filteredSemesters = action.payload;
    },
    setFilteredSemesters: (state, action) => {
      state.filteredSemesters = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setTotalCounts: (state, action) => {
      state.totalStudentCount = action.payload.studentCount;
      state.totalProjectCount = action.payload.projectCount;
      state.totalThesisCount = action.payload.thesisCount;
    },
  },
});

export const {
  setSemesters,
  setFilteredSemesters,
  setCurrentPage,
  setItemsPerPage,
  setTotalPages,
  setSearchTerm,
  setTotalCounts,
} = supervisorSlice.actions;
export default supervisorSlice.reducer;
