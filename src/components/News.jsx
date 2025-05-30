// import React, { useState } from 'react';
// import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
// import moment from 'moment';

// import { useGetCryptoNewsQuery } from '../services/cryptoNewsAPI';
// import { useGetCryptosQuery } from '../services/cryptoAPI';

// const { Text, Title } = Typography;
// const { Option } = Select;

// // Demo image to use as fallback
// const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

// const News = ({ simplified }) => {
//   // const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
//   const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 10 : 100});
// //   const { data } = useGetCryptosQuery(100);
//   console.log(cryptoNews);
//   return(
//     <div>
//       News
//     </div>
//   )
// }
//   if (!cryptoNews?.value) return 'Loading...';

//   return (
//     <Row gutter={[24, 24]}>
//       {!simplified && (
//         <Col span={24}>
//           <Select
//             showSearch
//             className="select-news"
//             placeholder="Select a Crypto"
//             optionFilterProp="children"
//             onChange={(value) => setNewsCategory(value)}
//             filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
//           >
//             <Option value="Cryptocurency">Cryptocurrency</Option>
//             {data?.data?.coins?.map((currency) => <Option value={currency.name} key={currency.id}>{currency.name}</Option>)}
//           </Select>
//         </Col>
//       )}
//       {cryptoNews.value.map((news, i) => (
//         <Col xs={24} sm={12} lg={8} key={i}>
//           <Card hoverable className="news-card">
//             <a href={news.url} target="_blank" rel="noreferrer">
//               <div className="news-image-container">
//                 <Title className="news-title" level={4}>{news.name}</Title>
//                 <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
//               </div>
//               <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
//               <div className="provider-container">
//                 <div>
//                   <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news provider" />
//                   <Text className="provider-name">{news.provider[0]?.name}</Text>
//                 </div>
//                 <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
//               </div>
//             </a>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// };

// export default News;








import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsAPI';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import Loader from './loader';

const { Text, Title } = Typography;
const { Option } = Select;

// Demo image to use as fallback
const demoImage = 'https://placehold.co/600x400?text=Crypto+News';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('cryptocurrency');
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
  const { data } = useGetCryptosQuery(100);

  if (isFetching || !cryptoNews?.value) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name.toLowerCase()} key={currency.id}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img style={{ maxWidth: '100px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={demoImage} alt="news provider" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;