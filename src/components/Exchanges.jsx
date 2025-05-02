import React from 'react';
import { Typography, Row, Col, Card } from 'antd';

const { Title, Text } = Typography;

const Exchanges = () => {
  return (
    <>
      <Title level={2} className="heading">Cryptocurrency Exchanges</Title>
      <Row>
        <Col span={24}>
          <Card className="exchange-card">
            <Text>
              Note: Cryptocurrency exchange data is not available in the free tier of our API service. 
              To access real-time exchange information, please consider upgrading to a premium API plan.
            </Text>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Exchanges;