import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
    reducer: {
        api: apiSlice.reducer,
        devTools: true,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    });

setupListeners(store.dispatch);