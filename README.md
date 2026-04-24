# monorepo

一个基于 **pnpm workspace + TypeScript Project References** 的 monorepo 工程骨架。

> 当前仓库只完成了工程基建（Lint / Format / Commit / Hook / TS 架构），尚未接入业务代码与构建工具（Vite / tsup 等）。

---

## 技术栈

| 维度     | 选型                                                      |
| -------- | --------------------------------------------------------- |
| 包管理   | `pnpm@10.23.0`，workspace = `packages/*` + `apps/*`       |
| Node     | `>=20`                                                    |
| 类型系统 | TypeScript 5.9，开启 Project References，严格模式全量开启 |
| Lint     | ESLint 9 (flat config) + typescript-eslint                |
| 格式化   | Prettier 3 + eslint-config-prettier                       |
| 提交规范 | commitlint + cz-git（Conventional Commits）               |
| Git Hook | husky + lint-staged                                       |
| 拼写检查 | cspell（带自定义词典）                                    |

---

## 目录结构

```
monorepo/
├── apps/
│   ├── web/          # 前台 React 应用（占位，未接入 Vite）
│   ├── admin/        # 后台 React 应用（占位，未接入 Vite）
│   └── server/       # Node 服务端（占位）
├── packages/
│   ├── components/   # 共享组件库（占位）
│   └── utils/        # 共享工具库（已完成基础数学工具）
├── .cspell/          # cspell 自定义词典
├── .vscode/          # 编辑器配置
├── tsconfig.base.json   # 全局 TS 基底（严格模式集合）
├── tsconfig.json        # 根 Project References 聚合（仅 libraries）
├── eslint.config.js
├── commitlint.config.js
├── .prettierrc.json
├── .lintstagedrc.js
├── cspell.json
└── pnpm-workspace.yaml
```

---

## 环境要求

- Node.js >= 20
- 推荐使用 corepack 启用 pnpm：

  ```bash
  corepack enable
  corepack prepare pnpm@10.23.0 --activate
  ```

---

## 快速开始

```bash
pnpm install          # 安装依赖

pnpm build            # 构建所有 library（packages/*）
pnpm clean            # 清理 library 的 dist 与 tsbuildinfo
pnpm typecheck        # library 构建 + 所有 app 的 tsc --noEmit

pnpm lint:eslint      # ESLint 校验
pnpm lint:prettier    # Prettier 格式化
pnpm lint:spellcheck  # cspell 拼写检查

pnpm commit           # 启动交互式 commit（cz-git）
```

单独构建 / 类型检查某个子包：

```bash
pnpm --filter @monorepo/utils build
pnpm --filter @monorepo/web typecheck
```

---

## TypeScript Project References 架构

根 `tsconfig.json` 只聚合 **library** 子项目（`packages/components`、`packages/utils`），原因：

- Library 启用 `composite: true + emitDeclarationOnly: true`，只产出 `.d.ts`，适合被 Project References 引用；
- App（React / Node 应用）不是发布库，强制 `composite` 会产出无用声明文件；因此 app 通过各自的 `tsc --noEmit` 做类型检查，运行时交给后续接入的 Vite / tsx 处理。

工作流：

1. `tsc -b`：增量编译 libraries → 产出 `packages/*/dist/*.d.ts`
2. App 的 `tsc --noEmit`：依赖上一步生成的类型进行校验

---

## `@monorepo/utils` 消费模式（源码直连）

`packages/utils` 的 `package.json` 将 `exports` 指向 `./src/index.ts`，不走打包步骤。消费方直接 import 源码，由下游 bundler（未来的 Vite）处理 TS 编译。

```ts
import { clamp, add } from "@monorepo/utils";
```

- 适用：`moduleResolution: bundler` 的下游（`apps/web`、`apps/admin`、`packages/components`）
- **不适用**：`moduleResolution: nodenext` 且需要运行时 `node` 直接执行 `.ts` 的场景（当前 `apps/server` 尚未 import utils，暂无影响）

后续若需要 Node 原生执行或对外发布，再接入 `tsup` / `unbuild` 产出 `dist/*.js + *.d.ts`，并把 `exports` 切换到 dist 即可。

---

## 提交规范

- 遵循 [Conventional Commits](https://www.conventionalcommits.org/)
- 允许的 type：`feat / fix / docs / style / refactor / perf / test / chore / ci / build / revert`
- 建议 scope：`app / api / ui / deps / config / docs / build`
- 使用 `pnpm commit` 走交互式选择器（cz-git），提交信息会自动过 commitlint 校验

示例：

```
feat(utils): 新增 clamp 与 isFiniteNumber 工具函数
```

---

## Git Hooks（husky + lint-staged）

`pre-commit` 阶段对暂存文件执行：

- `cspell lint` —— 拼写检查
- `prettier --write` —— 自动格式化
- `eslint` —— 代码规范校验

新词需要加入词典：编辑 `.cspell/custom-dictionary.txt`。

---

## 开发路线图（TODO）

- [ ] `apps/web`、`apps/admin` 接入 Vite + React + Antd
- [ ] `apps/server` 选择运行时方案（tsx / Vite Node / NestJS 等）
- [ ] `packages/components` 搭建组件库基线（开发环境用 Storybook 或 Vite）
- [ ] 引入单测方案（Vitest）
- [ ] 考虑引入 Turborepo / Nx 做任务编排与缓存
- [ ] 补齐 CI（GitHub Actions：install / build / typecheck / lint）

---

## License

ISC
