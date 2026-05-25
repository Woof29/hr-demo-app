'use client';

import type {
    Employee,
    BasicInfo,
    EmploymentInfo,
    PersonalInfo,
    EmploymentTypeValue,
    NationalityType,
    Gender,
    BloodType,
    MilitaryStatus,
    MaritalStatus
} from '@/lib/types';
import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Router } from 'lucide-react';
import { Field, FieldLabel, FieldDescription } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { departments } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const DATE_FORMAT = 'yyyy-MM-dd';

const DEFAULT_BASIC_INFO: BasicInfo = {
    nationalityType: null,
    gender: null,
    birthDate: '',
    bloodType: null,
    idNumber: '',
    militaryStatus: null,
    maritalStatus: null,
    workPermitNumber: '',
    workPermitStartDate: '',
    workPermitEndDate: ''
};

const DEFAULT_EMPLOYMENT_INFO: EmploymentInfo = {
    employmentType: null,
    companyName: '',
    jobGrade: '',
    jobLevel: '',
    leaveReason: '',
    workLocation: '',
    notes: ''
};

const DEFAULT_PERSONAL_INFO: PersonalInfo = {
    contactAddress: '',
    registeredAddress: '',
    personalPhone: '',
    personalEmail: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
};

type FormState = Employee & {
    BasicInfo: BasicInfo;
    employmentInfo: EmploymentInfo;
    personalInfo: PersonalInfo;
};

const EMPLOYMENT_TYPE_OPTIONS: Array<{ value: EmploymentTypeValue; label: string }> = [
    { value: 'full-time', label: '全職' },
    { value: 'part-time', label: '兼職' },
    { value: 'contract', label: '約聘' }
];

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <Field orientation="horizontal" className="w-full">
            <span className="flex-shrink-0 w-28 mb-0 mr-2 text-sm font-bold">{label}</span>
            <div className="flex-1 min-w-0">{children}</div>
        </Field>
    );
}

function DatePickerField({
    value,
    onChange,
    placeholder = '請選擇日期'
}: {
    value: string;
    onChange: (next: string) => void;
    placeholder?: string;
}) {
    const date = value ? new Date(value) : undefined;
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'w-full justify-start font-normal rounded-none border-0 border-b border-input px-0',
                        !value && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className="mr-2 size-4" />
                    {value ? format(date as Date, DATE_FORMAT) : placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => onChange(d ? format(d, DATE_FORMAT) : '')}
                    captionLayout="dropdown"
                />
            </PopoverContent>
        </Popover>
    );
}

function FormFooter({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) {
    return (
        <div className="fixed bottom-0 right-0 left-0 md:left-(--sidebar-width) px-4 py-3 bg-background border-t flex justify-end gap-2 z-20">
            <Button variant="outline" onClick={onCancel}>
                取消
            </Button>
            <Button onClick={onSave}>儲存</Button>
        </div>
    );
}

export default function EmployeeDetailEditForm({ employee }: { employee: Employee }): React.ReactNode {
    const [form, setForm] = useState<FormState>({
        ...employee,
        BasicInfo: employee.basicInfo ?? DEFAULT_BASIC_INFO,
        employmentInfo: employee.employmentInfo ?? DEFAULT_EMPLOYMENT_INFO,
        personalInfo: employee.personalInfo ?? DEFAULT_PERSONAL_INFO
    });
    const router = useRouter();
    const { BasicInfo, employmentInfo, personalInfo } = form;

    const updatePersonal = <K extends keyof BasicInfo>(key: K, value: BasicInfo[K]) =>
        setForm((prev) => ({ ...prev, BasicInfo: { ...prev.BasicInfo, [key]: value } }));

    const updateEmployment = <K extends keyof EmploymentInfo>(key: K, value: EmploymentInfo[K]) =>
        setForm((prev) => ({ ...prev, employmentInfo: { ...prev.employmentInfo, [key]: value } }));

    const updatePersonalInfo = <K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) =>
        setForm((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [key]: value } }));

    const departmentName = departments.find((d) => d.id === employee.departmentId)?.name ?? '--';

    const handleSaveBasic = () => {
        toast.success('已儲存基本資料');
        // demo 不真的改 mock data
    };

    const handleCancelBasic = () => {
        // 該 tab 對應的欄位 reset 回 employee 原值
        setForm((prev) => ({
            ...prev,
            BasicInfo: employee.basicInfo ?? DEFAULT_BASIC_INFO,
            employmentInfo: employee.employmentInfo ?? DEFAULT_EMPLOYMENT_INFO
        }));
        router.back();
        toast.info('已取消編輯');
    };

    return (
        <Tabs defaultValue="basic">
            <TabsList className="bg-transparent border-b w-full">
                <TabsTrigger value="basic">基本資料</TabsTrigger>
                <TabsTrigger value="personal">個人資料</TabsTrigger>
                <TabsTrigger value="resume">履歷資料</TabsTrigger>
                <TabsTrigger value="promotion">升遷歷程</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="p-4 overflow-y-auto max-h-[calc(100svh-24rem)]">
                <div className="flex flex-col gap-8 pb-20">
                    {/* 基本資料區塊 */}
                    <section className="flex flex-col">
                        <span className="w-full py-2 mb-4 border-b text-lg font-semibold">基本資料</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <FormRow label="身份類別">
                                <RadioGroup
                                    className="flex flex-row gap-6"
                                    value={BasicInfo.nationalityType}
                                    onValueChange={(v) => updatePersonal('nationalityType', v as NationalityType)}
                                >
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="local" id="nat-local" />
                                        <FieldLabel htmlFor="nat-local" className="font-normal">
                                            本國人
                                        </FieldLabel>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="foreign" id="nat-foreign" />
                                        <FieldLabel htmlFor="nat-foreign" className="font-normal">
                                            外國人
                                        </FieldLabel>
                                    </div>
                                </RadioGroup>
                            </FormRow>

                            <FormRow label="性別">
                                <RadioGroup
                                    className="flex flex-row gap-6"
                                    value={BasicInfo.gender}
                                    onValueChange={(v) => updatePersonal('gender', v as Gender)}
                                >
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="male" id="gender-male" />
                                        <FieldLabel htmlFor="gender-male" className="font-normal">
                                            男
                                        </FieldLabel>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="female" id="gender-female" />
                                        <FieldLabel htmlFor="gender-female" className="font-normal">
                                            女
                                        </FieldLabel>
                                    </div>
                                </RadioGroup>
                            </FormRow>

                            <FormRow label="出生日期">
                                <DatePickerField
                                    value={BasicInfo.birthDate}
                                    onChange={(v) => updatePersonal('birthDate', v)}
                                />
                            </FormRow>

                            <FormRow label="血型">
                                <RadioGroup
                                    className="flex flex-row gap-6"
                                    value={BasicInfo.bloodType}
                                    onValueChange={(v) => updatePersonal('bloodType', v as BloodType)}
                                >
                                    {(['A', 'B', 'O', 'AB'] as const).map((bt) => (
                                        <div key={bt} className="flex items-center gap-1">
                                            <RadioGroupItem value={bt} id={`blood-${bt}`} />
                                            <FieldLabel htmlFor={`blood-${bt}`} className="font-normal">
                                                {bt}
                                            </FieldLabel>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormRow>

                            <FormRow label="身分證字號">
                                <Input
                                    value={BasicInfo.idNumber}
                                    maxLength={20}
                                    placeholder="請輸入身分證字號"
                                    onChange={(e) => updatePersonal('idNumber', e.target.value)}
                                />
                            </FormRow>

                            <FormRow label="兵役">
                                <RadioGroup
                                    className="flex flex-row gap-6"
                                    value={BasicInfo.militaryStatus}
                                    onValueChange={(v) => updatePersonal('militaryStatus', v as MilitaryStatus)}
                                >
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="served" id="mil-served" />
                                        <FieldLabel htmlFor="mil-served" className="font-normal">
                                            役畢
                                        </FieldLabel>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="unserved" id="mil-unserved" />
                                        <FieldLabel htmlFor="mil-unserved" className="font-normal">
                                            未役
                                        </FieldLabel>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="exempt" id="mil-exempt" />
                                        <FieldLabel htmlFor="mil-exempt" className="font-normal">
                                            免役
                                        </FieldLabel>
                                    </div>
                                </RadioGroup>
                            </FormRow>

                            <FormRow label="婚姻狀況">
                                <RadioGroup
                                    className="flex flex-row gap-6"
                                    value={BasicInfo.maritalStatus}
                                    onValueChange={(v) => updatePersonal('maritalStatus', v as MaritalStatus)}
                                >
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="single" id="marital-single" />
                                        <FieldLabel htmlFor="marital-single" className="font-normal">
                                            未婚
                                        </FieldLabel>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <RadioGroupItem value="married" id="marital-married" />
                                        <FieldLabel htmlFor="marital-married" className="font-normal">
                                            已婚
                                        </FieldLabel>
                                    </div>
                                </RadioGroup>
                            </FormRow>

                            <FormRow label="工作證號碼">
                                <Input
                                    value={BasicInfo.workPermitNumber}
                                    maxLength={100}
                                    placeholder="請輸入工作證號碼"
                                    onChange={(e) => updatePersonal('workPermitNumber', e.target.value)}
                                />
                            </FormRow>

                            <FormRow label="工作證效期">
                                <div className="flex items-center gap-2">
                                    <DatePickerField
                                        value={BasicInfo.workPermitStartDate}
                                        onChange={(v) => updatePersonal('workPermitStartDate', v)}
                                        placeholder="開始日期"
                                    />
                                    <span className="text-muted-foreground">~</span>
                                    <DatePickerField
                                        value={BasicInfo.workPermitEndDate}
                                        onChange={(v) => updatePersonal('workPermitEndDate', v)}
                                        placeholder="結束日期"
                                    />
                                </div>
                            </FormRow>
                        </div>
                    </section>

                    {/* 雇傭資料區塊 */}
                    <section className="flex flex-col">
                        <span className="w-full py-2 mb-4 border-b text-lg font-semibold">雇傭資料</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <FormRow label="雇傭類別">
                                <Select
                                    value={employmentInfo.employmentType ?? ''}
                                    onValueChange={(v) => updateEmployment('employmentType', v as EmploymentTypeValue)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="請選擇" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {EMPLOYMENT_TYPE_OPTIONS.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value ?? ''}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormRow>

                            <FormRow label="所屬公司">
                                <Input
                                    value={employmentInfo.companyName}
                                    maxLength={100}
                                    placeholder="請輸入所屬公司"
                                    onChange={(e) => updateEmployment('companyName', e.target.value)}
                                />
                            </FormRow>

                            <FormRow label="正職部門">
                                <span className="text-muted-foreground text-sm">{departmentName}</span>
                            </FormRow>

                            <FormRow label="正職職稱">
                                <span className="text-muted-foreground text-sm">{employee.title || '--'}</span>
                            </FormRow>

                            <FormRow label="兼職部門">
                                <span className="text-muted-foreground text-sm">無兼職部門</span>
                            </FormRow>

                            <FormRow label="兼職職稱">
                                <span className="text-muted-foreground text-sm">無兼職職稱</span>
                            </FormRow>

                            <FormRow label="職等">
                                <Input
                                    value={employmentInfo.jobGrade}
                                    maxLength={100}
                                    placeholder="請輸入職等"
                                    onChange={(e) => updateEmployment('jobGrade', e.target.value)}
                                />
                            </FormRow>

                            <FormRow label="職級">
                                <Input
                                    value={employmentInfo.jobLevel}
                                    maxLength={100}
                                    placeholder="請輸入職級"
                                    onChange={(e) => updateEmployment('jobLevel', e.target.value)}
                                />
                            </FormRow>

                            <FormRow label="離職原因">
                                <Input
                                    value={employmentInfo.leaveReason}
                                    maxLength={100}
                                    placeholder="請輸入離職原因"
                                    onChange={(e) => updateEmployment('leaveReason', e.target.value)}
                                />
                            </FormRow>

                            <FormRow label="工作地點">
                                <Input
                                    value={employmentInfo.workLocation}
                                    maxLength={100}
                                    placeholder="請輸入工作地點"
                                    onChange={(e) => updateEmployment('workLocation', e.target.value)}
                                />
                            </FormRow>
                        </div>
                    </section>

                    {/* 備註區塊 */}
                    <section className="flex flex-col">
                        <span className="w-full py-2 mb-4 border-b text-lg font-semibold">備註</span>
                        <Textarea
                            value={employmentInfo.notes}
                            maxLength={1000}
                            rows={4}
                            placeholder="請輸入備註"
                            onChange={(e) => updateEmployment('notes', e.target.value)}
                        />
                    </section>
                </div>
                <FormFooter onCancel={handleCancelBasic} onSave={handleSaveBasic} />
            </TabsContent>

            <TabsContent value="personal" className="p-4 overflow-y-auto max-h-[calc(100svh-24rem)]">
                <div className="flex flex-col gap-8 pb-20">
                    <section className="flex flex-col">
                        <span className="w-full py-2 mb-4 border-b text-lg font-semibold">個人資料</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <FormRow label="住家地址">
                                <Input
                                    value={personalInfo.contactAddress}
                                    maxLength={100}
                                    placeholder="請輸入住家地址"
                                    onChange={(e) => updatePersonalInfo('contactAddress', e.target.value)}
                                />
                            </FormRow>
                            <FormRow label="戶籍地址">
                                <Input
                                    value={personalInfo.registeredAddress}
                                    maxLength={100}
                                    placeholder="請輸入戶籍地址"
                                    onChange={(e) => updatePersonalInfo('registeredAddress', e.target.value)}
                                />
                            </FormRow>
                            <FormRow label="個人電話">
                                <Input
                                    value={personalInfo.personalPhone}
                                    maxLength={20}
                                    placeholder="請輸入個人電話"
                                    onChange={(e) => updatePersonalInfo('personalPhone', e.target.value)}
                                />
                            </FormRow>
                            <FormRow label="個人電子郵件">
                                <Input
                                    value={personalInfo.personalEmail}
                                    maxLength={100}
                                    placeholder="請輸入電子郵件"
                                    onChange={(e) => updatePersonalInfo('personalEmail', e.target.value)}
                                />
                            </FormRow>
                            <FormRow label="緊急聯絡人姓名">
                                <Input
                                    value={personalInfo.emergencyContactName}
                                    maxLength={100}
                                    placeholder="請輸入緊急聯絡人姓名"
                                    onChange={(e) => updatePersonalInfo('emergencyContactName', e.target.value)}
                                />
                            </FormRow>
                            <FormRow label="緊急聯絡人電話">
                                <Input
                                    value={personalInfo.emergencyContactPhone}
                                    maxLength={20}
                                    placeholder="請輸入緊急聯絡人電話"
                                    onChange={(e) => updatePersonalInfo('emergencyContactPhone', e.target.value)}
                                />
                            </FormRow>
                        </div>
                    </section>
                </div>
                <FormFooter onCancel={handleCancelBasic} onSave={handleSaveBasic} />
            </TabsContent>
        </Tabs>
    );
}
