# monorepo-starter

一个可直接复用的全栈 Monorepo 基座，目标是：

- 新项目开工时不再重复搭建工程基建；
- 前端（Web/Admin）与后端（API）有统一开发体验；
- 通过规范化分层，保证项目从 demo 到生产可平滑演进。

---

## 1. 项目定位

这是一个 **Template-style Starter Repo**（模板型仓库），用于快速孵化新项目。

你可以把它理解为：

- **工程基建模板**：ESLint / Prettier / cspell / commitlint / husky / lint-staged
- **前端应用模板**：`apps/web` + `apps/admin`（Vite + React + Antd）
- **后端应用模板**：`apps/server`（Hono + 企业级分层）
- **共享能力模板**：`packages/components` + `packages/utils` + `packages/config`

---

## 2. 技术栈总览

### 2.1 Monorepo 与工程层

- `pnpm workspace`（包管理与依赖链接）
- `turborepo`（任务编排、缓存、并行执行）
- TypeScript 5.9（严格模式）
- shared config package：`@monorepo/config`

### 2.2 前端层（Web/Admin）

- React 19
- Vite 6
- React Router 7
- Ant Design 5（含 React 19 patch）
- Zustand
- TanStack Query
- axios
- Sass

### 2.3 后端层（Server）

- Hono
- `@hono/node-server`
- zod + `@hono/zod-validator`
- pino（结构化日志）
- tsx（开发热更新）
- tsup（构建）

---

## 3. 目录结构（当前）

```text
monorepo/
├─ apps/
│  ├─ web/                     # C 端前台应用模板
│  ├─ admin/                   # 中后台应用模板
│  └─ server/                  # API 服务模板（企业级分层）
├─ packages/
│  ├─ config/                  # 共享工程配置（eslint/tsconfig/prettier）
│  ├─ components/              # 共享 UI 组件
│  └─ utils/                   # 共享工具库
├─ turbo.json
├─ pnpm-workspace.yaml
├─ eslint.config.js
├─ prettier.config.js
├─ cspell.json
├─ commitlint.config.js
└─ package.json
```

---

## 4. 后端分层架构（apps/server）

`apps/server/src` 按企业级可扩展方式组织：

```text
src/
├─ app.ts                      # 应用装配（middleware/route/error/notFound）
├─ index.ts                    # 启动入口（端口监听）
├─ config/                     # 环境配置
├─ constants/                  # 常量（错误码等）
├─ errors/                     # 业务异常类型
├─ handlers/                   # 全局异常处理、404处理
├─ middlewares/                # requestId、日志、验证封装
├─ routes/                     # 路由注册层
├─ controllers/                # 请求编排层
├─ services/                   # 业务逻辑层
├─ repositories/               # 数据访问抽象层
├─ dto/                        # 对外响应映射层
├─ schemas/                    # zod 参数校验模型
├─ types/                      # 类型定义与 Hono Context 扩展
└─ utils/                      # 响应工具等通用工具
```

### 4.1 已具备的标准能力

- **统一响应结构**：`success/requestId/data|error`
- **requestId 链路**：请求头回传 `x-request-id`
- **结构化日志**：pino，日志可关联 requestId
- **统一错误处理**：业务异常、HTTP 异常、未知异常统一出口
- **统一 404 处理**：未匹配路由标准化返回
- **zod 校验封装**：`validateQuery()` 统一验证入口

### 4.2 示例接口

- `GET /`：服务状态
- `GET /api/health`：健康检查
- `GET /api/health?detailed=1`：返回 uptime

---

## 5. 前端应用结构说明

### 5.1 `apps/web`

定位：C 端模板。

- 公共布局：`PublicLayout`
- 页面：`Home / About / NotFound`
- 数据流：TanStack Query + axios
- 样式：`global.scss` + module scss

### 5.2 `apps/admin`

定位：中后台模板。

- 登录页 + 简单鉴权守卫
- `AdminLayout`（含侧栏）
- `Dashboard` 示例页
- Zustand 管理 auth 状态

---

## 6. 共享包说明

### 6.1 `@monorepo/config`

工程配置中台：

- `eslint/base|react|node`
- `tsconfig/base|app-react|library|node`
- `prettier`

所有 app/package 通过 `extends/import` 复用，升级基建只改一处。

### 6.2 `@monorepo/components`

- 共享 React 组件包
- 当前内置示例组件：`BrandMark`

### 6.3 `@monorepo/utils`

- 共享工具函数与存储封装
- 当前包含数学工具与 `localStore/sessionStore`

---

## 7. 本地开发与构建

## 7.1 环境要求

- Node.js >= 20
- pnpm 10（建议使用 corepack）

```bash
corepack enable
corepack prepare pnpm@10.23.0 --activate
```

### 7.2 初始化

```bash
pnpm install
```

### 7.3 仓库级命令

```bash
pnpm dev           # turbo 并行启动可运行子项目（包含 persistent task）
pnpm build         # turbo 构建所有可构建包/app
pnpm typecheck     # turbo 全量类型检查
pnpm lint          # turbo lint 任务
pnpm lint:eslint   # 直接跑 ESLint
pnpm lint:spellcheck
pnpm format
```

### 7.4 按应用运行

```bash
pnpm --filter @monorepo/web dev
pnpm --filter @monorepo/admin dev
pnpm --filter @monorepo/server dev
```

### 7.5 5 分钟上手（最短路径）

> 目标：第一次拉代码后，5 分钟内把 Web / Admin / Server 全部跑起来。

#### Step 1）安装依赖

```bash
pnpm install
```

#### Step 2）一键做健康检查（类型 + 构建）

```bash
pnpm typecheck
pnpm build
```

#### Step 3）分别启动三个应用（开 3 个终端）

终端 A（Web）：

```bash
pnpm --filter @monorepo/web dev
```

终端 B（Admin）：

```bash
pnpm --filter @monorepo/admin dev
```

终端 C（Server）：

```bash
pnpm --filter @monorepo/server dev
```

#### Step 4）快速验收

- Web：打开 `http://localhost:5173`
- Admin：打开 `http://localhost:5174`
- Server 健康检查：

```bash
curl "http://localhost:3000/api/health?detailed=1"
```

#### Step 5）提交前自检（可直接复制）

```bash
pnpm lint:eslint
pnpm lint:spellcheck
pnpm format
```

---

## 8. 提交与质量门禁

- 提交规范：Conventional Commits（`commitlint + cz-git`）
- pre-commit 自动执行：
  - `cspell lint`
  - `prettier --write`
  - `eslint`

推荐使用：

```bash
pnpm commit
```

---

## 9. 如何把它用作新项目基座

建议流程：

1. 克隆/模板化仓库。
2. 修改组织与项目信息（`name`、README、LICENSE、远程地址）。
3. 从 `apps/web` / `apps/admin` / `apps/server` 选择保留的应用。
4. 在 `apps/server` 新增业务模块时，遵循：
   - `route -> controller -> service -> repository -> dto`
5. 新增跨应用复用能力时优先沉淀到 `packages/components` 或 `packages/utils`。

---

## 10. 下一步建议（按优先级）

- 增加 `users` 示例模块（完整 CRUD 流程）
- 引入单测（Vitest）与 API 测试（supertest）
- 加 CI（install/typecheck/lint/build）
- 增加环境分层（dev/test/prod）与配置校验
- 引入 OpenAPI/Swagger 自动化文档

---

## License

ISC
