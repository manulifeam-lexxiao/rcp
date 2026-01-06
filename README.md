# Retirement Chengdu Portal

一个基于 Vite + React + TypeScript 构建的 Retirement 部门门户应用，提供请假/WFH 信息展示和邮件生成功能。

## 项目概览

这是一个纯前端应用，采用三栏式布局设计：
- **顶部 Header**：显示 "Retirement Chengdu Portal" 标题
- **左侧 Sidebar**：可折叠菜单，默认显示图标，鼠标悬停展开显示完整标签
- **右侧主区域**：内容展示区
- **底部 Footer**：显示 "powered by retirement"

## 技术栈

### 核心框架
- **Vite 5.x** - 构建工具
- **React 18.x** - UI 框架
- **TypeScript 5.x** - 类型安全（严格模式，零 any）
- **React Router v6** - 路由管理

### UI & 样式
- **Tailwind CSS 3.x** - 原子化 CSS 框架
- 响应式设计，支持移动端

### 表单 & 验证
- **React Hook Form** - 表单管理
- **Zod** - Schema 验证

### 工具库
- **date-fns** - 日期格式化

### 测试
- **Vitest** - 单元测试框架
- **React Testing Library** - React 组件测试
- **jsdom** - DOM 环境模拟

### 代码质量
- **ESLint** - 代码检查（TypeScript 严格规则）
- **Prettier** - 代码格式化

## 快速开始

### 前置要求
- Node.js 18+ 
- npm 或 pnpm

### 安装依赖

```powershell
cd C:\CODE\r\retirement-portal
npm install
```

### 开发模式

```powershell
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```powershell
npm run build
```

### 预览生产构建

```powershell
npm run preview
```

### 其他命令

```powershell
# 类型检查
npm run typecheck

# 代码检查
npm run lint

# 代码格式化
npm run format

# 运行测试
npm run test

# 运行变更文件的测试
npm run test:changed
```

## 项目结构

```
retirement-portal/
├── src/
│   ├── app/                    # 应用根
│   │   └── App.tsx            # 路由配置与全局布局
│   ├── pages/                  # 页面组件
│   │   ├── Home.tsx           # 首页（显示 WFH/请假信息）
│   │   └── Emailer.tsx        # 邮件生成器页面
│   ├── components/             # 通用 UI 组件
│   │   ├── Header.tsx         # 顶部导航
│   │   ├── Footer.tsx         # 底部信息
│   │   └── Sidebar.tsx        # 侧边栏菜单
│   ├── layout/                 # 布局组件
│   │   └── PortalLayout.tsx   # 三栏式主布局
│   ├── features/               # 业务功能模块
│   │   ├── email/             # 邮件功能
│   │   │   ├── builder/       # 链接生成器
│   │   │   │   └── linkBuilder.ts
│   │   │   ├── templates/     # 模板系统
│   │   │   │   ├── schema.ts  # Zod Schema
│   │   │   │   ├── engine.ts  # 模板引擎
│   │   │   │   └── loader.ts  # 模板加载器
│   │   │   └── ui/            # UI 组件
│   │   │       └── EmailForm.tsx
│   │   └── attendance/         # 考勤数据（预留）
│   ├── hooks/                  # 自定义 Hooks
│   │   └── useFeatureGate.tsx # 功能开关
│   ├── utils/                  # 工具函数
│   │   ├── encoding.ts        # URL 编码
│   │   └── date.ts            # 日期格式化
│   ├── styles/                 # 全局样式
│   │   └── tailwind.css       # Tailwind 配置
│   ├── data/                   # JSON 配置
│   │   ├── features.json      # 功能开关配置
│   │   ├── attendance.json    # 考勤数据
│   │   ├── templates.json     # 邮件模板
│   │   └── profile.json       # 用户信息（降级数据）
│   ├── tests/                  # 测试文件
│   │   ├── setup.ts
│   │   ├── linkBuilder.spec.ts
│   │   ├── engine.spec.ts
│   │   └── featureGate.spec.tsx
│   └── main.tsx               # 应用入口
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.cjs
├── .prettierrc
├── .editorconfig
├── .gitignore
├── README.md
├── LICENSE
└── CHANGELOG.md
```

## 核心功能

### 1. Home 页面

展示当日考勤信息：
- **今日 WFH**：在家办公的同事列表
- **今日请假**：请假的同事列表

#### 数据来源
数据从 `src/data/attendance.json` 读取，格式如下：

```json
{
  "days": [
    { "date": "2026-01-06", "wfh": ["Alice", "Bob"], "leave": ["Carol"] }
  ]
}
```

#### 扩展方式
未来可替换为：
1. 内部 HR 系统 API
2. Microsoft Graph API
3. 其他考勤系统

在 `src/features/attendance/` 创建 Provider，实现数据获取接口即可。

### 2. Emailer 页面

生成 OT（加班）记录邮件，支持以下字段：
- OT Date（加班日期）
- Planned Start Time（计划开始时间）
- Estimated OT Hours（预计加班时长）
- Task Description（任务描述）
- NAME（姓名）

#### 邮件模板系统

**模板配置** (`src/data/templates.json`)

```json
[
  {
    "id": "ot-record-initiation",
    "displayName": "OT Record Initiation",
    "subject": "OT Record Initiation - [NAME] - [YYYYMMMDD]",
    "body": "...",
    "placeholders": ["NAME", "YYYYMMMDD", "..."],
    "builder": {
      "strategy": "owa_then_mailto",
      "owa": "https://outlook.office.com/mail/deeplink/compose",
      "mailto": "mailto:"
    }
  }
]
```

**占位符替换**

模板引擎支持以下占位符：
- `[NAME]` - 姓名
- `[YYYY-MM-DD]` - 日期（ISO 格式）
- `[YYYYMMMDD]` - 日期（2025Dec19 格式）
- `[00:00]` - 时间
- `[X hours]` - 时长
- `[Task]` - 任务描述
- `[Sender]` - 发件人（预留，可从身份 Provider 获取）

**链接生成策略**

生成两种邮件链接：

1. **Outlook Web 深链接**（推荐）
   ```
   https://outlook.office.com/mail/deeplink/compose?subject=...&body=...
   ```
   - 在 Outlook Web App 中打开
   - 不预填收件人（to 参数留空）
   - 需要用户登录 Microsoft 账号

2. **mailto 回退链接**
   ```
   mailto:?subject=...&body=...
   ```
   - 使用本机默认邮件客户端
   - 兼容性更好

#### URL 编码规范

为确保链接在认证重定向后正确显示，采用严格编码策略：

- **空格** → `%20`（不使用 `+`）
- **换行** → `%0D%0A`（CRLF）
- 所有特殊字符均进行 `encodeURIComponent` 编码

实现见 `src/utils/encoding.ts`。

#### 使用示例

**输入：**
- OT Date: 2025-12-19
- Planned Start Time: 18:00
- Estimated OT Hours: 2.5 hours
- Task Description: Production Release – BU service
- NAME: Lex Xiao

**生成的主题：**
```
OT Record Initiation - Lex Xiao - 2025Dec19
```

**生成的正文：**
```
Hi [Sender],

	I'll have an OT for the following:
•	OT Date: 2025-12-19
•	Planned start Time: 18:00
•	Estimated OT Hours: 2.5 hours
•	Task Description: Production Release – BU service

This is for initiating OT records, you may ignore this mail.

Thanks.
```

#### 附件与长度限制

- **Outlook Web 深链接**：受浏览器 URL 长度限制（通常 2000-8000 字符），不支持附件
- **mailto 链接**：受客户端限制，部分客户端不支持过长内容

建议：邮件正文保持简洁，附件通过邮件发送后手动添加。

### 3. 权限与菜单配置

通过 `src/data/features.json` 控制功能开关：

```json
[
  { "id": "home", "label": "Home", "path": "/home", "enabled": true },
  { "id": "emailer", "label": "Emailer", "path": "/emailer", "enabled": true }
]
```

#### FeatureGate 组件

用于条件渲染：

```tsx
import { FeatureGate } from '@/hooks/useFeatureGate';

<FeatureGate featureId="emailer">
  <Emailer />
</FeatureGate>
```

#### 扩展新功能

1. 在 `features.json` 添加配置：
   ```json
   { "id": "reports", "label": "Reports", "path": "/reports", "enabled": true }
   ```

2. 在 `src/pages/` 创建页面组件

3. 在 `App.tsx` 添加路由：
   ```tsx
   <Route path="/reports" element={
     <FeatureGate featureId="reports">
       <Reports />
     </FeatureGate>
   } />
   ```

#### 未来扩展

可基于以下维度扩展权限：
- 用户角色（role）
- 部门（department）
- 权限组（permission groups）

## 可选功能：身份 Provider

### Microsoft Graph 集成

可选安装 `@azure/msal-browser` 与 `@microsoft/microsoft-graph-client`，从 Azure AD 读取用户信息。

#### 实现步骤

1. **安装依赖**
   ```powershell
   npm install @azure/msal-browser @microsoft/microsoft-graph-client @microsoft/microsoft-graph-types
   ```

2. **配置 MSAL**

   在 `src/services/identity/msalProvider.ts` 配置：
   ```ts
   import { PublicClientApplication } from '@azure/msal-browser';
   
   const msalConfig = {
     auth: {
       clientId: 'YOUR_CLIENT_ID',
       authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
       redirectUri: window.location.origin,
     },
   };
   
   export const msalInstance = new PublicClientApplication(msalConfig);
   ```

3. **获取用户信息**
   ```ts
   export async function getMe() {
     const account = msalInstance.getAllAccounts()[0];
     if (!account) throw new Error('Not authenticated');
     
     const token = await msalInstance.acquireTokenSilent({
       scopes: ['User.Read'],
       account,
     });
     
     // 调用 Graph API /me
     const response = await fetch('https://graph.microsoft.com/v1.0/me', {
       headers: { Authorization: `Bearer ${token.accessToken}` },
     });
     
     return await response.json();
   }
   ```

4. **在 EmailForm 中使用**
   ```tsx
   useEffect(() => {
     getMe()
       .then(user => setValue('name', user.displayName))
       .catch(() => setValue('name', profile.displayName)); // 降级到 profile.json
   }, []);
   ```

#### 降级策略

若 Graph API 调用失败（未登录、网络错误等），自动使用 `src/data/profile.json` 的默认值。

## 布局交互

### Sidebar 折叠/展开

使用 Tailwind CSS 的 `group` 和 `group-hover` 实现：

```tsx
<div className="group">
  <div className="w-16 group-hover:w-64 transition-all duration-200">
    <Sidebar />
  </div>
</div>
```

- **默认状态**：宽度 64px（w-16），仅显示首字母
- **悬停状态**：宽度 256px（w-64），显示完整标签
- **动画**：200ms 缓动过渡

## 代码规范

### TypeScript

- **严格模式**：启用所有 strict 选项
- **零 any**：禁止使用 `any` 类型
- **类型推断**：优先使用类型推断，减少显式声明
- **空值检查**：启用 `strictNullChecks`

### ESLint 规则

- `@typescript-eslint/recommended`
- `@typescript-eslint/strict`
- `react-hooks/recommended`
- `@typescript-eslint/no-explicit-any: error`

### Prettier 配置

- 单引号
- 分号
- 每行最多 100 字符
- 2 空格缩进

### 提交前检查

```powershell
npm run typecheck  # 类型检查
npm run lint       # 代码检查
npm run format     # 格式化
npm run test       # 运行测试
```

## 单元测试

### 测试覆盖范围

1. **linkBuilder.spec.ts** - 链接生成与编码
   - 空格编码为 `%20`
   - 换行编码为 `%0D%0A`
   - 不含 `+` 符号
   - OWA 与 mailto 链接格式正确

2. **engine.spec.ts** - 模板引擎
   - 占位符正确替换
   - `YYYYMMMDD` 日期格式正确
   - 未替换的占位符保持原样

3. **featureGate.spec.tsx** - 功能开关
   - 启用的功能正常渲染
   - 禁用的功能显示提示信息
   - 菜单列表正确过滤

### 运行测试

```powershell
# 运行所有测试
npm run test

# 运行变更文件的测试
npm run test:changed

# 带 UI 界面
npx vitest --ui
```

## 部署

### GitHub Pages 部署（推荐）

项目已配置 GitHub Actions 自动部署到 GitHub Pages。

**配置步骤：**

1. **创建 GitHub 仓库**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/retirement-portal.git
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"
   - 保存

3. **触发部署**
   - 每次推送到 `main` 分支自动部署
   - 或在 Actions 标签页手动触发 "Deploy to GitHub Pages"

4. **访问应用**
   - 部署完成后访问：`https://YOUR_USERNAME.github.io/retirement-portal/`

**注意事项：**

- 如果仓库名不是 `retirement-portal`，需修改 `vite.config.ts` 中的 `base` 路径
- 如果部署到 `username.github.io`（用户站点），将 `base` 设为 `'/'`
- 首次部署可能需要几分钟

### 本地构建

```powershell
npm run build
```

生成的文件在 `dist/` 目录。

### 其他静态托管

可部署到：
- Azure Static Web Apps
- Vercel
- Netlify
- GitHub Pages
- IIS / Nginx

### IIS 配置

在 `dist/` 目录下创建 `web.config`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

## 许可证

MIT License - 详见 [LICENSE](./LICENSE)

## 变更日志

详见 [CHANGELOG.md](./CHANGELOG.md)

## 维护者

Retirement Chengdu Team

---

**Powered by Retirement** 🚀
