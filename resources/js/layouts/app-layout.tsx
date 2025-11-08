import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';
interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    flash?: {
        success: string;
        error: string;
        message: string;
    };
}

export default function ({ children, breadcrumbs, ...props }: AppLayoutProps) {

    const flash = usePage<SharedData>().props.flash;

    useEffect(() => {
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.message) {
            toast(flash.message);
        }
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash])

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <Toaster />
            {children}
        </AppLayoutTemplate>
    )
}
