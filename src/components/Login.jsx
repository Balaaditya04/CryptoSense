import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await axios.post(`http://localhost:5000${endpoint}`, values);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      message.success(`${isLogin ? 'Login' : 'Registration'} successful!`);
      navigate('/');
    } catch (error) {
      message.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)'
    }}>
      <Card 
        style={{ 
          width: 400, 
          padding: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          borderRadius: '12px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2} style={{ color: '#00B4DB', marginBottom: '8px' }}>
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </Title>
          <Typography.Text type="secondary">
            {isLogin ? 'Login to access your account' : 'Sign up to get started'}
          </Typography.Text>
        </div>

        <Form
          name="auth-form"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          {!isLogin && (
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input 
                prefix={<UserOutlined />}
                placeholder="Full Name"
              />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
              block
              style={{
                background: '#00B4DB',
                height: '40px',
                borderRadius: '6px'
              }}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </Form.Item>
        </Form>

        <Space direction="vertical" size="small" style={{ width: '100%', textAlign: 'center' }}>
          <Typography.Text type="secondary">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </Typography.Text>
          <Button 
            type="link" 
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: '#00B4DB' }}
          >
            {isLogin ? 'Create one now!' : 'Login here'}
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Login;