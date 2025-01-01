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
      ) : ( */}
      <div className="w-full text-black gap-6 pb-10">
        {/* First Row */}
        <div className="w-full px-3 flex flex-col justify-between lg:flex-row gap-6">
          {/* Chart Container for LineChart */}
          <div className="w-full lg:w-[70%]  flex flex-1">
            <div
              id="chart1"
              className="bg-white rounded-lg shadow-xl w-full h-full"
            >
              <LineChart title={"Order Statistics"} data={order_statistics} />
            </div>
          </div>

          {/* Container for DoughnutChart */}
          <div className="w-full lg:w-[30%] ">
            <div className="bg-white p-3 rounded-lg shadow-xl h-full">
              <DoughnutChart ordersData={ordersData} />
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="w-full pt-4 px-3 flex flex-col  justify-start lg:flex-row gap-6">
          {/* Chart Container for Earning Statistics */}
          <div className="w-full lg:w-[70%] flex flex-1">
            <div
              id="chart2"
              className="bg-white rounded-lg shadow-xl w-full h-full"
            >
              <LineChart
                title={"Earning Statistics"}
                data={earning_statistics}
              />
            </div>
          </div>

          {/* Flex Container for Recent Orders */}
          <div className="w-full lg:w-[30%]">
            <div className="bg-white p-1 rounded-lg shadow-xl h-full">
              <RecentOrders recent_orders={recent_orders} />
            </div>
          </div>
        </div>

      </div>
      {/* )} */}
    </>
  );
};

export default Chart;
