import { FC } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

export interface LoadingStateProps {
    label?: string
    className?: string
}

export const LoadingState: FC<LoadingStateProps> = ({ label, className }) => (
    <div
        className={cn(
            'flex flex-col items-center justify-center gap-2',
            className,
        )}
    >
        <Spinner className="size-6" />
        {label && (
            <span className="text-muted-foreground text-sm">{label}</span>
        )}
    </div>
)
