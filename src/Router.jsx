import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  AddonsLayout,
  AddProductLayout,
  AllOrdersLayout,
  CanceledOrdersLayout,
  CategoryLayout,
  ConfirmedOrdersLayout,
  DashboardLayout,
  DeliveredOrdersLayout,
  DeliveryManLayout,
  DetailsOrderLayout,
  EditAddonsLayout,
  EditCategoryLayout,
  EditDeliveryManLayout,
  EditPaymentMethodLayout,
  EditProductLayout,
  FailedOrdersLayout,
  ForgetPassLayout,
  InvoiceOrderLayout,
  LoginLayout,
  OrdersPaymentLayout,
  OutForDeliveryOrdersLayout,
  PaymentMethodLayout,
  PendingOrdersLayout,
  ProcessingOrdersLayout,
  ProductLayout,
  ReturnedOrdersLayout,
  ScheduleOrdersLayout
} from "./layouts/Layouts";
import ProtectedLogin from "./ProtectedData/ProtectedLogin";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import App from "./App";
import { OrdersPaymentHistoryPage, OrdersPaymentPendingPage } from "./Pages/Pages";

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
          }


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
