import { FC } from 'react'
import { Spinner } from '@/components/ui/spinner'

interface FullScreenLoaderProps {
    label?: string
}

export const FullScreenLoader: FC<FullScreenLoaderProps> = ({ label }) => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
        <Spinner className="size-6" />
        {label && (
            <span className="text-muted-foreground text-sm">{label}</span>
        )}
    </div>
)
