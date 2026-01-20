# Excel 数据同步使用说明

## 功能概述

本系统提供了 Excel 到 JSON 的自动化同步功能，用于从 OneDrive 上的 `LeavePlan2026.xlsx` 文件读取考勤数据，并自动更新项目中的 JSON 数据文件。

### 数据流向

```text
Excel (OneDrive 本地文件)
    ↓
同步脚本 (scripts/sync-excel.js)
    ↓
JSON 文件 (src/data/*.json)
    ↓
Git 提交 → GitHub 部署
```

**重要说明：** Excel 文件仅保存在本地 OneDrive，不会提交到 Git 仓库。只有处理后的 JSON 文件会被版本控制。

---

## 数据结构说明

### 1. 常规 WFH (wfh.json)

从 Excel 的 **WFHStatus** sheet 读取，记录每个人固定的在家办公日期。

**数据格式：**

```json
[
  {
    "name": "Hans Xiao",
    "weekdays": ["THU", "FRI"]
  }
]
```

字段说明：

- `name`: 人员姓名
- `weekdays`: 工作日数组（MON/TUE/WED/THU/FRI）

### 2. 临时 WFH (wfh-temporary.json)

从 Excel 的 **JAN-DEC** 月度 sheets 读取，标记为 `HW` 的单元格。

**数据格式：**

```json
[
  {
    "name": "Hans Xiao",
    "wfhDate": "2026-01-15"
  }
]
```

字段说明：

- `name`: 人员姓名
- `wfhDate`: 临时在家办公日期（YYYY-MM-DD）

### 3. 请假记录 (leave.json)

从 Excel 的 **JAN-DEC** 月度 sheets 读取，包含三种类型：

- `LV` = 全天请假
- `AM` = 上午请假
- `PM` = 下午请假

**数据格式：**

```json
[
  {
    "name": "Hans Xiao",
    "leaveDate": "2026-01-20"
  },
  {
    "name": "Hans Xiao",
    "leaveDate": "2026-01-21",
    "part": "am"
  }
]
```

字段说明：

- `name`: 人员姓名
- `leaveDate`: 请假日期（YYYY-MM-DD）
- `part`: 可选字段，`"am"` 或 `"pm"`，不填表示全天

### 4. 忽略名单 (ignore-names.json)

配置不需要在 WFH 和请假列表中显示的人员名单。

**数据格式：**

```json
[
  "Name1",
  "Name2"
]
```

**使用说明：**

在 `src/data/ignore-names.json` 中添加需要忽略的人员姓名，这些人员的数据将不会在首页显示。名字必须与 Excel 中的姓名完全匹配。

---

## Excel 文件结构

### Sheet 说明

#### WFHStatus Sheet

- **B4:B35**: 人员姓名列
- **C:G 列**: 周一到周五，标记 `X` 表示固定 WFH 日

#### JAN-DEC Sheets (12个月度表)

- **B4:B35**: 人员姓名列
- **第2行**: 日期行（从 C 列开始，Excel 日期序列号）
- **第3行**: 星期行（显示"日"、"一"到"六"）
- **数据单元格内容（第4行开始）：**
  - `HW` = 临时在家办公
  - `LV` = 全天请假
  - `AM` = 上午请假
  - `PM` = 下午请假
  - `WE` = 周末（忽略）
  - `PH` = 公共假期（忽略）

---

## 使用步骤

### 1. 确保 Excel 文件路径正确

默认路径：`C:\Users\lexxiao\OneDrive - Manulife\MANAGEMENT\attendance\LeavePlan2026.xlsx`

如需修改路径，编辑 `scripts/sync-excel.js` 第 12 行：

```javascript
const EXCEL_PATH = '你的Excel文件路径';
```

### 2. 执行同步命令

在项目根目录运行：

```bash
npm run sync
```

### 3. 查看同步结果

脚本会输出以下信息：

```text
🚀 开始同步 Excel 数据到 JSON...

📖 读取 Excel 文件: C:\Users\...
📊 解析 WFHStatus sheet...
✅ 找到 26 条常规 WFH 记录
📊 解析月度 sheets...
✅ 找到 45 条临时 WFH 记录
✅ 找到 128 条请假记录

💾 保存数据文件...
✅ wfh.json 已更新
✅ wfh-temporary.json 已更新
✅ leave.json 已更新

✨ 同步完成！

📝 数据统计:
   - 常规 WFH: 26 条
   - 临时 WFH: 45 条
   - 请假记录: 128 条
```

### 4. 提交到 Git

同步完成后，只提交 JSON 文件：

```bash
git add src/data/*.json
git commit -m "update: 同步考勤数据 (YYYY-MM-DD)"
git push
```

**注意：** 不要提交 Excel 文件，已在 `.gitignore` 中排除。

---

## 常见问题

### Q1: 如何更新 Excel 数据？

直接在 OneDrive 的 Excel 文件中修改数据，然后运行 `npm run sync` 即可。

### Q2: 同步失败怎么办？

检查以下几点：

1. Excel 文件路径是否正确
2. Excel 文件是否被其他程序占用
3. Sheet 名称是否正确（WFHStatus, JAN-DEC）
4. 数据格式是否符合要求

### Q3: 我可以手动编辑 JSON 文件吗？

可以，但不推荐。下次运行 `npm run sync` 时会覆盖手动修改的内容。建议始终在 Excel 中维护数据。

### Q4: 如何查看历史数据？

使用 Git 历史记录：

```bash
git log -- src/data/leave.json
git show <commit-hash>:src/data/leave.json
```

### Q5: 同步时会覆盖所有数据吗？

是的，每次同步都会完全重新生成 JSON 文件，包括历史数据。脚本会读取 Excel 中的所有日期数据。

---

## 技术说明

### 依赖库

- **xlsx** (v0.18.5): Excel 文件解析库

### 脚本位置

- 主脚本：`scripts/sync-excel.js`
- 数据转换脚本：`scripts/convert-wfh-data.js`（仅用于一次性数据迁移）

### JSON Schema 验证

所有 JSON 数据在加载时会使用 Zod 进行严格的 schema 验证，确保数据类型正确。

相关文件：

- `src/types/records.ts` - 类型定义和 schema
- `src/services/recordService.ts` - 数据加载和验证

---

## 最佳实践

### 工作流建议

1. **每周一开始前同步：** 确保展示最新的考勤数据
2. **Excel 更新后立即同步：** 避免遗忘
3. **提交时写清楚日期：** 方便回溯历史数据
4. **定期备份 Excel：** OneDrive 通常会自动备份，但建议手动备份重要版本

### 数据维护建议

1. **在 Excel 中统一管理：** 避免多处维护数据
2. **保持数据一致性：** 人名拼写要一致
3. **及时更新：** 请假或 WFH 变更后及时更新 Excel

---

## 版本历史

- **v1.0.0** (2026-01-20): 初始版本
  - 支持常规 WFH 数据同步
  - 支持临时 WFH 数据同步
  - 支持请假记录同步（包含上午/下午/全天）
  - Excel 文件排除在 Git 之外

