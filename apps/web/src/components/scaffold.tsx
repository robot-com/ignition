import { Loader2Icon } from 'lucide-react'
import { type ReactNode, Suspense } from 'react'
import { cn } from '@/lib/utils'

export type ScaffoldProps = {
    appbar: ReactNode
    scrollable?: boolean
    children: ReactNode
    padding?: boolean
    gap?: boolean
    className?: string
}

export function Scaffold(props: ScaffoldProps) {
    return (
        <>
            {props.appbar}
            <Suspense
                fallback={
                    <div className="size-full flex items-center justify-center">
                        <Loader2Icon className="animate-spin" />
                    </div>
                }
            >
                <div
                    className={cn(
                        'flex flex-1 min-h-0 shrink flex-col overflow-hidden [&>*]:shrink-0',
                        {
                            'overflow-y-auto': props.scrollable !== false,
                            'p-4': props.padding !== false,
                            'gap-4': props.gap !== false,
                        },
                    )}
                >
                    {props.children}
                </div>
            </Suspense>
        </>
    )
}
