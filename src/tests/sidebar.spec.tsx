import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

describe('Sidebar Component', () => {
  it('should render navigation links', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Emailer')).toBeInTheDocument();
  });

  it('should have correct styling', () => {
    const { container } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    
    const sidebar = container.firstChild;
    expect(sidebar).toHaveClass('bg-primary');
    expect(sidebar).toHaveClass('min-h-screen');
  });

  it('should render navigation items', () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});
