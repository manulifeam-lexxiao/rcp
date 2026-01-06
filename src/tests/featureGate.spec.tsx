import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { useFeatureList } from '@/hooks/useFeatureGate';
import { FeatureGate } from '@/components/FeatureGate';

describe('FeatureGate', () => {
  it('should render children when feature is enabled', () => {
    const { getByText } = render(
      <FeatureGate featureId="home">
        <div>Home Content</div>
      </FeatureGate>
    );

    expect(getByText('Home Content')).toBeInTheDocument();
  });

  it('should show disabled message for non-existent feature', () => {
    const { getByText } = render(
      <FeatureGate featureId="non-existent">
        <div>Content</div>
      </FeatureGate>
    );

    expect(getByText('Feature disabled.')).toBeInTheDocument();
  });
});

describe('useFeatureList', () => {
  it('should return enabled features', () => {
    const TestComponent = () => {
      const features = useFeatureList();
      return (
        <div>
          {features.map((f) => (
            <div key={f.id}>{f.label}</div>
          ))}
        </div>
      );
    };

    const { getByText } = render(<TestComponent />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Emailer')).toBeInTheDocument();
  });
});
