import type { EmailTemplate } from './schema';
import { formatYYYYMMMDD } from '@/utils/date';

type TokenValues = Record<string, string>;

export function resolveTokens(tpl: EmailTemplate, values: TokenValues) {
  const dateStr = values['YYYY-MM-DD'];
  const yyyymmmdd = dateStr
    ? formatYYYYMMMDD(new Date(dateStr))
    : formatYYYYMMMDD(new Date());

  const tokens: TokenValues = {
    NAME: values.NAME ?? '[NAME]',
    Sender: values.Sender ?? '[Sender]',
    'YYYY-MM-DD': values['YYYY-MM-DD'] ?? '',
    '00:00': values['00:00'] ?? '',
    'X hours': values['X hours'] ?? '',
    YYYYMMMDD: yyyymmmdd,
    Task: values.Task ?? '',
  };

  return {
    subject: replaceTokens(tpl.subject, tokens),
    body: replaceTokens(tpl.body, tokens),
  };
}

function replaceTokens(str: string, tokens: TokenValues): string {
  return Object.entries(tokens).reduce((acc, [k, v]) => acc.replaceAll(`[${k}]`, v), str);
}
