import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "admin",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    role: null,
    isAdmin: false,
    expires_in: 0,
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
      state.expires_in = 0 ;
      localStorage.removeItem('persist:root');
    },
    loginExpToken:(state ,action)=>{
      state.expires_in = action.payload;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure,logout ,loginRole,loginExpToken} = userSlice.actions;
export default userSlice.reducer;
