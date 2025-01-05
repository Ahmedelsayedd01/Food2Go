import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({ title, data }) => {
  const [selectedMonth, setSelectedMonth] = useState('All');

  // Extract labels (months) and values dynamically from props
  const labels = Object.keys(data);
  const values = Object.values(data);

  useEffect(() => {
    console.log("data line ", data);
  }, [data]);

  // Prepare chart data
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
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
    ],
  };

  // Filter the data based on the selected month
  const filteredData = {
    labels: selectedMonth === 'All' ? labels : [selectedMonth],
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      data:
        selectedMonth === 'All'
          ? dataset.data
          : [dataset.data[labels.indexOf(selectedMonth)]], // Display data only for the selected month
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
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
          // Dynamically set stepSize or remove it entirely
          stepSize: Math.ceil(Math.max(...values) / 10), // Divide range into 10 steps
          maxTicksLimit: 10, // Limit the maximum number of ticks
        },
      },
    },
  };

  return (
    <div className="p-2 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-TextFontSemiBold text-[#991b1b]">{title}</h2>
        <select
          className="bg-transparent text-[#991b1b] rounded px-3 py-2 text-sm font-TextFontSemiBold"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="All">All Months</option>
          {labels.map((month) => (
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
