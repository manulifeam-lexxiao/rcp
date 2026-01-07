# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- 四种邮件模板支持
  - OT Record Initiation（加班启动）
  - OT Completed（加班完成）
  - WFH Request（WFH申请）
  - Leave Request（请假申请）
- HTML 邮件预览功能
- 双按钮工作流
  - "创建新邮件之后粘贴内容"：复制HTML格式+打开只带主题的邮件
  - "创建不带格式以及签名的邮件"：传统纯文本邮件
- 完整 HTML 文档结构复制（兼容 Outlook）
  - 包含 DOCTYPE、charset、viewport meta 标签
  - Calibri 字体默认（Outlook 标准字体）
  - 内联样式保留（包括红色文本）
- HashRouter 支持（解决 GitHub Pages 刷新 404）
- Logo 动态路径支持（BASE_URL）
- 侧边栏高度优化（占满左侧视口）

### Changed

- 邮件生成器 UI 重构
  - 预览区移至按钮上方
  - 移除隐藏/显示预览按钮
  - 预览自动显示（表单完整时）
  - 优化按钮布局和样式
- 布局改进
  - Sidebar 使用 `h-full` 替代 `min-h-screen`
  - PortalLayout 使用 `h-screen` 确保固定视口高度
- 所有表单组件统一更新
  - 移除 `showPreview` 状态
  - 移除 `handleSubmit` 和表单提交按钮
  - 统一 EmailPreview 接口

### Fixed

- GitHub Pages 部署问题
  - Logo 路径使用 `import.meta.env.BASE_URL`
  - 404.html 重定向支持
  - HashRouter 解决刷新 404 问题
- Outlook HTML 样式复制问题
  - 红色文本样式现在正确复制到 Outlook
  - 完整 HTML 文档结构保证样式兼容性

### Technical

- TypeScript 严格模式零 `any`
- 38 个单元测试全部通过
- ESLint + Prettier 代码规范
- Vitest + React Testing Library

## [1.0.0] - 2026-01-06

### Added

- 初始版本发布
- 三栏式门户布局（Header + Sidebar + Main + Footer）
- Home 页面：展示当日 WFH 和请假信息
- Emailer 页面：OT 邮件生成器
  - 支持 Outlook Web 深链接
  - 支持 mailto 回退链接
  - 严格 URL 编码（%20 空格，%0D%0A 换行）
- 邮件模板系统
  - 基于 JSON 的模板配置
  - 占位符替换引擎
  - 支持 YYYYMMMDD 日期格式
- 功能开关系统（FeatureGate）
- 响应式设计，支持移动端
- 完整的单元测试覆盖
- TypeScript 严格模式（零 any）
- ESLint + Prettier 代码规范

### Dependencies

- React 18.3.1
- TypeScript 5.3.3
- Vite 5.4.21
- React Router 6.22.0
- Tailwind CSS 3.4.1
- React Hook Form 7.50.0
- Zod 3.22.4
- date-fns 3.3.1
- Vitest 1.6.1

### Planned

- 身份 Provider（Microsoft Graph 集成）
- 更多邮件模板扩展
- 报告功能
- 权限系统（角色/部门）
- 考勤数据后端 API 集成

- 国际化（i18n）
