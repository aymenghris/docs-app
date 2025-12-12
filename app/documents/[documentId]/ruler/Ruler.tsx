import React from 'react'
import { useMarkers } from '@/hooks/useMarkers'
import { MarginIndicator } from '@ruler/MarginIndicator'
import { Marker } from '@ruler/Marker'
import { RULER_CONFIG } from '@ruler/ruler-config'

export const Ruler = () => {
    const {
        markers,
        rulerRef,
        leftMargin,
        rightMargin,
        draggingLeft,
        draggingRight,
        setDraggingLeft,
        setDraggingRight,
        handleLeftMarginReset,
        handleRightMarginReset,
    } = useMarkers()

    return (
        <div className="relative mx-auto flex h-6 w-[816px] items-end border-b border-gray-300 select-none print:hidden">
            <div ref={rulerRef} className="relative h-full w-full">
                <MarginIndicator
                    offset={leftMargin}
                    isLeft={true}
                    isDragging={draggingLeft}
                    onMouseDown={() => setDraggingLeft(true)}
                    onDoubleClick={handleLeftMarginReset}
                />

                <MarginIndicator
                    offset={rightMargin}
                    isLeft={false}
                    isDragging={draggingRight}
                    onMouseDown={() => setDraggingRight(true)}
                    onDoubleClick={handleRightMarginReset}
                />

                <div className="absolute inset-x-0 bottom-0 h-full">
                    <div className="relative h-full w-[816px]">
                        {markers.map((marker) => {
                            /**
                             * Distribute markers evenly across the ruler width.
                             *
                             * - With 83 markers (0–82), we need 82 gaps between them.
                             * - Example positions:
                             *   • Marker 0 → 0 px
                             *   • Marker 41 → 408 px (center)
                             *   • Marker 82 → 816 px (end)
                             */
                            const position =
                                (marker * RULER_CONFIG.WIDTH) /
                                (RULER_CONFIG.TOTAL_MARKERS - 1)

                            return (
                                <Marker
                                    key={marker}
                                    marker={marker}
                                    position={position}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
