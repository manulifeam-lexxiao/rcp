/**
 * Excel 到 JSON 同步脚本
 * 
 * 用途：从 OneDrive 的 Excel 文件读取考勤数据，更新本地 JSON 文件
 * - WFHStatus sheet → wfh.json (常规在家办公)
 * - JAN-DEC sheets → wfh-temporary.json (临时在家办公) 和 leave.json (请假记录)
 */

import XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件所在目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const EXCEL_PATH = 'C:\\Users\\lexxiao\\OneDrive - Manulife\\MANAGEMENT\\attendance\\LeavePlan2026.xlsx';
const DATA_DIR = path.join(__dirname, '../src/data');
const WFH_FILE = path.join(DATA_DIR, 'wfh.json');
const WFH_TEMP_FILE = path.join(DATA_DIR, 'wfh-temporary.json');
const LEAVE_FILE = path.join(DATA_DIR, 'leave.json');

// 工作日映射（WFHStatus sheet）
const WEEKDAY_COLS = {
  'C': 'MON',
  'D': 'TUE',
  'E': 'WED',
  'F': 'THU',
  'G': 'FRI'
};

/**
 * 读取 Excel 文件
 */
function readExcel() {
  console.log('📖 读取 Excel 文件:', EXCEL_PATH);
  
  if (!fs.existsSync(EXCEL_PATH)) {
    throw new Error(`Excel 文件不存在: ${EXCEL_PATH}`);
  }
  
  const workbook = XLSX.readFile(EXCEL_PATH);
  return workbook;
}

/**
 * 解析 WFHStatus sheet（常规在家办公）
 */
function parseWFHStatus(workbook) {
  console.log('📊 解析 WFHStatus sheet...');
  
  const sheet = workbook.Sheets['WFHStatus'];
  if (!sheet) {
    console.warn('⚠️  WFHStatus sheet 不存在');
    return [];
  }
  
  const wfhRecords = [];
  
  // B4:B35 是姓名列
  for (let row = 4; row <= 35; row++) {
    const nameCell = sheet[`B${row}`];
    if (!nameCell || !nameCell.v) continue;
    
    const name = nameCell.v.toString().trim();
    const weekdays = [];
    
    // C:G 列是周一到周五
    for (const [col, day] of Object.entries(WEEKDAY_COLS)) {
      const cell = sheet[`${col}${row}`];
      if (cell && cell.v && cell.v.toString().toUpperCase() === 'X') {
        weekdays.push(day);
      }
    }
    
    if (weekdays.length > 0) {
      wfhRecords.push({ name, weekdays });
    }
  }
  
  console.log(`✅ 找到 ${wfhRecords.length} 条常规 WFH 记录`);
  return wfhRecords;
}

/**
 * 解析月度 sheet（临时 WFH 和请假）
 */
function parseMonthlySheets(workbook) {
  console.log('📊 解析月度 sheets...');
  
  const monthSheets = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                       'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  const monthMap = {
    'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4, 'MAY': 5, 'JUN': 6,
    'JUL': 7, 'AUG': 8, 'SEP': 9, 'OCT': 10, 'NOV': 11, 'DEC': 12
  };
  
  const tempWFHRecords = [];
  const leaveRecords = [];
  
  monthSheets.forEach((month) => {
    const sheet = workbook.Sheets[month];
    if (!sheet) {
      console.warn(`⚠️  ${month} sheet 不存在`);
      return;
    }
    
    const monthNum = monthMap[month];
    
    // 解析日期行（第2行，从C列开始）
    const dates = [];
    let col = 2; // C列起始
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const colName = XLSX.utils.encode_col(col);
      const dateCell = sheet[`${colName}2`];
      
      if (!dateCell || !dateCell.v) {
        col++;
        // 跳过空列，但不超过合理范围
        if (col > 50) break;
        continue;
      }
      
      const dateValue = dateCell.v;
      let date;
      
      // 处理不同类型的日期值
      if (typeof dateValue === 'number') {
        // Excel 日期序列号
        const parsed = XLSX.SSF.parse_date_code(dateValue);
        date = `2026-${String(parsed.m).padStart(2, '0')}-${String(parsed.d).padStart(2, '0')}`;
      } else if (typeof dateValue === 'string') {
        // 字符串类型，可能是 "1", "2", "3" 等日期数字
        const dayNum = parseInt(dateValue, 10);
        if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 31) {
          date = `2026-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
        } else {
          // 跳过无效日期
          col++;
          continue;
        }
      } else {
        // 其他类型，跳过
        col++;
        continue;
      }
      
      dates.push({ col: colName, date });
      col++;
      
      // 安全限制：最多检查50列
      if (col > 50) break;
    }
    
    // 解析每个人的数据（B4:B35）
    for (let row = 4; row <= 35; row++) {
      const nameCell = sheet[`B${row}`];
      if (!nameCell || !nameCell.v) continue;
      
      const name = nameCell.v.toString().trim();
      
      // 遍历每个日期
      dates.forEach(({ col, date }) => {
        const cell = sheet[`${col}${row}`];
        if (!cell || !cell.v) return;
        
        const value = cell.v.toString().toUpperCase().trim();
        
        switch (value) {
          case 'HW':
            tempWFHRecords.push({ name, wfhDate: date });
            break;
          case 'LV':
            leaveRecords.push({ name, leaveDate: date });
            break;
          case 'AM':
            leaveRecords.push({ name, leaveDate: date, part: 'am' });
            break;
          case 'PM':
            leaveRecords.push({ name, leaveDate: date, part: 'pm' });
            break;
          // WE, PH 忽略
        }
      });
    }
  });
  
  console.log(`✅ 找到 ${tempWFHRecords.length} 条临时 WFH 记录`);
  console.log(`✅ 找到 ${leaveRecords.length} 条请假记录`);
  
  return { tempWFHRecords, leaveRecords };
}

/**
 * 保存 JSON 文件
 */
function saveJSON(filePath, data) {
  const fileName = path.basename(filePath);
  console.log(`💾 保存 ${fileName}...`);
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ ${fileName} 已更新`);
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 开始同步 Excel 数据到 JSON...\n');
  
  try {
    // 1. 读取 Excel
    const workbook = readExcel();
    
    // 2. 解析常规 WFH
    const wfhRecords = parseWFHStatus(workbook);
    
    // 3. 解析临时 WFH 和请假
    const { tempWFHRecords, leaveRecords } = parseMonthlySheets(workbook);
    
    // 4. 保存文件
    console.log('\n💾 保存数据文件...');
    saveJSON(WFH_FILE, wfhRecords);
    saveJSON(WFH_TEMP_FILE, tempWFHRecords);
    saveJSON(LEAVE_FILE, leaveRecords);
    
    console.log('\n✨ 同步完成！');
    console.log('\n📝 数据统计:');
    console.log(`   - 常规 WFH: ${wfhRecords.length} 条`);
    console.log(`   - 临时 WFH: ${tempWFHRecords.length} 条`);
    console.log(`   - 请假记录: ${leaveRecords.length} 条`);
    
  } catch (error) {
    console.error('\n❌ 同步失败:', error.message);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
}

// 执行
main();
