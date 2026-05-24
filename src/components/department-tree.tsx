'use client';

import Link from 'next/link';
import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSub } from '@/components/ui/sidebar';
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
                    <div className="flex items-center w-full">
                        <CollapsibleTrigger className="flex items-center justify-center p-1 rounded hover:bg-sidebar-accent shrink-0 data-[state=open]:[&_svg]:rotate-90">
                            <ChevronRight className="transition-transform" />
                        </CollapsibleTrigger>
                        <SidebarMenuButton asChild className="flex-1">
                            <Link href={`/employees?dept=${node.id}`}>
                                <span>{node.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </div>

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
