import { FC } from 'react'
import { cn } from '@/lib/utils'
import type { ToolbarButton as ButtonProps } from '@toolbar/utils/types'

export const ToolbarButton: FC<ButtonProps> = ({
    onClick,
    isActive,
    icon: Icon,
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                'flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80',
                isActive && 'bg-neutral-200',
            )}
        >
            <Icon className="size-4" />
        </button>
    )
}
