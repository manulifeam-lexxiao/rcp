import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Templates } from '@/features/email/templates/loader';
import { resolveTokens } from '@/features/email/templates/engine';
import { buildMailtoLink } from '@/features/email/builder/linkBuilder';
import { EmailPreview } from './EmailPreview';

const FormSchema = z.object({
  startTime: z.string().min(1, '请选择开始时间'),
  endTime: z.string().min(1, '请选择结束时间'),
  hours: z.string().min(1, '请输入实际加班小时数'),
  id: z.string().optional(),
  remark: z.string().min(1, '请输入备注'),
  compensation: z.string().min(1, '请选择补偿类型'),
  name: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function OTCompletedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: '', compensation: 'OT Pay' },
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

  // 监听开始和结束时间，自动计算小时数
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  useEffect(() => {
    if (startTime && endTime) {
      const [startHour, startMinute] = startTime.split(':').map(Number);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;
      
      let diffMinutes = endTotalMinutes - startTotalMinutes;
      
      // 如果结束时间小于开始时间，说明跨天了
      if (diffMinutes < 0) {
        diffMinutes += 24 * 60;
      }
      
      const hours = (diffMinutes / 60).toFixed(1);
      setValue('hours', hours);
    }
  }, [startTime, endTime, setValue]);

  // 监听表单变化生成预览
  const formValues = watch();
  useEffect(() => {
    if (formValues.startTime && formValues.endTime && formValues.hours && formValues.remark && formValues.compensation) {
      const tpl = Templates.get('ot-completed');
      const { htmlBody } = resolveTokens(tpl, {
        NAME: formValues.name || '',
        'START-TIME': formValues.startTime,
        'END-TIME': formValues.endTime,
        'X hours': formValues.hours,
        ID: formValues.id || 'N/A',
        REMARK: formValues.remark,
        COMPENSATION: formValues.compensation,
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
    
    const tpl = Templates.get('ot-completed');
    const { subject, body } = resolveTokens(tpl, {
      NAME: values.name || '',
      'START-TIME': values.startTime,
      'END-TIME': values.endTime,
      'X hours': values.hours,
      ID: values.id || 'N/A',
      REMARK: values.remark,
      COMPENSATION: values.compensation,
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
              Jira/SR/CR编号
            </label>
            <input
              {...register('id')}
              type="text"
              className="input"
              placeholder="例如: JIRA-1234（可选）"
            />
            {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              实际开始时间 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('startTime')}
              type="time"
              className="input"
            />
            {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              实际结束时间 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('endTime')}
              type="time"
              className="input"
            />
            {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              实际加班小时数 <span className="text-red-500">*</span>
            </label>
            <input
              {...register('hours')}
              type="number"
              min="0"
              step="0.1"
              className="input"
              placeholder="自动计算，也可手动修改"
            />
            {errors.hours && <p className="text-red-500 text-sm mt-1">{errors.hours.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              补偿类型 <span className="text-red-500">*</span>
            </label>
            <select
              {...register('compensation')}
              className="input"
            >
              <option value="OT Pay">OT Pay</option>
              <option value="Compensatory Leave">Compensatory Leave</option>
            </select>
            {errors.compensation && <p className="text-red-500 text-sm mt-1">{errors.compensation.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            备注 <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('remark')}
            className="textarea w-full"
            rows={4}
            placeholder="例如: done / delay / ... etc."
          />
          {errors.remark && <p className="text-red-500 text-sm mt-1">{errors.remark.message}</p>}
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
