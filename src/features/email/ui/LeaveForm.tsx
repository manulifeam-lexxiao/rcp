import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Templates } from '@/features/email/templates/loader';
import { resolveTokens } from '@/features/email/templates/engine';
import { buildMailtoLink } from '@/features/email/builder/linkBuilder';
import { EmailPreview } from './EmailPreview';

const FormSchema = z.object({
  startDate: z.string().min(1, '选择开始日期'),
  endDate: z.string().min(1, '选择结束日期'),
  reason: z.string().min(1, '输入请假原因'),
  backup: z.string().min(1, '输入BACKUP'),
  contact: z.string().min(1, '输入联系方式'),
  name: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function LeaveForm() {
  const {
    register,
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
    if (formValues.startDate && formValues.endDate && formValues.reason && formValues.backup && formValues.contact) {
      const tpl = Templates.get('leave-request');
      const { htmlBody } = resolveTokens(tpl, {
        NAME: formValues.name || '',
        'START-DATE': formValues.startDate,
        'END-DATE': formValues.endDate,
        REASON: formValues.reason,
        BACKUP: formValues.backup,
        CONTACT: formValues.contact,
      });
      if (htmlBody) {
        setHtmlPreview(htmlBody);
      }
    } else {
      setHtmlPreview('');
    }
  }, [formValues]);

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
      const tpl = Templates.get('leave-request');
      const { subject } = resolveTokens(tpl, {
        NAME: values.name || '',
        'START-DATE': values.startDate,
        'END-DATE': values.endDate,
        REASON: values.reason,
        BACKUP: values.backup,
        CONTACT: values.contact,
      });
      
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}`;
      window.location.href = mailtoLink;
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const handleCreatePlainEmail = () => {
    const values = watch();
    const tpl = Templates.get('leave-request');
    const { subject, body } = resolveTokens(tpl, {
      NAME: values.name || '',
      'START-DATE': values.startDate,
      'END-DATE': values.endDate,
      REASON: values.reason,
      BACKUP: values.backup,
      CONTACT: values.contact,
    });

    const mailtoLink = buildMailtoLink(subject, body);
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-4">
      <form className="space-y-6">
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
              Backup <span className="text-red-500">*</span>
            </label>
            <input
              {...register('backup')}
              type="text"
              className="input"
              placeholder="输入备份人员姓名"
            />
            {errors.backup && <p className="text-red-500 text-sm mt-1">{errors.backup.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              开始日期 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('startDate')}
              type="date"
              className="input"
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              结束日期 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('endDate')}
              type="date"
              className="input"
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              联系方式 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('contact')}
              type="text"
              className="input"
              placeholder="微信号或电话号码"
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            请假原因 <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('reason')}
            className="textarea w-full"
            rows={4}
            placeholder="说明请假原因"
          />
          {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
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
