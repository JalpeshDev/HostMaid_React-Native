import { createSlice } from '@reduxjs/toolkit';
import { getBookingsAction, } from '../../action/authAction';


const initialState = {
    loading: false,
    data: {},
};

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getBookingsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getBookingsAction.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getBookingsAction.rejected, (state, action) => {
            state.data = {};
            state.loading = false;
        });
    },
});

export const bookingReducers = bookingSlice.reducer;
