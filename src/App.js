import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar, Exchanges, Homepage, CryptoDetails, Cryptocurrencies, News, Login } from './components';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar/> 
      </div>

      <div className="main"> 
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
      
      
      <div className="footer">
        <Typography.Title level={5} style={{ color: '#00B4DB', textAlign: 'center', marginBottom: '1rem' }}>
          CryptoSense <br />
          All rights reserved © 2024
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
        </div>
      </div>
    </div>
  )
}

export default App