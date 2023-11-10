import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../../utils/apiUrl';
import AxiosInstance from '../../../utils/AxiosInstance/axiosInstance';
let headers = {
  'Content-Type': 'application/json',
};
const config = { headers };
const httpClient = axios.create();
httpClient.defaults.timeout = 12000;
export const userLoginAction: any = createAsyncThunk(
  'user/login',
  async (body, { rejectWithValue }) => {
    try {
      const response = await httpClient.post(
        apiUrl.authUrl.userLogin,
        body,
        config,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);


export const getBookingsAction: any = createAsyncThunk('bookings', async () => {
  const response = await AxiosInstance.get(
    apiUrl.authUrl.bookingList,
  );
  return response.data
})