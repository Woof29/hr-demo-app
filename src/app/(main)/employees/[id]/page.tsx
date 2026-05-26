import { employees } from '@/lib/mock-data';
import EmployeeDetailClient from './employee-detail-client';

export function generateStaticParams() {
    return employees.map((e) => ({ id: String(e.id) }));
}

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <EmployeeDetailClient id={id} />;
}
