import attendance from '@/data/attendance.json';
import { format } from 'date-fns';

export default function Home() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const day = (attendance.days || []).find((d: { date: string }) => d.date === today);
  const wfh: string[] = day?.wfh ?? [];
  const leave: string[] = day?.leave ?? [];

  return (
    <div className="space-y-8">
      {/* Hero Section with MFCentral style */}
      <section className="bg-primary text-white rounded p-10 shadow-sm">
        <h1 className="text-28 font-demibold mb-4 text-white">欢迎来到 MFCentral</h1>
        <p className="text-lg leading-relaxed opacity-90">
          为您提供专业的企业服务和管理工具
        </p>
        <button className="mt-6 bg-white text-primary font-demibold py-3 px-8 rounded hover:bg-neutral-light transition-colors duration-200">
          了解更多
        </button>
      </section>

      {/* Stats Cards with MFCentral style */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="card hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-success bg-opacity-10 rounded flex items-center justify-center">
              <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h2 className="text-22 font-demibold text-primary">今日 WFH</h2>
          </div>
          {wfh.length > 0 ? (
            <ul className="space-y-3">
              {wfh.map((n) => (
                <li key={n} className="flex items-center gap-3 text-primary text-base">
                  <span className="w-1.5 h-1.5 bg-success rounded-full flex-shrink-0"></span>
                  <span className="font-light">{n}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 font-light">暂无数据</p>
          )}
        </section>

        <section className="card hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-accent bg-opacity-10 rounded flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-22 font-demibold text-primary">今日请假</h2>
          </div>
          {leave.length > 0 ? (
            <ul className="space-y-3">
              {leave.map((n) => (
                <li key={n} className="flex items-center gap-3 text-primary text-base">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></span>
                  <span className="font-light">{n}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 font-light">暂无数据</p>
          )}
        </section>
      </div>

      {/* Quick Actions with MFCentral style */}
      <section className="card">
        <h2 className="text-22 font-demibold mb-6 text-primary">快捷操作</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn-primary">申请 WFH</button>
          <button className="btn-secondary">请假申请</button>
          <button className="btn-secondary">查看记录</button>
          <button className="btn-secondary">联系支持</button>
        </div>
      </section>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-neutral-light border-none">
          <h3 className="text-lg font-demibold mb-3 text-primary">最新动态</h3>
          <p className="text-sm font-light text-primary leading-relaxed">
            查看公司最新的公告和通知信息
          </p>
        </div>
        <div className="card bg-neutral-light border-none">
          <h3 className="text-lg font-demibold mb-3 text-primary">资源中心</h3>
          <p className="text-sm font-light text-primary leading-relaxed">
            访问各种工作资源和工具
          </p>
        </div>
        <div className="card bg-neutral-light border-none">
          <h3 className="text-lg font-demibold mb-3 text-primary">帮助支持</h3>
          <p className="text-sm font-light text-primary leading-relaxed">
            获取专业的帮助和支持服务
          </p>
        </div>
      </div>
    </div>
  );
}
