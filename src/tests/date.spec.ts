import { describe, it, expect } from 'vitest';
import { formatYYYYMMMDD } from '@/utils/date';

describe('Date Utils', () => {
  describe('formatYYYYMMMDD', () => {
    it('should format date correctly', () => {
      const date = new Date('2026-01-07');
      const result = formatYYYYMMMDD(date);
      expect(result).toMatch(/2026[A-Z][a-z]{2}07/);
    });

    it('should handle different months', () => {
      const jan = new Date('2026-01-15');
      const dec = new Date('2026-12-25');
      
      expect(formatYYYYMMMDD(jan)).toContain('Jan');
      expect(formatYYYYMMMDD(dec)).toContain('Dec');
    });

    it('should pad day numbers', () => {
      const date = new Date('2026-01-05');
      const result = formatYYYYMMMDD(date);
      expect(result).toContain('05');
    });
  });


});
