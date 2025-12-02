// commitlint.config.js

/** @type {import('cz-git').UserConfig} */
export default {
  // 使用约定式提交标准
  extends: ["@commitlint/config-conventional"],

  // 自定义规则
  rules: {
    // 允许的提交类型
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复 bug
        "docs", // 文档
        "style", // 样式（不影响逻辑，例如空格、逗号）
        "refactor", // 重构（既不是新增功能，也不是修复 BUG）
        "perf", // 性能优化
        "test", // 测试新增/修改
        "chore", // 构建、依赖更新、脚手架等
        "ci", // CI/CD 配置
        "build", // 构建系统
        "revert", // 回滚
      ],
    ],

    // 🔥 可选的 scope 校验（你可自行扩展）
    // 比如限定项目模块：user、doctor、student 等
    // scope 可为空
    "scope-enum": [1, "always", ["app", "api", "ui", "deps", "config", "docs", "build"]],

    // header 最长长度（推荐不超过 100 字符）
    "header-max-length": [2, "always", 100],

    // subject 要求至少一句话
    "subject-empty": [2, "never"],

    // type 不能为空
    "type-empty": [2, "never"],

    // subject 不能以句号结尾（减少中英文混乱）
    "subject-full-stop": [2, "never", "."],

    // 描述首字母不强制大小写（兼容中文）
    "subject-case": [0],

    // body 长度至少 10 字符（避免随便写）
    "body-min-length": [1, "always", 10],

    // footer（如 issue 关联）可以为空
    "footer-leading-blank": [1, "always"],

    // BREAKING CHANGE 必须大写
    "footer-max-line-length": [2, "always", 150],
  },

  /**
   * cz-git 配置（会被 commitlint 读取）
   * 这个部分可选，但推荐加上，统一 commit 体验
   */
  prompt: {
    messages: {
      type: "选择你的提交类型：",
      scope: "选择一个提交范围（可选）：",
      customScope: "请输入自定义的范围：",
      subject: "简要说明提交内容：",
      body: "详细描述（可选）：",
      breaking: "列出非兼容性变更（可选）：",
      footer: "关联关闭的 issue，例如：#123（可选）：",
      confirmCommit: "确认提交此 commit？",
    },

    // preset: "conventional", // 默认即可

    // 常用类型
    types: [
      { value: "feat", name: "feat:     ✨ 新功能" },
      { value: "fix", name: "fix:      🐛 修复 Bug" },
      { value: "docs", name: "docs:     📝 文档更新" },
      { value: "style", name: "style:    🎨 代码样式调整" },
      { value: "refactor", name: "refactor: ♻️ 重构" },
      { value: "perf", name: "perf:     ⚡ 性能优化" },
      { value: "test", name: "test:     🔍 测试用例变更" },
      { value: "chore", name: "chore:    🔧 构建/配置更新" },
      { value: "ci", name: "ci:       ⚙️ CI/CD 相关" },
      { value: "build", name: "build:    📦️ 构建系统" },
      { value: "revert", name: "revert:   ⏪ 回滚" },
    ],

    // 默认的 scope 列表
    scopes: ["app", "api", "ui", "deps", "build", "docs"],
  },
};
