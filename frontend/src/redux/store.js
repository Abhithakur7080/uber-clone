import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import captainReducer from "./slices/captain.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        captain: captainReducer,
    }
});

export default store;