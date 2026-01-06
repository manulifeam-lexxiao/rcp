# 测试指南

本项目使用 Vitest 作为测试框架。

## 运行测试

```bash
# 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 监听模式运行测试
npm run test:watch
```

## 测试文件结构

所有测试文件位于 `src/tests/` 目录：

### 单元测试

- `engine.spec.ts` - 邮件模板引擎测试
- `linkBuilder.spec.ts` - 邮件链接构建器测试
- `loader.spec.ts` - 模板加载器测试
- `date.spec.ts` - 日期工具函数测试
- `encoding.spec.ts` - 编码工具函数测试

### 组件测试

- `featureGate.spec.tsx` - 功能开关组件测试
- `header.spec.tsx` - Header 组件测试
- `sidebar.spec.tsx` - Sidebar 组件测试
- `footer.spec.tsx` - Footer 组件测试

### 页面测试

- `home.spec.tsx` - 首页测试
- `emailer.spec.tsx` - 邮件生成器页面测试

### Hook测试

- `useAuth.spec.tsx` - 认证 Hook 测试

## 编写测试

### 基本测试结构

```typescript
import { describe, it, expect } from 'vitest';

describe('Component/Function Name', () => {
  it('should do something', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = myFunction(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

### 组件测试

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Mock

```typescript
import { vi } from 'vitest';

// Mock 函数
const mockFn = vi.fn();

// Mock 模块
vi.mock('@/utils/auth', () => ({
  login: vi.fn(),
  logout: vi.fn(),
}));
```

## 测试覆盖率

运行测试覆盖率后，报告将生成在 `coverage/` 目录。

目标覆盖率：
- 语句覆盖率: > 80%
- 分支覆盖率: > 75%
- 函数覆盖率: > 80%
- 行覆盖率: > 80%

## 最佳实践

1. **每个功能都应该有测试**
2. **测试应该独立且可重复**
3. **使用描述性的测试名称**
4. **遵循 AAA 模式**: Arrange, Act, Assert
5. **避免测试实现细节，专注于行为**
6. **合理使用 Mock，但不要过度 Mock**
7. **保持测试简单，一个测试只测一件事**

## CI/CD

测试在以下情况下自动运行：
- Push 到主分支
- 创建 Pull Request
- 部署前

测试失败将阻止部署。
