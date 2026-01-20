import wfhData from '@/data/wfh.json';
import wfhTempData from '@/data/wfh-temporary.json';
import leaveData from '@/data/leave.json';
import ignoreNames from '@/data/ignore-names.json';
import { WFHDataSchema, TempWFHDataSchema, LeaveDataSchema, WFHRecord, TempWFHRecord, LeaveRecord } from '@/types/records';

// 加载并验证数据
const parsedWFHData = WFHDataSchema.parse(wfhData);
const parsedTempWFHData = TempWFHDataSchema.parse(wfhTempData);
const parsedLeaveData = LeaveDataSchema.parse(leaveData);
const ignoreNamesList = ignoreNames as string[];

// 过滤函数：排除忽略名单中的名字
const filterIgnoredNames = <T extends { name: string }>(records: T[]): T[] => {
  return records.filter(record => !ignoreNamesList.includes(record.name));
};

// WFH数据访问
export const WFHData = {
  getAll(): WFHRecord[] {
    return filterIgnoredNames(parsedWFHData);
  },
  
  getByWeekday(weekday: string): WFHRecord[] {
    return filterIgnoredNames(
      parsedWFHData.filter(record => 
        record.weekdays.includes(weekday)
      )
    );
  },
  
  getWFHToday(weekday: string, today: string): string[] {
    // 获取常规WFH人员（基于星期几）
    const regularWFH = filterIgnoredNames(parsedWFHData)
      .filter(record => record.weekdays.includes(weekday))
      .map(record => record.name);
    
    // 获取临时WFH人员（基于具体日期）
    const tempWFH = filterIgnoredNames(parsedTempWFHData)
      .filter(record => record.wfhDate === today)
      .map(record => record.name);
    
    // 合并并去重
    return [...new Set([...regularWFH, ...tempWFH])];
  },
};

// 临时WFH数据访问
export const TempWFHData = {
  getAll(): TempWFHRecord[] {
    return filterIgnoredNames(parsedTempWFHData);
  },
  
  getByDate(date: string): TempWFHRecord[] {
    return filterIgnoredNames(
      parsedTempWFHData.filter(record => record.wfhDate === date)
    );
  },
};

// 请假数据访问
export const LeaveData = {
  getAll(): LeaveRecord[] {
    return filterIgnoredNames(parsedLeaveData);
  },
  
  getByDate(date: string): LeaveRecord[] {
    return filterIgnoredNames(
      parsedLeaveData.filter(record => record.leaveDate === date)
    );
  },
  
  getToday(today: string): LeaveRecord[] {
    return filterIgnoredNames(
      parsedLeaveData.filter(record => record.leaveDate === today)
    );
  },
  
  // 获取未来一周的请假记录
  getNextWeek(): LeaveRecord[] {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return filterIgnoredNames(
      parsedLeaveData.filter(record => {
        const leaveDate = new Date(record.leaveDate);
        return leaveDate >= today && leaveDate <= nextWeek;
      }).sort((a, b) => new Date(a.leaveDate).getTime() - new Date(b.leaveDate).getTime())
    );
  },
};
