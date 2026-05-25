'use client';
import { use } from 'react';
import { employees } from '@/lib/mock-data';
import EmployeeDetailEditForm from '@/components/employee-detail-edit-form';

export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }): React.ReactNode {
    const { id } = use(params);
    const employee = employees.find((emp) => emp.id === Number(id));

    if (!employee) {
        return <div>員工不存在</div>;
    }
    return (
        <div className="w-full min-h-[calc(100vh-6rem)] flex flex-col gap-4">
            <div className="p-4 bg-background rounded shadow w-full mx-auto">
                <h1 className="text-2xl font-bold mb-4">
                    {employee.nameZh} / {employee.nameEn}
                </h1>
                <p className="text-muted-foreground mb-2">部門: {employee.departmentId}</p>
                <p className="text-muted-foreground mb-2">職稱: {employee.title}</p>
                <p className="text-muted-foreground mb-2">電子郵件: {employee.email}</p>
                <p className="text-muted-foreground mb-2">電話: {employee.phone}</p>
            </div>
            <EmployeeDetailEditForm employee={employee} />
        </div>
    );
}
