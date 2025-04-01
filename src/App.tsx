import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import MainLayout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Customers from './pages/Customers';
import customTheme from './theme';

const App: React.FC = () => {
  return (
    <ConfigProvider theme={customTheme}>
      <Router basename="/ecommerce_dash">
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </MainLayout>
      </Router>
    </ConfigProvider>
  );
};

export default App; 