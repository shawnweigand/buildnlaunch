import { Head } from '@inertiajs/react'
import { Header } from '@/components/ui/header'
import { DesignAgency } from '@/components/ui/landing-page'

export default function Landing() {
    return (
        <>
            <Head title="Design Studio - Creative Digital Experiences" />
            <Header />
            <DesignAgency />
        </>
    )
}
