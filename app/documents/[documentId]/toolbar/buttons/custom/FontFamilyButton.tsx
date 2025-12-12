import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/stores/use-editor-store'
import { ChevronDownIcon } from 'lucide-react'

export const FontFamilyButton = () => {
    const { editor } = useEditorStore()

    const fonts = [
        { label: 'Arial', value: 'Arial' },
        { label: 'Times New Roman', value: 'Times New Roman' },
        { label: 'Courier New', value: 'Courier New' },
        { label: 'Georgia', value: 'Georgia' },
        { label: 'Verdana', value: 'Verdana' },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        'flex shrink-0 items-center justify-between',
                        'h-7 w-[120px] px-1.5',
                        'text-sm',
                        'overflow-hidden rounded-sm',
                        'hover:bg-neutral-200/80',
                    )}
                >
                    <span className="truncate">
                        {editor?.getAttributes('textStyle')?.fontFamily ||
                            'Arial'}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
                {fonts.map(({ label, value }) => (
                    <DropdownMenuItem
                        key={value}
                        onClick={() =>
                            editor?.chain().focus().setFontFamily(value).run()
                        }
                        className={cn(
                            'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
                            editor?.getAttributes('fontStyle').fontFamily ===
                                value && 'bg-neutral-200',
                        )}
                        style={{ fontFamily: value }}
                    >
                        <span className="text-sm">{label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
