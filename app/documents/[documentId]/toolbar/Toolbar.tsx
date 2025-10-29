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
        <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-3xl h-10 flex items-center gap-x-0.5 overflow-x-auto">
            {sectionsButtons.map((section, sectionIndex) => (
                <Fragment key={sectionIndex}>
                    {section.map((Button, buttonIndex) => (
                        <Button key={buttonIndex} editor={editor} />
                    ))}
                    {sectionIndex < sectionsButtons.length - 1 && (
                        <Separator
                            orientation="vertical"
                            className="bg-neutral-300 max-h-6 "
                        />
                    )}
                </Fragment>
            ))}
        </div>
    )
}
