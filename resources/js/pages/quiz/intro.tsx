"use client"

import { Head, Link } from "@inertiajs/react"
import { motion } from "framer-motion"
import { Brain, Clock, Target, ArrowRight, CheckCircle, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuizIntroProps {
    totalQuestions: number
    estimatedTime: string
}

export default function QuizIntro({ totalQuestions, estimatedTime }: QuizIntroProps) {
    const benefits = [
        {
            icon: <Brain className="h-6 w-6" />,
            title: "Discover Your Product Building Style",
            description: "Understand your unique approach to product development and identify areas for growth."
        },
        {
            icon: <Target className="h-6 w-6" />,
            title: "Get Personalized Insights",
            description: "Receive tailored recommendations based on your role, company size, and challenges."
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Optimize Your Process",
            description: "Learn how to streamline your product development workflow and make better decisions."
        }
    ]

    const features = [
        "10 carefully crafted questions",
        "Takes only 5-10 minutes to complete",
        "Instant personalized results",
        "Actionable insights and recommendations",
        "Free and completely confidential"
    ]

    return (
        <>
            <Head title="Product Building Quiz - Discover Your Style" />

            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-24 sm:py-32">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

                    <div className="container relative mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mx-auto max-w-4xl text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
                            >
                                <Brain className="h-10 w-10 text-primary" />
                            </motion.div>

                            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
                                Discover Your{" "}
                                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                    Product Building Style
                                </span>
                            </h1>

                            <p className="mb-8 text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto">
                                Take our comprehensive quiz to understand your approach to product development,
                                identify your strengths, and get personalized recommendations to build better products faster.
                            </p>

                            {/* Quiz Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
                            >
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    <span className="text-base">{totalQuestions} Questions</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <span className="text-base">{estimatedTime}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="h-5 w-5 text-primary" />
                                    <span className="text-base">Free & Confidential</span>
                                </div>
                            </motion.div>

                            {/* Start Quiz Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <Link href="/quiz/start">
                                    <Button size="lg" className="h-14 px-8 text-lg">
                                        Start the Quiz
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* What You'll Learn Section */}
                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mx-auto max-w-2xl text-center mb-16"
                        >
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                What You'll Discover
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Our quiz analyzes your product development approach across multiple dimensions
                                to provide actionable insights.
                            </p>
                        </motion.div>

                        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center p-6 rounded-lg border border-border/50 bg-background/50"
                                >
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold">{benefit.title}</h3>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quiz Features Section */}
                <section className="py-24 bg-muted/20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mx-auto max-w-4xl"
                        >
                            <div className="grid gap-8 lg:grid-cols-2 items-center">
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                                        Why Take This Quiz?
                                    </h2>
                                    <p className="text-lg text-muted-foreground mb-8">
                                        Whether you're a seasoned product manager, a startup founder, or a developer
                                        looking to understand product strategy, this quiz will help you:
                                    </p>
                                    <ul className="space-y-4">
                                        {features.map((feature, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                                className="flex items-center gap-3"
                                            >
                                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                                <span className="text-base">{feature}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="lg:order-first">
                                    <div className="relative">
                                        <div className="aspect-square rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
                                            <div className="text-center p-8">
                                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                                                    <Brain className="h-10 w-10 text-primary" />
                                                </div>
                                                <h3 className="text-2xl font-semibold mb-2">Ready to Start?</h3>
                                                <p className="text-muted-foreground mb-6">
                                                    Join thousands of product builders who have already discovered their style.
                                                </p>
                                                <Link href="/quiz/start">
                                                    <Button size="lg" className="w-full">
                                                        Begin Quiz
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mx-auto max-w-3xl text-center"
                        >
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                                Ready to Discover Your Product Building Style?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Take the quiz now and get instant insights into your product development approach.
                                It's free, takes just a few minutes, and could change how you build products forever.
                            </p>
                            <Link href="/quiz/start">
                                <Button size="lg" className="h-14 px-8 text-lg">
                                    Start Your Quiz Journey
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    )
}
