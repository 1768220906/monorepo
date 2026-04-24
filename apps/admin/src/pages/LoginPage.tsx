import { Button, Card, Form, Input, Typography } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";

type LoginForm = {
  username: string;
  password: string;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setToken = useAuthStore(s => s.setToken);

  const state = location.state as { from?: string } | undefined;
  const from =
    state?.from && state.from !== "/login" && !state.from.startsWith("/login")
      ? state.from
      : "/dashboard";

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}>
      <Card style={{ width: 400 }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          管理后台登录
        </Typography.Title>
        <Form<LoginForm>
          layout="vertical"
          onFinish={values => {
            setToken(`mock-token:${values.username}`);
            void navigate(from, { replace: true });
          }}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: "请输入用户名" }]}>
            <Input autoComplete="username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入密码" }]}>
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form>
      </Card>
    </div>
  );
};
