import { OTForm } from '@/features/email/ui/OTForm';
import { OTCompletedForm } from '@/features/email/ui/OTCompletedForm';
import { WFHForm } from '@/features/email/ui/WFHForm';
import { LeaveForm } from '@/features/email/ui/LeaveForm';
import { useState } from 'react';

type TabType = 'start-ot' | 'end-ot' | 'wfh' | 'leave';

export default function Emailer() {
  const [activeTab, setActiveTab] = useState<TabType>('start-ot');

  const tabs = [
    { id: 'start-ot' as TabType, label: '启动加班' },
    { id: 'end-ot' as TabType, label: '结束加班' },
    { id: 'wfh' as TabType, label: '申请WFH' },
    { id: 'leave' as TabType, label: '申请假期' },
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-22 font-demibold mb-6 text-primary">邮件生成器</h2>
        <p className="text-base font-light mb-6 text-primary leading-26">
          使用下面的表单快速生成标准化的邮件模板
        </p>

        {/* Tabs */}
        <div className="border-b border-neutral-border mb-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-success border-b-2 border-success'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'start-ot' && <OTForm />}
        {activeTab === 'end-ot' && <OTCompletedForm />}
        {activeTab === 'wfh' && <WFHForm />}
        {activeTab === 'leave' && <LeaveForm />}
      </div>
    </div>
  );
}
