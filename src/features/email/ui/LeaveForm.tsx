import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Templates } from '@/features/email/templates/loader';
import { resolveTokens } from '@/features/email/templates/engine';
import { buildMailtoLink } from '@/features/email/builder/linkBuilder';
import { EmailPreview } from './EmailPreview';

const FormSchema = z.object({
  startDate: z.string().min(1, '请选择开始日期'),
  endDate: z.string().min(1, '请选择结束日期'),
  reason: z.string().min(1, '请输入请假原因'),
  backup: z.string().min(1, '请输入备份人员'),
  contact: z.string().min(1, '请输入联系方式'),
  name: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function LeaveForm() {
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
    
    const tpl = Templates.get('leave-request');
    const { subject, body } = resolveTokens(tpl, {
      NAME: values.name || '',
      'START-DATE': values.startDate,
      'END-DATE': values.endDate,
      REASON: values.reason,
      BACKUP: values.backup,
      CONTACT: values.contact,
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
            placeholder="请说明请假原因"
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
