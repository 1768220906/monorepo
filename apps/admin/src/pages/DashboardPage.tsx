import { useQuery } from "@tanstack/react-query";
import { Card, Space, Spin, Typography } from "antd";
import { BrandMark } from "@components/BrandMark";
import { http } from "../lib/http";

type TodoPreview = {
  id: number;
  title: string;
};

export const DashboardPage = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["admin-demo-todo"],
    queryFn: async () => {
      const res = await http.get<TodoPreview>("https://jsonplaceholder.typicode.com/todos/2");
      return res.data;
    },
  });

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Typography.Title level={3}>
        仪表盘 · <BrandMark text="Admin" />
      </Typography.Title>
      <Card title="TanStack Query 示例">
        {isPending ? <Spin /> : null}
        {isError ? (
          <Typography.Text type="danger">演示请求失败（可检查网络或代理）。</Typography.Text>
        ) : null}
        {data ? (
          <Typography.Paragraph>
            Todo #{data.id}：{data.title}
          </Typography.Paragraph>
        ) : null}
      </Card>
    </Space>
  );
};
