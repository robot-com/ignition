import type { ReactNode } from 'react'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './sidebar'

export function SidebarLayout(props: { children: ReactNode }) {
    return (
        <SidebarProvider className="min-h-0 size-full">
            <AppSidebar />
            <SidebarInset>{props.children}</SidebarInset>
        </SidebarProvider>
    )
}
