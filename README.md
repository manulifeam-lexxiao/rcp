# Retirement Chengdu Portal (RCP)

> 一个为 Manulife Retirement Chengdu 团队构建的内部门户应用，提供考勤信息展示和邮件模板生成功能。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff)](https://vitejs.dev/)

## 📋 目录

- [功能特性](#功能特性)
- [快速开始](#快速开始)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [开发指南](#开发指南)
- [测试](#测试)
- [部署](#部署)
- [文档](#文档)
- [License](#license)

## ✨ 功能特性

### 考勤信息看板

- ✅ 实时显示当日 WFH（Work From Home）人员
- ✅ 实时显示当日请假人员
- ✅ 全员 WFH 安排周视图
- ✅ 未来一周请假日历

### 邮件模板生成器

- ✅ OT（加班）启动邮件
- ✅ OT 完成邮件
- ✅ WFH 申请邮件
- ✅ 请假申请邮件
- ✅ HTML 格式预览
- ✅ 一键复制带格式内容到 Outlook
- ✅ 纯文本邮件备选方案

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装

```bash
# 克隆仓库
git clone https://github.com/manulifeam-lexxiao/rcp.git

# 进入项目目录
cd rcp

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173/rcp/
```

### 构建

```bash
# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 🛠️ 技术栈

### 核心框架

- **React 18.3** - UI 框架
- **TypeScript 5.3** - 类型安全（严格模式）
- **Vite 5.4** - 构建工具与开发服务器
- **React Router 6** - 客户端路由

### UI 与样式

- **Tailwind CSS 3.4** - 原子化 CSS 框架
- 自定义设计系统（详见 [design-system.md](./docs/design-system.md)）

### 表单与验证

- **React Hook Form 7.50** - 高性能表单管理
- **Zod 3.22** - TypeScript-first schema 验证

### 测试

- **Vitest 1.6** - 单元测试框架
- **React Testing Library 14.3** - React 组件测试
- **jsdom 24.1** - DOM 环境模拟

### 工具库

- **date-fns 3.3** - 现代化日期处理

## 📁 项目结构

```text
rcp/
├── src/
│   ├── app/                    # 应用入口
│   │   └── App.tsx            # 路由配置
│   ├── pages/                  # 页面组件
│   │   ├── Home.tsx           # 考勤信息看板
│   │   └── Emailer.tsx        # 邮件生成器
│   ├── components/             # 通用组件
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── layout/                 # 布局组件
│   │   └── PortalLayout.tsx
│   ├── features/               # 功能模块
│   │   └── email/             # 邮件功能
│   │       ├── builder/       # 链接构建器
│   │       ├── templates/     # 模板引擎
│   │       └── ui/            # UI 组件
│   ├── hooks/                  # 自定义 Hooks
│   ├── utils/                  # 工具函数
│   ├── data/                   # JSON 数据
│   │   ├── features.json      # 功能开关
│   │   ├── templates.json     # 邮件模板
│   │   ├── attendance.json    # 考勤数据
│   │   └── profile.json       # 用户配置
│   ├── styles/                 # 全局样式
│   ├── tests/                  # 测试文件
│   └── main.tsx               # 入口文件
├── docs/                       # 文档目录
├── public/                     # 静态资源
├── dist/                       # 构建输出
└── package.json
```

## 💻 开发指南

### 可用命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 生产构建
npm run preview          # 预览生产构建

# 数据同步
npm run sync             # 从 Excel 同步数据到 JSON

# 代码质量
npm run typecheck        # TypeScript 类型检查
npm run lint             # ESLint 代码检查
npm run format           # Prettier 代码格式化

# 测试
npm run test             # 运行测试
npm run test:watch       # 监听模式测试
npm run test:coverage    # 测试覆盖率
```

### 代码规范

- ✅ TypeScript 严格模式
- ✅ ESLint + Prettier
- ✅ 零 `any` 类型
- ✅ 函数式组件 + Hooks
- ✅ 单元测试覆盖

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试相关
chore: 构建/工具链
```

## 🧪 测试

```bash
# 运行所有测试
npm run test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
```

当前测试覆盖:

- ✅ 38 个测试全部通过
- ✅ 核心工具函数 100% 覆盖
- ✅ 业务逻辑单元测试
- ✅ 组件集成测试

## 📦 部署

### GitHub Pages

生产环境: <https://manulifeam-lexxiao.github.io/rcp/>

自动部署流程:

1. 推送到 `main` 分支
2. GitHub Actions 自动构建
3. 部署到 GitHub Pages

### 手动部署

```bash
# 构建
npm run build

# dist/ 目录包含所有静态资源
# 可部署到任何静态托管服务
```

## 📚 文档

详细文档请查看 [docs](./docs/) 目录:

| 文档 | 说明 |
|------|------|
| [完整文档](./docs/README.md) | 项目详细说明与架构设计 |
| [设计系统](./docs/design-system.md) | UI/UX 设计规范 |
| [测试指南](./docs/testing.md) | 测试策略与最佳实践 |
| [更新日志](./docs/CHANGELOG.md) | 版本历史与变更记录 |
| [演示说明](./docs/DEMO.md) | 功能演示与使用指南 |

## 🔄 自动化脚本

### 一键同步并推送数据

项目提供了自动化脚本来简化数据同步和提交流程：

**Windows 批处理脚本：**
```bash
# 双击运行或在命令行执行
.\sync-and-push.bat
```

**PowerShell 脚本：**
```powershell
# 在 PowerShell 中执行
.\sync-and-push.ps1
```

脚本会自动执行以下操作：
1. 运行 `npm run sync` 同步 Excel 数据
2. 使用 `git add .` 添加所有更改
3. 创建带时间戳的提交：`* data 2026-01-21 10:30:00`
4. 推送到远程仓库

**注意：** 首次运行 PowerShell 脚本可能需要设置执行策略：
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 License

MIT License - 详见 [LICENSE](./LICENSE) 文件

---

**Made with ❤️ by Retirement Chengdu Team**

