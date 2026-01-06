# 项目演示示例

## 实际使用示例：生成 OT 邮件

### 输入数据

```
OT Date: 2025-12-19
Planned Start Time: 18:00
Estimated OT Hours: 2.5 hours
Task Description: Production Release – BU service
NAME: Lex Xiao
```

### 生成结果

#### 邮件主题
```
OT Record Initiation - Lex Xiao - 2025Dec19
```

#### 邮件正文
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

#### 生成的 Outlook Web 深链接
```
https://outlook.office.com/mail/deeplink/compose?subject=OT%20Record%20Initiation%20-%20Lex%20Xiao%20-%202025Dec19&body=Hi%20%5BSender%5D%2C%0D%0A%0D%0A%09I%27ll%20have%20an%20OT%20for%20the%20following%3A%0D%0A%E2%80%A2%09OT%20Date%3A%202025-12-19%0D%0A%E2%80%A2%09Planned%20start%20Time%3A%2018%3A00%0D%0A%E2%80%A2%09Estimated%20OT%20Hours%3A%202.5%20hours%0D%0A%E2%80%A2%09Task%20Description%3A%20Production%20Release%20%E2%80%93%20BU%20service%0D%0A%0D%0AThis%20is%20for%20initiating%20OT%20records%2C%20you%20may%20ignore%20this%20mail.%0D%0A%0D%0AThanks.
```

#### 生成的 mailto 链接
```
mailto:?subject=OT%20Record%20Initiation%20-%20Lex%20Xiao%20-%202025Dec19&body=Hi%20%5BSender%5D%2C%0D%0A%0D%0A%09I%27ll%20have%20an%20OT%20for%20the%20following%3A%0D%0A%E2%80%A2%09OT%20Date%3A%202025-12-19%0D%0A%E2%80%A2%09Planned%20start%20Time%3A%2018%3A00%0D%0A%E2%80%A2%09Estimated%20OT%20Hours%3A%202.5%20hours%0D%0A%E2%80%A2%09Task%20Description%3A%20Production%20Release%20%E2%80%93%20BU%20service%0D%0A%0D%0AThis%20is%20for%20initiating%20OT%20records%2C%20you%20may%20ignore%20this%20mail.%0D%0A%0D%0AThanks.
```

### URL 编码验证

✅ **空格编码为 %20**（而非 +）
- 示例：`Lex Xiao` → `Lex%20Xiao`

✅ **换行编码为 %0D%0A**（CRLF）
- 示例：`Hi [Sender],\n\n` → `Hi%20%5BSender%5D%2C%0D%0A%0D%0A`

✅ **特殊字符正确编码**
- `[` → `%5B`
- `]` → `%5D`
- `:` → `%3A`
- `–` (em dash) → `%E2%80%93`

## 项目启动流程

### 1. 安装依赖
```powershell
cd C:\CODE\r\retirement-portal
npm install
```

### 2. 开发模式运行
```powershell
npm run dev
```

访问：http://localhost:5173

### 3. 功能测试

#### Home 页面
- 地址：`/home`
- 功能：显示当日 WFH 和请假信息
- 数据来源：`src/data/attendance.json`

#### Emailer 页面
- 地址：`/emailer`
- 功能：填写表单生成 OT 邮件链接
- 操作：填写表单 → 点击"生成链接并在 OWA 打开" → 自动在新标签页打开 Outlook Web

### 4. 质量检查

```powershell
# 类型检查
npm run typecheck

# 代码检查
npm run lint

# 运行测试
npm run test

# 构建生产版本
npm run build
```

### 5. 预览生产构建

```powershell
npm run preview
```

访问：http://localhost:4173

## 目录结构总结

```
retirement-portal/
├── src/
│   ├── app/                    # 路由与应用根
│   ├── pages/                  # Home, Emailer 页面
│   ├── components/             # Header, Footer, Sidebar, FeatureGate
│   ├── layout/                 # 三栏式布局
│   ├── features/email/         # 邮件功能模块
│   │   ├── builder/           # 链接生成器
│   │   ├── templates/         # 模板系统
│   │   └── ui/                # EmailForm 组件
│   ├── hooks/                  # useFeatureGate
│   ├── utils/                  # encoding, date 工具
│   ├── styles/                 # Tailwind 样式
│   ├── data/                   # JSON 配置文件
│   └── tests/                  # 单元测试
├── dist/                       # 构建输出（生成）
├── node_modules/               # 依赖包
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .eslintrc.cjs
├── .prettierrc
├── README.md
└── LICENSE
```

## 测试结果

### ✅ 类型检查
```
> tsc --noEmit
✓ 无错误
```

### ✅ 代码检查
```
> eslint . --ext ts,tsx --max-warnings 0
✓ 无警告无错误
```

### ✅ 单元测试
```
> vitest

Test Files  3 passed (3)
     Tests  11 passed (11)
  
✓ linkBuilder.spec.ts (5 tests)
  - 空格编码为 %20
  - 换行编码为 %0D%0A
  - 不含 + 符号
  - OWA 链接格式正确
  - mailto 链接格式正确

✓ engine.spec.ts (3 tests)
  - 替换所有 token
  - YYYYMMMDD 格式正确
  - 缺失 token 用空字符串

✓ featureGate.spec.tsx (3 tests)
  - 启用功能正常渲染
  - 禁用功能显示提示
  - 菜单列表正确过滤
```

### ✅ 生产构建
```
> npm run build

vite v5.4.21 building for production...
✓ 367 modules transformed.
✓ built in 3.57s

dist/index.html                   0.49 kB │ gzip:  0.32 kB
dist/assets/index-C89Iqer6.css   12.40 kB │ gzip:  2.71 kB
dist/assets/index-BhE3pikZ.js   272.35 kB │ gzip: 83.61 kB
```

## 关键特性验证

### ✅ TypeScript 严格模式
- 启用所有 `strict` 选项
- 禁止 `any` 类型
- 所有文件零警告零错误

### ✅ 三栏式布局
- Header：固定高度 14 单位
- Sidebar：默认 16 单位宽，hover 展开至 64 单位
- Main：自适应宽度
- Footer：固定高度 10 单位

### ✅ 菜单折叠/展开
- 使用 Tailwind `group-hover` 实现
- 200ms 平滑过渡动画
- 折叠时显示首字母，展开显示完整标签

### ✅ 功能开关系统
- 通过 `features.json` 配置
- `FeatureGate` 组件条件渲染
- 支持动态扩展新功能

### ✅ 模板系统
- 基于 Zod Schema 验证
- 占位符替换引擎
- 支持自定义日期格式

### ✅ URL 编码策略
- 严格编码确保兼容性
- 避免重定向后出现 `+`
- 换行统一使用 CRLF

## 部署建议

### 推荐方案
1. **Azure Static Web Apps** - 免费托管，自动 CI/CD
2. **Vercel** - 零配置部署
3. **Netlify** - 拖放部署

### IIS 部署
1. 构建：`npm run build`
2. 上传 `dist/` 目录到 IIS 服务器
3. 添加 `web.config`（见 README）
4. 配置 URL Rewrite 支持 SPA 路由

---

**项目已成功初始化并通过所有验证！** 🎉
