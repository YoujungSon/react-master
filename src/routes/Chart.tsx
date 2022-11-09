import { useQuery } from '@tanstack/react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './../atoms';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId), {
    refetchInterval: 10000,
  });
  const exceptData = data ?? [];
  const chartData = exceptData?.map((i) => {
    return {
      x: i.time_close,
      y: [parseFloat(i.open), parseFloat(i.high), parseFloat(i.low), parseFloat(i.close)],
    };
  });
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type='candlestick'
          height={350}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              type: 'candlestick',
              height: 350,
              width: 500,
              background: 'transparent',
            },
            stroke: {
              curve: 'straight',
              width: 2,
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
          series={[
            {
              data: chartData,
            },
          ]}
        />
      )}
    </div>
  );
}
export default Chart;
