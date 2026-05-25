---
name: user-component-decomposition
description: User proactively splits forms and complex UI into their own components without being asked
metadata:
  type: user
---

當頁面需要塞表單或一段有獨立狀態的 UI 時，使用者會主動把它拆成獨立的 client component（例如 `EmployeeDetailEditForm` 從 `[id]/page.tsx` 拆出），而不是全部塞在 page 檔。

不需要每次提醒「要不要拆成 client component」——他會自己拆。教學節奏可以直接跳到「組件內怎麼設計」，省掉「為什麼要拆」的鋪陳。
