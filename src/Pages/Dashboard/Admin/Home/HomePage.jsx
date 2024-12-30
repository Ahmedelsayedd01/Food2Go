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
// import { pData,uData,xLabels } from '../../../../Components/Charts/data'

const HomePage = () => {
  const {
    refetch: refetchCountOrders,
    loading,
    data: dataCountOrders,
  } = useGet({
    url: "https://Bcknd.food2go.online/admin/order/count",
  });

  //   const {
  //     refetch: refetchChart,
  //     loading: loadingChart,
  //     data: dataChart,
  //   } = useGet({
  //     url: "https://bcknd.food2go.online/admin/home",
  //   });
  //   const [dataHome, setDataHome] = useState([]);
  //   const [order_statistics,setOrder_statistics] = useState({})
  //   const [earning_statistics,setEarning_statistics] = useState({})
  //   const [recent_orders,setRecent_orders] = useState([])

  //   useEffect(() => {
  //     refetchChart();
  //   }, [refetchChart]);


  //   useEffect(() => {
  //     if (dataChart) {
  //       setDataHome(dataChart);
  //       setOrder_statistics(dataChart.order_statistics)
  //       setEarning_statistics(dataChart.earning_statistics)
  //       setRecent_orders(dataChart.recent_orders)

  //     }
  //     console.log("fetch data Home", dataChart);
  //     console.log("fetch data Home stat order", dataChart.order_statistics);
  //     console.log("fetch data Home stat earn",dataChart.earning_statistics);
  //     console.log("fetch data Home stat recent",dataChart.recent_orders);

  //   }, [dataChart]);


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
  }, [refetchCountOrders]);

  const userName = useSelector((state) => state.user.name);

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
      <strong>{userName || "asada"}</strong>
      <div className="w-full flex flex-col mb-0">
        {loading ? (
          <>
            <div className="w-full flex justify-center items-center">
              <LoaderLogin />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-7 items-start justify-center pb-16">
              <CartsOrderSection ordersNum={counters} />
              <Chart />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
