import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Department } from '@/lib/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const convertDepartmentIdToName = (id: number, departments: Department[]) => {
    const department = departments.find((dept) => dept.id === id);
    return department ? department.name : null;
};
