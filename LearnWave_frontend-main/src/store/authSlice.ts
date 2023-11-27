import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    fname: null,
    lname: null,
    name: null,
    userName: null,
    email: null,
    phoneNumber: null,
    role: null,
    Refresh_token: null,
    Access_token: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveLogin: (state, action) => {
            state.id = action.payload.data.result._id;
            state.fname = action.payload.data.result.fname;
            state.lname = action.payload.data.result.lname;
            state.name = action.payload.data.result.name;
            state.userName = action.payload.data.result.userName;
            state.email = action.payload.data.result.email;
            state.phoneNumber = action.payload.data.result.phoneNumber;
            state.role = action.payload.data.result.role;
            state.Refresh_token = action.payload.data.Refresh_token;
            state.Access_token = action.payload.data.Access_token;
        },
        removeLogin: (state) => {
            state.id = null;
            state.fname = null;
            state.lname = null;
            state.name = null;
            state.userName = null;
            state.email = null;
            state.phoneNumber = null;
            state.role = null;
            state.Refresh_token = null;
            state.Access_token = null;
        },
    },
});

export const { saveLogin, removeLogin } = authSlice.actions;
export default authSlice.reducer;