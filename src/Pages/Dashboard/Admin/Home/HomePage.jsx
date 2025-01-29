import React, { useEffect, useState } from "react";
import CartsOrderSection from "../Orders/AllOrders/CartsOrderSection";
import { LoaderLogin } from "../../../../Components/Components";
import { OrdersComponent } from "../../../../Store/CreateSlices";
import { useGet } from "../../../../Hooks/useGet";
import Chart from "./Charts/Chart";
import FooterCard from "./FooterHome/FooterCard";

const HomePage = () => {

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {
    refetch: refetchCountOrders,
    loading,
    data: dataCountOrders,
  } = useGet({
    url: `${apiUrl}/admin/order/count`,
  });

  const {
    refetch: refetchChart,
    loading: loadingChart,
    data: dataCharts,
  } = useGet({
    url: `${apiUrl}/admin/home`,
  });
  const [dataHome, setDataHome] = useState([]);
  const [order_statistics, setOrder_statistics] = useState({})
  const [earning_statistics, setEarning_statistics] = useState({})
  const [orders, setOrders] = useState({})
  const [recent_orders, setRecent_orders] = useState([])
  const [offers, setOffers] = useState([])
  const [topSelling, SetTopSelling] = useState([])
  const [topCustomers, setTopCustomers] = useState({})

  useEffect(() => {
    console.log("Fetching Count Orders...");
    refetchCountOrders();
    refetchChart();
  }, [refetchCountOrders, refetchChart]);

  useEffect(() => {
    if (dataCharts) {
      setDataHome(dataCharts);
      setOrder_statistics(dataCharts.order_statistics)
      setEarning_statistics(dataCharts.earning_statistics)
      setRecent_orders(dataCharts.recent_orders)
      setOrders(dataCharts.orders)
      setOffers(dataCharts.offers)
      SetTopSelling(dataCharts.top_selling)
      setTopCustomers(dataCharts.top_customers)


    }
    console.log("fetch data Home", dataHome);
    console.log("fetch data Home", dataCharts);
    console.log("fetch data Home stat order", dataHome.order_statistics);
    console.log("fetch data Home stat earn", dataHome.earning_statistics);
    console.log("fetch data Home stat recent", dataHome.recent_orders);
    console.log("fetch data Home stat order", order_statistics);
    console.log("fetch data Home stat offers", dataHome.offers);
    console.log("fetch data Home stat top_customers", dataHome.top_customers);
    console.log("fetch data Home stat top_selling", dataHome.top_selling);
    // console.log("fetch data Home stat order", dataCharts.orders);

  }, [dataCharts, dataHome, order_statistics]);

  const counters = {
    ordersAll: dataCountOrders?.orders || 0,
    ordersPending: dataCountOrders?.pending || 0,
    ordersConfirmed: dataCountOrders?.confirmed || 0,
    ordersProcessing: dataCountOrders?.processing || 0,
    ordersOutForDelivery: dataCountOrders?.out_for_delivery || 0,
    ordersDelivered: dataCountOrders?.delivered || 0,
    ordersReturned: dataCountOrders?.returned || 0,
    ordersFailed: dataCountOrders?.faild_to_deliver || 0,
    ordersCanceled: dataCountOrders?.canceled || 0,
    ordersSchedule: dataCountOrders?.scheduled || 0,
  };

  return (
    <>
      <OrdersComponent />
      <div className="w-full flex flex-col mb-0">
        {loading && loadingChart ? (
          <>
            <div className="w-full flex justify-center items-center">
              <LoaderLogin />
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex flex-col gap-7 items-start justify-center pb-28">
              <CartsOrderSection ordersNum={counters} />
              <div className="w-full flex flex-col gap-7 items-start justify-center px-4">
                <Chart
                  order_statistics={order_statistics}
                  earning_statistics={earning_statistics}
                  recent_orders={recent_orders}
                  orders={orders}
                />
                <div className="w-full flex items-center justify-between flex-wrap gap-5">
                  <FooterCard title={"Top Selling Products"} link="/dashboard/setup_product/product" layout={"TopSelling"} topCustomers={topCustomers} topSelling={topSelling} offers={offers} />
                  {/* <FooterCard title={"Most Rated Products"} link="/dashboard/setup_product/product" /> */}
                  <FooterCard title={"Deals"} link="/dashboard/deals" layout={"Deals"} topCustomers={topCustomers} topSelling={topSelling} offers={offers} />
                  <FooterCard title={"Top Customer"} link="/dashboard/users/customers" layout={"default"} topCustomers={topCustomers} topSelling={topSelling} offers={offers} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
