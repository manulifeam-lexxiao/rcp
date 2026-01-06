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
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: '', wfhType: '' },
  });

  const [htmlPreview, setHtmlPreview] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
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
        setShowPreview(true); // 自动展开预览
      }
    } else {
      setShowPreview(false); // 表单不完整时关闭预览
    }
  }, [formValues]);

  const onSubmit = (values: FormValues) => {
    // 保存用户名到localStorage
    if (values.name) {
      window.localStorage.setItem('userName', values.name);
    }
    
    const tpl = Templates.get('wfh-request');
    const { subject, body } = resolveTokens(tpl, {
      NAME: values.name || '',
      'WFH-TYPE': values.wfhType,
      'WFH-DATES': values.wfhDates,
      REASON: values.reason,
    });

    // 直接打开客户端
    const mailtoLink = buildMailtoLink(subject, body);
    window.location.href = mailtoLink;
  };

  const handleCopyHtml = async () => {
    try {
      // 复制HTML到剪贴板
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([htmlPreview], { type: 'text/html' }),
          'text/plain': new Blob([htmlPreview.replace(/<[^>]*>/g, '')], { type: 'text/plain' }),
        }),
      ]);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
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
        <div>
          <button type="submit" className="btn-primary">
            创建邮件
          </button>
        </div>
      </form>

      <EmailPreview
        htmlPreview={htmlPreview}
        showPreview={showPreview}
        copySuccess={copySuccess}
        onTogglePreview={() => setShowPreview(!showPreview)}
        onCopyHtml={handleCopyHtml}
      />
    </div>
  );
}
