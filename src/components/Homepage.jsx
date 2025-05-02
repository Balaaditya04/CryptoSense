// import React from 'react';
// import millify from 'millify';
// import { Typography, Row, Col, Statistic } from 'antd';
// import { Link } from 'react-router-dom';
// import { useGetCryptosQuery } from '../services/cryptoAPI';
// const { Title } = Typography;

// const Homepage = () => {
//   const { data, isFetching } = useGetCryptosQuery(); 
//   console.log(data);





//   return (
//     <>
//     <Title level = {2} className='heading'>Global Crypto stats
//     <Row>
//         <Col span={12}><Statistic title="Total Cryptocurrencies" value="6" /></Col>
//         <Col span={12}><Statistic title="Total Exchanges" value="5"></Statistic></Col>
//         <Col span={12}><Statistic title="Total Market Cap" value="5"></Statistic></Col>
//         <Col span={12}><Statistic title="Total 24h Volume" value="5"></Statistic></Col>
//         <Col span={12}><Statistic title="Total Markets" value="5"></Statistic></Col>
//     </Row>
//     </Title>
//     </>

//   )
// }

// export default Homepage











import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import Loader from './loader';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import { Link } from 'react-router-dom';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';



const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10); 

  if (isFetching) return <Loader />;

  // API response structure might be: data?.data?.stats
  const globalStats = data?.data?.stats;

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?.total || "N/A"} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={globalStats?.totalExchanges || "N/A"} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={globalStats?.totalMarketCap ? millify(globalStats.totalMarketCap) : "N/A"} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={globalStats?.total24hVolume ? millify(globalStats.total24hVolume) : "N/A"} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={globalStats?.totalMarkets || "N/A"} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptos In The World</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3}><Link to="/news">Show more</Link></Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;






