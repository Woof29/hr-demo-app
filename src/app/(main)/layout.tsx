import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { buildTree } from '@/lib/department-utils';
import { departments } from '@/lib/mock-data';
import { Toaster } from '@/components/ui/sonner';

export default function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const tree = buildTree(departments);
    return (
        <>
            <Toaster position="top-right" />
            <SidebarProvider>
                <AppSidebar tree={tree} />
                <SidebarInset>
                    <header className="sticky top-0 bg-background flex h-14 items-center gap-2 border-b px-4 z-10">
                        <SidebarTrigger />
                        {/* 之後可以放麵包屑、頁面標題等 */}
                    </header>
                    <div className="p-4">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
