'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { employees, departments } from '@/lib/mock-data';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import type { BreadcrumbItemData } from '@/lib/types';
import { Fragment } from 'react';
import { convertDepartmentIdToName } from '@/lib/utils';

const resolveFrom = (from: string | null) => {
    if (from?.startsWith('dept-')) {
        const deptId = Number(from.split('-')[1]);
        return {
            label: convertDepartmentIdToName(deptId, departments) ?? '未知部門',
            href: `/employees?dept=${deptId}`
        };
    }
    if (from === 'inactive') {
        return {
            label: '停職成員',
            href: '/employees?view=inactive'
        };
    }
    return {
        label: '所有員工',
        href: '/employees'
    };
};

export default function Breadcrumbs() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const items: BreadcrumbItemData[] = [];
    const employeeMatch = pathname.match(/\/employees\/(\d+)\/?$/);
    const isDetailPage = !!employeeMatch;
    if (isDetailPage) {
        const employeeId = Number(employeeMatch![1]);
        const employee = employees.find((emp) => emp.id === employeeId);
        if (employee) {
            const source = resolveFrom(searchParams.get('from'));
            items.push({ label: source.label, href: source.href });
            items.push({ label: `${employee.nameZh} / ${employee.nameEn}` });
        }
    } else if (searchParams.get('view') === 'inactive') {
        items.push({ label: '停職成員' });
    } else if (searchParams.get('dept')) {
        const deptId = Number(searchParams.get('dept'));
        items.push({ label: convertDepartmentIdToName(deptId, departments) ?? '未知部門' });
    } else {
        items.push({ label: '所有員工' });
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, i) => (
                    <Fragment key={i}>
                        <BreadcrumbItem>
                            {item.href ? (
                                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {i < items.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
