import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor'
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
                        'flex items-center justify-between shrink-0',
                        'h-7 w-[120px] px-1.5',
                        'text-sm',
                        'rounded-sm   overflow-hidden',
                        'hover:bg-neutral-200/80',
                    )}
                >
                    <span className="truncate">
                        {editor?.getAttributes('textStyle')?.fontFamily ||
                            'Arial'}
                    </span>
                    <ChevronDownIcon className="size-4 ml-2 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {fonts.map(({ label, value }) => (
                    <DropdownMenuItem
                        key={value}
                        onClick={() =>
                            editor?.chain().focus().setFontFamily(value).run()
                        }
                        className={cn(
                            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
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
