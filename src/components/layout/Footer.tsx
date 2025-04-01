import React, { useState } from 'react';
import { Layout, Typography, Space, Button, Modal, Form, Input, message } from 'antd';
import { 
  GithubOutlined, 
  LinkedinOutlined, 
  MailOutlined,
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text, Title } = Typography;

const techStack = [
  { 
    name: 'React', 
    url: 'https://react.dev/',
    logo: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" width="24" height="24">
        <circle r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="0.5" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(-60)"/>
        </g>
      </svg>
    )
  },
  { 
    name: 'TypeScript', 
    url: 'https://www.typescriptlang.org/',
    logo: (
      <svg viewBox="0 0 128 128" width="24" height="24">
        <path fill="#3178c6" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.3-.89.45-1.39.74-1.6 1-.21.26-.32.42-.32.61 0 .33.39.74.83 1a13.35 13.35 0 004.69 1.49 12.22 12.22 0 004.31-.72 9.26 9.26 0 003.32-2.13 9.19 9.19 0 011.62-1.48c.73-.42 1.34-.77 1.36-.82.02-.05-.09-.13-.26-.23a25.14 25.14 0 00-5.39-2.55c-3.76-1.16-6.2-1.42-8.69-1.48H50.45v14.22H25.29v-14.22h-8.44v41h8.44v-13.21h25.16v13.21h8.45v-14.22h10l12.6 6.1c3.3 1.6 5.36 2.76 5.78 2.76.14 0 .42-.31 1.44-1.73a21.43 21.43 0 003.85-4.73c.42-.52.84-1.18 1.42-2.33a49.85 49.85 0 001.92-5.73c.3-.82.58-1.5.64-1.51a5.53 5.53 0 00.47-.06c.32 0 .64.3 2.2 1.83a10.58 10.58 0 004.77 2.82c3.35 1 6.51-1.42 6.51-4.24v-.24a8.37 8.37 0 00-.69-2.65c-.72-1.22-3.3-3.49-5.27-4.4-.67-.3-3.68-1.66-6.69-2.32-.89-.19-2.79-.42-4.23-.52a30 30 0 00-2.68-.04h-10.34v14.22H38.81v-14.22h-19v41h19v-13.21h34.06l12.6 6.1c1.62.79 3.37 1.71 5.3 2.76 0 0 1.5-.96 2.43-1.64a26.35 26.35 0 005-5.95c.42-.52.84-1.18 1.42-2.33a66.22 66.22 0 001.92-5.73c.3-.82.58-1.5.64-1.51a5.53 5.53 0 00.47-.06c.32 0 .64.3 2.2 1.83a10.58 10.58 0 004.77 2.82c3.35 1 6.51-1.42 6.51-4.24v-.24a8.37 8.37 0 00-.69-2.65c-.72-1.22-3.3-3.49-5.27-4.4-.67-.3-3.68-1.66-6.69-2.32a89.93 89.93 0 00-6.5-1.13c-.31-.06-2-.1-3.59-.1z"/>
      </svg>
    )
  },
  { 
    name: 'Ant Design', 
    url: 'https://ant.design/',
    logo: (
      <svg viewBox="64 64 896 896" width="24" height="24">
        <path fill="#0170fe" d="M716.3 313.8c19-18.9 19-49.7 0-68.6l-69.9-69.9c-18.9-19-49.7-19-68.6 0l-453 452.7c-19 19-19 49.7 0 68.6l69.9 69.9c18.9 19 49.7 19 68.6 0l453-452.7z"/>
      </svg>
    )
  },
  { 
    name: 'Recharts', 
    url: 'https://recharts.org/',
    logo: (
      <svg viewBox="0 0 128 128" width="24" height="24">
        <path fill="#00C49F" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 120c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"/>
        <path fill="#00C49F" d="M64 24c-22.1 0-40 17.9-40 40s17.9 40 40 40 40-17.9 40-40-17.9-40-40-40zm0 72c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>
      </svg>
    )
  },
  { 
    name: 'Vite', 
    url: 'https://vitejs.dev/',
    logo: (
      <svg viewBox="0 0 410 404" width="24" height="24">
        <path fill="#646CFF" d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z"/>
        <path fill="#646CFF" d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z"/>
      </svg>
    )
  },
];

const Footer: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleContactClick = () => {
    setIsModalVisible(true);
  };

  const handleFormSubmit = (values: { name: string; email: string; message: string }) => {
    const mailtoLink = `mailto:olaoluhimself@yahoo.com?subject=Contact from ${values.name}&body=${values.message}%0A%0AFrom: ${values.email}`;
    window.open(mailtoLink, '_blank');
    setIsModalVisible(false);
    form.resetFields();
    message.success('Opening email client...');
  };

  return (
    <AntFooter style={{ 
      textAlign: 'center',
      background: '#f0f2f5',
      padding: '24px 50px',
      marginTop: 'auto'
    }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space direction="vertical" size="small">
          <Text style={{ color: '#666' }}>Built with</Text>
          <Space wrap style={{ justifyContent: 'center' }} size="large">
            {techStack.map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1890ff', textDecoration: 'none' }}
                title={tech.name}
              >
                {tech.logo}
              </a>
            ))}
          </Space>
        </Space>

        <Text>© 2025 Ola Adisa. All rights reserved.</Text>

        <Space>
          <a
            href="https://github.com/holaholu"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1890ff', fontSize: '20px' }}
          >
            <GithubOutlined />
          </a>
          <a
            href="https://www.linkedin.com/in/olaoluadisa/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1890ff', fontSize: '20px' }}
          >
            <LinkedinOutlined />
          </a>
          <Button
            type="text"
            icon={<MailOutlined style={{ fontSize: '20px' }} />}
            onClick={handleContactClick}
            style={{ color: '#1890ff' }}
          />
        </Space>
      </Space>

      <Modal
        title="Contact Me"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please input your message!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send Email
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </AntFooter>
  );
};

export default Footer; 