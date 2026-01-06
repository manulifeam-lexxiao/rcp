import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Templates } from '@/features/email/templates/loader';
import { resolveTokens } from '@/features/email/templates/engine';
import { buildMailtoLink } from '@/features/email/builder/linkBuilder';
import { EmailPreview } from './EmailPreview';

const FormSchema = z.object({
  date: z.string().min(1, '请选择日期'),
  start: z.string().min(1, '请选择开始时间'),
  hours: z.string().min(1, '请输入预计加班小时数'),
  task: z.string().min(1, '请输入任务描述'),
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
            placeholder="请详细描述加班任务内容"
          />
          {errors.task && <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>}
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
