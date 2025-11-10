// Note: TipTap v3 already has a built-in font size extension.
import { Extension } from '@tiptap/core'

export const FontSizeExtension = Extension.create({
    name: 'fontSize',
    addOptions() {
        return {
            types: ['textStyle'],
            defaultFontSize: '16px',
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) =>
                            element.style.fontSize ||
                            this.options.defaultFontSize,
                        renderHTML: (attributes) => {
                            if (
                                attributes.fontSize ===
                                this.options.defaultFontSize
                            )
                                return {}
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            }
                        },
                    },
                },
            },
        ]
    },
    addCommands() {
        return {
            setFontSize:
                (fontSize) =>
                ({ chain }) => {
                    return chain().setMark('textStyle', { fontSize }).run()
                },
            unsetFontSize:
                () =>
                ({ chain }) => {
                    return chain()
                        .setMark('textStyle', {
                            fontSize: this.options.defaultFontSize,
                        })
                        .removeEmptyTextStyle()
                        .run()
                },
        }
    },
})
