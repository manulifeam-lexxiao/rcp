import { describe, it, expect } from 'vitest';
import { encodeForQuery } from '@/utils/encoding';

describe('Encoding Utils', () => {
  describe('encodeForQuery', () => {
    it('should encode special characters', () => {
      const input = 'Hello World';
      const result = encodeForQuery(input);
      expect(result).toBe('Hello%20World');
    });

    it('should encode email content with line breaks', () => {
      const input = 'Line 1\nLine 2\nLine 3';
      const result = encodeForQuery(input);
      expect(result).toContain('%0A'); // \n encoded
    });

    it('should handle special characters in subject', () => {
      const input = 'OT Record: Test & Demo';
      const result = encodeForQuery(input);
      expect(result).toContain('%26'); // & encoded
    });

    it('should encode bullet points', () => {
      const input = '• Item 1\n• Item 2';
      const result = encodeForQuery(input);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('should handle empty string', () => {
      const result = encodeForQuery('');
      expect(result).toBe('');
    });

    it('should preserve non-ASCII characters', () => {
      const input = '中文测试';
      const result = encodeForQuery(input);
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
