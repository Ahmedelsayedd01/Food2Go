import React from 'react'
import LineChart from './LineChart'
// import { Doughnut } from 'react-chartjs-2'
import DoughnutChart from './Doughnut '
import RecentOrders from './RecentOrder'

const Chart = () => {
    return (
      <div className="space-y-6 text-black w-full p-4">
        {/* First Row */}
        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-full lg:w-[70%] p-4">
            <div id="chart1">
              <LineChart title={"Order Statistics"}  />
            </div>
          </div>
          <div className="w-full lg:w-[30%] p-4">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <DoughnutChart />
            </div>
          </div>
        </div>
  
        {/* Second Row */}
        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-full lg:w-[70%] p-4">
            <div id="chart2">
              <LineChart title={"Earning Statistics"} />
            </div>
          </div>
          <div className="w-full lg:w-[30%] p-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <RecentOrders />
            </div>
          </div>
        </div>
      </div>
    )
  }

export default Chart