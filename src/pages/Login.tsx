import { useState } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type LoginFields = {
  username: string;
  password: string;
  remember?: boolean;
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: LoginFields) => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 500));

      if (values.username === 'admin' && values.password === 'admin') {
        localStorage.setItem('token', 'dummy');
        navigate('/ops/dashboard', { replace: true });
      } else {
        messageApi.error('아이디와 비밀번호를 다시 입력해 주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      {contextHolder}
      <div className="auth-card">
        <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 8, color: 'rgb(18, 25, 35)'}}>
          TSlurm Ops
        </Typography.Title>

        <Form<LoginFields>
          name="login"
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="아이디"
            name="username"
            rules={[{ required: true, message: '아이디를 입력해 주세요.' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="아이디"
              allowClear
              autoComplete="username"
              autoFocus
            />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해 주세요.' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="비밀번호"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 8 }}>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              로그인
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
