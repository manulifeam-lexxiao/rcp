import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';

describe('Home Page', () => {
  it('should render page title', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Retirement ChengDu Portal/i)).toBeInTheDocument();
  });

  it('should render feature sections', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText('今日 WFH')).toBeInTheDocument();
    expect(screen.getByText('今日请假')).toBeInTheDocument();
    expect(screen.getByText('常规 WFH 安排表')).toBeInTheDocument();
  });
});
