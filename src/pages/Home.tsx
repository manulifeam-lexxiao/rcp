import attendance from '@/data/attendance.json';
import { format } from 'date-fns';

export default function Home() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const day = (attendance.days || []).find((d: { date: string }) => d.date === today);
  const wfh: string[] = day?.wfh ?? [];
  const leave: string[] = day?.leave ?? [];

  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow-sm">
        <h2 className="text-base font-semibold mb-3">今日 WFH</h2>
        {wfh.length > 0 ? (
          <ul className="list-disc list-inside">
            {wfh.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">暂无数据</p>
        )}
      </section>
      <section className="bg-white p-4 rounded shadow-sm">
        <h2 className="text-base font-semibold mb-3">今日请假</h2>
        {leave.length > 0 ? (
          <ul className="list-disc list-inside">
            {leave.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">暂无数据</p>
        )}
      </section>
    </div>
  );
}
