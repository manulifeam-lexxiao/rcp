import type { EmailTemplate } from './schema';
import { formatYYYYMMMDD } from '@/utils/date';

type TokenValues = Record<string, string>;

export function resolveTokens(tpl: EmailTemplate, values: TokenValues) {
  const dateStr = values['YYYY-MM-DD'] || values['START-DATE'];
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
    'START-DATE': values['START-DATE'] ?? '',
    'END-DATE': values['END-DATE'] ?? '',
    REASON: values.REASON ?? '',
    BACKUP: values.BACKUP ?? '',
    CONTACT: values.CONTACT ?? '',
    'START-TIME': values['START-TIME'] ?? '',
    'END-TIME': values['END-TIME'] ?? '',
    ID: values.ID ?? '',
    REMARK: values.REMARK ?? '',
    COMPENSATION: values.COMPENSATION ?? '',
    'WFH-TYPE': values['WFH-TYPE'] ?? '',
    'WFH-DATES': values['WFH-DATES'] ?? '',
  };

  return {
    subject: replaceTokens(tpl.subject, tokens),
    body: replaceTokens(tpl.body, tokens),
    htmlBody: tpl.htmlBody ? replaceTokens(tpl.htmlBody, tokens) : undefined,
  };
}

function replaceTokens(str: string, tokens: TokenValues): string {
  return Object.entries(tokens).reduce((acc, [k, v]) => acc.replaceAll(`[${k}]`, v), str);
}
