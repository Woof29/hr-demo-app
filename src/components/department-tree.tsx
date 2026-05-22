'use client';

import Link from 'next/link';
import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuAction } from '@/components/ui/sidebar';
import type { DepartmentNode } from '@/lib/department-utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-react';

type DepartmentTreeProps = {
    nodes: DepartmentNode[];
};

export function DepartmentTree({ nodes }: DepartmentTreeProps) {
    return (
        <>
            {nodes.map((node) => (
                <DepartmentTreeNode key={node.id} node={node} />
            ))}
        </>
    );
}

function DepartmentTreeNode({ node }: { node: DepartmentNode }) {
    const hasChildren = node.children.length > 0;
    if (!hasChildren) {
        return (
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href={`/employees?dept=${node.id}`}>{node.name}</Link>
                </SidebarMenuButton>

                {/* 遞迴渲染 children */}
                {node.children.length > 0 && (
                    <SidebarMenuSub>
                        {node.children.map((child) => (
                            <DepartmentTreeNode key={child.id} node={child} />
                        ))}
                    </SidebarMenuSub>
                )}
            </SidebarMenuItem>
        );
    } else {
        return (
            <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="p-1 hover:bg-sidebar-accent rounded data-[state=open]:[&_svg]:rotate-90">
                            <ChevronRight className="transition-transform" />
                            <span>{node.name}</span>
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <SidebarMenuAction asChild>
                        <Link href={`/employees?dept=${node.id}`}>
                            <span className="sr-only">查看 {node.name} 員工</span>
                        </Link>
                    </SidebarMenuAction>

                    {/* 遞迴渲染 children */}
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {node.children.map((child) => (
                                <DepartmentTreeNode key={child.id} node={child} />
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        );
    }
}
