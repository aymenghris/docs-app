import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor'
import type { Level } from '@tiptap/extension-heading'
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

    const getCurrentHeading = () => {
        const level = [1, 2, 3, 4, 5].find((l) =>
            editor?.isActive('heading', { level: l }),
        )
        return level ? `Heading ${level}` : 'Normal text'
    }

    const isHeadingActive = (value: number) =>
        (value === 0 && !editor?.isActive('heading')) ||
        editor?.isActive('heading', { level: value })

    const applyHeadingLevel = (value: number) => {
        if (value === 0) editor?.chain().focus().setParagraph().run()
        else
            editor
                ?.chain()
                .focus()
                .toggleHeading({ level: value as Level })
                .run()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        'flex shrink-0 items-center justify-center',
                        'h-7 min-w-7 px-1.5',
                        'text-sm',
                        'overflow-hidden rounded-sm',
                        'hover:bg-neutral-200/80',
                    )}
                >
                    <span className="truncate">{getCurrentHeading()}</span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
                {headings.map(({ label, value, fontSize }) => (
                    <DropdownMenuItem
                        key={value}
                        onClick={() => applyHeadingLevel(value)}
                        className={cn(
                            'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
                            isHeadingActive(value) && 'bg-neutral-200',
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
