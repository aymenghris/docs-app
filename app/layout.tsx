import { FC, ReactNode } from 'react'
import { ConvexClientProvider } from '@/components/ConvexClientProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Docs App',
}

interface RootLayoutProps {
    children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <NuqsAdapter>
                    <ConvexClientProvider>
                        {children}
                        <Toaster />
                    </ConvexClientProvider>
                </NuqsAdapter>
            </body>
        </html>
    )
}

export default RootLayout
