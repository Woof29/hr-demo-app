'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator
} from '@/components/ui/sidebar';
import { DepartmentTree } from './department-tree';
import type { DepartmentNode } from '@/lib/department-utils';
import Link from 'next/link';
import { Users, Building2, UserX } from 'lucide-react';

type AppSidebarProps = {
    tree: DepartmentNode[];
};

export function AppSidebar({ tree }: AppSidebarProps) {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>主選單</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* 所有員工 */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/employees">
                                        <Users />
                                        所有員工
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* 部門樹 */}
                            <DepartmentTree nodes={tree} />

                            {/* 分隔線 */}
                            <SidebarSeparator />

                            {/* 停職成員 */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/employees?view=inactive">
                                        <UserX />
                                        停職成員
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
