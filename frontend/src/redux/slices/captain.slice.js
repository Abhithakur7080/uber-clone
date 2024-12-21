import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosInstance"

const initialState = {
    captain: null,
    loading: false,
    error: null,
    status: false
}

export const createCaptainAccount = createAsyncThunk("register", async (data) => {
    try {
        const response = await axiosInstance.post("/captain/register", data);
        console.log(response.data.captain)
        return response.data.captain;
    } catch (error) {
        throw error;
    }
});

export const captainLogin = createAsyncThunk("login", async (data) => {
    try {
        const response = await axiosInstance.post("/captain/login", data);
        console.log(response.data)
        return response.data.captain;
    } catch (error) {
        console.log(error)
        throw error;
    }
});

export const captainLogout = createAsyncThunk("logout", async () => {
    try {
        const response = await axiosInstance.get("/captain/logout");
        console.log(response.data)
        return response.data.captain;
    } catch (error) {
        console.log(error)
        throw error;
    }
});
export const captainProfile = createAsyncThunk("profile", async () => {
    try {
        const response = await axiosInstance.get("/captain/profile");
        console.log(response.data)
        return response.data.captain;
    } catch (error) {
        console.log(error)
        throw error;
    }
})

const captainSlice = createSlice({
    name: "captain",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createCaptainAccount.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createCaptainAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.captain = action.payload;
            state.status = true;
        })
        builder.addCase(createCaptainAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(captainLogin.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(captainLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.captain = action.payload;
            state.status = true;
        })
        builder.addCase(captainLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(captainLogout.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(captainLogout.fulfilled, (state, action) => {
            state.loading = false;
            state.captain = null;
            state.status = false;
        })
        builder.addCase(captainLogout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(captainProfile.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(captainProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.captain = action.payload;
            state.status = true;
        })
        builder.addCase(captainProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})
export default captainSlice.reducer;
