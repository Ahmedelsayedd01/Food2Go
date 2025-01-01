import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
// import { Doughnut } from 'react-chartjs-2'
import DoughnutChart from "./Doughnut ";
import RecentOrders from "./RecentOrder";
import { useGet } from "../../Hooks/useGet";
import { LoaderLogin } from "../Components";

const Chart = () => {
  const {
    refetch: refetchChart,
    loading: loadingChart,
    data: dataCharts,
  } = useGet({
    url: "https://bcknd.food2go.online/admin/home",
  });
  const [dataHome, setDataHome] = useState([]);
  const [order_statistics, setOrder_statistics] = useState({});
  const [earning_statistics, setEarning_statistics] = useState({});
  const [ordersData, setOrders] = useState({});
  const [recent_orders, setRecent_orders] = useState([]);

  useEffect(() => {
    console.log("Fetching Count Orders...");

    refetchChart();
  }, [refetchChart]);

  useEffect(() => {
    if (dataCharts) {
      setDataHome(dataCharts);
      setOrder_statistics(dataCharts.order_statistics);
      setEarning_statistics(dataCharts.earning_statistics);
      setRecent_orders(dataCharts.recent_orders);
      setOrders(dataCharts.orders);
    }
    console.log("fetch data Home", dataHome);
    console.log("fetch data chart", dataCharts);
    console.log("fetch data Home stat order", dataHome.order_statistics);
    console.log("fetch data Home stat earn", dataHome.earning_statistics);
    console.log("fetch data Home stat recent", dataHome.recent_orders);
    console.log("fetch data Home stat order", order_statistics);
    // console.log("fetch data Home stat order", dataCharts.orders);
  }, [dataCharts, dataHome, order_statistics]);
  return (
    <>
      {loadingChart ? (
        <div className="w-full h-56 flex justify-center items-center mt-8">
          <LoaderLogin />
        </div>
      ) : (
        <div className="space-y-8 text-black w-full px-6 py-4 lg:px-10 lg:py-12">
        {/* First Row - Two Columns */}
        <div className="flex flex-col lg:flex-row w-full gap-6">
          {/* First Column */}
          <div className="w-full lg:w-[70%] p-6 flex flex-col gap-6">
            {/* First Line - Order Statistics LineChart */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <LineChart title={"Order Statistics"} data={order_statistics} />
            </div>
      
            {/* Second Line - Earning Statistics LineChart */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <LineChart title={"Earning Statistics"} data={earning_statistics} />
            </div>
          </div>
      
          {/* Second Column */}
          <div className="w-full lg:w-[30%] p-6 flex flex-col gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <DoughnutChart ordersData={ordersData} />
            </div>
      
            {/* Recent Orders */}
            <div className="bg-gray-100 rounded-lg shadow-md p-6">
              <RecentOrders recent_orders={recent_orders} />
            </div>
          </div>
        </div>
      </div>
      
      )}
    </>
  );
};

export default Chart;
