import React, { useState } from 'react';
import { Layout, Button, Space, Badge, Grid, Drawer, Typography } from 'antd';
import {
  BellOutlined,
  SearchOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { pageThemes } from '../../theme';

const { Header, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const location = useLocation();

  // Get current page theme and title
  const getPageInfo = () => {
    const path = location.pathname;
    if (path === '/') return { theme: pageThemes.dashboard, title: 'Dashboard' };
    if (path === '/orders') return { theme: pageThemes.orders, title: 'Orders' };
    if (path === '/products') return { theme: pageThemes.products, title: 'Products' };
    if (path === '/customers') return { theme: pageThemes.customers, title: 'Customers' };
    return { theme: pageThemes.dashboard, title: 'Dashboard' };
    
  };

  const { theme: currentTheme, title: pageTitle } = getPageInfo();

  const handleCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
    if (isMobile) {
      setMobileMenuVisible(false);
    }
  };

  return (
    <Layout style={{ 
      minHeight: '100vh',
      background: currentTheme.background,
    }}>
      {isMobile ? (
        <Drawer
          placement="left"
          onClose={() => setMobileMenuVisible(false)}
          open={mobileMenuVisible}
          width={280}
          bodyStyle={{ padding: 0 }}
        >
          <Sidebar onCollapse={handleCollapse} />
        </Drawer>
      ) : (
        <Sidebar onCollapse={handleCollapse} />
      )}
      
      <Layout style={{ 
        marginLeft: isMobile ? 0 : (collapsed ? 80 : 200),
        transition: 'all 0.2s',
        background: currentTheme.background,
      }}>
        <Header
          style={{
            padding: isMobile ? '0 8px' : '0 16px',
            background: currentTheme.cardBg,
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'space-between' : 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            height: isMobile ? '48px' : '64px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuVisible(true)}
                style={{ fontSize: '20px', color: currentTheme.primary }}
              />
            )}
            <Title level={4} style={{ margin: 0, color: currentTheme.primary }}>
              {pageTitle}
            </Title>
          </div>
          <Space size="large">
            <Button 
              type="text" 
              icon={<SearchOutlined />} 
              style={{ color: currentTheme.primary }}
            />
            <Badge count={5}>
              <Button 
                type="text" 
                icon={<BellOutlined />} 
                style={{ color: currentTheme.primary }}
              />
            </Badge>
          </Space>
        </Header>
        <Content
          style={{
            margin: isMobile ? '4px' : '8px',
            padding: isMobile ? '8px' : '16px',
            background: currentTheme.cardBg,
            borderRadius: 8,
            minHeight: 280,
            flex: 1,
            overflow: 'auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout; 