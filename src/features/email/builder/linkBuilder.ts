import { encodeForQuery } from '@/utils/encoding';

export type LinkPair = { owa: string; mailto: string };

export function buildLinks(subject: string, body: string): LinkPair {
  const s = encodeForQuery(subject);
  const b = encodeForQuery(body);

  return {
    owa: `https://outlook.office.com/mail/deeplink/compose?subject=${s}&body=${b}`,
    mailto: `mailto:?subject=${s}&body=${b}`,
  };
}
