import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor'
import {
    applyHeadingLevel,
    getCurrentHeading,
    isHeadingActive,
} from '@toolbar/buttons/custom/utils'
import { ChevronDownIcon } from 'lucide-react'

export const HeadingLevelButton = () => {
    const { editor } = useEditorStore()

    const headings = [
        { label: 'Normal text', value: 0, fontSize: '16px' },
        { label: 'Heading 1', value: 1, fontSize: '32px' },
        { label: 'Heading 2', value: 2, fontSize: '24px' },
        { label: 'Heading 3', value: 3, fontSize: '20px' },
        { label: 'Heading 4', value: 4, fontSize: '18px' },
        { label: 'Heading 5', value: 5, fontSize: '16px' },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        'flex items-center justify-center shrink-0',
                        'h-7 min-w-7 px-1.5',
                        'text-sm',
                        'rounded-sm   overflow-hidden',
                        'hover:bg-neutral-200/80',
                    )}
                >
                    <span className="truncate">
                        {getCurrentHeading(editor)}
                    </span>
                    <ChevronDownIcon className="size-4 ml-2 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {headings.map(({ label, value, fontSize }) => (
                    <DropdownMenuItem
                        key={value}
                        onClick={() => applyHeadingLevel(editor, value)}
                        className={cn(
                            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                            isHeadingActive(editor, value) && 'bg-neutral-200',
                        )}
                        style={{ fontSize }}
                    >
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
