'use client';

import { useSearchParams } from 'next/navigation';
import { employees, departments } from '@/lib/mock-data';
import { getDescendantIds } from '@/lib/department-utils';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Link from 'next/link';
import { convertDepartmentIdToName } from '@/lib/utils';

export default function EmployeesPage(): React.ReactNode {
    const searchParams = useSearchParams();
    const departmentId = searchParams.get('dept');
    const view = searchParams.get('view');

    const [keyword, setKeyword] = useState<string>('');

    // 先根據 departmentId 和 view 過濾一次
    const filtered = (() => {
        if (!departmentId && view !== 'inactive') {
            return employees.filter((employee) => employee.status === 'active');
        } else if (view === 'inactive') {
            return employees.filter((employee) => employee.status === 'inactive');
        }
        const ids = getDescendantIds(departments, Number(departmentId));
        return employees.filter((employee) => ids.includes(employee.departmentId));
    })();

    // 再根據搜尋關鍵字過濾一次
    const displayed = filtered.filter((employee) => {
        if (!keyword) return true;
        const kw = keyword.toLowerCase();
        return (
            employee.nameZh.includes(kw) ||
            employee.nameEn.toLowerCase().includes(kw) ||
            employee.email.toLowerCase().includes(kw) ||
            employee.id.toString().includes(kw)
        );
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value); // 就這樣就好！
    };

    const from = departmentId ? `dept-${departmentId}` : view === 'inactive' ? 'inactive' : 'all';

    return (
        <div className="flex flex-col min-h-screen">
            {/* 搜尋框 */}
            <div className="py-4">
                <Input placeholder="搜尋員工..." value={keyword} onChange={handleSearch} />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>姓名</TableHead>
                        <TableHead>部門</TableHead>
                        <TableHead>職稱</TableHead>
                        <TableHead>電子郵件</TableHead>
                        <TableHead>電話</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayed.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>
                                <Link
                                    href={{
                                        pathname: `/employees/${employee.id}`,
                                        query: { from }
                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    {employee.nameZh} / {employee.nameEn}
                                </Link>
                            </TableCell>
                            <TableCell>{convertDepartmentIdToName(employee.departmentId, departments)}</TableCell>
                            <TableCell>{employee.title}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
