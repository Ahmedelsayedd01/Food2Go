import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer, categoryReducer, ordersAllReducer, ordersPendingReducer, ordersConfirmedReducer, ordersProcessingReducer, ordersOutForDeliveryReducer, ordersDeliveredReducer, ordersReturnedReducer, ordersFailedReducer, ordersCanceledReducer, ordersScheduleReducer, newOrdersReducer, soundNotificationReducer } from "./CreateSlices";
import { combineReducers } from 'redux';

// All reducers
const reducers = combineReducers({
       newOrders: newOrdersReducer,
       soundNotification: soundNotificationReducer,
       category: categoryReducer,
       ordersAll: ordersAllReducer,
       ordersPending: ordersPendingReducer,
       ordersConfirmed: ordersConfirmedReducer,
       ordersProcessing: ordersProcessingReducer,
       ordersOutForDelivery: ordersOutForDeliveryReducer,
       ordersDelivered: ordersDeliveredReducer,
       ordersReturned: ordersReturnedReducer,
       ordersFailed: ordersFailedReducer,
       ordersCanceled: ordersCanceledReducer,
       ordersSchedule: ordersScheduleReducer,
       user: userReducer,  // Add user reducer here
});

// Persist configuration
const persistConfig = {
       key: 'root',
       storage,
       whitelist: ['user'], // Only persist 'user' state, exclude others
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
