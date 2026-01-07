import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Templates } from '@/features/email/templates/loader';
import { resolveTokens } from '@/features/email/templates/engine';
import { buildMailtoLink } from '@/features/email/builder/linkBuilder';
import { EmailPreview } from './EmailPreview';

const FormSchema = z.object({
  wfhType: z.string().min(1, '请选择WFH类型'),
  wfhDates: z.string().min(1, '请输入WFH日期'),
  reason: z.string().min(1, '请输入原因'),
  name: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function WFHForm() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: '', wfhType: '' },
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
    if (formValues.wfhType && formValues.wfhDates && formValues.reason) {
      const tpl = Templates.get('wfh-request');
      const { htmlBody } = resolveTokens(tpl, {
        NAME: formValues.name || '',
        'WFH-TYPE': formValues.wfhType,
        'WFH-DATES': formValues.wfhDates,
        REASON: formValues.reason,
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
      const tpl = Templates.get('wfh-request');
      const { subject } = resolveTokens(tpl, {
        NAME: values.name || '',
        'WFH-TYPE': values.wfhType,
        'WFH-DATES': values.wfhDates,
        REASON: values.reason,
      });
      
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}`;
      window.location.href = mailtoLink;
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const handleCreatePlainEmail = () => {
    const values = watch();
    const tpl = Templates.get('wfh-request');
    const { subject, body } = resolveTokens(tpl, {
      NAME: values.name || '',
      'WFH-TYPE': values.wfhType,
      'WFH-DATES': values.wfhDates,
      REASON: values.reason,
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
              WFH类型 <span className="text-red-500">*</span>
            </label>
            <select
              {...register('wfhType')}
              className="input"
            >
              <option value="">请选择</option>
              <option value="Weekly">Weekly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Emergency">Emergency</option>
            </select>
            {errors.wfhType && <p className="text-red-500 text-sm mt-1">{errors.wfhType.message}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WFH日期 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('wfhDates')}
              type="text"
              className="input"
              placeholder="例如: 2026-01-15 或 Every Monday"
            />
            {errors.wfhDates && <p className="text-red-500 text-sm mt-1">{errors.wfhDates.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            原因 <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('reason')}
            className="textarea w-full"
            rows={4}
            placeholder="请说明WFH原因（Emergency类型必填）"
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
