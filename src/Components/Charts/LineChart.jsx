// import React, { useState } from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';
// import { MenuItem, Select, FormControl } from '@mui/material';

// const LineChartComponent = ({ pData, uData, xLabels }) => {
//   const [timeScale, setTimeScale] = useState('Month');

//   const handleChange = (event) => {
//     setTimeScale(event.target.value);
//   };

//   return (
//     <div style={{ width: '100%', maxWidth: '800px', margin: 'auto', border: '1px solid #ddd', borderRadius: '10px', padding: '20px' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
//         <h2 style={{ color: 'darkred', margin: 0 }}>Order Statistics</h2>
//         <FormControl>
//           <Select
//             value={timeScale}
//             onChange={handleChange}
//             displayEmpty
//             inputProps={{ 'aria-label': 'Without label' }}
//             sx={{ color: 'darkred', borderColor: 'darkred' }}
//           >
//             <MenuItem value="Month">Month</MenuItem>
//             <MenuItem value="Week">Week</MenuItem>
//             <MenuItem value="Year">Year</MenuItem>
//           </Select>
//         </FormControl>
//       </div>
//       <LineChart
//         width={800}
//         height={400}
//         series={[
//           { data: pData.map(item => item.y), label: 'Orders (pv)', yAxisKey: 'leftAxisId', color: 'darkred', dashed: false },
//           { data: uData.map(item => item.y), label: 'Users (uv)', yAxisKey: 'rightAxisId', color: 'darkred', dashed: true },
//         ]}
//         xAxis={[{ scaleType: 'point', data: xLabels }]}
//         yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
//       />
//     </div>
//   );
// };

// export default LineChartComponent;
