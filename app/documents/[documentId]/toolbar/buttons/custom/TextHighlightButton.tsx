import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEditorStore } from '@/stores/use-editor-store'
import { HighlighterIcon } from 'lucide-react'
import { ColorResult, SketchPicker } from 'react-color'

export const TextHighlightButton = () => {
    const { editor } = useEditorStore()
    const currentHighlightColor =
        editor?.getAttributes('highlight').color || '#FFFFFF'

    const handleChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80">
                    <HighlighterIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
                <SketchPicker
                    color={currentHighlightColor}
                    onChange={handleChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
