import { FC } from 'react'
import { cn } from '@/lib/utils'
import type { Button as ButtonProps } from '@toolbar/utils/types'

export const Button: FC<ButtonProps> = ({ onClick, isActive, icon: Icon }) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
                isActive && 'bg-neutral-200',
            )}
        >
            <Icon className="size-4" />
        </button>
    )
}
