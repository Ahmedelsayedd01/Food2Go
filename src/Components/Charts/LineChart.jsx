import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({title}) => {
  const [selectedMonth, setSelectedMonth] = useState('All');

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [0,0,0,0,0,0,0,0,0,0,0,0],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: true,
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(255, 99, 132, 0.2)');
          gradient.addColorStop(1, 'rgba(255, 99, 132, 0)');
          return gradient;
        },
        tension: 0.4,
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: 'rgba(255, 99, 132, 0.5)',
        borderDash: [5, 5],
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const filteredData = {
    labels: selectedMonth === 'All' ? data.labels : [selectedMonth],
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      data:
        selectedMonth === 'All'
          ? dataset.data
          : [dataset.data[data.labels.indexOf(selectedMonth)]],
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,  // Hide legend (removes labels)
      },
      // title: {
      //   display: true,
      //   text: 'Order Statistics',
      //   align: 'start',
      //   color: '#991b1b',
      //   font: {
      //     size: 16,
      //   },
      // },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#e5e7eb',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold  text-[#991b1b] ">{title}</h2>
        <select
          className="bg-transparent text-[#991b1b] rounded px-3 py-2 text-sm font-bold"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="All">All Months</option>
          {data.labels.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <Line data={filteredData} options={options} />
    </div>
  );
};

export default LineChart;
