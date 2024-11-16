import { createSlice } from "@reduxjs/toolkit";

const initialUserState = null; 
const initialCategoryState = null; 

const userSlice = createSlice({
       name: 'user',
       initialState: initialUserState,
       reducers: {
              setUser: (state, action) => {
                     console.log("Setting user:", action.payload); 
                     return { ...state, ...action.payload };
              },
              removeUser: () => {
                     console.log("Removing user"); 
                     return null;
              },
       },
});
const categorySlice = createSlice({
       name: 'category',
       initialState: initialCategoryState,
       reducers: {
              setCategory: (state, action) => {
                     console.log("Setting Category:", action.payload); 
                     return { ...state, ...action.payload };
              },
              removeCategory: () => {
                     console.log("Removing Category"); 
                     return null;
              },
       },
});

// Export actions 
export const { setUser, removeUser } = userSlice.actions;
export const { setCategory, removeCategory } = categorySlice.actions;

// Export reducer 
export const userReducer = userSlice.reducer;
export const categoryReducer = categorySlice.reducer;
