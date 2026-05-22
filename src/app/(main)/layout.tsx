import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { buildTree } from '@/lib/department-utils';
import { departments } from '@/lib/mock-data';

export default function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const tree = buildTree(departments);
    return (
        <SidebarProvider>
            <AppSidebar tree={tree} />
            <SidebarInset>
                <header className="flex h-14 items-center gap-2 border-b px-4">
                    <SidebarTrigger />
                    {/* 之後可以放麵包屑、頁面標題等 */}
                </header>
                <div className="p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
