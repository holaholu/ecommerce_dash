import React from 'react';
import { Row, Col, Card, Statistic, Table, Grid, Tag, Space } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const { useBreakpoint } = Grid;

// Customer growth data
const growthData = [
  { month: 'Jan', newCustomers: 65, churnedCustomers: 12, activeCustomers: 892 },
  { month: 'Feb', newCustomers: 78, churnedCustomers: 15, activeCustomers: 945 },
  { month: 'Mar', newCustomers: 92, churnedCustomers: 18, activeCustomers: 1019 },
  { month: 'Apr', newCustomers: 85, churnedCustomers: 14, activeCustomers: 1090 },
  { month: 'May', newCustomers: 98, churnedCustomers: 16, activeCustomers: 1172 },
  { month: 'Jun', newCustomers: 110, churnedCustomers: 20, activeCustomers: 1262 },
];

// Customer segments data
const segmentData = [
  { name: 'Regular', value: 45, color: '#4299e1' },
  { name: 'Premium', value: 25, color: '#2b6cb0' },
  { name: 'VIP', value: 15, color: '#2c5282' },
  { name: 'New', value: 15, color: '#ebf8ff' },
];

// Customer satisfaction data
const satisfactionData = [
  { month: 'Jan', satisfaction: 4.2 },
  { month: 'Feb', satisfaction: 4.3 },
  { month: 'Mar', satisfaction: 4.5 },
  { month: 'Apr', satisfaction: 4.4 },
  { month: 'May', satisfaction: 4.6 },
  { month: 'Jun', satisfaction: 4.7 },
];

const columns = [
  {
    title: 'Customer ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Segment',
    dataIndex: 'segment',
    key: 'segment',
    render: (segment: string) => {
      const color = segmentData.find(s => s.name === segment)?.color || '#4299e1';
      return <Tag color={color}>{segment}</Tag>;
    },
  },
  {
    title: 'Total Orders',
    dataIndex: 'orders',
    key: 'orders',
  },
  {
    title: 'Total Spent',
    dataIndex: 'spent',
    key: 'spent',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'Active' ? 'success' : 'error'}>{status}</Tag>
    ),
  },
];

const recentCustomers = [
  {
    key: '1',
    id: 'CUST001',
    name: 'John Doe',
    email: 'john@example.com',
    segment: 'Premium',
    orders: 12,
    spent: '$1,200',
    status: 'Active',
  },
  {
    key: '2',
    id: 'CUST002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    segment: 'Regular',
    orders: 8,
    spent: '$800',
    status: 'Active',
  },
  {
    key: '3',
    id: 'CUST003',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    segment: 'VIP',
    orders: 15,
    spent: '$2,500',
    status: 'Active',
  },
  {
    key: '4',
    id: 'CUST004',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    segment: 'New',
    orders: 3,
    spent: '$300',
    status: 'Active',
  },
  {
    key: '5',
    id: 'CUST005',
    name: 'David Brown',
    email: 'david@example.com',
    segment: 'Regular',
    orders: 0,
    spent: '$0',
    status: 'Inactive',
  },
];

const Customers: React.FC = () => {
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
              title="Total Customers"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ fontSize: isMobile ? '16px' : '20px' }}
              suffix={
                <Space style={{ fontSize: '14px', color: '#52c41a' }}>
                  <ArrowUpOutlined /> 12%
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="Active Customers"
              value={892}
              prefix={<TeamOutlined />}
              valueStyle={{ fontSize: isMobile ? '16px' : '20px' }}
              suffix={
                <Space style={{ fontSize: '14px', color: '#52c41a' }}>
                  <ArrowUpOutlined /> 8%
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="New Customers"
              value={110}
              prefix={<UserAddOutlined />}
              valueStyle={{ fontSize: isMobile ? '16px' : '20px' }}
              suffix={
                <Space style={{ fontSize: '14px', color: '#52c41a' }}>
                  <ArrowUpOutlined /> 15%
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="Churned Customers"
              value={20}
              prefix={<UserDeleteOutlined />}
              valueStyle={{ fontSize: isMobile ? '16px' : '20px' }}
              suffix={
                <Space style={{ fontSize: '14px', color: '#f5222d' }}>
                  <ArrowDownOutlined /> 5%
                </Space>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[8, 8]} style={{ marginTop: '8px' }}>
        <Col xs={24} md={16}>
          <Card title="Customer Growth">
            <div style={{ 
              width: '100%', 
              height: isMobile ? 250 : (isTablet ? 300 : 400),
              margin: '0 auto'
            }}>
              <ResponsiveContainer>
                <BarChart
                  data={growthData}
                  margin={{
                    top: 5,
                    right: isMobile ? 10 : 30,
                    left: isMobile ? 0 : 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
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
                  <Bar
                    dataKey="newCustomers"
                    fill="#4299e1"
                    name="New Customers"
                  />
                  <Bar
                    dataKey="churnedCustomers"
                    fill="#e53e3e"
                    name="Churned Customers"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Customer Segments">
            <div style={{ 
              width: '100%', 
              height: isMobile ? 250 : (isTablet ? 300 : 400),
              margin: '0 auto'
            }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={segmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={isMobile ? 80 : (isTablet ? 100 : 120)}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {segmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      fontSize: isMobile ? '12px' : '14px',
                      padding: isMobile ? '4px' : '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Customer Satisfaction Chart */}
      <Row gutter={[8, 8]} style={{ marginTop: '8px' }}>
        <Col xs={24}>
          <Card title="Customer Satisfaction Trend">
            <div style={{ 
              width: '100%', 
              height: isMobile ? 250 : (isTablet ? 300 : 400),
              margin: '0 auto'
            }}>
              <ResponsiveContainer>
                <LineChart
                  data={satisfactionData}
                  margin={{
                    top: 5,
                    right: isMobile ? 10 : 30,
                    left: isMobile ? 0 : 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: isMobile ? 12 : 14 }}
                  />
                  <YAxis 
                    tick={{ fontSize: isMobile ? 12 : 14 }}
                    width={isMobile ? 40 : 60}
                    domain={[0, 5]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      fontSize: isMobile ? '12px' : '14px',
                      padding: isMobile ? '4px' : '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#2b6cb0"
                    strokeWidth={2}
                    dot={{ fill: '#2b6cb0', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Customers Table */}
      <Card 
        title="Recent Customers" 
        style={{ marginTop: '8px' }}
        bodyStyle={{ padding: isMobile ? '8px' : '16px' }}
      >
        <Table 
          columns={columns} 
          dataSource={recentCustomers}
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

export default Customers; 