import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor'
import {
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
} from 'lucide-react'

export const AlignButton = () => {
    const { editor } = useEditorStore()

    const alignments = [
        {
            label: 'Align Left',
            value: 'left',
            icon: AlignLeftIcon,
        },
        {
            label: 'Align Center',
            value: 'center',
            icon: AlignCenterIcon,
        },
        {
            label: 'Align Right',
            value: 'right',
            icon: AlignRightIcon,
        },
        {
            label: 'Align Justify',
            value: 'justify',
            icon: AlignJustifyIcon,
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80">
                    <AlignLeftIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
                {alignments.map(({ label, value, icon: Icon }) => (
                    <button
                        key={value}
                        onClick={() =>
                            editor?.chain().focus().setTextAlign(value).run()
                        }
                        className={cn(
                            'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
                            editor?.isActive({ textAlgin: value }) &&
                                'bg-neutral-200/80',
                        )}
                    >
                        <Icon className="size-4" />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
