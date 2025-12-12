'use client'

import { SeparatedContainer } from '@/components/SeparatedContainer'
import { useEditorStore } from '@/stores/use-editor-store'
import { sectionsButtons } from '@toolbar/buttons'

export const Toolbar = () => {
    const { editor } = useEditorStore()
    if (!editor) return null

    return (
        <div className="flex min-h-10 items-center gap-x-0.5 overflow-x-auto rounded-3xl bg-[#f1f4f9] px-2.5 py-0.5">
            {sectionsButtons.map((section, sectionIndex) => (
                <SeparatedContainer
                    key={sectionIndex}
                    items={section.map((Component, i) => (
                        <Component key={i} editor={editor} />
                    ))}
                />
            ))}
        </div>
    )
}
