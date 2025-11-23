'use client'

import { Fragment } from 'react'
import { Separator } from '@/components/ui/separator'
import { useEditorStore } from '@/store/use-editor'
import { sectionsButtons } from '@toolbar/buttons'

export const Toolbar = () => {
    const { editor } = useEditorStore()
    if (!editor) return null

    return (
        // NOTE: min-h-10 to h-10 makes the Separator appears.
        <div className="flex h-10 items-center gap-x-0.5 overflow-x-auto rounded-3xl bg-[#f1f4f9] px-2.5 py-0.5">
            {sectionsButtons.map((section, sectionIndex) => (
                <Fragment key={sectionIndex}>
                    {section.map((ToolbarButtonComponent, buttonIndex) => (
                        <ToolbarButtonComponent
                            key={buttonIndex}
                            editor={editor}
                        />
                    ))}
                    {sectionIndex < sectionsButtons.length - 1 && (
                        <Separator
                            orientation="vertical"
                            className="max-h-6 bg-neutral-300"
                        />
                    )}
                </Fragment>
            ))}
        </div>
    )
}
