import wfhData from '@/data/wfh.json';
import leaveData from '@/data/leave.json';
import { WFHDataSchema, LeaveDataSchema, WFHRecord, LeaveRecord } from '@/types/records';

// 加载并验证WFH数据
const parsedWFHData = WFHDataSchema.parse(wfhData);
const parsedLeaveData = LeaveDataSchema.parse(leaveData);

// WFH数据访问
export const WFHData = {
  getAll(): WFHRecord[] {
    return parsedWFHData;
  },
  
  getByWeekday(weekday: string): WFHRecord[] {
    return parsedWFHData.filter(record => record.weekday === weekday);
  },
  
  getWFHToday(weekday: string): WFHRecord[] {
    return parsedWFHData.filter(record => record.weekday === weekday);
  },
};

// 请假数据访问
export const LeaveData = {
  getAll(): LeaveRecord[] {
    return parsedLeaveData;
  },
  
  getByDate(date: string): LeaveRecord[] {
    return parsedLeaveData.filter(record => record.leaveDate === date);
  },
  
  getToday(today: string): LeaveRecord[] {
    return parsedLeaveData.filter(record => record.leaveDate === today);
  },
  
  // 获取未来一周的请假记录
  getNextWeek(): LeaveRecord[] {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return parsedLeaveData.filter(record => {
      const leaveDate = new Date(record.leaveDate);
      return leaveDate >= today && leaveDate <= nextWeek;
    }).sort((a, b) => new Date(a.leaveDate).getTime() - new Date(b.leaveDate).getTime());
  },
};
