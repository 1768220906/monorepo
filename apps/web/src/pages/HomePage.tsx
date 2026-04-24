import { useQuery } from "@tanstack/react-query";
import { Card, Space, Spin, Typography } from "antd";
import { BrandMark } from "@components/BrandMark";
import { add } from "@utils/math";
import { http } from "../lib/http";

type TodoPreview = {
  id: number;
  title: string;
};

export const HomePage = () => {
  const sumDemo = add(21, 21);

  const { data, isPending, isError } = useQuery({
    queryKey: ["demo-todo"],
    queryFn: async () => {
      const res = await http.get<TodoPreview>("https://jsonplaceholder.typicode.com/todos/1");
      return res.data;
    },
  });

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Typography.Title level={2}>
        C 端骨架页 · <BrandMark text="Web" />
      </Typography.Title>
      <Card title="Workspace 链路自检">
        <Typography.Paragraph>
          <code>@monorepo/utils</code> 示例：<code>add(21, 21) = {sumDemo}</code>
        </Typography.Paragraph>
      </Card>
      <Card title="TanStack Query + axios 示例">
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
