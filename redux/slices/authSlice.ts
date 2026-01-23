import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    user: {
        id?: string;
        fullname?: string;
        email?: string;
        role?: string;
    } | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ token: string; user: any }>) => {
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
