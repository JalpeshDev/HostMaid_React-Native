import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { bookingReducers } from './slices/bookings';

const reducer = combineReducers({
  authReducer: authReducer,
  bookingReducer: bookingReducers,

});

export const store = configureStore({
  reducer,
  devTools: __DEV__,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
      thunk: true,
    }),
});


export type RootState = ReturnType<typeof reducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Custom hook for handle async functions.
export const useThunkDispatch = () => useDispatch<AppDispatch>();

// Custom hook for basic selectors.
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const dispatch = store.dispatch;