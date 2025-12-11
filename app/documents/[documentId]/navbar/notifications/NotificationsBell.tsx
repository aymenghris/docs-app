import { ComponentProps, forwardRef } from 'react'
import { Button } from '@/components/ui/button'
import { BellIcon } from 'lucide-react'

/**
 * React.forwardRef<T, P>(render)
 *  T: The type of the DOM element the ref will be attached to.
 *  P: The type of the component's props.
 */
const NotificationsBell = forwardRef<
    HTMLButtonElement,
    ComponentProps<typeof Button>
>(({ className, children, ...props }, ref) => {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="relative"
            ref={ref}
            {...props}
        >
            <BellIcon className="size-5" />
            {children}
        </Button>
    )
})

NotificationsBell.displayName = 'NotificationsBell'

export { NotificationsBell }
