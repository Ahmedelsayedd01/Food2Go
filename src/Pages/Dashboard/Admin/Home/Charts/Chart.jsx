import LineChart from "./LineChart";
import DoughnutChart from "./Doughnut ";
import RecentOrders from "./RecentOrder";

const Chart = ({ order_statistics, earning_statistics, orders, recent_orders }) => {
  return (
    <>
      <div className="w-full text-black gap-10">
        {/* First Row */}
        <div className="w-full flex flex-col justify-between lg:flex-row gap-6">
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
              <DoughnutChart ordersData={orders} />
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="w-full pt-4 flex flex-col  justify-start lg:flex-row gap-6">
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
    </>
  );
};

export default Chart;
