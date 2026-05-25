import type { Department, Employee } from './types';

export const departments: Department[] = [
    { id: 1, name: '工程部', parentId: null },
    { id: 2, name: '產品部', parentId: null },
    { id: 3, name: '業務部', parentId: null },
    { id: 4, name: '行銷部', parentId: null },
    { id: 5, name: '人資部', parentId: null },
    { id: 6, name: '前端組', parentId: 1 },
    { id: 7, name: '後端組', parentId: 1 },
    { id: 8, name: '平台組', parentId: 1 },
    { id: 9, name: '產品管理', parentId: 2 },
    { id: 10, name: '設計組', parentId: 2 },
    { id: 11, name: '企業客戶', parentId: 3 },
    { id: 12, name: '中小企業', parentId: 3 },
    { id: 13, name: 'DevOps', parentId: 8 },
    { id: 14, name: '資料工程', parentId: 8 }
];

export const employees: Employee[] = [
    // 前端組 (departmentId: 6)
    {
        id: 1,
        nameZh: '陳子涵',
        nameEn: 'Alice Chen',
        email: 'alice.chen@hrdemo.com',
        phone: '0912-001-100',
        title: '資深前端工程師',
        departmentId: 6,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2020-03-15'
    },
    {
        id: 2,
        nameZh: '林俊宏',
        nameEn: 'Brian Lin',
        email: 'brian.lin@hrdemo.com',
        phone: '0912-002-101',
        title: '前端工程師',
        departmentId: 6,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2023-07-01'
    },
    {
        id: 3,
        nameZh: '王雅婷',
        nameEn: 'Cathy Wang',
        email: 'cathy.wang@hrdemo.com',
        phone: '0912-003-102',
        title: '前端工程師',
        departmentId: 6,
        employmentType: 'full-time',
        status: 'inactive',
        hireDate: '2022-05-20'
    },
    {
        id: 4,
        nameZh: '黃國豪',
        nameEn: 'Daniel Huang',
        email: 'daniel.huang@hrdemo.com',
        phone: '0912-004-103',
        title: '資深前端工程師',
        departmentId: 6,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2021-01-10'
    },
    {
        id: 5,
        nameZh: '陳家瑋',
        nameEn: 'Eric Chen',
        email: 'eric.chen@hrdemo.com',
        phone: '0912-005-104',
        title: '前端實習生',
        departmentId: 6,
        employmentType: 'part-time',
        status: 'active',
        hireDate: '2024-09-01'
    },

    // 後端組 (departmentId: 7)
    {
        id: 6,
        nameZh: '林佳穎',
        nameEn: 'Fiona Lin',
        email: 'fiona.lin@hrdemo.com',
        phone: '0912-006-105',
        title: '資深後端工程師',
        departmentId: 7,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2020-06-10'
    },
    {
        id: 7,
        nameZh: '張哲瑋',
        nameEn: 'George Chang',
        email: 'george.chang@hrdemo.com',
        phone: '0912-007-106',
        title: '後端工程師',
        departmentId: 7,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2023-02-14'
    },
    {
        id: 8,
        nameZh: '吳怡君',
        nameEn: 'Helen Wu',
        email: 'helen.wu@hrdemo.com',
        phone: '0912-008-107',
        title: '後端工程師',
        departmentId: 7,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2023-11-05'
    },
    {
        id: 9,
        nameZh: '陳柏翰',
        nameEn: 'Ivan Chen',
        email: 'ivan.chen@hrdemo.com',
        phone: '0912-009-108',
        title: '資深後端工程師',
        departmentId: 7,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2021-04-22'
    },
    {
        id: 10,
        nameZh: '蔡明達',
        nameEn: 'Jack Tsai',
        email: 'jack.tsai@hrdemo.com',
        phone: '0912-010-109',
        title: '後端工程師',
        departmentId: 7,
        employmentType: 'contract',
        status: 'active',
        hireDate: '2024-03-01'
    },

    // DevOps (departmentId: 13)
    {
        id: 11,
        nameZh: '劉俊傑',
        nameEn: 'Kevin Liu',
        email: 'kevin.liu@hrdemo.com',
        phone: '0912-011-110',
        title: 'DevOps 工程師',
        departmentId: 13,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2022-08-15'
    },
    {
        id: 12,
        nameZh: '周宛庭',
        nameEn: 'Lily Chou',
        email: 'lily.chou@hrdemo.com',
        phone: '0912-012-111',
        title: 'SRE 工程師',
        departmentId: 13,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2023-05-30'
    },

    // 資料工程 (departmentId: 14)
    {
        id: 13,
        nameZh: '林彥廷',
        nameEn: 'Mike Lin',
        email: 'mike.lin@hrdemo.com',
        phone: '0912-013-112',
        title: '資深資料工程師',
        departmentId: 14,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2020-11-01'
    },
    {
        id: 14,
        nameZh: '楊智凱',
        nameEn: 'Nathan Yang',
        email: 'nathan.yang@hrdemo.com',
        phone: '0912-014-113',
        title: '資料工程師',
        departmentId: 14,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2023-06-12'
    },
    {
        id: 15,
        nameZh: '王思穎',
        nameEn: 'Olivia Wang',
        email: 'olivia.wang@hrdemo.com',
        phone: '0912-015-114',
        title: '資料分析師',
        departmentId: 14,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2024-01-08'
    },

    // 產品管理 (departmentId: 9)
    {
        id: 16,
        nameZh: '陳怡安',
        nameEn: 'Patricia Chen',
        email: 'patricia.chen@hrdemo.com',
        phone: '0912-016-115',
        title: '資深產品經理',
        departmentId: 9,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2020-09-20'
    },
    {
        id: 17,
        nameZh: '鄭凱文',
        nameEn: 'Quinn Cheng',
        email: 'quinn.cheng@hrdemo.com',
        phone: '0912-017-116',
        title: '產品經理',
        departmentId: 9,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2023-03-15'
    },
    {
        id: 18,
        nameZh: '高敏華',
        nameEn: 'Rachel Kao',
        email: 'rachel.kao@hrdemo.com',
        phone: '0912-018-117',
        title: '產品經理',
        departmentId: 9,
        employmentType: 'full-time',
        status: 'inactive',
        hireDate: '2022-07-01'
    },

    // 設計組 (departmentId: 10)
    {
        id: 19,
        nameZh: '林書豪',
        nameEn: 'Steven Lin',
        email: 'steven.lin@hrdemo.com',
        phone: '0912-019-118',
        title: 'UI/UX 設計師',
        departmentId: 10,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2023-04-18'
    },
    {
        id: 20,
        nameZh: '許芷涵',
        nameEn: 'Tina Hsu',
        email: 'tina.hsu@hrdemo.com',
        phone: '0912-020-119',
        title: '資深 UI 設計師',
        departmentId: 10,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2021-08-25'
    },
    {
        id: 21,
        nameZh: '邱孟翰',
        nameEn: 'Victor Chiu',
        email: 'victor.chiu@hrdemo.com',
        phone: '0912-021-120',
        title: '視覺設計師',
        departmentId: 10,
        employmentType: 'contract',
        status: 'active',
        hireDate: '2024-05-10'
    },

    // 企業客戶 (departmentId: 11)
    {
        id: 22,
        nameZh: '賴志成',
        nameEn: 'William Lai',
        email: 'william.lai@hrdemo.com',
        phone: '0912-022-121',
        title: '業務總監',
        departmentId: 11,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2020-02-01'
    },
    {
        id: 23,
        nameZh: '王俊瑋',
        nameEn: 'Xavier Wang',
        email: 'xavier.wang@hrdemo.com',
        phone: '0912-023-122',
        title: '資深業務',
        departmentId: 11,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2021-11-15'
    },
    {
        id: 24,
        nameZh: '簡淑芬',
        nameEn: 'Yvonne Chien',
        email: 'yvonne.chien@hrdemo.com',
        phone: '0912-024-123',
        title: '業務經理',
        departmentId: 11,
        employmentType: 'full-time',
        status: 'inactive',
        hireDate: '2022-04-08'
    },

    // 中小企業 (departmentId: 12)
    {
        id: 25,
        nameZh: '蘇柏宇',
        nameEn: 'Zack Su',
        email: 'zack.su@hrdemo.com',
        phone: '0912-025-124',
        title: '業務代表',
        departmentId: 12,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2023-09-20'
    },
    {
        id: 26,
        nameZh: '朱家欣',
        nameEn: 'Amy Chu',
        email: 'amy.chu@hrdemo.com',
        phone: '0912-026-125',
        title: '業務代表',
        departmentId: 12,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2024-02-14'
    },

    // 行銷部 (departmentId: 4)
    {
        id: 27,
        nameZh: '葉俊豪',
        nameEn: 'Brandon Yeh',
        email: 'brandon.yeh@hrdemo.com',
        phone: '0912-027-126',
        title: '行銷總監',
        departmentId: 4,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2020-05-12'
    },
    {
        id: 28,
        nameZh: '江雅雯',
        nameEn: 'Claire Chiang',
        email: 'claire.chiang@hrdemo.com',
        phone: '0912-028-127',
        title: '內容行銷專員',
        departmentId: 4,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2023-10-02'
    },
    {
        id: 29,
        nameZh: '馮思源',
        nameEn: 'Derek Feng',
        email: 'derek.feng@hrdemo.com',
        phone: '0912-029-128',
        title: '數位行銷專員',
        departmentId: 4,
        employmentType: 'contract',
        status: 'inactive',
        hireDate: '2024-06-18'
    },

    // 人資部 (departmentId: 5)
    {
        id: 30,
        nameZh: '潘宜君',
        nameEn: 'Emily Pan',
        email: 'emily.pan@hrdemo.com',
        phone: '0912-030-129',
        title: '人資經理',
        departmentId: 5,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2021-06-01'
    },
    {
        id: 31,
        nameZh: '唐文傑',
        nameEn: 'Frank Tang',
        email: 'frank.tang@hrdemo.com',
        phone: '0912-031-130',
        title: '招募專員',
        departmentId: 5,
        employmentType: 'full-time',
        status: 'active',
        hireDate: '2024-08-22'
    }
];
