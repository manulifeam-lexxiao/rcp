# RCP 项目文档索引

> Retirement Chengdu Portal 完整文档导航

## 📖 文档结构

### 🚀 入门文档

| 文档 | 描述 | 适用人群 |
| --- | --- | --- |
| [README.md](../README.md) | 项目概览与快速开始 | 所有人 |
| [DEMO.md](./DEMO.md) | 功能演示与使用指南 | 最终用户、测试人员 |

### 💻 开发文档

| 文档 | 描述 | 适用人群 |
| --- | --- | --- |
| [完整技术文档](./README.md) | 详细技术架构与实现细节 | 开发人员 |
| [设计系统](./design-system.md) | UI/UX 设计规范与组件库 | 设计师、前端开发 |
| [测试指南](./testing.md) | 测试策略与最佳实践 | QA、开发人员 |

### 📝 维护文档

| 文档 | 描述 | 适用人群 |
| --- | --- | --- |
| [更新日志](./CHANGELOG.md) | 版本历史与变更记录 | 所有人 |

## 🎯 快速链接

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 运行测试
npm run test

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 类型检查
npm run typecheck
```

### 在线资源

- **生产环境**: <https://manulifeam-lexxiao.github.io/rcp/>
- **GitHub 仓库**: <https://github.com/manulifeam-lexxiao/rcp>
- **Issue 追踪**: <https://github.com/manulifeam-lexxiao/rcp/issues>

## 📦 核心功能模块

### 1. 考勤信息看板 (`/`)

**功能特性**:

- ✅ 今日 WFH 人员实时显示
- ✅ 今日请假人员实时显示
- ✅ 全员 WFH 周安排表
- ✅ 未来一周请假日历

**相关文件**:

- `src/pages/Home.tsx`
- `src/data/attendance.json`

### 2. 邮件生成器 (`/emailer`)

**功能特性**:

- ✅ OT 启动邮件模板
- ✅ OT 完成邮件模板
- ✅ WFH 申请邮件模板
- ✅ 请假申请邮件模板
- ✅ HTML 格式预览
- ✅ 一键复制到 Outlook

**相关文件**:

- `src/pages/Emailer.tsx`
- `src/features/email/`
- `src/data/templates.json`

## 🛠️ 技术栈

| 类别 | 技术 | 版本 | 文档 |
| --- | --- | --- | --- |
| 核心框架 | React | 18.3 | [React Docs](https://react.dev/) |
| 类型系统 | TypeScript | 5.3 | [TS Docs](https://www.typescriptlang.org/) |
| 构建工具 | Vite | 5.4 | [Vite Docs](https://vitejs.dev/) |
| 路由 | React Router | 6.x | [Router Docs](https://reactrouter.com/) |
| 样式 | Tailwind CSS | 3.4 | [Tailwind Docs](https://tailwindcss.com/) |
| 表单 | React Hook Form | 7.50 | [RHF Docs](https://react-hook-form.com/) |
| 验证 | Zod | 3.22 | [Zod Docs](https://zod.dev/) |
| 测试 | Vitest | 1.6 | [Vitest Docs](https://vitest.dev/) |

## 📊 项目状态

### 构建状态

- ✅ **TypeScript**: 严格模式，零 `any` 类型
- ✅ **ESLint**: 无警告
- ✅ **构建**: 成功
- ✅ **部署**: GitHub Pages 自动部署

### 测试覆盖

- ✅ **单元测试**: 38/38 通过
- ✅ **核心工具**: 100% 覆盖
- ✅ **业务逻辑**: 单元测试覆盖
- ✅ **组件**: 集成测试覆盖

## 🔧 开发工作流

### 1. 新功能开发

```bash
# 创建特性分支
git checkout -b feature/new-feature

# 开发
npm run dev

# 测试
npm run test

# 提交
git commit -m "feat: add new feature"
```

### 2. 代码审查清单

- [ ] TypeScript 类型检查通过
- [ ] 单元测试通过
- [ ] ESLint 无警告
- [ ] 代码格式化（Prettier）
- [ ] 遵循 Conventional Commits

### 3. 发布流程

1. 更新版本号 (`package.json`)
2. 更新 `CHANGELOG.md`
3. 提交到 `main` 分支
4. GitHub Actions 自动部署

## 🤔 常见问题

### 如何添加新的邮件模板？

1. 在 `src/data/templates.json` 添加模板定义
2. 在 `src/features/email/ui/` 创建表单组件
3. 在 `src/pages/Emailer.tsx` 添加标签页
4. 编写单元测试 (`src/tests/`)

### 如何更新考勤数据？

编辑 `src/data/attendance.json`:

```json
{
  "wfh": [
    { "name": "John Doe", "weekday": "mon" }
  ],
  "leave": [
    { "name": "Jane Smith", "leaveDate": "2026-01-15" }
  ]
}
```

### 如何自定义主题？

修改 `tailwind.config.ts` 中的主题配置:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#00573F',
      // ...
    }
  }
}
```

## 📞 获取帮助

### 技术支持

- **GitHub Issues**: 提交 Bug 报告或功能请求
- **GitHub Discussions**: 技术讨论与问答
- **Code Review**: 提交 Pull Request 获取反馈

### 团队联系

- **项目负责人**: Retirement Chengdu Team
- **邮箱**: 通过 GitHub Issue 联系

## 📚 扩展阅读

### 官方文档

- [React 官方文档](https://react.dev/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Vite 指南](https://vitejs.dev/guide/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

### 最佳实践

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)

## 📜 License

MIT License - 详见 [LICENSE](../LICENSE)

## 🔄 文档维护

### 维护原则

- ✅ 使用 Markdown 格式
- ✅ 保持简洁清晰
- ✅ 及时更新变更
- ✅ 避免重复内容
- ✅ 包含示例代码

### 更新频率

- **README.md**: 重大功能变更时更新
- **CHANGELOG.md**: 每次发布时更新
- **技术文档**: 架构变更时更新
- **DEMO.md**: 新功能添加时更新

---

*最后更新: 2026-01-07*

**Made with ❤️ by Retirement Chengdu Team**

| README | 项目概览 | 所有人 |
| testing.md | 测试指南 | 开发者 |
| design-system.md | 设计规范 | 开发者/设计师 |
| CHANGELOG | 版本历史 | 所有人 |
| DEMO | 功能演示 | 用户/测试人员 |
