import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import icon from '../images/cryptosense-logo.svg';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const items = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>
    },
    {
      key: 'cryptocurrencies',
      icon: <FundOutlined />,
      label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>
    },
    {
      key: 'exchanges',
      icon: <MoneyCollectOutlined />,
      label: <Link to="/exchanges">Exchanges</Link>
    },
    {
      key: 'news',
      icon: <BulbOutlined />,
      label: <Link to="/news">News</Link>
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <div className="logo">
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} style={{ color: '#00B4DB', margin: '0 0 0 15px', display: 'inline-block' }}>
            <Link to="/" style={{ color: 'inherit' }}>CryptoSense</Link>
          </Typography.Title>
        </div>
        <div className="auth-buttons">
          <Button 
            type="primary" 
            icon={token ? <LogoutOutlined /> : <LoginOutlined />}
            onClick={token ? handleLogout : () => navigate('/login')}
            style={{ marginLeft: 'auto' }}
          >
            {token ? 'Logout' : 'Login'}
          </Button>
        </div>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
        <Menu 
          theme="dark" 
          mode="inline" 
          items={items} 
          style={{ 
            background: 'linear-gradient(135deg, #2451B7 0%, #00B4DB 100%)',
            borderRadius: '8px'
          }} 
        />
      )}
    </div>
  );
};

export default Navbar;