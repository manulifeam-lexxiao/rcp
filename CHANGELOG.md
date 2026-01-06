# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- Vite 5.1.0
- React Router 6.22.0
- Tailwind CSS 3.4.1
- React Hook Form 7.50.0
- Zod 3.22.4
- date-fns 3.3.1
- Vitest 1.2.2

## [Unreleased]

### Added
- GitHub Actions 自动部署到 GitHub Pages
- `.nojekyll` 文件支持 SPA 路由
- Vite 配置支持 GitHub Pages base 路径

### Planned
- 身份 Provider（Microsoft Graph 集成）
- 更多邮件模板
- 报告功能
- 权限系统（角色/部门）
- 国际化（i18n）
