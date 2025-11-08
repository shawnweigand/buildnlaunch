'use client'

import { useMemo, useRef, useState } from 'react'
import { Head, Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { route } from 'ziggy-js'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
// @ts-ignore
import confetti from 'canvas-confetti'

const parseIsoDate = (value: string | null): Date | null => {
    if (!value) {
        return null
    }

    const date = new Date(value)

    return Number.isNaN(date.getTime()) ? null : date
}

interface PlanPrice {
    price: string
    stripe_price_id: string
}

interface PlanPrices {
    monthly: PlanPrice
    yearly: PlanPrice
}

interface PricingConfigPlan {
    name: string
    period: string
    features: string[]
    description: string
    button_text: string
    is_popular: boolean
    stripe_product_id: string
    prices: PlanPrices
}

interface PricingConfig {
    plans: Record<string, PricingConfigPlan>
    currency: string
    trial_days: number
}

interface PlansPageProps {
    pricing: PricingConfig
    stripe_product_id: string|null
    trial_ends_at: string|null
    ends_at: string|null
}

interface NormalizedPlan {
    name: string
    price: string
    yearlyPrice: string
    period: string
    features: string[]
    description: string
    buttonText: string
    isPopular: boolean
    stripeProductId: string
    stripePriceIds: PlanPrices
}

export default function Plans({ pricing, stripe_product_id, trial_ends_at, ends_at }: PlansPageProps) {
    const [isMonthly, setIsMonthly] = useState(true)
    const billingToggleRef = useRef<HTMLButtonElement>(null)

    const endsAtDate = useMemo(() => parseIsoDate(ends_at), [ends_at])
    const trialEndsAtDate = useMemo(() => parseIsoDate(trial_ends_at), [trial_ends_at])
    const dateFormatter = useMemo(() => new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }), [])
    const formattedTrialEndsAt = trialEndsAtDate ? dateFormatter.format(trialEndsAtDate) : null
    const formattedEndsAt = endsAtDate ? dateFormatter.format(endsAtDate) : null

    const activeStripeProductId = useMemo(() => {
        if (!stripe_product_id) {
            return null
        }

        if (!endsAtDate) {
            return stripe_product_id
        }

        if (endsAtDate.getTime() <= Date.now()) {
            return null
        }

        return stripe_product_id
    }, [stripe_product_id, endsAtDate])

    const isSelectionLocked = Boolean(activeStripeProductId)

    const plans = useMemo<NormalizedPlan[]>(() => {
        return Object.values(pricing.plans).map(plan => ({
            name: plan.name,
            price: plan.prices.monthly.price,
            yearlyPrice: plan.prices.yearly.price,
            period: plan.period,
            features: plan.features,
            description: plan.description,
            buttonText: plan.button_text,
            isPopular: plan.is_popular,
            stripeProductId: plan.stripe_product_id,
            stripePriceIds: plan.prices,
        }))
    }, [pricing.plans])

    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
        {
            title: 'Plans',
            href: route('plans'),
        },
    ], [])

    const handleToggle = (checked: boolean) => {
        setIsMonthly(!checked)

        if (checked && billingToggleRef.current) {
            const rect = billingToggleRef.current.getBoundingClientRect()
            const x = rect.left + rect.width / 2
            const y = rect.top + rect.height / 2

            confetti({
                particleCount: 60,
                spread: 70,
                origin: {
                    x: x / window.innerWidth,
                    y: y / window.innerHeight,
                },
                colors: [
                    'hsl(var(--primary))',
                    'hsl(var(--accent))',
                    'hsl(var(--secondary))',
                ],
                ticks: 180,
                gravity: 1,
                decay: 0.92,
                startVelocity: 28,
                shapes: ['circle'],
            })
        }
    }

    const handleCheckout = (plan: NormalizedPlan) => {
        const selectedPrice = isMonthly ? plan.stripePriceIds.monthly : plan.stripePriceIds.yearly

        window.location.href = route('checkout', {
            stripeProductId: plan.stripeProductId,
            stripePriceId: selectedPrice.stripe_price_id,
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Plans' />
            <div className='flex flex-1 flex-col gap-6 p-6 pb-10'>
                <section className='flex flex-col gap-3 rounded-2xl border border-sidebar-border/70 bg-background/70 p-6 shadow-sm dark:border-sidebar-border'>
                    <span className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
                        Plans
                    </span>
                    <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
                        Choose the plan that scales with your studio
                    </h1>
                    <p className='max-w-2xl text-sm text-muted-foreground sm:text-base'>
                        Every subscription starts with a {pricing.trial_days}-day free trial. Upgrade, downgrade, or cancel whenever you need.
                    </p>

                    <div className='mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-dashed border-border bg-muted/40 p-5 sm:flex-row sm:gap-6 dark:border-muted/30'>
                        <div className='text-center sm:text-left'>
                            <h2 className='text-xl font-semibold tracking-tight'>
                                Pick your billing cycle
                            </h2>
                            <p className='text-sm text-muted-foreground'>
                                Save 20% with annual billing. Toggle to preview pricing.
                            </p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Label htmlFor='billing-cycle' className='text-sm font-medium'>
                                Annual billing <span className='text-primary'>(Save 20%)</span>
                            </Label>
                            <Switch
                                id='billing-cycle'
                                ref={billingToggleRef as any}
                                checked={!isMonthly}
                                onCheckedChange={handleToggle}
                            />
                        </div>
                    </div>
                </section>

                <section className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
                    {plans.map((plan, index) => {
        const isCurrentPlan = activeStripeProductId === plan.stripeProductId
        const isPlanDisabled = isSelectionLocked && !isCurrentPlan
        const isButtonDisabled = isPlanDisabled

                        return (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={isButtonDisabled ? undefined : { y: plan.isPopular ? -12 : -6 }}
                                className={cn(
                                    'relative flex h-full flex-col gap-5 rounded-2xl border p-6 shadow-sm transition-all duration-300 ease-out',
                                    plan.isPopular && !isCurrentPlan
                                        ? 'border-primary/70 bg-primary/5 shadow-primary/15 shadow-lg'
                                        : 'border-border bg-card/60',
                                    isCurrentPlan && 'border-primary bg-primary/10 shadow-primary/30 ring-2 ring-primary/50',
                                    isPlanDisabled && !isCurrentPlan && 'opacity-70',
                                )}
                            >
                                {plan.isPopular && !isCurrentPlan && (
                                    <div className='absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground'>
                                        <Star className='h-3.5 w-3.5 fill-current' />
                                        Most popular
                                    </div>
                                )}

                                {isCurrentPlan && (
                                    <div className='absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200'>
                                        Current plan
                                    </div>
                                )}

                                <div className='flex flex-col gap-3'>
                                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
                                        {plan.name}
                                    </p>
                                    <div className='flex items-baseline gap-2'>
                                        <span className='text-4xl font-bold tracking-tight text-foreground'>
                                            ${isMonthly ? plan.price : plan.yearlyPrice}
                                        </span>
                                        {plan.period && (
                                            <span className='text-sm font-medium text-muted-foreground'>
                                                / {plan.period}
                                            </span>
                                        )}
                                    </div>
                                    <p className='text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground'>
                                        {isMonthly ? 'Billed monthly' : 'Billed annually'}
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                        {plan.description}
                                    </p>
                                </div>

                                <ul className='flex flex-1 flex-col gap-3 text-sm text-foreground'>
                                    {plan.features.map(feature => (
                                        <li key={feature} className='flex items-start gap-2'>
                                            <Check className='mt-1 h-4 w-4 text-primary' />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {isCurrentPlan && (formattedTrialEndsAt || formattedEndsAt) && (
                                    <div className='rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-200'>
                                        {formattedTrialEndsAt && (
                                            <p>
                                                <span className='font-semibold text-emerald-800 dark:text-emerald-100'>Trial ends</span> on {formattedTrialEndsAt}
                                            </p>
                                        )}
                                        {formattedEndsAt && (
                                            <p className={formattedTrialEndsAt ? 'mt-1' : undefined}>
                                                <span className='font-semibold text-emerald-800 dark:text-emerald-100'>Cycle ends</span> on {formattedEndsAt}
                                            </p>
                                        )}
                                    </div>
                                )}

        {isCurrentPlan && !formattedEndsAt ? (
            <Link
                as='button'
                method='post'
                href={route('checkout-cancel')}
                data={{
                    stripeProductId: plan.stripeProductId,
                }}
                className={cn(
                    buttonVariants({
                        variant: 'destructive',
                        size: 'lg',
                    }),
                    'group relative w-full gap-2 overflow-hidden text-base font-semibold tracking-tight transition-all duration-300 ease-out',
                    'transform-gpu ring-offset-current hover:ring-2 hover:ring-destructive/80 hover:ring-offset-1',
                )}
            >
                Cancel subscription
            </Link>
        ) : !isCurrentPlan ? (
            <button
                type='button'
                onClick={() => {
                    if (isButtonDisabled) {
                        return
                    }

                    handleCheckout(plan)
                }}
                disabled={isButtonDisabled}
                aria-disabled={isButtonDisabled}
                className={cn(
                    buttonVariants({
                        variant: plan.isPopular && !isPlanDisabled ? 'default' : 'outline',
                        size: 'lg',
                    }),
                    'group relative w-full gap-2 overflow-hidden text-base font-semibold tracking-tight transition-all duration-300 ease-out',
                    'transform-gpu ring-offset-current',
                    !isButtonDisabled && 'hover:ring-2 hover:ring-primary hover:ring-offset-1 hover:bg-primary hover:text-primary-foreground',
                    !(plan.isPopular && !isPlanDisabled) && 'border-border bg-background text-foreground hover:bg-muted',
                    isButtonDisabled && 'cursor-not-allowed opacity-75',
                )}
            >
                {plan.buttonText}
            </button>
        ) : null}
                            </motion.div>
                        )
                    })}
                </section>
            </div>
        </AppLayout>
    )
}

