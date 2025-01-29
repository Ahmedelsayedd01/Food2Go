import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  AddonsLayout,
  AddProductLayout,
  AllOrdersLayout,
  BannersLayout,
  BranchesLayout,
  CanceledOrdersLayout,
  CancelTimeLayout,
  CategoryLayout,
  CitiesLayout,
  ConfirmedOrdersLayout,
  DashboardLayout,
  DealOrderLayout,
  DeliveredOrdersLayout,
  DeliveryManLayout,
  DeliveryTimeLayout,
  DetailsOrderLayout,
  DiscountLayout,
  EditAddonsLayout,
  EditBannerLayout,
  EditBranchLayout,
  EditCategoryLayout,
  EditCityLayout,
  EditDeliveryManLayout,
  EditDiscountLayout,
  EditOfferLayout,
  EditPaymentMethodLayout,
  EditProductLayout,
  EditTaxLayout,
  EditZoneLayout,
  FailedOrdersLayout,
  ForgetPassLayout,
  InvoiceOrderLayout,
  LanguagesLayout,
  LoginLayout,
  OffersLayout,
  OrdersPaymentLayout,
  OrderTypeLayout,
  OutForDeliveryOrdersLayout,
  PaymentMethodLayout,
  PendingOrdersLayout,
  ProcessingOrdersLayout,
  ProductLayout,
  ResturantTimeLayout,
  ReturnedOrdersLayout,
  ScheduleOrdersLayout,
  SongLayout,
  TaxesLayout,
  TaxTypeLayout,
  ZonesLayout,
  CouponLayout,
  EditCouponLayout,
  BuyOfferLayout,
  DealsLayout,
  EditDealLayout,
  AutomaticPaymentLayout,
  CustomersLayout,
  EditCustomersLayout,
  BusinessSetupLayout,
  EditRoleLayout,
  RolesLayout,
  AdminsLayout,
  EditAdminLayout
} from "./layouts/Layouts";
import ProtectedLogin from "./ProtectedData/ProtectedLogin";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import App from "./App";
import { BusinessSettingsPage, CustomerLoginPage, MainBranchSetupPage, OrdersPage, OrdersPaymentHistoryPage, OrdersPaymentPendingPage, RestaurantTimeSlotPage } from "./Pages/Pages";

const ProductSetupLayout = () => {
  return <Outlet />;
}
const SettingLayout = () => {
  return <Outlet />;
}
const OrderLayout = () => {
  return (
    <Outlet />
  );
};

export const router = createBrowserRouter([
  /* Login Admin */
  {
    path: "/",
    element: <ProtectedLogin />,
    children: [
      {
        path: '',
        element: <LoginLayout />,
      }
    ]
  },

  /* Forget Password User */
  {
    path: "/forget_password",
    element: <ProtectedLogin />,
    children: [
      {
        path: '',
        element: <ForgetPassLayout />,
      }
    ]
  },

  /* Dashboard or main app routes after login */
  {
    path: "/dashboard",
    element: <ProtectedLogin />,
    children: [
      {
        path: '',
        element: <App />,
        children: [
          {
            path: '',
            element: <DashboardLayout />
          },
          {
            path: 'addons',
            children: [
              {
                path: '',
                element: <AddonsLayout />,
              },
              {
                path: 'edit/:addonId',
                element: <EditAddonsLayout />,
              }
            ]
          },
          {
            path: 'category',
            children: [
              {
                path: '',
                element: <CategoryLayout />,
              },
              {
                path: 'edit/:categoryId',
                element: <EditCategoryLayout />,
              }
            ]
          },
          {
            path: 'banners',
            children: [
              {
                path: '',
                element: <BannersLayout />,
              },
              {
                path: 'edit/:bannerId',
                element: <EditBannerLayout />,
              }
            ]
          },

          {
            path: 'setup_product',
            element: <ProductSetupLayout />,
            children: [
              {
                path: 'product',
                element: <ProductLayout />,
              },
              {
                path: 'product/add',
                element: <AddProductLayout />,
              },
              {
                path: 'product/edit/:productId',
                element: <EditProductLayout />,
              }
            ]
          },
          {
            path: 'setting',
            element: <SettingLayout />,
            children: [
              {
                path: 'roles',
                children: [
                  {
                    path: '',
                    element: <RolesLayout />,
                  },
                  {
                    path: 'edit/:roleId',
                    element: <EditRoleLayout />,
                  }
                ]
              },
              {
                path: 'payment_method',
                children: [
                  {
                    path: '',
                    children: [
                      {
                        index: true,
                        element: <PaymentMethodLayout />,
                      },
                      {
                        path: 'edit/:paymentMethodId',
                        element: <EditPaymentMethodLayout />
                      }
                    ]
                  },
                ]
              },
              {
                path: 'automatic_payment',
                children: [
                  {
                    path: '',
                    element: <AutomaticPaymentLayout />,
                  },
                  // {
                  //   path: 'edit/:cityId',
                  //   element: <EditCityLayout />,
                  // }
                ]
              },
              {
                path: 'cities',
                children: [
                  {
                    path: '',
                    element: <CitiesLayout />,
                  },
                  {
                    path: 'edit/:cityId',
                    element: <EditCityLayout />,
                  }
                ]
              },
              {
                path: 'branches',
                children: [
                  {
                    path: '',
                    element: <BranchesLayout />,
                  },
                  {
                    path: 'edit/:branchId',
                    element: <EditBranchLayout />,
                  }
                ]
              },
              {
                path: 'zones',
                children: [
                  {
                    path: '',
                    element: <ZonesLayout />,
                  },
                  {
                    path: 'edit/:zoneId',
                    element: <EditZoneLayout />,
                  }
                ]
              },
              {
                path: 'order_type',
                element: <OrderTypeLayout />,
              },
              {
                path: 'resturant_time',
                element: <ResturantTimeLayout />,
              },
              {
                path: 'cancel_time',
                element: <CancelTimeLayout />,
              },
              {
                path: 'delivery_time',
                element: <DeliveryTimeLayout />,
              },
              {
                path: 'sound',
                element: <SongLayout />,
              },
            ]
          },
          {
            path: 'taxes',
            children: [
              {
                path: 'all_taxes',
                children: [
                  {
                    path: '',
                    element: <TaxesLayout />,
                  },
                  {
                    path: 'edit/:taxId',
                    element: <EditTaxLayout />,
                  }
                ]
              },
              {
                path: 'tax_type',
                element: <TaxTypeLayout />,
              },
            ]
          },
          {
            path: 'orders_payment',
            element: <OrdersPaymentLayout />,

            children: [
              {
                path: 'payment_pending',
                element: <OrdersPaymentPendingPage />,
              },
              {
                path: 'payment_history',
                element: <OrdersPaymentHistoryPage />,
              },
            ]
          },
          {
            path: 'delivery_man',
            children: [
              {
                path: '',
                element: <DeliveryManLayout />,
              },
              {
                path: 'edit/:deliveryManId',
                element: <EditDeliveryManLayout />,
              }
            ]
          },
          {
            path: 'users',
            children: [
              {
                path: 'admins',
                children: [
                  {
                    path: '',
                    element: <AdminsLayout />,
                  },
                  {
                    path: 'edit/:adminId',
                    element: <EditAdminLayout />,
                  }
                ]
              },
              {
                path: 'customers',
                children: [
                  {
                    path: '',
                    element: <CustomersLayout />,
                  },
                  {
                    path: 'edit/:customerId',
                    element: <EditCustomersLayout />,
                  }
                ]
              },
            ]
          },
          {
            path: 'business_setup',
            element: <BusinessSetupLayout />,

            children: [
              {
                path: 'business_settings',
                element: <BusinessSettingsPage />,
              },
              {
                path: 'main_branch_setup',
                element: <MainBranchSetupPage />,
              },
              {
                path: 'restaurant_time_slot',
                element: <RestaurantTimeSlotPage />,
              },
              {
                path: 'customer_login',
                element: <CustomerLoginPage />,
              },
              {
                path: 'orders',
                element: <OrdersPage />,
              },
            ]
          },
          {
            path: 'deals',
            children: [
              {
                path: '',
                element: <DealsLayout />,
              },
              {
                path: 'edit/:dealId',
                element: <EditDealLayout />,
              }
            ]
          },
          {
            path: 'offers',
            children: [
              {
                path: '',
                element: <OffersLayout />,
              },
              {
                path: 'edit/:offerId',
                element: <EditOfferLayout />,
              }
            ]
          },
          {
            path: 'coupon',
            children: [
              {
                path: '',
                element: <CouponLayout />,
              },
              {
                path: 'edit/:couponId',
                element: <EditCouponLayout />,
              }
            ]
          },
          {
            path: 'languages',
            children: [
              {
                path: '',
                element: <LanguagesLayout />,
              },
            ]
          },
          {
            path: 'discount',
            children: [
              {
                path: '',
                element: <DiscountLayout />,
              },
              {
                path: 'edit/:discountId',
                element: <EditDiscountLayout />,
              }
            ]
          },
          {
            path: 'deal_order',
            element: <DealOrderLayout />,
          },
          {
            path: 'buy_offer',
            element: <BuyOfferLayout />,
          },

          {
            path: 'orders',
            element: <OrderLayout />,
            children: [
              /* All orders */
              {
                path: 'all',
                element: <AllOrdersLayout />
              },
              {
                path: 'pending',
                element: <PendingOrdersLayout />
              },
              {
                path: 'confirmed',
                element: <ConfirmedOrdersLayout />
              },
              {
                path: 'processing',
                element: <ProcessingOrdersLayout />
              },
              {
                path: 'out_for_delivery',
                element: <OutForDeliveryOrdersLayout />
              },
              {
                path: 'delivered',
                element: <DeliveredOrdersLayout />
              },
              {
                path: 'returned',
                element: <ReturnedOrdersLayout />
              },
              {
                path: 'failed',
                element: <FailedOrdersLayout />
              },
              {
                path: 'canceled',
                element: <CanceledOrdersLayout />
              },
              {
                path: 'schedule',
                element: <ScheduleOrdersLayout />
              },

              /* Details Order */
              {
                path: 'details/:orderId',
                element: <DetailsOrderLayout />
              },
              /* Invoice Order */
              {
                path: 'invoice/:orderId',
                element: <InvoiceOrderLayout />
              },
            ]
          },
        ]
      },
    ],
  },

  /* Catch-all for 404 */
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
