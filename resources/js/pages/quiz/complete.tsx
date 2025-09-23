"use client"

import { Head, Link } from "@inertiajs/react"
import { motion } from "framer-motion"
import { CheckCircle, Brain, ArrowRight, Download, Share2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QuizComplete() {
    return (
        <>
            <Head title="Quiz Complete - Thank You!" />

            <div className="min-h-screen bg-background">
                {/* Main Content */}
                <section className="py-24">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mx-auto max-w-3xl text-center"
                        >
                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20"
                            >
                                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                            </motion.div>

                            {/* Success Message */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                    Quiz Complete!
                                </h1>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Thank you for taking the time to complete our Product Building Quiz.
                                    Your responses have been recorded and analyzed.
                                </p>
                            </motion.div>

                            {/* Results Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="rounded-lg border border-border bg-background p-8 shadow-lg mb-8"
                            >
                                <div className="flex items-center justify-center gap-3 mb-6">
                                    <Brain className="h-8 w-8 text-primary" />
                                    <h2 className="text-2xl font-semibold">Your Results Are Ready</h2>
                                </div>

                                <p className="text-muted-foreground mb-6">
                                    Based on your responses, we've generated personalized insights about your
                                    product building style and recommendations for improvement.
                                </p>

                                <div className="grid gap-4 sm:grid-cols-2 mb-8">
                                    <div className="p-4 rounded-lg border border-border/50 bg-muted/20">
                                        <h3 className="font-semibold mb-2">Your Product Building Style</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Analysis of your approach to product development
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg border border-border/50 bg-muted/20">
                                        <h3 className="font-semibold mb-2">Personalized Recommendations</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Actionable insights to improve your process
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button size="lg" className="flex items-center gap-2">
                                        <Download className="h-4 w-4" />
                                        Download Results
                                    </Button>
                                    <Button variant="outline" size="lg" className="flex items-center gap-2">
                                        <Share2 className="h-4 w-4" />
                                        Share Results
                                    </Button>
                                </div>
                            </motion.div>

                            {/* Next Steps */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="rounded-lg border border-border/50 bg-muted/20 p-6 mb-8"
                            >
                                <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
                                <div className="grid gap-4 sm:grid-cols-3 text-sm">
                                    <div className="text-center">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold mx-auto mb-2">1</div>
                                        <p className="text-muted-foreground">Check your email for detailed results</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold mx-auto mb-2">2</div>
                                        <p className="text-muted-foreground">Explore our product building resources</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold mx-auto mb-2">3</div>
                                        <p className="text-muted-foreground">Join our community for ongoing support</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <Link href="/">
                                    <Button variant="outline" size="lg" className="flex items-center gap-2">
                                        <Home className="h-4 w-4" />
                                        Back to Home
                                    </Button>
                                </Link>
                                <Link href="/waitlist">
                                    <Button size="lg" className="flex items-center gap-2">
                                        Join Our Community
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Footer Message */}
                <section className="py-16 bg-muted/20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mx-auto max-w-2xl text-center"
                        >
                            <h3 className="text-xl font-semibold mb-4">
                                Thank You for Your Participation
                            </h3>
                            <p className="text-muted-foreground">
                                Your insights help us understand the product building community better.
                                We're committed to providing valuable resources and tools to help you build better products.
                            </p>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    )
}
