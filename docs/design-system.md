# Manulife 风格设计系统

## 颜色方案

### 主色调 (Primary - 绿色)
- `primary-400`: `#68b631` - 主按钮、强调色
- `primary-500`: `#4a9c1f` - hover 状态
- `primary-50`: `#f0f9f4` - 背景高亮

### 强调色 (Accent - 红橙色)
- `accent-500`: `#C14A36` - 次要强调
- `accent-100`: `#fef2f2` - 浅背景

### 链接色
- `link`: `#046138` - 默认链接色
- `link-hover`: `#035028` - hover 状态

### 文本色
- `text-primary`: `#282B3E` - 主要文本
- `text-secondary`: `#565656` - 次要文本

### 背景色
- `background-primary`: `#FFFFFF` - 白色背景
- `background-secondary`: `#F8F8F8` - 浅灰背景
- `background-dark`: `#151b17` - 深色背景（Footer）

## 组件样式

### 按钮
- `.btn-primary` - 绿色主按钮
- `.btn-secondary` - 白色次要按钮
- `.btn-accent` - 红橙色强调按钮

### 表单
- `.input` - 标准输入框
- `.textarea` - 文本域
- 焦点状态使用 `primary-400` 颜色

### 卡片
- `.card` - 白色卡片，阴影效果

### 导航
- `.nav-link` - 导航链接样式（无下划线）

## 字体
- 字体家族: Arial, Helvetica, sans-serif
- 标题使用 `font-semibold` 或 `font-bold`
- 正文使用默认字重

## 布局
- 容器: `.container-custom` (max-width: 1280px)
- 区块: `.section` (py-16 px-4)

## 动画
- 过渡时间: 200ms (transition-colors duration-200)
- 悬停效果: 所有交互元素都有平滑过渡
