import React, { useEffect, useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ ordersData }) => {
   const [totalOrders, setTotalOrders] = useState(0);
   const totalOrdersRef = useRef(totalOrders);  

   useEffect(() => {
       if (ordersData) {
           setTotalOrders(ordersData.orders || 0);
           totalOrdersRef.current = ordersData.orders || 0;  // Update the ref value immediately
           console.log("Total Orders:", ordersData.orders);
       }
   }, [ordersData]);
   
   const data = {
       labels: ['Pending', 'Canceled', 'Ongoing', 'Returned', 'Delivered', 'Failed To Deliver'],
       datasets: [
           {
               data: [
                   ordersData.pending,             // Pending
                   ordersData.canceled,            // Canceled
                   ordersData.processing,          // Ongoing
                   ordersData.returned,            // Returned
                   ordersData.delivered,           // Delivered
                   ordersData.faild_to_deliver    // Failed To Deliver
               ],
               backgroundColor: [
                   '#f3d9d9',  // Pending
                   '#f28c8c',  // Canceled
                   '#8c0000',  // Ongoing
                   '#d32f2f',  // Returned
                   '#b71c1c',  // Delivered
                   '#e57373'   // Failed To Deliver
               ],
               borderWidth: 0,
           },
       ],
   };

   const options = {
       cutout: '60%',  // Adjusted cutout for smaller donut
       plugins: {
           legend: {
               display: false,
           },
           tooltip: {
               callbacks: {
                   label: function (tooltipItem) {
                       return `${tooltipItem.label}: ${tooltipItem.raw}`;
                   },
               },
           },
       },
   };

   // Custom Plugin for Center Text
   const centerTextPlugin = {
       id: 'centerText',
       beforeDraw: (chart) => {
           const { ctx, chartArea: { width, height } } = chart;
           ctx.restore();
           const fontSize = (width / 10).toFixed(2);  // Smaller text size
           ctx.font = `bold ${fontSize}px sans-serif `;
           ctx.textAlign = 'center';
           ctx.textBaseline = 'middle';
           ctx.fillStyle = '#8c0000';

           const textX = width / 2;
           const textY = height / 2.3;

           // Use the ref value for the updated totalOrders
           ctx.fillText(String(totalOrdersRef.current), textX, textY);

           ctx.font = `bold ${(fontSize / 2).toFixed(2)}px sans-serif`; 
           ctx.fillText('Order', textX, textY + 30);
           ctx.save();
       }
   };

   return (
       <div className="chart-container" style={{ width: 'fit', margin: 'auto' }}>
           <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
           <div className="legend" style={{
               display: 'flex', 
               justifyContent: 'start', 
               flexWrap: 'wrap', 
               marginTop: '14px'
           }}>
               {data.labels.map((label, index) => (
                   <div key={index} className="legend-item" style={{ 
                       display: 'flex', 
                       alignItems: 'center', 
                       margin: '5px 10px' 
                   }}>
                       <div
                           className="legend-color"
                           style={{
                               width: '15px',
                               height: '15px',
                               backgroundColor: data.datasets[0].backgroundColor[index],
                               borderRadius: '50%',  
                               marginRight: '8px',
                           }}
                       ></div>
                       <span style={{ fontSize: '14px' }}>{label}</span>
                   </div>
               ))}
           </div>
       </div>
   );
};

export default DonutChart;
