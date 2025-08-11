import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

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
