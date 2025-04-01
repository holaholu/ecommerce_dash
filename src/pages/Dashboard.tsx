import React from 'react';
import { Row, Col, Card, Statistic, Table, Grid } from 'antd';
import {
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const { useBreakpoint } = Grid;

const data = [
  { name: 'Jan', sales: 4000, orders: 2400 },
  { name: 'Feb', sales: 3000, orders: 1398 },
  { name: 'Mar', sales: 2000, orders: 9800 },
  { name: 'Apr', sales: 2780, orders: 3908 },
  { name: 'May', sales: 1890, orders: 4800 },
  { name: 'Jun', sales: 2390, orders: 3800 },
];

const columns = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    key: 'orderId',
    width: 100,
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    width: 120,
  },
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    width: 120,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: 100,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 100,
  },
];

const recentOrders = [
  {
    key: '1',
    orderId: 'ORD001',
    customer: 'John Doe',
    product: 'Product A',
    amount: '$100',
    status: 'Completed',
  },
  {
    key: '2',
    orderId: 'ORD002',
    customer: 'Jane Smith',
    product: 'Product B',
    amount: '$200',
    status: 'Processing',
  },
  {
    key: '3',
    orderId: 'ORD003',
    customer: 'Mike Johnson',
    product: 'Product C',
    amount: '$150',
    status: 'Pending',
  },
];

const Dashboard: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;

  return (
    <div style={{ width: '100%' }}>
      {/* Stats Cards */}
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="Total Sales"
              value={11.28}
              precision={2}
              prefix={<DollarOutlined />}
              valueStyle={{ fontSize: isMobile ? '16px' : '20px' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="Total Orders"
              value={93}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ fontSize: isMobile ? '16px' : '20px' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="Total Customers"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ fontSize: isMobile ? '16px' : '20px' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="Total Products"
              value={93}
              prefix={<ShoppingOutlined />}
              valueStyle={{ fontSize: isMobile ? '16px' : '20px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Chart Card */}
      <Card
        title="Sales & Orders Overview"
        style={{ marginTop: '8px' }}
        bodyStyle={{ padding: isMobile ? '8px' : '16px' }}
      >
        <div style={{ 
          width: '100%', 
          height: isMobile ? 250 : (isTablet ? 300 : 400),
          margin: '0 auto'
        }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: isMobile ? 10 : 30,
                left: isMobile ? 0 : 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: isMobile ? 12 : 14 }}
              />
              <YAxis 
                tick={{ fontSize: isMobile ? 12 : 14 }}
                width={isMobile ? 40 : 60}
              />
              <Tooltip 
                contentStyle={{ 
                  fontSize: isMobile ? '12px' : '14px',
                  padding: isMobile ? '4px' : '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2c5282"
                name="Sales"
                dot={!isMobile}
                strokeWidth={isMobile ? 2 : 3}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#2f855a"
                name="Orders"
                dot={!isMobile}
                strokeWidth={isMobile ? 2 : 3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Orders Table */}
      <Card 
        title="Recent Orders" 
        style={{ marginTop: '8px' }}
        bodyStyle={{ padding: isMobile ? '8px' : '16px' }}
      >
        <Table 
          columns={columns} 
          dataSource={recentOrders}
          size={isMobile ? "small" : "middle"}
          scroll={{ x: isMobile ? 500 : 'auto' }}
          pagination={{
            size: isMobile ? "small" : "default",
            pageSize: isMobile ? 5 : 10,
          }}
        />
      </Card>
    </div>
  );
};

export default Dashboard; 