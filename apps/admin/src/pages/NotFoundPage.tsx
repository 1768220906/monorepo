import { Button, Result } from "antd";
import { Link } from "react-router";

export const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="页面不存在"
    extra={
      <Link to="/dashboard">
        <Button type="primary">回仪表盘</Button>
      </Link>
    }
  />
);
