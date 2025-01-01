import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({ title, data }) => {
  const [selectedMonth, setSelectedMonth] = useState('All');

  // Extract labels and datasets dynamically from props
  const labels = Object.keys(data);
  const values = Object.values(data);
  useEffect(() => {
  console.log("data line ",data)
  }, [data])
  
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

  // Filter data based on selected month
  const filteredData = {
    labels: selectedMonth === 'All' ? labels : [selectedMonth],
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      data:
        selectedMonth === 'All'
          ? dataset.data
          : [dataset.data[labels.indexOf(selectedMonth)]],
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
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#991b1b]">{title}</h2>
        <select
          className="bg-transparent text-[#991b1b] rounded px-3 py-2 text-sm font-bold"
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
