import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosInstance"

const initialState = {
    user: null,
    loading: false,
    error: null,
    status: false
}

export const createAccount = createAsyncThunk("register", async (data) => {
    try {
        const response = await axiosInstance.post("/user/register", data);
        console.log(response.data.user)
        return response.data.user;
    } catch (error) {
        throw error;
    }
});

export const userLogin = createAsyncThunk("login", async (data) => {
    try {
        const response = await axiosInstance.post("/user/login", data);
        console.log(response.data)
        return response.data.user;
    } catch (error) {
        console.log(error)
        throw error;
    }
});

export const userLogout = createAsyncThunk("logout", async () => {
    try {
        const response = await axiosInstance.get("/user/logout");
        console.log(response.data)
        return response.data.user;
    } catch (error) {
        console.log(error)
        throw error;
    }
});
export const userProfile = createAsyncThunk("profile", async () => {
    try {
        const response = await axiosInstance.get("/user/profile");
        console.log(response.data)
        return response.data.user;
    } catch (error) {
        console.log(error)
        throw error;
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.status = true;
        })
        builder.addCase(createAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(userLogin.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.status = true;
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(userLogout.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(userLogout.fulfilled, (state, action) => {
            state.loading = false;
            state.captain = null;
            state.status = false;
        })
        builder.addCase(userLogout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(userProfile.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(userProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.captain = action.payload;
            state.status = true;
        })
        builder.addCase(userProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})
export default userSlice.reducer;
