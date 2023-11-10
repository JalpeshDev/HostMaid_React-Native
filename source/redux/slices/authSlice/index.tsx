import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLoginAction } from '../../action/authAction';
import Toast from 'react-native-simple-toast';
import { localStorage } from '../../../utils/localStorageProvider';
import { ToastStyle } from '../../../utils/GlobalStyle';
import { LocalStorageKey, Strings } from '../../../utils/strings';
import { AuthStateType } from '../../types';

const initialState: AuthStateType = {
  loading: false,
  data: {},
  isClickable: true,
  elapsed: null
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
    }
  },
  extraReducers: builder => {
    builder.addCase(userLoginAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userLoginAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      localStorage.setItemObject(LocalStorageKey.Token, action.payload?.content?.access_token);
    });
    builder.addCase(userLoginAction.rejected, (state, action) => {
      state.data = {};
      state.loading = false;
      Toast.show(Strings.InvalidMsg, ToastStyle);
    });
  },
});
export const {
  enableTabNavigation, disableTabNavigation,
  elapsedTimes
} = authSlice.actions;
export const authReducer = authSlice.reducer;
