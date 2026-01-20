import { z } from 'zod';

// WFH记录schema（常规在家办公）
export const WFHRecordSchema = z.object({
  name: z.string(),
  weekdays: z.array(z.string()),
});

export type WFHRecord = z.infer<typeof WFHRecordSchema>;

// 临时WFH记录schema（带日期的临时在家办公）
export const TempWFHRecordSchema = z.object({
  name: z.string(),
  wfhDate: z.string(),
});

export type TempWFHRecord = z.infer<typeof TempWFHRecordSchema>;

// 请假记录schema
export const LeaveRecordSchema = z.object({
  name: z.string(),
  leaveDate: z.string(),
  part: z.enum(['am', 'pm']).optional(),
});

export type LeaveRecord = z.infer<typeof LeaveRecordSchema>;

// 数据数组schema
export const WFHDataSchema = z.array(WFHRecordSchema);
export const TempWFHDataSchema = z.array(TempWFHRecordSchema);
export const LeaveDataSchema = z.array(LeaveRecordSchema);
