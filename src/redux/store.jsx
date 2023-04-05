import { configureStore } from "@reduxjs/toolkit";
import loadersReducer from "./loadersSlice";
import usersReducer from "./usersSlice";
import ownersReducer from "./ownersSlice";

export default configureStore({
    reducer : {
        loaders:loadersReducer,
        users:usersReducer,
        owners:ownersReducer
    }
})