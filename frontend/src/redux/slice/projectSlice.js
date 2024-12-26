import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name:'projects',
    initialState:{
        list:[],
        currentProject:null,
    },
    reducers:{
        setProjectPages: (state,action) => {
            state.list = action.payload;
        },
        setCurrentProject: (state,action) => {
            state.currentProject = action.payload;
        }
    }
})

export const {setCurrentProject, setProjectPages} = projectSlice.actions;
export default projectSlice.reducer;