import { Layout } from "antd";
import { Link, Outlet } from "react-router";
import styles from "./PublicLayout.module.scss";

const { Header, Content } = Layout;

export const PublicLayout = () => (
  <Layout>
    <Header className={styles.publicHeader}>
      <Link to="/" style={{ color: "#fff", fontWeight: 600 }}>
        @monorepo/web
      </Link>
      <nav className={styles.publicNav} aria-label="主导航">
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
      </nav>
    </Header>
    <Content className={styles.publicMain}>
      <Outlet />
    </Content>
  </Layout>
);
