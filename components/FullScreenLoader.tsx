import { FC } from 'react'
import { LoadingState, LoadingStateProps } from '@/components/LoadingState'

export const FullScreenLoader: FC<LoadingStateProps> = (props) => {
    return <LoadingState {...props} className="min-h-screen" />
}
