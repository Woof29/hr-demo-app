import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

const playfairDisplayHeading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'HR Demo App',
    description: 'This is the HR Demo app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                'h-full',
                'antialiased',
                geistSans.variable,
                geistMono.variable,
                'font-sans',
                notoSans.variable,
                playfairDisplayHeading.variable
            )}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col" suppressHydrationWarning>
                <ThemeProvider
                    attribute="class" // 用 class="dark" 模式(對應 Tailwind dark: 變體)
                    defaultTheme="system" // 預設跟系統設定
                    enableSystem // 允許 'system' 選項
                    disableTransitionOnChange // 切換時禁用過場動畫,避免一堆元素 transition 同時觸發很卡
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
