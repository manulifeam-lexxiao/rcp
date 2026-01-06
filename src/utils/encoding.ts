/**
 * 将字符串编码为 URL 查询安全格式：
 * - 空格统一编码为 %20
 * - 换行统一编码为 %0D%0A（CRLF）
 * - 避免出现 '+'（认证重定向后 '+' 可能保留）
 */
export function encodeForQuery(input: string): string {
  const normalized = input.replace(/\r?\n/g, '\r\n');
  return encodeURIComponent(normalized)
    .replace(/\+/g, '%20')
    .replace(/%0A/g, '%0D%0A');
}
