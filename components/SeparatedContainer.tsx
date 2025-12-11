import React, { FC, Fragment, ReactNode } from 'react'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface SeparatedContainerProps {
    /** Option A: Pass components as standard React children */
    children?: ReactNode
    /** Option B: Pass an array of components explicitly */
    items?: ReactNode[]
    /** Class for the separator */
    className?: string
}
export const SeparatedContainer: FC<SeparatedContainerProps> = ({
    children,
    items,
    className,
}) => {
    // Determine the source: Use 'items' array if provided, otherwise convert 'children' to array
    const contentList = items ?? React.Children.toArray(children)

    return (
        <>
            {contentList.map((child, index) => (
                <Fragment key={index}>
                    {child}
                    {index < contentList.length - 1 && (
                        <Separator
                            orientation="vertical"
                            className={cn('max-h-6 bg-neutral-300', className)}
                        />
                    )}
                </Fragment>
            ))}
        </>
    )
}
