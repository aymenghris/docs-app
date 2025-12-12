import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/stores/use-editor-store'
import { ListCollapseIcon } from 'lucide-react'

export const LineHeightButton = () => {
    const { editor } = useEditorStore()
    const lineHeightOptions = ['normal', '1', '1.15', '1.5', '2', '2.5', '3']

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80">
                    <ListCollapseIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
                {lineHeightOptions.map((option) => (
                    <button
                        key={option}
                        onClick={() =>
                            editor?.chain().focus().setLineHeight(option).run()
                        }
                        className={cn(
                            'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
                            editor?.getAttributes('paragraph').lineHeight ===
                                option && 'bg-neutral-200/80',
                        )}
                    >
                        <span className="text-sm">
                            {option === 'normal' ? 'Default' : option}
                        </span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
