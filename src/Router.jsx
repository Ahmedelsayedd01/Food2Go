import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  AddonsLayout,
  AddProductLayout,
  CategoryLayout,
  DashboardLayout,
  EditAddonsLayout,
  EditCategoryLayout,
  EditPaymentMethodLayout,
  EditProductLayout,
  ForgetPassLayout,
  LoginLayout,
  PaymentMethodLayout,
  ProductLayout
} from "./layouts/Layouts";
import ProtectedLogin from "./ProtectedData/ProtectedLogin";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import App from "./App";

const ProductSetupLayout = () => {
  return <Outlet />;
}
const SettingLayout = () => {
  return <Outlet />;
}
export const router = createBrowserRouter([
  /* Login Admin */
  {
    path: "/login",
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
                    element: <PaymentMethodLayout />
                  },
                  {
                    path: 'edit/:paymentMethodId',
                    element: <EditPaymentMethodLayout />
                  }
                ]
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
