import { format, addDays } from 'date-fns';
import { WFHData, LeaveData } from '@/services/recordService';
import { useState } from 'react';

export default function Home() {
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // 获取当前星期几
  const weekdayMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const currentWeekday = weekdayMap[new Date().getDay()];
  
  // 英文星期缩写映射
  const weekdayEnToZh: Record<string, string> = {
    'MON': '周一',
    'TUE': '周二',
    'WED': '周三',
    'THU': '周四',
    'FRI': '周五',
  };
  
  // 中文到英文的反向映射
  const weekdayZhToEn: Record<string, string> = {
    '周一': 'MON',
    '周二': 'TUE',
    '周三': 'WED',
    '周四': 'THU',
    '周五': 'FRI',
  };
  
  // 读取WFH和请假数据
  const currentWeekdayEn = weekdayZhToEn[currentWeekday] || '';
  const wfhNames = WFHData.getWFHToday(currentWeekdayEn, today);
  const leaveRecords = LeaveData.getToday(today);
  const allWFHRecords = WFHData.getAll();
  const nextWeekLeaveRecords = LeaveData.getNextWeek();
  
  // WFH表格折叠状态
  const [isWFHExpanded, setIsWFHExpanded] = useState(false);
  
  // 生成未来7天的日期
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      date: format(date, 'yyyy-MM-dd'),
      dayName: weekdayMap[date.getDay()],
      displayDate: format(date, 'MM/dd'),
    };
  });

  return (
    <div className="space-y-8">
      {/* Hero Section with MFCentral style */}
      <section className="bg-primary text-white rounded p-10 shadow-sm">
        <h1 className="text-28 font-demibold mb-4 text-white">Retirement ChengDu Portal</h1>
      </section>

      {/* 今日快速概览 - 2列布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 今日 WFH */}
        <section className="card hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
            <div className="w-10 h-10 bg-success bg-opacity-10 rounded flex items-center justify-center">
              <svg
                className="w-5 h-5 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-20 font-demibold text-primary">今日 WFH</h2>
              <p className="text-sm text-gray-500 font-light">{currentWeekday}</p>
            </div>
          </div>
          {wfhNames.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {wfhNames.map((name, index) => (
                <span 
                  key={`wfh-${index}`} 
                  className="px-3 py-2 text-primary text-sm font-light bg-success bg-opacity-5 border border-success border-opacity-20 rounded-md"
                >
                  {name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 font-light text-center py-8">暂无数据</p>
          )}
        </section>

        {/* 今日请假 */}
        <section className="card hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
            <div className="w-10 h-10 bg-accent bg-opacity-10 rounded flex items-center justify-center">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-20 font-demibold text-primary">今日请假</h2>
              <p className="text-sm text-gray-500 font-light">{format(new Date(), 'MM月dd日')}</p>
            </div>
          </div>
          {leaveRecords.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {leaveRecords.map((record, index) => (
                <span 
                  key={`leave-${index}`} 
                  className="px-3 py-2 text-primary text-sm font-light bg-accent bg-opacity-5 border border-accent border-opacity-20 rounded-md inline-flex items-center gap-2"
                >
                  <span>{record.name}</span>
                  {record.part ? (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium" 
                          style={{ backgroundColor: record.part === 'am' ? '#FFE5CC' : '#CCE5FF', color: record.part === 'am' ? '#CC6600' : '#0066CC' }}>
                      {record.part === 'am' ? '上午' : '下午'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium" 
                          style={{ backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
                      全天
                    </span>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 font-light text-center py-8">暂无数据</p>
          )}
        </section>
      </div>

      {/* WFH 安排表 & 未来一周请假 - 左右分布 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WFH 安排表 */}
        <section className="card">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary bg-opacity-10 rounded flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h2 className="text-20 font-demibold text-primary">WFH 安排表</h2>
            </div>
            <button
              onClick={() => setIsWFHExpanded(!isWFHExpanded)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:bg-gray-100 rounded transition-colors"
            >
              {isWFHExpanded ? (
                <>
                  <span className="font-light">收起</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <span className="font-light">展开</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
          {isWFHExpanded && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-sm font-demibold text-primary border-b-2 border-r border-gray-200">姓名</th>
                    <th className="px-4 py-3 text-sm font-demibold text-primary border-b-2 border-r border-gray-200 text-center">周一</th>
                    <th className="px-4 py-3 text-sm font-demibold text-primary border-b-2 border-r border-gray-200 text-center">周二</th>
                    <th className="px-4 py-3 text-sm font-demibold text-primary border-b-2 border-r border-gray-200 text-center">周三</th>
                    <th className="px-4 py-3 text-sm font-demibold text-primary border-b-2 border-r border-gray-200 text-center">周四</th>
                    <th className="px-4 py-3 text-sm font-demibold text-primary border-b-2 border-gray-200 text-center">周五</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    // 按姓名分组WFH记录
                    const groupedByName = allWFHRecords.reduce((acc, record) => {
                      if (!acc[record.name]) {
                        acc[record.name] = {};
                      }
                      // 处理 weekdays 数组
                      record.weekdays.forEach(weekday => {
                        const zhWeekday = weekdayEnToZh[weekday] || weekday;
                        acc[record.name][zhWeekday] = true;
                      });
                      return acc;
                    }, {} as Record<string, Record<string, boolean>>);

                    const names = Object.keys(groupedByName).sort();
                    const weekdays = ['周一', '周二', '周三', '周四', '周五'];

                    return names.length > 0 ? (
                      names.map((name) => (
                        <tr key={name} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-base font-light text-primary border-b border-r border-gray-100">{name}</td>
                          {weekdays.map((day) => (
                            <td key={day} className="px-4 py-3 border-b border-r last:border-r-0 border-gray-100 text-center">
                              {groupedByName[name][day] ? (
                                <svg className="w-5 h-5 text-success mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <span className="text-gray-300">-</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-400 font-light">暂无数据</td>
                      </tr>
                    );
                  })()}
                </tbody>
              </table>
            </div>
          )}
          {!isWFHExpanded && (
            <p className="text-gray-400 text-sm text-center py-8 font-light">点击展开查看完整WFH安排</p>
          )}
        </section>

        {/* 未来一周请假 */}
        <section className="card">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
            <div className="w-10 h-10 bg-accent bg-opacity-10 rounded flex items-center justify-center">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-20 font-demibold text-primary">未来一周请假</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  {next7Days.map((day) => (
                    <th key={day.date} className="px-3 py-3 text-center border-b-2 border-r last:border-r-0 border-gray-200 min-w-[90px]">
                      <div className="text-sm font-demibold text-primary">{day.dayName}</div>
                      <div className="text-xs text-gray-500 font-light mt-1">{day.displayDate}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {next7Days.map((day) => {
                    const leavesOnDay = nextWeekLeaveRecords.filter(
                      (record) => record.leaveDate === day.date
                    );
                    return (
                      <td key={day.date} className="px-3 py-4 border-b border-r last:border-r-0 border-gray-200 align-top bg-white">
                        {leavesOnDay.length > 0 ? (
                          <ul className="space-y-2">
                            {leavesOnDay.map((record, index) => (
                              <li key={`leave-${day.date}-${index}`} className="flex items-center gap-2 text-sm text-primary">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></span>
                                <span className="font-light text-xs">{record.name}</span>
                                {record.part ? (
                                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-medium ml-1" 
                                        style={{ backgroundColor: record.part === 'am' ? '#FFE5CC' : '#CCE5FF', color: record.part === 'am' ? '#CC6600' : '#0066CC' }}>
                                    {record.part === 'am' ? '上午' : '下午'}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-medium ml-1" 
                                        style={{ backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
                                    全天
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-300 text-xs text-center font-light">-</p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
