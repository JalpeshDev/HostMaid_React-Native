import { createSlice } from '@reduxjs/toolkit';
import { AuthStateType } from '../../types';

const initialState: AuthStateType = {
  loading: false,
  data: {},
  isClickable: true,
  elapsed: null,
  uploadImgStatus: false
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    enableTabNavigation: (state) => {
      state.isClickable = false;
    },
    disableTabNavigation: (state) => {
      state.isClickable = true;
    },
    elapsedTimes: (state, action) => {
      state.elapsed = action.payload.elapsedTime;
    },
    uploadImgDisable: (state) => {
      state.uploadImgStatus = false;
    },
    uploadImgEnable: (state) => {
      state.uploadImgStatus = true;
    },
  },
});
export const {
  enableTabNavigation, disableTabNavigation,
  elapsedTimes, uploadImgDisable, uploadImgEnable
} = authSlice.actions;
export const authReducer = authSlice.reducer;
