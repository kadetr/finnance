import React from 'react';
import Chart from 'react-google-charts';

export const options = {
  legend: 'none',
};

interface CandlestickChartProps {
  csData: Array<number | Date | string>[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  csData,
}: CandlestickChartProps) => {
  return (
    <>
      <Chart
        chartType='CandlestickChart'
        width='100%'
        height='400px'
        data={csData.length > 1 ? csData : [null]}
        options={options}
      />
    </>
  );
};

export default CandlestickChart;
