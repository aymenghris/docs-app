import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEditorStore } from '@/store/use-editor'
import { ColorResult, SketchPicker } from 'react-color'

export const TextColorButton = () => {
    const { editor } = useEditorStore()

    const selectedTextColor =
        editor?.getAttributes('textStyle').color || '#000000'

    const handleChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80">
                    <span className="text-sm">
                        A
                        <div
                            className="h-0.5 w-full"
                            style={{ backgroundColor: selectedTextColor }}
                        />
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
                <SketchPicker
                    color={selectedTextColor}
                    onChange={handleChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
