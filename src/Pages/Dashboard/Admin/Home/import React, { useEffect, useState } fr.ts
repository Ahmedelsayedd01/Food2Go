import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartsOrderSection from "../Orders/AllOrders/CartsOrderSection";
import { Cart, LoaderLogin } from "../../../../Components/Components";
import { OrdersComponent } from "../../../../Store/CreateSlices";
import { useGet } from "../../../../Hooks/useGet";
// import LineChartComponent from '../../../../Components/Charts/LineChart'
// import LineChartComponent from '../../../../Components/Charts/LineChart'
import LineChartComponent from "../../../../Components/Charts/LineChart";
import Chart from "../../../../Components/Charts/Chart";
import FooterCard from "../../../../Components/FooterHome/FooterCard";
// import { pData,uData,xLabels } from '../../../../Components/Charts/data'

const HomePage = () => {


  const {
    refetch: refetchCountOrders,
    loading:loadingCountOrders,
    data: dataCountOrders,
  } = useGet({
    url: "https://bcknd.food2go.online/admin/order/count",
  });

  const {
    refetch: refetchChart,
    loading: loadingChart,
    data: dataCharts,
  } = useGet({
    url: "https://bcknd.food2go.online/admin/home",
  });
  const [dataHome, setDataHome] = useState([]);
  const [order_statistics, setOrder_statistics] = useState({})
  const [earning_statistics, setEarning_statistics] = useState({})
  //   const [orders,setOrders] = useState({})
  const [recent_orders, setRecent_orders] = useState([])






  const mockData = {
    pData: [
      { x: "Jan", y: 100 },
      { x: "Feb", y: 150 },
      { x: "Mar", y: 200 },
      { x: "Apr", y: 250 },
      { x: "May", y: 300 },
    ],
    uData: [
      { x: "Jan", y: 80 },
      { x: "Feb", y: 120 },
      { x: "Mar", y: 180 },
      { x: "Apr", y: 220 },
      { x: "May", y: 280 },
    ],
    xLabels: ["Jan", "Feb", "Mar", "Apr", "May"],
  };

  useEffect(() => {
    console.log("Fetching Count Orders...");
    refetchCountOrders();
    refetchChart();
  }, [refetchCountOrders, refetchChart]);

  const userName = useSelector((state) => state.user.name);

  useEffect(() => {
    if (dataCharts) {
      setDataHome(dataCharts);
      setOrder_statistics(dataCharts.order_statistics)
      setEarning_statistics(dataCharts.earning_statistics)
      setRecent_orders(dataCharts.recent_orders)
      //   setOrders(dataCharts.orders)

    }
    console.log("fetch data Home", dataHome);
    console.log("fetch data Home", dataCharts);
    console.log("fetch data Home stat order", dataHome.order_statistics);
    console.log("fetch data Home stat earn", dataHome.earning_statistics);
    console.log("fetch data Home stat recent", dataHome.recent_orders);
    console.log("fetch data Home stat order", order_statistics);
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
        {loadingCountOrders && loadingChart ? (
          <>
            <div className="w-full flex justify-center items-center">
              <LoaderLogin />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-7 items-start justify-center pb-16">
              <CartsOrderSection ordersNum={counters} />
              <Chart 
              />
  <div className="footer flex flex-wrap gap-5 p-6">
  <div className="footer-card flex-1 min-w-[350px] max-w-[300px] p-4 bg-gray-100 rounded-lg shadow-md">
    <FooterCard title={"Top Selling Products"} layout="TopSelling" />
  </div>
  {/* <div className="footer-card flex-1 min-w-[250px] max-w-[300px] p-4 bg-gray-100 rounded-lg shadow-md">
    <FooterCard title={"Most Rated Products"} layout="MostRated" />
  </div> */}
  <div className="footer-card flex-1 min-w-[350px] max-w-[300px] p-4 bg-gray-100 rounded-lg shadow-md">
    <FooterCard title={"Offers"} layout="Offers" />
  </div>
  <div className="footer-card flex-1 min-w-[350px] max-w-[300px] p-4 bg-gray-100 rounded-lg shadow-md">
    <FooterCard  title ={"Top Customer"} layout="default"  />
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
