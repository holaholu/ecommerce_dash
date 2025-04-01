import React, { useState } from 'react';
import { Row, Col, Card, Table, Tag, Button, DatePicker, Space, Select, Modal, Form, InputNumber, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  ComposedChart, Line, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  Treemap,
} from 'recharts';
import { FilterOutlined, ReloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface OrderType {
  key: string;
  orderId: string;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: number;
  category: string;
}

const initialOrdersData: OrderType[] = [
  {
    key: '1',
    orderId: 'ORD-2024-001',
    customer: 'John Doe',
    date: '2024-03-15',
    total: 299.99,
    status: 'Completed',
    items: 3,
    category: 'Electronics',
  },
  {
    key: '2',
    orderId: 'ORD-2024-002',
    customer: 'Jane Smith',
    date: '2024-03-15',
    total: 159.99,
    status: 'Processing',
    items: 2,
    category: 'Clothing',
  },
  {
    key: '3',
    orderId: 'ORD-2024-003',
    customer: 'Bob Johnson',
    date: '2024-03-14',
    total: 499.99,
    status: 'Pending',
    items: 4,
    category: 'Electronics',
  },
  {
    key: '4',
    orderId: 'ORD-2024-004',
    customer: 'Alice Brown',
    date: '2024-03-14',
    total: 89.99,
    status: 'Completed',
    items: 1,
    category: 'Books',
  },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>(initialOrdersData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<OrderType | null>(null);
  const [form] = Form.useForm();

  const handleEdit = (record: OrderType) => {
    setEditingOrder(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    setOrders(orders.filter(item => item.key !== key));
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingOrder) {
        setOrders(orders.map(item =>
          item.key === editingOrder.key ? { ...values, key: item.key } : item
        ));
      } else {
        setOrders([...orders, { ...values, key: String(orders.length + 1) }]);
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingOrder(null);
    });
  };

  const handleAdd = () => {
    setEditingOrder(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const columns: ColumnsType<OrderType> = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      sorter: (a, b) => a.items - b.items,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => `$${total.toFixed(2)}`,
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          Completed: 'green',
          Processing: 'blue',
          Pending: 'orange',
          Cancelled: 'red',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Processing', value: 'Processing' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          />
        </Space>
      ),
    },
  ];

  const orderTrendsData = orders.reduce((acc: any[], order) => {
    const date = order.date.substring(0, 7); // Get YYYY-MM
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.orders += 1;
      existing.revenue += order.total;
      existing.average = existing.revenue / existing.orders;
    } else {
      acc.push({
        date,
        orders: 1,
        revenue: order.total,
        average: order.total,
      });
    }
    return acc;
  }, []).sort((a, b) => a.date.localeCompare(b.date));

  const categoryDistributionData = {
    name: 'Orders',
    children: Object.entries(
      orders.reduce((acc: { [key: string]: number }, order) => {
        acc[order.category] = (acc[order.category] || 0) + order.total;
        return acc;
      }, {})
    ).map(([name, size], index) => ({
      name,
      size,
      color: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'][index % 5],
    })),
  };

  const CustomizedContent = (props: any) => {
    const { depth, x, y, width, height, index, colors, name } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor(index / 2)] : '#ffffff',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
        )}
      </g>
    );
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Order Trends">
            <div style={{ height: 400 }}>
              <ResponsiveContainer>
                <ComposedChart data={orderTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="orders"
                    fill="#8884d8"
                    name="Orders"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="average"
                    stroke="#82ca9d"
                    name="Average Order Value"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Category Distribution">
            <div style={{ height: 400 }}>
              <ResponsiveContainer>
                <Treemap
                  data={categoryDistributionData.children}
                  dataKey="size"
                  stroke="#fff"
                  content={<CustomizedContent colors={['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe']} />}
                />
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Order Management">
            <Space style={{ marginBottom: 16 }}>
              <RangePicker />
              <Select
                defaultValue="all"
                style={{ width: 120 }}
              >
                <Option value="all">All Status</Option>
                <Option value="completed">Completed</Option>
                <Option value="processing">Processing</Option>
                <Option value="pending">Pending</Option>
              </Select>
              <Button icon={<FilterOutlined />}>Filter</Button>
              <Button icon={<ReloadOutlined />}>Reset</Button>
              <Button type="primary" onClick={handleAdd}>Add Order</Button>
            </Space>
            <Table
              columns={columns}
              dataSource={orders}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title={editingOrder ? 'Edit Order' : 'Add Order'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingOrder(null);
        }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="orderId"
            label="Order ID"
            rules={[{ required: true, message: 'Please input order ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="customer"
            label="Customer"
            rules={[{ required: true, message: 'Please input customer name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="items"
            label="Items"
            rules={[{ required: true, message: 'Please input number of items!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>
          <Form.Item
            name="total"
            label="Total"
            rules={[{ required: true, message: 'Please input total amount!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status!' }]}
          >
            <Select>
              <Option value="Completed">Completed</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please input category!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Orders; 