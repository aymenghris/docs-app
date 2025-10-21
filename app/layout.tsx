import { FC, ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Docs App',
}

interface RootLayoutProps {
    children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

export default RootLayout
