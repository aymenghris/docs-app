import { FC } from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface ToolbarButton {
    label: string
    icon: LucideIcon
    onClick: () => void
    isActive?: boolean
}

export const ToolbarButton: FC<ToolbarButton> = ({
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
