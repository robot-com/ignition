import { Bell, Search } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { authClient } from '@/auth/auth-client'
import { useUser } from '@/auth/hooks'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

export type BreadcrumbListItem = {
    title: string
    href: string
}

export type AppbarProps = {
    breadcrumbs: BreadcrumbListItem[]
}

export function Appbar(props: AppbarProps) {
    const breadcrumbs: ReactNode[] = []

    props.breadcrumbs.forEach((breadcrumb, index) => {
        breadcrumbs.push(
            <BreadcrumbItem key={index} className="hidden md:block">
                <BreadcrumbLink asChild>
                    <Link to={breadcrumb.href}>{breadcrumb.title}</Link>
                </BreadcrumbLink>
            </BreadcrumbItem>,
        )
    })

    const user = useUser()

    const initials = (
        user?.name
            .split(' ')
            .map((n) => n[0])
            .join('') || ''
    )
        .slice(0, 2)
        .toUpperCase()

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="ml-auto flex items-center gap-2 px-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-8 w-8 rounded-full"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage
                                    src={user.image || undefined}
                                    alt={user.email}
                                />
                                <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                    >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {user.name}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => authClient.signOut()}>
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
