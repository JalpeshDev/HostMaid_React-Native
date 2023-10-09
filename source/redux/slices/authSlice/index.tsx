import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLoginAction } from '../../action/authAction';
import Toast from 'react-native-simple-toast';
import colors from '../../../utils/colors';
import { localStorage } from '../../../utils/localStorageProvider';
import routes from '../../../navigator/routes';
import navigationServices from '../../../navigator/navigationServices';

const initialState = {
  loading: false,
  data: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userLoginAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userLoginAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      localStorage.setItemObject("token", action.payload?.content?.access_token);
      navigationServices.navigateToNext(routes.HomeScreen, {})
    });
    builder.addCase(userLoginAction.rejected, (state, action) => {
      state.data = {};
      state.loading = false;
      Toast.show('Invalid login details', Toast.LONG, {
        backgroundColor: colors.themeGreen,
      });
    });
  },
});

export const authReducer = authSlice.reducer;
