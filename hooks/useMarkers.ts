import { useCallback, useEffect, useRef, useState } from 'react'
import { useMargins } from '@/hooks/useMargins'
import { RULER_CONFIG } from '@ruler/ruler-config'

export const useMarkers = () => {
    const markers = Array.from(
        { length: RULER_CONFIG.TOTAL_MARKERS },
        (_, index) => index,
    )

    const { leftMargin, rightMargin, setLeftMargin, setRightMargin } =
        useMargins()

    const [draggingLeft, setDraggingLeft] = useState(false)
    const [draggingRight, setDraggingRight] = useState(false)

    const rulerRef = useRef<HTMLDivElement>(null)

    const getMaxMarginOffset = (oppositeMargin: number): number => {
        /**
         * - This ensures the offset doesn't exceed a maximum boundary
         * - Doesn't overlap with the right margin (maximum: ruler width - (right or left) margin)
         * - Minimum content width 100 px
         */

        return Math.max(
            RULER_CONFIG.MIN_CONTENT_WIDTH,
            RULER_CONFIG.WIDTH -
                oppositeMargin -
                RULER_CONFIG.MIN_CONTENT_WIDTH,
        )
    }

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!rulerRef.current) return

            const rect = rulerRef.current.getBoundingClientRect()

            /**
             * Horizontal mouse position relative to the element's left edge (in pixels)
             * So if the mouse is exactly at the element’s left edge, offsetX will be 0.
             * If the mouse is 50 px inside the element from the left, offsetX will be 50.
             */
            const offsetX = e.clientX - rect.left

            if (draggingLeft) {
                /**
                 * This ensures the left margin:
                 *  - Doesn't go negative
                 *  - Sets the minimum boundary to 0
                 */
                const clampedOffset = Math.max(
                    0,
                    Math.min(offsetX, getMaxMarginOffset(rightMargin)),
                )
                setLeftMargin(clampedOffset)
            } else if (draggingRight) {
                /**
                 * This converts the mouse position (from the left edge) into a distance from the right edge.
                 * - Ruler width = 816 px, mouse at 300 px from left
                 *  • rightOffset = 816 - 300 = 516 px (margin is 516 px from right)
                 * - Ruler width = 816 px, mouse at 700 px from left
                 *  • rightOffset = 816 - 700 = 116 px (margin is 116 px from right)
                 * - Ruler width = 816 px, mouse at 50 px from left
                 *  • rightOffset = 816 - 50 = 766 px (margin is 766 px from right)
                 *
                 *  Imagine a ruler that is 816 px wide:
                 *  Left Edge                                                    Right Edge
                 * |----------------------------------------------------------------|
                 * 0 px                                                          816 px
                 *
                 * Mouse Position (offsetX):
                 * offsetX measures how far the mouse is from the LEFT edge:
                 * Left Edge                    Mouse                          Right Edge
                 * |-----------------------------|----------------------------------|
                 * 0 px                        300 px                           816 px
                 *      ← offsetX = 300 px →
                 *
                 * What We Actually Need
                 * For the right margin, we don't care about "distance from left". We need distance from RIGHT:
                 * Left Edge                    Mouse                          Right Edge
                 * |-----------------------------|----------------------------------|
                 * 0 px                        300 px                           816 px
                 *                                   ← rightOffset = 516 px →
                 *
                 * The Calculation:
                 * - Total width = 816 px
                 * - Mouse is 300 px from the left
                 * - Therefore, mouse must be 816 - 300 = 516 px from the right
                 *
                 */
                const rightOffset = RULER_CONFIG.WIDTH - offsetX

                // Same as left margin clampedOffset
                const clampedOffset = Math.max(
                    0,
                    Math.min(rightOffset, getMaxMarginOffset(leftMargin)),
                )
                setRightMargin(clampedOffset)
            }
        },
        [draggingLeft, draggingRight, leftMargin, rightMargin],
    )

    const handleMouseUp = useCallback(() => {
        setDraggingLeft(false)
        setDraggingRight(false)
    }, [])

    useEffect(() => {
        if (draggingLeft || draggingRight) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            return () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [draggingLeft, draggingRight, handleMouseMove, handleMouseUp])

    const handleLeftMarginReset = useCallback(() => {
        setLeftMargin(RULER_CONFIG.DEFAULT_MARGIN)
    }, [])

    const handleRightMarginReset = useCallback(() => {
        setRightMargin(RULER_CONFIG.DEFAULT_MARGIN)
    }, [])

    return {
        rulerRef,
        markers,
        leftMargin,
        rightMargin,
        draggingLeft,
        draggingRight,
        setDraggingLeft,
        setDraggingRight,
        handleLeftMarginReset,
        handleRightMarginReset,
    }
}
