import { createSlice } from "@reduxjs/toolkit";

const ownersSlice = createSlice({
    name:'owners',
    initialState:{
        owner : null
    },
    reducers: {
        setOwner : (state,action) => {
            state.owner = action.payload 
        }
    }
})

export const {setOwner} = ownersSlice.actions;

export default ownersSlice.reducer;