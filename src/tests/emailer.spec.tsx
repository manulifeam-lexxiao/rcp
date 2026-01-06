import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Emailer from '@/pages/Emailer';

// Mock hooks
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    userInfo: null,
    isAuthenticated: false,
    login: vi.fn(),
    logout: vi.fn(),
    isLoading: false,
  }),
}));

describe('Emailer Page', () => {
  it('should render tab navigation', () => {
    render(
      <BrowserRouter>
        <Emailer />
      </BrowserRouter>
    );
    
    expect(screen.getByText('启动加班')).toBeInTheDocument();
    expect(screen.getByText('结束加班')).toBeInTheDocument();
    expect(screen.getByText('申请WFH')).toBeInTheDocument();
    expect(screen.getByText('申请假期')).toBeInTheDocument();
  });

  it('should switch tabs', () => {
    render(
      <BrowserRouter>
        <Emailer />
      </BrowserRouter>
    );
    
    const wfhTab = screen.getByText('申请WFH');
    fireEvent.click(wfhTab);
    
    // 验证 WFH 表单显示
    expect(screen.getByText('WFH类型')).toBeInTheDocument();
  });

  it('should display email form in start-ot tab', () => {
    render(
      <BrowserRouter>
        <Emailer />
      </BrowserRouter>
    );
    
    expect(screen.getByText('OT日期')).toBeInTheDocument();
    expect(screen.getByText('计划开始时间')).toBeInTheDocument();
    expect(screen.getByText('预计加班小时数')).toBeInTheDocument();
    expect(screen.getByText('任务描述')).toBeInTheDocument();
  });
});
