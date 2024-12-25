// import React from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';

// const LineChartComponent = ({ pData, uData, xLabels }) => {
//   return (
//     <div style={{ width: '100%', maxWidth: '600px', margin: 'auto' }}>
//       <h2 style={{ textAlign: 'center' }}>Order Statistics</h2>
//       <LineChart
//         width={600}
//         height={400}
//         series={[
//           { data: pData.map(item => item.y), label: 'Orders (pv)', yAxisKey: 'leftAxisId' },
//           { data: uData.map(item => item.y), label: 'Users (uv)', yAxisKey: 'rightAxisId' },
//         ]}
//         xAxis={[{ scaleType: 'point', data: xLabels }]}
//         yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
//       />
//     </div>
//   );
// };

// export default LineChartComponent;
