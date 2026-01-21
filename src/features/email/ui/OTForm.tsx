import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Templates } from '@/features/email/templates/loader';
import { resolveTokens } from '@/features/email/templates/engine';
import { buildMailtoLink } from '@/features/email/builder/linkBuilder';
import { EmailPreview } from './EmailPreview';

const FormSchema = z.object({
  date: z.string().min(1, '选择日期'),
  start: z.string().min(1, '选择开始时间'),
  hours: z.string().min(1, '输入预计加班小时数'),
  task: z.string().min(1, '输入任务描述'),
  name: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function OTForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: '' },
  });

  const [htmlPreview, setHtmlPreview] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);

  // 从localStorage读取用户名
  useEffect(() => {
    const savedName = window.localStorage.getItem('userName') || '';
    if (savedName) {
      setValue('name', savedName);
    }
  }, [setValue]);

  // 监听表单变化生成预览
  const formValues = watch();
  useEffect(() => {
    if (formValues.date && formValues.start && formValues.hours && formValues.task) {
      const tpl = Templates.get('ot-record-initiation');
      const { htmlBody } = resolveTokens(tpl, {
        NAME: formValues.name || '',
        'YYYY-MM-DD': formValues.date,
        '00:00': formValues.start,
        'X hours': formValues.hours,
        Task: formValues.task,
      });
      if (htmlBody) {
        setHtmlPreview(htmlBody);
      }
    } else {
      setHtmlPreview('');
    }
  }, [formValues]);

  const onSubmit = (values: FormValues) => {
    // 保存用户名到localStorage
    if (values.name) {
      window.localStorage.setItem('userName', values.name);
    }
    
    const tpl = Templates.get('ot-record-initiation');
    const { subject, body } = resolveTokens(tpl, {
      NAME: values.name || '',
      'YYYY-MM-DD': values.date,
      '00:00': values.start,
      'X hours': values.hours,
      Task: values.task,
    });

    // 直接打开客户端
    const mailtoLink = buildMailtoLink(subject, body);
    window.location.href = mailtoLink;
  };

  const handleCopyAndCreateEmail = async () => {
    if (!htmlPreview) return;
    
    try {
      // 1. 先复制HTML内容到剪贴板（使用完整的HTML文档结构以兼容Outlook）
      const fullHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #000000;">
${htmlPreview}
</body>
</html>`;
      
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([fullHtml], { type: 'text/html' }),
          'text/plain': new Blob([htmlPreview.replace(/<[^>]*>/g, '')], { type: 'text/plain' }),
        }),
      ]);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);

      // 2. 打开只带主题的新邮件
      const values = watch();
      const tpl = Templates.get('ot-record-initiation');
      const { subject } = resolveTokens(tpl, {
        NAME: values.name || '',
        'YYYY-MM-DD': values.date,
        '00:00': values.start,
        'X hours': values.hours,
        Task: values.task,
      });
      
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}`;
      window.location.href = mailtoLink;
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const handleCreatePlainEmail = () => {
    const values = watch();
    const tpl = Templates.get('ot-record-initiation');
    const { subject, body } = resolveTokens(tpl, {
      NAME: values.name || '',
      'YYYY-MM-DD': values.date,
      '00:00': values.start,
      'X hours': values.hours,
      Task: values.task,
    });

    const mailtoLink = buildMailtoLink(subject, body);
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              发件人
            </label>
            <input
              {...register('name')}
              type="text"
              className="input"
              placeholder="自动读取或手动输入"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OT日期 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('date')}
              type="date"
              className="input"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              计划开始时间 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('start')}
              type="time"
              className="input"
            />
            {errors.start && <p className="text-red-500 text-sm mt-1">{errors.start.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              预计加班小时数 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('hours')}
              type="number"
              min="0"
              step="0.5"
              className="input"
              placeholder="例如: 2"
            />
            {errors.hours && <p className="text-red-500 text-sm mt-1">{errors.hours.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            任务描述 <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('task')}
            className="textarea w-full"
            rows={4}
            placeholder="描述加班内容，可放Jira/SR/CR编号"
          />
          {errors.task && <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>}
        </div>
      </form>

      <EmailPreview
        htmlPreview={htmlPreview}
        copySuccess={copySuccess}
        onCopyAndCreateEmail={handleCopyAndCreateEmail}
        onCreatePlainEmail={handleCreatePlainEmail}
      />
    </div>
  );
}
