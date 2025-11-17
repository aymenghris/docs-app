import { FC } from 'react'
import { cn } from '@/lib/utils'
import { FaCaretDown } from 'react-icons/fa'

interface MarginIndicatorProps {
    offset: number
    isLeft: boolean
    isDragging: boolean
    onMouseDown: () => void
    onDoubleClick: () => void
}

export const MarginIndicator: FC<MarginIndicatorProps> = ({
    offset,
    isLeft,
    isDragging,
    onMouseDown,
    onDoubleClick,
}) => {
    return (
        <div
            className="absolute top-0 z-[5] -ml-2 h-full w-4 cursor-ew-resize"
            style={{ [isLeft ? 'left' : 'right']: `${offset}px` }}
            onMouseDown={onMouseDown}
            onDoubleClick={onDoubleClick}
        >
            <FaCaretDown className="absolute top-0 left-1/2 h-full -translate-x-1/2 transform fill-blue-500" />
            <div
                className={cn(
                    'absolute top-4 left-1/2',
                    'h-screen w-px',
                    'bg-blue-500',
                    '-translate-x-1/2 scale-x-50 transform',
                )}
                style={{ display: isDragging ? 'block' : 'none' }}
            />
        </div>
    )
}
