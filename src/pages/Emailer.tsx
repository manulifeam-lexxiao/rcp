import { EmailForm } from '@/features/email/ui/EmailForm';

export default function Emailer() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-22 font-demibold mb-6 text-primary">邮件生成器</h2>
        <p className="text-base font-light mb-6 text-primary leading-26">
          使用下面的表单快速生成标准化的邮件模板
        </p>
        <EmailForm />
      </div>
    </div>
  );
}
