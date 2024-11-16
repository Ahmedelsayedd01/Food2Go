import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer, categoryReducer } from "./CreateSlices";
import { combineReducers } from 'redux';

// All reducers
const reducers = combineReducers({
       user: userReducer,
       category: categoryReducer,
});


const persistConfig = {
       key: 'root',
       storage,
       // blacklist: ['user'],
};


const persistedReducer = persistReducer(persistConfig, reducers);

export const StoreApp = configureStore({
       reducer: persistedReducer,
       middleware: (getDefaultMiddleware) =>
              getDefaultMiddleware({
                     serializableCheck: false,
              }),
});

export const persistor = persistStore(StoreApp);
