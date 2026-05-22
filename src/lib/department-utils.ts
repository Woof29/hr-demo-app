import type { Department } from './types';

export type DepartmentNode = Department & {
    children: DepartmentNode[];
};

export const getDescendantIds = (departments: Department[], rootId: Department['id']): Department['id'][] => {
    const descendantIds = departments
        .filter((dept) => dept.parentId === rootId)
        .flatMap((dept) => getDescendantIds(departments, dept.id));
    return [...descendantIds, rootId];
};

export const buildTree = (departments: Department[], parentId: Department['id'] | null = null): DepartmentNode[] => {
    return departments
        .filter((dept) => dept.parentId === parentId)
        .map((dept) => ({
            ...dept,
            children: buildTree(departments, dept.id)
        }));
};
