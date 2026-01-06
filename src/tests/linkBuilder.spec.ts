import { describe, it, expect } from 'vitest';
import { buildLinks } from '@/features/email/builder/linkBuilder';

describe('linkBuilder', () => {
  it('should encode spaces as %20', () => {
    const { owa, mailto } = buildLinks('Test Subject', 'Test Body');
    expect(owa).toContain('Test%20Subject');
    expect(owa).toContain('Test%20Body');
    expect(mailto).toContain('Test%20Subject');
    expect(mailto).toContain('Test%20Body');
  });

  it('should encode newlines as %0D%0A', () => {
    const { owa, mailto } = buildLinks('Subject', 'Line1\nLine2');
    expect(owa).toContain('%0D%0A');
    expect(mailto).toContain('%0D%0A');
  });

  it('should not contain plus signs', () => {
    const { owa, mailto } = buildLinks('Test Subject', 'Test Body with spaces');
    expect(owa).not.toContain('+');
    expect(mailto).not.toContain('+');
  });

  it('should generate correct OWA link', () => {
    const { owa } = buildLinks('Subject', 'Body');
    expect(owa).toMatch(/^https:\/\/outlook\.office\.com\/mail\/deeplink\/compose/);
    expect(owa).toContain('subject=');
    expect(owa).toContain('body=');
  });

  it('should generate correct mailto link', () => {
    const { mailto } = buildLinks('Subject', 'Body');
    expect(mailto).toMatch(/^mailto:\?/);
    expect(mailto).toContain('subject=');
    expect(mailto).toContain('body=');
  });
});
