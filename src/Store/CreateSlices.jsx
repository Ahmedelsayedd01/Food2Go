import { createSlice } from "@reduxjs/toolkit";
import { useGet } from "../Hooks/useGet";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Redux slices

// Initial states
const initialUserState = null;
const initialCategoryState = null;

const initialNewOrders = {
       count: 0,
};
const initialSoundNotification = { data: null };

const initialOrdersAllState = {
       data: [],
       loading: false,
};
const initialOrdersPendingState = {
       data: [],
       loading: false,
};
const initialOrdersConfirmedState = {
       data: [],
       loading: false,
};
const initialOrdersProcessingState = {
       data: [],
       loading: false,
};
const initialOrdersOutForDeliveryState = {
       data: [],
       loading: false,
};
const initialOrdersDeliveredState = {
       data: [],
       loading: false,
};
const initialOrdersReturnedState = {
       data: [],
       loading: false,
};
const initialOrdersFailedState = {
       data: [],
       loading: false,
};
const initialOrdersCanceledState = {
       data: [],
       loading: false,
};
const initialOrdersScheduleState = {
       data: [],
       loading: false,
};


// New Orders slice
const newOrdersSlice = createSlice({
       name: "newOrders",
       initialState: initialNewOrders,
       reducers: {
              setNewOrders: (state, action) => {
                     console.log("Payload received:", action.payload);
                     return { ...state, ...action.payload }; // Merges payload into the existing state
              },
       },
});
// Sound Notification slice
const soundNotification = createSlice({
       name: "soundNotification",
       initialState: initialSoundNotification,
       reducers: {
              setSoundNotification: (state, action) => {
                     console.log("SoundNotificationSlice:", action.payload);
                     state.data = action.payload;
              },
       },
});

// User slice
const userSlice = createSlice({
       name: "user",
       initialState: initialUserState,
       reducers: {
              setUser: (state, action) => {
                     console.log("Setting user:", action.payload);
                     return { ...state, ...action.payload };
              },
              removeUser: () => {
                     console.log("Removing user");
                     return null;
              },
       },
});

// Category slice
const categorySlice = createSlice({
       name: "category",
       initialState: initialCategoryState,
       reducers: {
              setCategory: (state, action) => {
                     console.log("Setting Category:", action.payload);
                     return { ...state, ...action.payload };
              },
              removeCategory: () => {
                     console.log("Removing Category");
                     return null;
              },
       },
});

// OrdersAll slice
const ordersAllSlice = createSlice({
       name: "ordersAll",
       initialState: initialOrdersAllState,
       reducers: {
              setOrdersAll: (state, action) => {
                     console.log("Setting Orders All:", action.payload);
                     state.data = action.payload; // Update orders data
                     state.loading = false; // Set loading to false when data is set
              },
              setLoading: (state, action) => {
                     console.log("Setting Loading ordersAll State:", action.payload);
                     state.loading = action.payload; // Update loading state
              },
       },
});
// OrdersPending slice
const ordersPendingSlice = createSlice({
       name: "ordersPending",
       initialState: initialOrdersPendingState,
       reducers: {
              setOrdersPending: (state, action) => {
                     console.log("Setting Orders Pending:", action.payload);
                     state.data = action.payload; // Update orders data
                     state.loading = false; // Set loading to false when data is set
              },
              setLoading: (state, action) => {
                     console.log("Setting Loading OrdersPending State:", action.payload);
                     state.loading = action.payload; // Update loading state
              },
       },
});
// ordersConfirmed slice
const ordersConfirmedSlice = createSlice({
       name: "ordersConfirmed",
       initialState: initialOrdersConfirmedState,
       reducers: {
              setOrdersConfirmed: (state, action) => {
                     console.log("Setting Orders Confirmed:", action.payload);
                     state.data = action.payload; // Update orders data
                     state.loading = false; // Set loading to false when data is set
              },
              setLoading: (state, action) => {
                     console.log("Setting Loading ordersConfirmed State:", action.payload);
                     state.loading = action.payload; // Update loading state
              },
       },
});
// ordersProcessing slice
const ordersProcessingSlice = createSlice({
       name: "ordersProcessing",
       initialState: initialOrdersProcessingState,
       reducers: {
              setOrdersProcessing: (state, action) => {
                     console.log("Setting Orders Processing:", action.payload);
                     state.data = action.payload; // Update orders data
                     state.loading = false; // Set loading to false when data is set
              },
              setLoading: (state, action) => {
                     console.log("Setting Loading ordersProcessing State:", action.payload);
                     state.loading = action.payload; // Update loading state
              },
       },
});
// ordersOutForDelivery slice
const ordersOutForDeliverySlice = createSlice({
       name: "ordersOutForDelivery",
       initialState: initialOrdersOutForDeliveryState,
       reducers: {
              setOrdersOutForDelivery: (state, action) => {
                     console.log("Setting Orders Out For Delivery:", action.payload);
                     state.data = action.payload; // Update orders data
                     state.loading = false; // Set loading to false when data is set
              },
              setLoading: (state, action) => {
                     console.log("Setting Loading ordersOutForDelivery State:", action.payload);
                     state.loading = action.payload; // Update loading state
              },
       },
});
// ordersDelivered slice
const ordersDeliveredSlice = createSlice({
       name: "ordersDelivered",
       initialState: initialOrdersDeliveredState,
       reducers: {
              setOrdersDelivered: (state, action) => {
                     console.log("Setting Orders Delivered:", action.payload);
                     state.data = action.payload; // Update orders data
                     state.loading = false; // Set loading to false when data is set
              },
              setLoading: (state, action) => {
                     console.log("Setting Loading ordersDelivered State:", action.payload);
                     state.loading = action.payload; // Update loading state
              },
       },
});
// ordersReturned slice
const ordersReturnedSlice = createSlice({
       name: "ordersReturned",
       initialState: initialOrdersReturnedState,
       reducers: {
              setOrdersReturned: (state, action) => {
                     console.log("Setting Orders Returned:", action.payload);
                     state.data = action.payload; // Update orders data
                     state.loading = false; // Set loading to false when data is set
              },
              setLoading: (state, action) => {
                     console.log("Setting Loading ordersReturned State:", action.payload);
                     state.loading = action.payload; // Update loading state
              },
       },
});
// ordersFailed slice
const ordersFailedSlice = createSlice({
       name: "ordersFailed",
       initialState: initialOrdersFailedState,
       reducers: {
              setOrdersFailed: (state, action) => {
                     console.log("Setting Orders Failed:", action.payload);
                     state.data = action.payload; // Update orders data
                     state.loading = false; // Set loading to false when data is set
              },
              setLoading: (state, action) => {
                     console.log("Setting Loading ordersFailed State:", action.payload);
                     state.loading = action.payload; // Update loading state
              },
       },
});
// ordersCanceled slice
const ordersCanceledSlice = createSlice({
       name: "ordersCanceled",
       initialState: initialOrdersCanceledState,
       reducers: {
              setOrdersCanceled: (state, action) => {
                     console.log("Setting Orders Canceled:", action.payload);
                     state.data = action.payload; // Update orders data
                     state.loading = false; // Set loading to false when data is set
              },
              setLoading: (state, action) => {
                     console.log("Setting Loading ordersCanceled State:", action.payload);
                     state.loading = action.payload; // Update loading state
              },
       },
});
// ordersSchedule slice
const ordersScheduleSlice = createSlice({
       name: "ordersSchedule",
       initialState: initialOrdersScheduleState,
       reducers: {
              setOrdersSchedule: (state, action) => {
                     console.log("Setting Orders Schedule:", action.payload);
                     state.data = action.payload; // Update orders data
                     state.loading = false; // Set loading to false when data is set
              },
              setLoading: (state, action) => {
                     console.log("Setting Loading ordersSchedule State:", action.payload);
                     state.loading = action.payload; // Update loading state
              },
       },
});


// Fetch and dispatch orders
export const OrdersComponent = () => {
       const dispatch = useDispatch();
       const { refetch: refetchOrders, data: dataOrders, loading, error } = useGet({
              url: "https://bcknd.food2go.online/admin/order",
       });

       // Log data to debug
       useEffect(() => {
              console.log("Fetching orders...");
              refetchOrders();
              dispatch(ordersAllSlice.actions.setLoading(loading));
              dispatch(ordersPendingSlice.actions.setLoading(loading));
              dispatch(ordersConfirmedSlice.actions.setLoading(loading));
              dispatch(ordersProcessingSlice.actions.setLoading(loading));
              dispatch(ordersOutForDeliverySlice.actions.setLoading(loading));
              dispatch(ordersDeliveredSlice.actions.setLoading(loading));
              dispatch(ordersReturnedSlice.actions.setLoading(loading));
              dispatch(ordersFailedSlice.actions.setLoading(loading));
              dispatch(ordersCanceledSlice.actions.setLoading(loading));
              dispatch(ordersScheduleSlice.actions.setLoading(loading));
       }, [refetchOrders]);




       useEffect(() => {
              console.log("Fetched dataOrders:", dataOrders);  // Log the data from the API response
              if (dataOrders && Array.isArray(dataOrders.orders)) {
                     dispatch(ordersAllSlice.actions.setOrdersAll(dataOrders.orders));
                     dispatch(ordersPendingSlice.actions.setOrdersPending(dataOrders.pending));
                     dispatch(ordersConfirmedSlice.actions.setOrdersConfirmed(dataOrders.confirmed));
                     dispatch(ordersProcessingSlice.actions.setOrdersProcessing(dataOrders.processing));
                     dispatch(ordersOutForDeliverySlice.actions.setOrdersOutForDelivery(dataOrders.out_for_delivery));
                     dispatch(ordersDeliveredSlice.actions.setOrdersDelivered(dataOrders.delivered));
                     dispatch(ordersReturnedSlice.actions.setOrdersReturned(dataOrders.returned));
                     dispatch(ordersFailedSlice.actions.setOrdersFailed(dataOrders.faild_to_deliver));
                     dispatch(ordersCanceledSlice.actions.setOrdersCanceled(dataOrders.canceled));
                     dispatch(ordersScheduleSlice.actions.setOrdersSchedule(dataOrders.scheduled));
                     console.log("Data orders", dataOrders);
              } else {
                     console.log("Data is not in the expected format:", dataOrders);
              }
       }, [dataOrders]);



       return null; // No UI returned
};

// Fetch and dispatch orders

// const dispatch = useDispatch();
// const { refetch: refetchOrders, data: dataOrders, loading, error } = useGet({
//        url: "https://bcknd.food2go.online/admin/order",
// });

// useEffect(() => {
//        console.log("Fetched dataOrders:", dataOrders);  // Log the data from the API response
//        if (dataOrders && Array.isArray(dataOrders.orders)) {
//               dispatch(newOrdersSlice.actions.setNewOrders(dataOrders.orders));
//               console.log("Data orders", dataOrders);
//        } else {
//               console.log("Data is not in the expected format:", dataOrders);
//        }
// }, [dataOrders]);




// Export actions
export const { setNewOrders } = newOrdersSlice.actions;
export const { setSoundNotification } = soundNotification.actions;

export const { setUser, removeUser } = userSlice.actions;
export const { setCategory, removeCategory } = categorySlice.actions;
export const { setOrdersAll } = ordersAllSlice.actions;
export const { setOrdersPending } = ordersPendingSlice.actions;
export const { setOrdersConfirmed } = ordersConfirmedSlice.actions;
export const { setOrdersProcessing } = ordersProcessingSlice.actions;
export const { setOrdersOutForDelivery } = ordersOutForDeliverySlice.actions;
export const { setOrdersDelivered } = ordersDeliveredSlice.actions;
export const { setOrdersReturned } = ordersReturnedSlice.actions;
export const { setOrdersFailed } = ordersFailedSlice.actions;
export const { setOrdersCanceled } = ordersCanceledSlice.actions;
export const { setOrdersSchedule } = ordersScheduleSlice.actions;

// Export reducers
export const newOrdersReducer = newOrdersSlice.reducer;
export const soundNotificationReducer = soundNotification.reducer;

export const userReducer = userSlice.reducer;
export const categoryReducer = categorySlice.reducer;
export const ordersAllReducer = ordersAllSlice.reducer;
export const ordersPendingReducer = ordersPendingSlice.reducer;
export const ordersConfirmedReducer = ordersConfirmedSlice.reducer;
export const ordersProcessingReducer = ordersProcessingSlice.reducer;
export const ordersOutForDeliveryReducer = ordersOutForDeliverySlice.reducer;
export const ordersDeliveredReducer = ordersDeliveredSlice.reducer;
export const ordersReturnedReducer = ordersReturnedSlice.reducer;
export const ordersFailedReducer = ordersFailedSlice.reducer;
export const ordersCanceledReducer = ordersCanceledSlice.reducer;
export const ordersScheduleReducer = ordersScheduleSlice.reducer;
