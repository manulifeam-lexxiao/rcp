import { z } from 'zod';

export const EmailTemplateSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  subject: z.string(),
  body: z.string(),
  placeholders: z.array(z.string()).default([]),
  builder: z.object({
    strategy: z.enum(['owa_then_mailto']),
    owa: z.string(),
    mailto: z.string(),
  }),
});

export type EmailTemplate = z.infer<typeof EmailTemplateSchema>;

export const TemplatesFileSchema = z.array(EmailTemplateSchema);
