import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart({xAxis,series}) {
  return (
  <div className="LineChart">
    <LineChart
      xAxis={xAxis}
      series={series}
      width={1500}
      height={430}
    />
    </div>
  );
}