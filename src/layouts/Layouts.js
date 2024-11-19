/* Authentication */
// Login
export { default as LoginLayout } from "./Authentication/LoginLayout";
// Forget Password
export { default as ForgetPassLayout } from "./Authentication/ForgetPassLayout";

/* Dashboard */
// Home
export { default as DashboardLayout } from "./Dashboard/Home/DashboardLayout";

/* Addons */
export { default as AddonsLayout } from "./Dashboard/Addons/AddonsLayout";
export { default as EditAddonsLayout } from "./Dashboard/Addons/EditAddonsLayout";

/* Category Setup */
// Category Setup -> Category
export { default as CategoryLayout } from "./Dashboard/CategorySetup/CategoryLayout";
export { default as EditCategoryLayout } from "./Dashboard/CategorySetup/EditCategoryLayout";

/*  Product Setup */
// Product Setup -> Product
export { default as ProductLayout } from "./Dashboard/ProductSetup/ProductLayout";
export { default as EditProductLayout } from "./Dashboard/ProductSetup/EditProductLayout";
export { default as AddProductLayout } from "./Dashboard/ProductSetup/AddProductLayout";

/*  Setting */
// Setting -> Payment Method
export { default as PaymentMethodLayout } from "./Dashboard/Setting/PaymentMethod/PaymentMethodLayout";
export { default as EditPaymentMethodLayout } from "./Dashboard/Setting/PaymentMethod/EditPaymentMethodLayout";

/*  Orders */
// Orders -> All Orders
export { default as AllOrdersLayout } from "./Dashboard/Orders/AllOrders/AllOrdersLayout";
// Orders -> Details Order
export { default as DetailsOrderLayout } from "./Dashboard/Orders/DetailsOrder/DetailsOrderLayout";
// Orders -> Invoice Order
export { default as InvoiceOrderLayout } from "./Dashboard/Orders/InvoiceOrder/InvoiceOrderLayout";
