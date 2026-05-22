# HR Demo 開發進度交接

> 給下一個 session 的 Claude：複製本檔全文當作第一則訊息，可無縫接續。

## 重要前提

- 這是 **Next.js 16 + React 19 + Tailwind v4 + shadcn/ui** 專案
- 專案位置 `c:\Users\Kevin_Chen\Desktop\hr-demo-app`
- **使用者要邊做邊學**——不要直接動手寫程式碼,要一步步解釋讓他自己寫
- 卡住時給提示而非答案,他主動要才直接給 code
- 風格:每步小、有驗收條件、踩坑預警
- 不需要用 TodoWrite 追蹤——節奏是「一步一檢查」

## 已完成的步驟

### 第 1 步:清理 Next.js 樣板
- [src/app/layout.tsx](src/app/layout.tsx) metadata 改成 HR Demo
- [src/app/page.tsx](src/app/page.tsx) 改成簡單歡迎頁

### 第 2 步:定義型別
位置:[src/lib/types.ts](src/lib/types.ts)

- `Department`(含 `parentId: Department['id'] | null`,用 indexed access type)
- `Employee`(含 `departmentId: Department['id']`)
- `EmployeeStatus = 'active' | 'inactive'`
- `EmploymentType = 'full-time' | 'part-time' | 'contract'`

### 第 3 步:mock data
位置:[src/lib/mock-data.ts](src/lib/mock-data.ts)

- 14 個部門(5 個第一層 + 9 個子層,最深三層:工程部 → 平台組 → DevOps/資料工程)
- 31 個員工(4 位 inactive:emp 3, 18, 24, 29,跨 4 個部門)
- 部門 id 是純 number,員工 id 也是純 number

### 第 4 步:utils
位置:[src/lib/department-utils.ts](src/lib/department-utils.ts)

- `DepartmentNode` type(含 children,自我參照)
- `getDescendantIds(departments, rootId)` 遞迴抓某節點 + 所有子孫 id
- `buildTree(departments, parentId?)` 扁平陣列 → 巢狀樹

### 第 5 步:route group 與 layout
位置:[src/app/(main)/](src/app/(main)/)

- 建立 `(main)` route group
- [src/app/(main)/layout.tsx](src/app/(main)/layout.tsx) 用 shadcn `SidebarProvider` + `SidebarInset`
- [src/app/(main)/employees/page.tsx](src/app/(main)/employees/page.tsx) placeholder
- [src/app/(main)/employees/[id]/page.tsx](src/app/(main)/employees/[id]/page.tsx) placeholder

### 第 6 步:側邊欄完成
- [src/components/app-sidebar.tsx](src/components/app-sidebar.tsx) 外殼(Sidebar/Header/Content/Group/Menu)
- [src/components/department-tree.tsx](src/components/department-tree.tsx) 遞迴樹節點
- 「所有員工」、「停職成員」兩個特殊節點
- sidebar 整體收合(`collapsible="icon"` 模式 + `SidebarTrigger` 在 SidebarInset 頂部)
- 樹節點個別展開/收合(用 shadcn `Collapsible` + Tailwind named group)

## 路由設計(已定,未完成實作)

| sideMenu 點擊 | URL | 應顯示 |
|---|---|---|
| 所有員工 | `/employees` | 27 位在職 |
| 部門節點 | `/employees?dept=N` | 該部門 + 所有子孫的在職員工 |
| 停職成員 | `/employees?view=inactive` | 全部 4 位停職者 |
| 編輯員工 | `/employees/N` | 該員工編輯頁 |

## 接下來要做(按順序)

### 第 7 步:員工列表頁實作
- 在 [src/app/(main)/employees/page.tsx](src/app/(main)/employees/page.tsx) 用 `useSearchParams` 讀 dept / view
- 用 `getDescendantIds` 篩選員工
- 用 shadcn `<Table>` 顯示
- 列表欄位順序:id / 中名 / 英名 / 部門 / 職稱 / email / phone
- 加搜尋框(搜中文名 / 英文名 / email)
- 教學重點:Server vs Client component 取捨、`useSearchParams`、shadcn Table

### 第 8 步:員工編輯頁
- [src/app/(main)/employees/[id]/page.tsx](src/app/(main)/employees/[id]/page.tsx) 接 params
- 用 shadcn `<Field>` + `<Input>` + `<Select>` 組表單
- id 顯示不可編輯
- 教學重點:動態路由 params、表單管理(先用 useState 就好)、Sonner toast

### 第 9 步:打磨
- 列表空狀態(shadcn `<Empty>`)
- 側邊欄選中項目高亮(讀 URL + `isActive` prop)
- 首頁重導到 `/employees`
- 深色模式切換(next-themes 已裝)

## 使用者習慣與偏好(重要脈絡)

- 使用者主動會問「能不能用 shadcn 元件而不要自己刻」——讚賞這個直覺,引導他使用 shadcn composition
- 使用者會用 `Department['id']` 這種 indexed access type,TS 程度不錯
- 使用者用 `npx tsx 檔名.ts` 在 terminal 測試 TS 函式
- 寫 React component 用 `export function Name(props) {}` 風格(不要用 `React.FC`,不要標回傳型別)
- 使用者願意接受 .md 交接文件(但不要無故新增其他 .md)

## 待討論的設計決定

目前 `DepartmentTreeNode` 有 children 的節點,**整列點擊都是展開/收合**,跳轉變成 `SidebarMenuAction`(sr-only)。下次 session 開始前可以討論這個取捨是否要改成「點箭頭展開、點名字跳轉」的更明顯設計——但目前能 work。
