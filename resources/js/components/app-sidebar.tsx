import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, BarChart3, Gem } from 'lucide-react';
import AppLogo from './app-logo';
import { route } from 'ziggy-js';
import { useMemo } from 'react';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const defaultFooterNavItems: NavItem[] = [
    {
        title: 'Plans',
        href: route('plans'),
        icon: Gem,
    }
];

export function AppSidebar() {
    const page = usePage<SharedData>();
    const isAuthorized = page.props.auth?.isAuthorized;
    const footerNavItems = useMemo(() => {
        const items = [...defaultFooterNavItems];

        if (isAuthorized) {
            items.push({
                title: 'Survey Results',
                href: '/results',
                icon: BarChart3,
            });
        }

        return items;
    }, [isAuthorized]);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
