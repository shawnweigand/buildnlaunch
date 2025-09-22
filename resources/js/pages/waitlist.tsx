"use client"

import { useState, useEffect } from "react"
import { Head, useForm } from "@inertiajs/react"
import { motion } from "framer-motion"
import { Mail, CheckCircle, Sparkles, Users, Zap, Star, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface SurveyQuestion {
    type: 'multiple_choice' | 'open_text' | 'scale'
    question: string
    options?: Record<string, string>
    placeholder?: string
    max_length?: number
    min?: number
    max?: number
    low_label?: string
    high_label?: string
}

interface SurveyConfig {
    questions: Record<number, SurveyQuestion>
}

interface WaitlistProps {
    survey?: SurveyConfig
    email?: string
    first_name?: string
    success?: string
}

export default function Waitlist({ survey, email, first_name, success }: WaitlistProps) {
    const [currentStep, setCurrentStep] = useState<'email' | 'survey' | 'complete'>('email')
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [surveyConfig, setSurveyConfig] = useState<SurveyConfig | null>(null)
    const [userEmail, setUserEmail] = useState('')
    const [userFirstName, setUserFirstName] = useState('')

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        email: '',
    })

    const surveyForm = useForm({
        email: '',
        question_1: '',
        question_2: '',
        question_3: '',
        question_4: '',
        question_5: '',
    })

    // Handle initial survey data from props (session)
    useEffect(() => {
        if (survey && email) {
            console.log('Initial survey data from props:', { survey, email, first_name })
            setSurveyConfig(survey)
            setUserEmail(email)
            setUserFirstName(first_name || '')
            surveyForm.setData('email', email)
            setCurrentStep('survey')
        }
    }, [survey, email, first_name])

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        post('/waitlist/email', {
            onSuccess: (page) => {
                console.log('Email submission successful:', page)
                // Extract survey config and email from response
                const props = page.props as any
                console.log('Props received:', props)
                if (props.survey && props.email) {
                    console.log('Setting survey config from props')
                    setSurveyConfig(props.survey)
                    setUserEmail(props.email)
                    setUserFirstName(props.first_name || '')
                    surveyForm.setData('email', props.email)
                    setCurrentStep('survey')
                } else if (props.data?.survey && props.data?.email) {
                    console.log('Setting survey config from props.data')
                    // Fallback for JSON responses
                    setSurveyConfig(props.data.survey)
                    setUserEmail(props.data.email)
                    setUserFirstName(props.data.first_name || '')
                    surveyForm.setData('email', props.data.email)
                    setCurrentStep('survey')
                } else {
                    console.log('No survey data found in props:', props)
                }
            },
            onError: (errors) => {
                console.error('Email submission failed:', errors)
            }
        })
    }

    const handleSurveySubmit = () => {
        surveyForm.post('/waitlist/survey', {
            onSuccess: () => {
                setCurrentStep('complete')
            },
            onError: (errors) => {
                console.error('Survey submission failed:', errors)
            }
        })
    }

    const handleNextQuestion = () => {
        if (currentQuestion < 5) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            handleSurveySubmit()
        }
    }

    const handlePreviousQuestion = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const updateSurveyAnswer = (questionNumber: number, answer: string) => {
        surveyForm.setData(`question_${questionNumber}` as keyof typeof surveyForm.data, answer)
    }

    const getCurrentQuestionData = () => {
        if (!surveyConfig) return null
        return surveyConfig.questions[currentQuestion]
    }

    const features = [
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Getting more [good thing]",
            description: "Discover how mastering [topic] can supercharge your ability to achieve [good thing] and set you on the path to success."
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Preventing [bad thing]",
            description: "Learn now [topic] can serve as your protective shield, preventing adverse effects of [bad thing] and securing your future."
        },
        {
            icon: <Star className="h-6 w-6" />,
            title: "Why [category] matters",
            description: "Explore the critical domain of [topic], where success is defined, and uncover how it can transform your life or business for the better."
        }
    ]

    return (
        <>
            <Head title="Join the Waitlist - Studio" />

            <div className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-24 sm:py-32">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

                    <div className="container relative mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mx-auto max-w-3xl text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
                            >
                                <Sparkles className="h-10 w-10 text-primary" />
                            </motion.div>

                            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
                                Something Amazing is{" "}
                                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                    Coming Soon
                                </span>
                            </h1>

                            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
                                Are you ready to get better results with [topic] in {new Date().getFullYear()}? Join the waitlist and get exclusive early access when we launch.
                            </p>

                            {/* Waitlist Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="mx-auto max-w-md"
                            >
                                {currentStep === 'email' && (
                                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                                        <div className="space-y-3">
                                            <Input
                                                type="text"
                                                placeholder="Enter your first name"
                                                value={data.first_name}
                                                onChange={(e) => setData('first_name', e.target.value)}
                                                className={cn(
                                                    "h-12 text-base w-full",
                                                    errors.first_name && "border-destructive"
                                                )}
                                            />
                                            {errors.first_name && (
                                                <p className="text-sm text-destructive">{errors.first_name}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            <div className="flex-1 min-w-0 sm:min-w-[300px]">
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className={cn(
                                                        "h-12 text-base w-full",
                                                        errors.email && "border-destructive"
                                                    )}
                                                />
                                                {errors.email && (
                                                    <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                                                )}
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                size="lg"
                                                className="h-12 px-8"
                                            >
                                                {processing ? (
                                                    <>
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                        Joining...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Mail className="h-4 w-4" />
                                                        Join Waitlist
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            We'll never spam you. Unsubscribe at any time.
                                        </p>
                                    </form>
                                )}

                                {currentStep === 'survey' && surveyConfig && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="rounded-lg border border-border bg-background p-10 shadow-lg max-w-4xl mx-auto"
                                    >
                                        <div className="mb-8">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-2xl font-semibold">Quick Questions</h3>
                                                <span className="text-lg text-muted-foreground">
                                                    {currentQuestion} of 5
                                                </span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-3">
                                                <div
                                                    className="bg-primary h-3 rounded-full transition-all duration-300"
                                                    style={{ width: `${(currentQuestion / 5) * 100}%` }}
                                                />
                                            </div>
                                        </div>

                                        {(() => {
                                            const questionData = getCurrentQuestionData()
                                            if (!questionData) return null

                                            return (
                                                <div className="space-y-6">
                                                    <h4 className="text-xl font-medium">{questionData.question}</h4>

                                                    {questionData.type === 'multiple_choice' && questionData.options && (
                                                        <div className="space-y-3">
                                                            {Object.entries(questionData.options).map(([key, option]) => (
                                                                <label
                                                                    key={key}
                                                                    className={cn(
                                                                        "flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-colors",
                                                                        surveyForm.data[`question_${currentQuestion}` as keyof typeof surveyForm.data] === key
                                                                            ? "border-primary bg-primary/5"
                                                                            : "border-border hover:border-primary/50"
                                                                    )}
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name={`question_${currentQuestion}`}
                                                                        value={key}
                                                                        checked={surveyForm.data[`question_${currentQuestion}` as keyof typeof surveyForm.data] === key}
                                                                        onChange={(e) => updateSurveyAnswer(currentQuestion, e.target.value)}
                                                                        className="sr-only"
                                                                    />
                                                                    <div className={cn(
                                                                        "w-5 h-5 rounded-full border-2 transition-colors",
                                                                        surveyForm.data[`question_${currentQuestion}` as keyof typeof surveyForm.data] === key
                                                                            ? "border-primary bg-primary"
                                                                            : "border-muted-foreground"
                                                                    )}>
                                                                        {surveyForm.data[`question_${currentQuestion}` as keyof typeof surveyForm.data] === key && (
                                                                            <div className="w-full h-full rounded-full bg-white scale-50" />
                                                                        )}
                                                                    </div>
                                                                    <span className="text-base">{option}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {questionData.type === 'open_text' && (
                                                        <Textarea
                                                            placeholder={questionData.placeholder || "Your answer..."}
                                                            value={surveyForm.data[`question_${currentQuestion}` as keyof typeof surveyForm.data] as string}
                                                            onChange={(e) => updateSurveyAnswer(currentQuestion, e.target.value)}
                                                            maxLength={questionData.max_length || 1000}
                                                            className="min-h-[120px] resize-none text-base p-4"
                                                        />
                                                    )}

                                                    {questionData.type === 'scale' && (
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between text-base text-muted-foreground">
                                                                <span>{questionData.low_label || '1'}</span>
                                                                <span>{questionData.high_label || '10'}</span>
                                                            </div>
                                                            <div className="relative">
                                                                <input
                                                                    type="range"
                                                                    min={questionData.min || 1}
                                                                    max={questionData.max || 10}
                                                                    value={surveyForm.data[`question_${currentQuestion}` as keyof typeof surveyForm.data] as string || questionData.min || 1}
                                                                    onChange={(e) => updateSurveyAnswer(currentQuestion, e.target.value)}
                                                                    className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer slider [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:h-0 [&::-webkit-slider-thumb]:border-0 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-0 [&::-moz-range-thumb]:h-0 [&::-moz-range-thumb]:border-0"
                                                                    style={{
                                                                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((parseInt(String(surveyForm.data[`question_${currentQuestion}` as keyof typeof surveyForm.data] || questionData.min || 1)) - (questionData.min || 1)) / ((questionData.max || 10) - (questionData.min || 1))) * 100}%, hsl(var(--muted)) ${((parseInt(String(surveyForm.data[`question_${currentQuestion}` as keyof typeof surveyForm.data] || questionData.min || 1)) - (questionData.min || 1)) / ((questionData.max || 10) - (questionData.min || 1))) * 100}%, hsl(var(--muted)) 100%)`,
                                                                        WebkitAppearance: 'none',
                                                                        appearance: 'none',
                                                                    }}
                                                                />
                                                                <div className="flex justify-center -mt-6 gap-1">
                                                                    {Array.from({ length: (questionData.max || 10) - (questionData.min || 1) + 1 }, (_, i) => {
                                                                        const value = (questionData.min || 1) + i;
                                                                        return (
                                                                            <button
                                                                                key={value}
                                                                                type="button"
                                                                                onClick={() => updateSurveyAnswer(currentQuestion, value.toString())}
                                                                                className={cn(
                                                                                    "w-10 h-10 rounded-full text-sm font-medium transition-colors flex-shrink-0",
                                                                                    surveyForm.data[`question_${currentQuestion}` as keyof typeof surveyForm.data] === value.toString()
                                                                                        ? "bg-primary text-primary-foreground"
                                                                                        : "bg-muted hover:bg-muted/80"
                                                                                )}
                                                                            >
                                                                                {value}
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className="text-center text-base font-medium">
                                                                Selected: {surveyForm.data[`question_${currentQuestion}` as keyof typeof surveyForm.data] || questionData.min || 1}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center justify-between pt-6">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={handlePreviousQuestion}
                                                            disabled={currentQuestion === 1}
                                                            className="flex items-center gap-2 px-6 py-3 text-base"
                                                        >
                                                            <ArrowLeft className="h-5 w-5" />
                                                            Previous
                                                        </Button>

                                                        <Button
                                                            type="button"
                                                            onClick={handleNextQuestion}
                                                            disabled={
                                                                surveyForm.data[`question_${currentQuestion}` as keyof typeof surveyForm.data] === '' ||
                                                                surveyForm.processing
                                                            }
                                                            className="flex items-center gap-2 px-6 py-3 text-base"
                                                        >
                                                            {currentQuestion === 5 ? 'Complete' : 'Next'}
                                                            {currentQuestion === 5 ? <CheckCircle className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        })()}
                                    </motion.div>
                                )}

                                {currentStep === 'complete' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950"
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                            <div>
                                                <h3 className="font-semibold text-green-800 dark:text-green-200">
                                                    You're all set{userFirstName ? `, ${userFirstName}` : ''}!
                                                </h3>
                                                <p className="text-sm text-green-600 dark:text-green-400">
                                                    Thank you for your answers. We'll notify you when we launch.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Preview Image Section */}
                <section className="py-16 bg-muted/20">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mx-auto max-w-4xl"
                        >
                            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background shadow-2xl">
                                <div className="aspect-video bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                            <Sparkles className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                                        <p className="text-muted-foreground">Get a sneak peek at what we're building</p>
                                    </div>
                                </div>
                                {/* Optional: Add actual image when available */}
                                {/* <img
                                    src="/preview-image.jpg"
                                    alt="Platform Preview"
                                    className="w-full h-full object-cover"
                                /> */}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
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
                                We're launching a new appeoach to [topic]
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Get exclusive benefits and priority access by becoming a part of our founding community.
                            </p>
                        </motion.div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center"
                                >
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        {feature.icon}
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Second Email Signup */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="mx-auto max-w-md mt-16"
                        >
                            {currentStep === 'email' ? (
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
                                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                                        <Input
                                            type="text"
                                            placeholder="Enter your first name"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            className={cn(
                                                "h-10 text-sm w-full",
                                                errors.first_name && "border-destructive"
                                            )}
                                        />
                                        {errors.first_name && (
                                            <p className="text-sm text-destructive">{errors.first_name}</p>
                                        )}
                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            <div className="flex-1 min-w-0 sm:min-w-[250px]">
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className={cn(
                                                        "h-10 text-sm w-full",
                                                        errors.email && "border-destructive"
                                                    )}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="h-10 px-6"
                                            >
                                                {processing ? (
                                                    <>
                                                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                        Joining...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Mail className="h-3 w-3" />
                                                        Join Now
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                        {errors.email && (
                                            <p className="text-sm text-destructive">{errors.email}</p>
                                        )}
                                    </form>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 dark:border-green-800 dark:bg-green-950">
                                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                            {currentStep === 'complete' ? "You're all set!" : "You're already on the list!"}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-24 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="grid gap-8 md:grid-cols-3 text-center"
                        >
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">1,000+</div>
                                <div className="text-muted-foreground">People waiting</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                                <div className="text-muted-foreground">Features planned</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                                <div className="text-muted-foreground">Support ready</div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    )
}
