import { Card, Typography } from "antd";

export const AboutPage = () => (
  <Card>
    <Typography.Title level={3}>关于</Typography.Title>
    <Typography.Paragraph>
      本页用于验证 React Router 嵌套路由与 <Typography.Text code>PublicLayout</Typography.Text> 的{" "}
      <Typography.Text code>&lt;Outlet /&gt;</Typography.Text> 是否正常渲染。
    </Typography.Paragraph>
  </Card>
);
