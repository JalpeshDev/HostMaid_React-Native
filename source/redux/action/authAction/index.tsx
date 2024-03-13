import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../../utils/apiUrl';
let headers = {
  'Content-Type': 'application/json',
};
const config = { headers };
const httpClient = axios.create();
httpClient.defaults.timeout = 12000;

export const getBookingDetailsAction: any = createAsyncThunk(
  'getBookingDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(
        `${apiUrl.bookingUrl.getBookingDetails}${id}`,
        config,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);


export const getBookingsAction: any = createAsyncThunk('bookings', async () => {
  const response = await httpClient.get(
    apiUrl.authUrl.bookingList,
    config
  );
  return response.data
})