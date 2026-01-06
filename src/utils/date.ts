import { format } from 'date-fns';

/**
 * 格式化日期为 2025Dec19 格式：yyyy + 月英文三字母 + 两位日
 */
export function formatYYYYMMMDD(date: Date): string {
  return format(date, 'yyyyLLLdd');
}
