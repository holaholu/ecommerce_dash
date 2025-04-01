import React, { useState } from 'react';
import { Layout, Menu, Avatar, Typography, Button, Grid } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface SidebarProps {
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
    onCollapse(collapsed);
  };

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/orders',
      icon: <ShoppingCartOutlined />,
      label: 'Orders',
    },
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: 'Products',
    },
    {
      key: '/customers',
      icon: <UserOutlined />,
      label: 'Customers',
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: isMobile ? 'relative' : 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        width: isMobile ? '100%' : (collapsed ? 80 : 280),
      }}
    >
      <div style={{ 
        padding: isMobile ? '12px' : '16px', 
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'space-between' : 'center',
        marginBottom: isMobile ? '8px' : '16px'
      }}>
        {!isMobile && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => handleCollapse(!collapsed)}
            style={{
              fontSize: '16px',
              width: 32,
              height: 32,
              padding: 0,
            }}
          />
        )}
        {(!collapsed || isMobile) && (
          <Title level={4} style={{ margin: 0, color: '#2c5282' }}>
            E-Commerce Analytics
          </Title>
        )}
      </div>

      <div style={{ 
        padding: isMobile ? '0 12px 12px' : '0 16px 16px', 
        textAlign: 'center' 
      }}>
        <Avatar 
          size={isMobile ? 48 : 64} 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          style={{ 
            border: '2px solid #2c5282',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
        {(!collapsed || isMobile) && (
          <div style={{ marginTop: '8px' }}>
            <Text strong>John Doe</Text>
            <br />
            <Text type="secondary">Admin</Text>
          </div>
        )}
      </div>

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => {
          navigate(key);
          if (isMobile) {
            handleCollapse(true);
          }
        }}
        style={{
          borderRight: 0,
        }}
      />
    </Sider>
  );
};

export default Sidebar; 