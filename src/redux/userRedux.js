import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "admin",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    role: null,
    isAdmin: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      
      state.currentUser = null;
      state.isAdmin = false;
      state.role = null;
      localStorage.removeItem('persist:root');
    },
    loginRole:(state ,action)=>{
    state.role = action.payload;
    if(state.role === "admin"){
      state.isAdmin = true;
    }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAdmin = false;
      state.role = null;
      localStorage.removeItem('persist:root');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure,logout ,loginRole} = userSlice.actions;
export default userSlice.reducer;
