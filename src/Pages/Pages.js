/* Authentication */
// Login
export { default as LoginPage } from "./Authentication/LoginPage";
// Forget Password
export { default as ForgetPassPage } from "./Authentication/ForgetPassPage";

/* Dashboard */
// Home
export { default as HomePage } from "./Dashboard/Admin/Home/HomePage";
// Addons
export { default as AddonsPage } from "./Dashboard/Admin/Addons/AddonsPage";
export { default as AddAddonsSection } from "./Dashboard/Admin/Addons/AddAddonsSection";
export { default as EditAddonsPage } from "./Dashboard/Admin/Addons/EditAddonsPage";
// Category Setup
export { default as CategoryPage } from "./Dashboard/Admin/CategorySetup/CategoryPage";
export { default as AddCategorySection } from "./Dashboard/Admin/CategorySetup/AddCategorySection";
export { default as EditCategoryPage } from "./Dashboard/Admin/CategorySetup/EditCategoryPage";
// Product Setup
export { default as ProductPage } from "./Dashboard/Admin/ProductSetup/ProductPage";
export { default as AddProductPage } from "./Dashboard/Admin/ProductSetup/AddProductPage";
export { default as EditProductPage } from "./Dashboard/Admin/ProductSetup/EditProductPage";
// Setting
export { default as PaymentMethodPage } from "./Dashboard/Admin/Setting/PaymentMethod/PaymentMethodPage";
export { default as AddPaymentMethodSection } from "./Dashboard/Admin/Setting/PaymentMethod/AddPaymentMethodSection";
export { default as EditPaymentMethodPage } from "./Dashboard/Admin/Setting/PaymentMethod/EditPaymentMethodPage";
// Orders Payment
export { default as OrdersPaymentPendingPage } from "./Dashboard/Admin/OrdersPayment/OrdersPaymentPendingPage";
export { default as OrdersPaymentHistoryPage } from "./Dashboard/Admin/OrdersPayment/OrdersPaymentHistoryPage";
// Addons
export { default as AddDeliveryManSection } from "./Dashboard/Admin/DeliveryMan/AddDeliveryManSection";
export { default as EditDeliveryManPage } from "./Dashboard/Admin/DeliveryMan/EditDeliveryManPage";
export { default as DeliveryManPage } from "./Dashboard/Admin/DeliveryMan/DeliveryManPage";

// Orders
export { default as DetailsOrdersPage } from "./Dashboard/Admin/Orders/DetailsOrder/DetailsOrderPage";
export { default as InvoiceOrdersPage } from "./Dashboard/Admin/Orders/InvoiceOrder/InvoiceOrderPage";
export { default as SelectDateRangeSection } from "./Dashboard/Admin/Orders/SelectDateRangeSection";

export { default as CartsOrderSection } from "./Dashboard/Admin/Orders/AllOrders/CartsOrderSection";
export { default as AllOrdersPage } from "./Dashboard/Admin/Orders/AllOrders/AllOrdersPage";
export { default as PendingOrdersPage } from "./Dashboard/Admin/Orders/PendingOrders/PendingOrdersPage";
export { default as ConfirmedOrdersPage } from "./Dashboard/Admin/Orders/ConfirmedOrders/ConfirmedOrdersPage";
export { default as ProcessingOrdersPage } from "./Dashboard/Admin/Orders/ProcessingOrders/ProcessingOrdersPage";
export { default as OutForDeliveryOrdersPage } from "./Dashboard/Admin/Orders/OutForDeliveryOrders/OutForDeliveryOrdersPage";
export { default as DeliveredOrdersPage } from "./Dashboard/Admin/Orders/DeliveredOrders/DeliveredOrdersPage";
export { default as ReturnedOrdersPage } from "./Dashboard/Admin/Orders/ReturnedOrders/ReturnedOrdersPage";
export { default as FailedOrdersPage } from "./Dashboard/Admin/Orders/FailedOrders/FailedOrdersPage";
export { default as CanceledOrdersPage } from "./Dashboard/Admin/Orders/CanceledOrders/CanceledOrdersPage";
export { default as ScheduleOrdersPage } from "./Dashboard/Admin/Orders/ScheduleOrders/ScheduleOrdersPage";
