import { EmailForm } from '@/features/email/ui/EmailForm';

export default function Emailer() {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-base font-semibold mb-3">Emailer</h2>
      <EmailForm />
    </div>
  );
}
