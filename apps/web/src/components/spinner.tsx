import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'
import type { ComponentProps } from 'react'

export function Spinner(props: ComponentProps<typeof Loader2Icon>) {
    return (
        <Loader2Icon
            size={24}
            aria-label="Loading..."
            {...props}
            className={cn('animate-spin', props.className)}
        />
    )
}
