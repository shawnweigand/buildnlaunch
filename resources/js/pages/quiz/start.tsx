"use client"

import { Head, useForm } from "@inertiajs/react"
import { motion } from "framer-motion"
import { Brain, ArrowRight, ArrowLeft, User, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react"

export default function QuizStart() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/quiz/start')
    }

    return (
        <>
            <Head title="Start Quiz - Product Building Assessment" />

            <div className="min-h-screen bg-background">
                {/* Header */}
                <div className="border-b border-border/50">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <Link href="/quiz" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Quiz Info
                            </Link>
                            <div className="flex items-center gap-2">
                                <Brain className="h-6 w-6 text-primary" />
                                <span className="font-semibold">Product Building Quiz</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mx-auto max-w-2xl"
                        >
                            <div className="text-center mb-12">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                                >
                                    <Brain className="h-8 w-8 text-primary" />
                                </motion.div>

                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                    Let's Get Started
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    We need a few details to personalize your quiz experience and deliver your results.
                                </p>
                            </div>

                            {/* Progress Indicator */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                                    <span>Step 1 of 3</span>
                                    <span>Personal Info</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '33%' }} />
                                </div>
                            </div>

                            {/* Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="rounded-lg border border-border bg-background p-8 shadow-lg"
                            >
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className={cn(
                                                        "pl-10 h-12 text-base",
                                                        errors.name && "border-destructive"
                                                    )}
                                                />
                                            </div>
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className={cn(
                                                        "pl-10 h-12 text-base",
                                                        errors.email && "border-destructive"
                                                    )}
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={processing || !data.name || !data.email}
                                            size="lg"
                                            className="w-full h-12 text-base"
                                        >
                                            {processing ? (
                                                <>
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                                                    Starting Quiz...
                                                </>
                                            ) : (
                                                <>
                                                    Start Quiz
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    <p className="text-xs text-muted-foreground text-center">
                                        Your information is secure and will only be used to deliver your personalized quiz results.
                                    </p>
                                </form>
                            </motion.div>

                            {/* What's Next */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="mt-8 text-center"
                            >
                                <h3 className="text-lg font-semibold mb-2">What happens next?</h3>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">1</div>
                                        <span>Answer 10 questions about your product building approach</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">2</div>
                                        <span>Get instant personalized insights and recommendations</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    )
}
