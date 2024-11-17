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