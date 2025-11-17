import { FC } from 'react'
import { RULER_CONFIG } from '@ruler/constants'

interface MarkerProps {
    marker: number
    position: number
}

export const Marker: FC<MarkerProps> = ({ marker, position }) => {
    // Major makers: 10, 20, 30...
    const isMajor = marker % RULER_CONFIG.MAJOR_INTERVAL === 0

    // Medium makers: 5, 10, 15...
    const isMedium = marker % RULER_CONFIG.MEDIUM_INTERVAL === 0 && !isMajor

    // Minor makers: 1, 2, 3...
    const isMinor = !isMajor && !isMedium

    return (
        <div className="absolute bottom-0" style={{ left: `${position}px` }}>
            {isMajor && (
                <>
                    <div className="absolute bottom-0 h-2 w-px bg-neutral-500" />
                    <span
                        title={`${marker}`}
                        className="absolute bottom-2 -translate-x-1/2 transform text-[10px] text-neutral-600"
                    >
                        {marker / RULER_CONFIG.MAJOR_INTERVAL + 1}
                    </span>
                </>
            )}
            {isMedium && (
                <div className="absolute bottom-0 h-1.5 w-px bg-neutral-500" />
            )}
            {isMinor && (
                <div className="absolute bottom-0 h-1 w-px bg-neutral-400" />
            )}
        </div>
    )
}
