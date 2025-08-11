import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function Center(props: ComponentProps<'div'>) {
    return (
        <div
            {...props}
            className={cn(
                'flex size-full items-center justify-center',
                props.className
            )}
        >
            {props.children}
        </div>
    )
}
