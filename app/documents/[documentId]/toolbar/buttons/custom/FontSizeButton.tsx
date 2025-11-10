import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/store/use-editor'
import { MinusIcon, PlusIcon } from 'lucide-react'

export const FontSizeButton = () => {
    const { editor } = useEditorStore()

    const currentFontSize =
        editor?.getAttributes('textStyle').fontSize?.replace('px', '') ?? '16'

    const [fontSize, setFontSize] = useState(currentFontSize)
    const [inputValue, setInputValue] = useState(fontSize)
    const [isEditing, setIsEditing] = useState(false)

    const updateFontSize = (value: string) => {
        const size = Number(value)

        if (isNaN(size) || size <= 0) return
        if (size === fontSize) return

        const sizeWithUnit = `${size}px`

        editor?.chain().focus().setFontSize(sizeWithUnit).run()
        setFontSize(value)
        setInputValue(value)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue)
        setIsEditing(false)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            updateFontSize(inputValue)
            editor?.chain().focus()
        }
    }

    const incrementFontSize = () => {
        const size = Number(fontSize) + 2
        updateFontSize(size.toString())
    }

    const decrementFontSize = () => {
        const size = Number(fontSize) - 2

        if (size <= 0) return
        updateFontSize(size.toString())
    }

    const handleEditStart = () => {
        setIsEditing(true)
        setInputValue(currentFontSize)
    }

    const sharedStyles = cn(
        'h-7 w-10',
        'text-center text-sm',
        'rounded-sm border border-neutral-400 bg-transparent',
    )

    const controlButtonStyles = cn(
        'flex items-center justify-center',
        'size-7',
        'rounded-sm',
        'cursor-pointer',
        'hover:bg-neutral-200/80 ',
    )

    return (
        <div className="flex items-center gap-x-0.5">
            <button onClick={decrementFontSize} className={controlButtonStyles}>
                <MinusIcon className="size-4" />
            </button>

            {isEditing ? (
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        sharedStyles,
                        'focus:ring-0 focus:outline-none',
                        // Hide number input spinners (up/down arrows) for all browsers
                        '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                    )}
                    autoFocus
                />
            ) : (
                <button
                    onClick={handleEditStart}
                    className={cn(
                        sharedStyles,
                        'cursor-text hover:bg-neutral-200/80',
                    )}
                >
                    {currentFontSize}
                </button>
            )}

            <button onClick={incrementFontSize} className={controlButtonStyles}>
                <PlusIcon className="size-4" />
            </button>
        </div>
    )
}
