export type Department = {
    id: number;
    name: string;
    parentId: Department['id'] | null;
};

export type EmployeeStatus = 'active' | 'inactive';

export type EmploymentType = 'full-time' | 'part-time' | 'contract';

export type Employee = {
    id: number;
    nameZh: string;
    nameEn: string;
    email: string;
    phone: string;
    title: string;
    departmentId: Department['id'];
    employmentType: EmploymentType;
    status: EmployeeStatus;
    hireDate: string; // ISO date string
    location: string;
};
