import { configureStore } from '@reduxjs/toolkit';
import  persistedAuthReducer  from './auth/authSlice';
import { persistStore } from 'redux-persist';

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
       
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
export const persistor = persistStore(store);