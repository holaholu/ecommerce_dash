import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';

const { Header, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // const [collapsed, setCollapsed] = React.useState(false);

  const handleCollapse = () => {
    // Collapse logic can be added here if needed
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar onCollapse={handleCollapse} />
      <Layout style={{ marginLeft: 280, transition: 'all 0.2s' }}>
        <Header style={{
          padding: '0 24px',
          background: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: '64px',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        }}>
          {/* Add header content here */}
        </Header>
        <Content style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          borderRadius: 8,
          minHeight: 280,
        }}>
          {children}
        </Content>
      </Layout>

      <style>
        {`
          @media (max-width: 991px) {
            .ant-layout {
              margin-left: 0 !important;
            }
            .ant-layout-content {
              padding: 12px !important;
              margin: 12px !important;
            }
            .ant-card {
              margin-bottom: 12px;
            }
            .ant-card-head-title {
              font-size: 16px;
            }
            .recharts-wrapper {
              width: 100% !important;
            }
            .recharts-responsive-container {
              width: 100% !important;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default MainLayout; 