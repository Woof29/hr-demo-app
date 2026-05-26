export type Department = {
    id: number;
    name: string;
    parentId: Department['id'] | null;
};

export type NationalityType = 'local' | 'foreign' | null;
export type Gender = 'male' | 'female' | null;
export type BloodType = 'A' | 'B' | 'O' | 'AB' | null;
export type MilitaryStatus = 'served' | 'unserved' | 'exempt' | null;
export type MaritalStatus = 'single' | 'married' | null;
export type EmploymentTypeValue = 'full-time' | 'part-time' | 'contract' | null;

export type BasicInfo = {
    nationalityType: NationalityType;
    gender: Gender;
    birthDate: string;
    bloodType: BloodType;
    idNumber: string;
    militaryStatus: MilitaryStatus;
    maritalStatus: MaritalStatus;
    workPermitNumber: string;
    workPermitStartDate: string;
    workPermitEndDate: string;
};

export type EmploymentInfo = {
    employmentType: EmploymentTypeValue;
    companyName: string;
    jobGrade: string;
    jobLevel: string;
    leaveReason: string;
    workLocation: string;
    notes: string;
};

export type PersonalInfo = {
    contactAddress: string;
    registeredAddress: string;
    personalPhone: string;
    personalEmail: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
};

export type ResumeInfo = {
    education?: Array<{ school: string; degree: string }>;
    experience?: Array<{ company: string; years: number }>;
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
    basicInfo?: BasicInfo;
    employmentInfo?: EmploymentInfo;
    personalInfo?: PersonalInfo;
    resumeInfo?: ResumeInfo;
};

export type BreadcrumbItemData = {
    label: string;
    href?: string;
};
