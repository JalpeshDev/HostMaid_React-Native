import { createSlice } from '@reduxjs/toolkit';
import { getBookingDetailsAction, getBookingsAction, } from '../../action/authAction';


const initialState = {
    loading: false,
    bookingList: {},
    bookingDetails: {},
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
            state.bookingList = action.payload;
            state.loading = false;
        });
        builder.addCase(getBookingsAction.rejected, (state, action) => {
            state.bookingList = {};
            state.loading = false;
        });

        builder.addCase(getBookingDetailsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getBookingDetailsAction.fulfilled, (state, action) => {
            state.bookingDetails = action.payload;
            state.loading = false;
        });
        builder.addCase(getBookingDetailsAction.rejected, (state, action) => {
            state.bookingDetails = {};
            state.loading = false;
        });
    },
});

export const bookingReducers = bookingSlice.reducer;
