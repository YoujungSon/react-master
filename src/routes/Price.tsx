import styled from 'styled-components';

import { isDarkAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { fetchCoinTickers } from '../api';

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface PriceProps {
  coinId: string;
}
function Price({ coinId }: PriceProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<PriceData>(['tickers', coinId], () => fetchCoinTickers(coinId));
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <p>ath_date</p>
              <p>{data?.quotes.USD.ath_date.slice(0, 10)}</p>
              <p>price</p>
              <p>{data?.quotes.USD.price.toFixed(2)}</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>market_cap_change_24h</p>
              <p>{data?.quotes.USD.market_cap_change_24h} %</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>percent_change_1h</p>
              <p>{data?.quotes.USD.percent_change_1h} %</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>percent_change_1y</p>
              <p>{data?.quotes.USD.percent_change_1y} %</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>percent_change_6h</p>
              <p>{data?.quotes.USD.percent_change_6h} %</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>percent_change_7d</p>
              <p>{data?.quotes.USD.percent_change_7d} %</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>percent_change_12h</p>
              <p>{data?.quotes.USD.percent_change_12h} %</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>percent_change_15m</p>
              <p>{data?.quotes.USD.percent_change_15m} %</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>percent_change_24h</p>
              <p>{data?.quotes.USD.percent_change_24h} %</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>percent_change_30d</p>
              <p>{data?.quotes.USD.percent_change_30d} %</p>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>percent_change_30m</p>
              <p>{data?.quotes.USD.percent_change_30m} %</p>
            </OverviewItem>
          </Overview>
        </>
      )}
    </div>
  );
}

export default Price;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
const OverviewItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  p:nth-child(odd) {
    font-weight: bold;
  }
`;
