import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { bookingReducers } from './slices/bookings';
import { setupListeners } from '@reduxjs/toolkit/query'
import { rtkQueryApi } from './services/ApiQuery';

const reducer = combineReducers({
  // reducerPath and reducer are created for us, which we can pass straight into the reducer parameter of configureStore.
  authReducer: authReducer,
  bookingReducer: bookingReducers,
  [rtkQueryApi.reducerPath]: rtkQueryApi.reducer
});

export const store = configureStore({
  reducer,
  devTools: __DEV__,
  // middleware is also created for us, which will allow us to take advantage of caching, invalidation, polling, and the other features of RTK Query.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
      thunk: true,
    }).concat(rtkQueryApi.middleware),
});

export type RootState = ReturnType<typeof reducer>  //when we use combineReducers then use-> ReturnType<typeof reducer>
// export type RootState = ReturnType<typeof store.getState>; //when we don't use combineReducers and diretly pass reduces in configureStore then use-> ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

//This hook we can use as a place of useDispatch and useSelector 
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// It will enable to refetch the data on certain events, such as refetchOnFocus and refetchOnReconnect.
setupListeners(store.dispatch)


