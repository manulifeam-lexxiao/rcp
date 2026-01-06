import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '@/components/Header';

describe('Header Component', () => {
  it('should render logo', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    const logo = screen.getByAltText('Manulife');
    expect(logo).toBeInTheDocument();
  });

  it('should render title', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // 标题现在在inline style中，检查是否存在
    expect(container.textContent).toContain('Retirement ChengDu Portal');
  });

  it('should have correct height', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('h-20');
  });
});
