import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  it('should render copyright text', () => {
    render(<Footer />);
    
    expect(screen.getByText(/Powered by Retirement/i)).toBeInTheDocument();
  });

  it('should display current year', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('should have correct styling', () => {
    const { container } = render(<Footer />);
    
    const footer = container.firstChild;
    expect(footer).toHaveClass('bg-primary');
  });
});
