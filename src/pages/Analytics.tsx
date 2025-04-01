import React from 'react';
import { Row, Col, Card } from 'antd';
import {
  AreaChart, Area,
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const salesData = [
  { month: 'Jan', revenue: 4000, profit: 2400, cost: 1600 },
  { month: 'Feb', revenue: 3000, profit: 1398, cost: 1602 },
  { month: 'Mar', revenue: 9800, profit: 2800, cost: 7000 },
  { month: 'Apr', revenue: 2780, profit: 908, cost: 1872 },
  { month: 'May', revenue: 1890, profit: 800, cost: 1090 },
  { month: 'Jun', revenue: 2390, profit: 1200, cost: 1190 },
];

const channelData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Email', value: 300 },
  { name: 'Referral', value: 200 },
];

const categoryData = [
  { category: 'Electronics', sales: 120, returns: 10 },
  { category: 'Clothing', sales: 98, returns: 8 },
  { category: 'Books', sales: 86, returns: 5 },
  { category: 'Home', sales: 99, returns: 12 },
  { category: 'Sports', sales: 85, returns: 7 },
  { category: 'Beauty', sales: 65, returns: 4 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Revenue, Profit & Cost Trends">
            <div style={{ height: 400 }}>
              <ResponsiveContainer>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stackId="2"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                  <Area
                    type="monotone"
                    dataKey="cost"
                    stackId="3"
                    stroke="#ffc658"
                    fill="#ffc658"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Sales Channels Distribution">
            <div style={{ height: 400 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {channelData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Category Performance">
            <div style={{ height: 400 }}>
              <ResponsiveContainer>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                  <Bar dataKey="returns" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics; 