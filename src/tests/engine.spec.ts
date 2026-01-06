import { describe, it, expect } from 'vitest';
import { resolveTokens } from '@/features/email/templates/engine';
import type { EmailTemplate } from '@/features/email/templates/schema';

describe('template engine', () => {
  const mockTemplate: EmailTemplate = {
    id: 'test',
    displayName: 'Test Template',
    subject: 'OT - [NAME] - [YYYYMMMDD]',
    body: 'Date: [YYYY-MM-DD]\nTime: [00:00]\nHours: [X hours]\nTask: [Task]',
    placeholders: ['NAME', 'YYYYMMMDD', 'YYYY-MM-DD', '00:00', 'X hours', 'Task'],
    builder: {
      strategy: 'owa_then_mailto',
      owa: 'https://outlook.office.com/mail/deeplink/compose',
      mailto: 'mailto:',
    },
  };

  it('should replace all tokens correctly', () => {
    const result = resolveTokens(mockTemplate, {
      NAME: 'John Doe',
      'YYYY-MM-DD': '2025-12-19',
      '00:00': '18:00',
      'X hours': '2.5 hours',
      Task: 'Production Release',
    });

    expect(result.subject).toContain('John Doe');
    expect(result.subject).toMatch(/2025\w{3}19/); // 2025Dec19
    expect(result.body).toContain('2025-12-19');
    expect(result.body).toContain('18:00');
    expect(result.body).toContain('2.5 hours');
    expect(result.body).toContain('Production Release');
  });

  it('should format YYYYMMMDD correctly', () => {
    const result = resolveTokens(mockTemplate, {
      NAME: 'Test',
      'YYYY-MM-DD': '2025-12-19',
    });

    expect(result.subject).toMatch(/2025Dec19/);
  });

  it('should use empty string for missing tokens', () => {
    const result = resolveTokens(mockTemplate, {
      NAME: 'Test',
    });

    // 未提供的 token 被替换为空字符串
    expect(result.body).not.toContain('[YYYY-MM-DD]');
    expect(result.body).not.toContain('[00:00]');
    expect(result.body).toContain('Date: '); // token 被替换为空
    expect(result.body).toContain('Time: ');
  });
});
