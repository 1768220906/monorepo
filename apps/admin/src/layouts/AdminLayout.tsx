import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useMemo } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
import styles from "./AdminLayout.module.scss";

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore(s => s.logout);
  const { token } = theme.useToken();

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith("/dashboard")) return "/dashboard";
    return location.pathname;
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsedWidth={0}>
        <div className={styles.adminLogo}>Admin</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            {
              key: "/dashboard",
              label: <Link to="/dashboard">仪表盘</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className={styles.adminHeader}
          style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => {
              logout();
              void navigate("/login", { replace: true });
            }}>
            退出登录
          </Button>
        </Header>
        <Content className={styles.adminContent}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
