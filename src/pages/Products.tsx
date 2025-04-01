import React, { useState } from 'react';
import { Row, Col, Card, Table, Tag, Button, Input, Space, Modal, Form, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  RadarChart, Radar,
  ScatterChart, Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface ProductType {
  key: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  sales: number;
  rating: number;
}

const initialProductsData: ProductType[] = [
  {
    key: '1',
    name: 'Premium Headphones',
    category: 'Electronics',
    price: 299,
    stock: 45,
    status: 'In Stock',
    sales: 120,
    rating: 4.5,
  },
  {
    key: '2',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 49,
    stock: 0,
    status: 'Out of Stock',
    sales: 98,
    rating: 4.2,
  },
  {
    key: '3',
    name: 'Gaming Keyboard',
    category: 'Electronics',
    price: 159,
    stock: 12,
    status: 'Low Stock',
    sales: 86,
    rating: 3.8,
  },
  {
    key: '4',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 199,
    stock: 28,
    status: 'In Stock',
    sales: 99,
    rating: 4.0,
  },
];

const Products: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<ProductType[]>(initialProductsData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [form] = Form.useForm();

  const handleEdit = (record: ProductType) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    setProducts(products.filter(item => item.key !== key));
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingProduct) {
        setProducts(products.map(item =>
          item.key === editingProduct.key ? { ...values, key: item.key } : item
        ));
      } else {
        setProducts([...products, { ...values, key: String(products.length + 1) }]);
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingProduct(null);
    });
  };

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const columns: ColumnsType<ProductType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: searchText ? [searchText] : null,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(String(value).toLowerCase()),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status === 'Out of Stock') {
          color = 'red';
        } else if (status === 'Low Stock') {
          color = 'orange';
        }
        return <Tag color={color}>{status}</Tag>;
      },
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

  const productPerformanceData = products.map(product => ({
    subject: product.name,
    A: product.sales,
    B: product.rating * 20,
    fullMark: 150,
  }));

  const priceVsRatingData = products.map(product => ({
    price: product.price,
    rating: product.rating,
    sales: product.sales,
    name: product.name,
  }));

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Product Performance Comparison">
            <div style={{ height: 400 }}>
              <ResponsiveContainer>
                <RadarChart data={productPerformanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Sales"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Rating"
                    dataKey="B"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Price vs Rating Analysis">
            <div style={{ height: 400 }}>
              <ResponsiveContainer>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    dataKey="price"
                    name="Price"
                    unit="$"
                  />
                  <YAxis
                    type="number"
                    dataKey="rating"
                    name="Rating"
                    unit="/5"
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter
                    name="Products"
                    data={priceVsRatingData}
                    fill="#8884d8"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Product Management">
            <Space style={{ marginBottom: 16 }}>
              <Input
                placeholder="Search products"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                Add Product
              </Button>
            </Space>
            <Table
              columns={columns}
              dataSource={products}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingProduct(null);
        }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input product name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please input category!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input price!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Please input stock!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item
            name="sales"
            label="Sales"
            rules={[{ required: true, message: 'Please input sales!' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please input rating!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={5}
              step={0.1}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products; 