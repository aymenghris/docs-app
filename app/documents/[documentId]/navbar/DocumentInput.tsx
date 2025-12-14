'use client'

import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react'
import { useDocument } from '@/hooks/useDocument'
import { useEditableDocumentTitle } from '@/hooks/useEditableDocumentTitle'
import { Loader2 } from 'lucide-react'
import { BsCloudCheck, BsCloudSlash } from 'react-icons/bs'

export const DocumentInput = () => {
    const document = useDocument()
    const inputRef = useRef<HTMLInputElement>(null)

    const {
        inputValue,
        isEditing,
        isUpdating,
        isLoading,
        hasUnsavedChanges,
        setIsEditing,
        handleChange,
        commitChanges,
        cancelEdit,
    } = useEditableDocumentTitle({
        documentId: document._id,
        currentTitle: document.title,
    })

    // Autofocus when entering edit mode
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [isEditing])

    const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value)
    }

    const handleBlur = () => {
        commitChanges()
        setIsEditing(false)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            inputRef.current?.blur()
        } else if (e.key === 'Escape') {
            cancelEdit()
        }
    }

    const enterEditMode = () => {
        setIsEditing(true)
    }

    const renderSaveStatus = () => {
        if (isUpdating || isLoading) {
            return (
                <Loader2 className="text-muted-foreground size-4 animate-spin" />
            )
        }

        if (hasUnsavedChanges) {
            return <BsCloudSlash className="text-muted-foreground size-4" />
        }

        return <BsCloudCheck className="size-4" />
    }

    return (
        /**
         * AUTO-SIZING INPUT TRICK
         *
         * Problem: We want an input that grows/shrinks to fit its text content exactly.
         * Normal inputs have fixed widths and can't do this naturally.
         *
         * Solution: Use an invisible "measuring" element
         *
         * How it works:
         *
         * 1. Create a <form> wrapper with `relative` and `w-fit`
         *    - `relative`: Creates a positioning context for the absolute input
         *    - `w-fit`: Makes the form shrink-wrap to fit its content
         *
         * 2. Inside, put an INVISIBLE <span> with the same text as the input
         *    - `invisible`: Hides the text visually BUT still takes up space in the layout
         *    - This span determines how wide the form becomes
         *    - Same padding/font as the input to match sizing exactly
         *
         * 3. Position the real <input> on top with `absolute inset-0`
         *    - `absolute`: Takes it out of normal flow, positions relative to the form
         *    - `inset-0`: Shorthand for top: 0 right: 0 bottom: 0 left: 0
         *    - This makes the input STRETCH to fill the entire form container
         *
         * The magic:
         * - User types → invisible span grows → form grows → input stretches to match
         * - Input is always exactly as wide as its content!
         * - The invisible span is the "puppet master" controlling the size
         */

        <div className="flex items-center gap-2">
            {isEditing ? (
                <form
                    className="relative w-fit max-w-[50ch]"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <span
                        className="invisible px-1.5 text-lg whitespace-pre"
                        aria-hidden="true"
                    >
                        {inputValue || ' '}
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputOnChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        className="absolute inset-0 truncate bg-transparent px-1.5 text-lg text-black"
                        aria-label="Document title"
                        maxLength={100}
                    />
                </form>
            ) : (
                <button
                    onClick={enterEditMode}
                    className="cursor-pointer truncate px-1.5 text-lg"
                    aria-label="Edit document title"
                    title="Click to edit title"
                >
                    {document.title}
                </button>
            )}

            <div
                className="shrink-0"
                title={
                    isUpdating
                        ? 'Saving...'
                        : hasUnsavedChanges
                          ? 'Unsaved changes'
                          : 'All changes saved'
                }
            >
                {renderSaveStatus()}
            </div>
        </div>
    )
}
