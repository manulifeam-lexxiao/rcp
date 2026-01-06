import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Templates } from '@/features/email/templates/loader';
import { resolveTokens } from '@/features/email/templates/engine';
import { buildLinks } from '@/features/email/builder/linkBuilder';

const FormSchema = z.object({
  date: z.string().min(1, 'Required'),
  start: z.string().min(1, 'Required'),
  hours: z.string().min(1, 'Required'),
  task: z.string().min(1, 'Required'),
  name: z.string().min(1, 'Required'),
});

type FormValues = z.infer<typeof FormSchema>;

export function EmailForm() {
  const [links, setLinks] = useState<{ owa: string; mailto: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: 'Lex Xiao' }, // 可被身份 Provider 覆盖
  });

  const onSubmit = (values: FormValues) => {
    const tpl = Templates.get('ot-record-initiation');
    const { subject, body } = resolveTokens(tpl, {
      NAME: values.name,
      'YYYY-MM-DD': values.date,
      '00:00': values.start,
      'X hours': values.hours,
      Task: values.task,
    });

    const { owa, mailto } = buildLinks(subject, body);
    setLinks({ owa, mailto });

    // 自动在 OWA 打开
    window.open(owa, '_blank');
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              {...register('date')}
              type="date"
              className="input"
              placeholder="OT Date"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>
          <div>
            <input
              {...register('start')}
              type="time"
              className="input"
              placeholder="Planned Start Time"
            />
            {errors.start && <p className="text-red-500 text-sm mt-1">{errors.start.message}</p>}
          </div>
          <div>
            <input
              {...register('hours')}
              type="text"
              className="input"
              placeholder="Estimated OT Hours"
            />
            {errors.hours && <p className="text-red-500 text-sm mt-1">{errors.hours.message}</p>}
          </div>
          <div>
            <input {...register('name')} type="text" className="input" placeholder="NAME" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
        </div>
        <div>
          <textarea
            {...register('task')}
            className="textarea w-full"
            rows={4}
            placeholder="Task Description"
          />
          {errors.task && <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>}
        </div>
        <button type="submit" className="btn-primary">
          生成链接并在 OWA 打开
        </button>
      </form>

      {links && (
        <div className="bg-gray-50 p-4 rounded-md space-y-3">
          <h3 className="font-semibold text-sm">生成的链接：</h3>
          <div className="space-y-2">
            <button
              onClick={() => window.open(links.owa, '_blank')}
              className="btn-primary w-full"
            >
              在 Outlook Web 中打开
            </button>
            <button
              onClick={() => (window.location.href = links.mailto)}
              className="btn-secondary w-full"
            >
              使用本机邮件客户端
            </button>
          </div>
          <details className="text-xs">
            <summary className="cursor-pointer text-blue-600">查看原始链接</summary>
            <div className="mt-2 space-y-2 break-all">
              <p>
                <strong>OWA:</strong> {links.owa}
              </p>
              <p>
                <strong>Mailto:</strong> {links.mailto}
              </p>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
