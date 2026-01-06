import templatesJson from '@/data/templates.json';
import { TemplatesFileSchema, EmailTemplate } from './schema';

const parsed = TemplatesFileSchema.parse(templatesJson);
const map = new Map<string, EmailTemplate>(parsed.map((t) => [t.id, t]));

export const Templates = {
  get(id: string) {
    const tpl = map.get(id);
    if (!tpl) throw new Error(`Template not found: ${id}`);
    return tpl;
  },
  all() {
    return parsed;
  },
};
