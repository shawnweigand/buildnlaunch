import { Head } from '@inertiajs/react'
import { Header } from '@/components/ui/header'
import { DesignAgency } from '@/components/ui/landing-page'

interface PricingPlan {
    name: string
    period: string
    features: string[]
    description: string
    button_text: string
    is_popular: boolean
    stripe_product_id?: string
    prices: {
        monthly: {
            price: string
            stripe_price_id: string
        }
        yearly: {
            price: string
            stripe_price_id: string
        }
    }
}

interface Pricing {
    plans: Record<string, PricingPlan>
    currency: string
    trial_days: number
}

interface LandingProps {
    pricing: Pricing
}

export default function Landing({ pricing }: LandingProps) {
    return (
        <>
            <Head title="Design Studio - Creative Digital Experiences" />
            <Header />
            <DesignAgency pricing={pricing} />
        </>
    )
}
