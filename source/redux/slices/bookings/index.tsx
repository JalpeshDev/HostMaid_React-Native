import { createSlice } from '@reduxjs/toolkit';
import { getBookingsAction, } from '../../action/authAction';


const initialState = {
    loading: false,
    bookingList: {},
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
    },
});

export const bookingReducers = bookingSlice.reducer;
