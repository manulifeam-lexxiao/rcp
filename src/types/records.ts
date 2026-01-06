import { z } from 'zod';

// WFH记录schema
export const WFHRecordSchema = z.object({
  name: z.string(),
  weekday: z.string(),
});

export type WFHRecord = z.infer<typeof WFHRecordSchema>;

// 请假记录schema
export const LeaveRecordSchema = z.object({
  name: z.string(),
  leaveDate: z.string(),
});

export type LeaveRecord = z.infer<typeof LeaveRecordSchema>;

// 数据数组schema
export const WFHDataSchema = z.array(WFHRecordSchema);
export const LeaveDataSchema = z.array(LeaveRecordSchema);
