"use client"

import { useState } from "react"
import { Head, useForm } from "@inertiajs/react"
import { motion } from "framer-motion"
import { Brain, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuizQuestion {
    type: 'multiple_choice'
    question: string
    options: Record<string, string>
}

interface QuizQuestionsProps {
    questions: Record<number, QuizQuestion>
    userInfo: {
        name: string
        email: string
    }
    errors?: {
        quiz?: string
    }
}

export default function QuizQuestions({ questions, userInfo, errors }: QuizQuestionsProps) {
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const totalQuestions = Object.keys(questions).length

    const { data, setData, post, processing } = useForm({
        question_1: '',
        question_2: '',
        question_3: '',
        question_4: '',
        question_5: '',
        question_6: '',
        question_7: '',
        question_8: '',
        question_9: '',
        question_10: '',
    })

    const handleNextQuestion = () => {
        if (currentQuestion < totalQuestions) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            // Only allow submission if all questions are answered
            if (areAllQuestionsAnswered()) {
                handleSubmit()
            }
        }
    }

    const handlePreviousQuestion = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const handleSubmit = () => {
        post('/quiz/submit')
    }

    const updateAnswer = (questionNumber: number, answer: string) => {
        setData(`question_${questionNumber}` as keyof typeof data, answer)
    }

    const getCurrentQuestionData = () => {
        return questions[currentQuestion]
    }

    const isCurrentQuestionAnswered = () => {
        const answer = data[`question_${currentQuestion}` as keyof typeof data]
        return answer && answer !== ''
    }

    const areAllQuestionsAnswered = () => {
        for (let i = 1; i <= totalQuestions; i++) {
            const answer = data[`question_${i}` as keyof typeof data]
            if (!answer || answer === '') {
                return false
            }
        }
        return true
    }

    const progress = (currentQuestion / totalQuestions) * 100

    return (
        <>
            <Head title="Quiz Questions - Product Building Assessment" />

            <div className="min-h-screen bg-background">
                {/* Header */}
                <div className="border-b border-border/50">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Brain className="h-6 w-6 text-primary" />
                                <span className="font-semibold">Product Building Quiz</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Welcome, {userInfo.name}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="border-b border-border/50">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                            <span>Question {currentQuestion} of {totalQuestions}</span>
                            <span>{Math.round(progress)}% Complete</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                                className="bg-primary h-2 rounded-full transition-all duration-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mx-auto max-w-3xl"
                        >
                            <div className="rounded-lg border border-border bg-background p-8 shadow-lg">
                                {errors?.quiz && (
                                    <div className="mb-6 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                                        <p className="text-sm text-destructive">{errors.quiz}</p>
                                    </div>
                                )}

                                {(() => {
                                    const questionData = getCurrentQuestionData()
                                    if (!questionData) return null

                                    return (
                                        <div className="space-y-8">
                                            <div>
                                                <h2 className="text-2xl font-semibold mb-2">
                                                    {questionData.question}
                                                </h2>
                                                <p className="text-muted-foreground">
                                                    Select the option that best describes your situation or preference.
                                                </p>
                                            </div>

                                            <div className="space-y-3">
                                                {Object.entries(questionData.options).map(([key, option]) => (
                                                    <motion.label
                                                        key={key}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                        className={cn(
                                                            "flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm",
                                                            data[`question_${currentQuestion}` as keyof typeof data] === key
                                                                ? "border-primary bg-primary/5 shadow-sm"
                                                                : "border-border hover:border-primary/50"
                                                        )}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={`question_${currentQuestion}`}
                                                            value={key}
                                                            checked={data[`question_${currentQuestion}` as keyof typeof data] === key}
                                                            onChange={(e) => updateAnswer(currentQuestion, e.target.value)}
                                                            className="sr-only"
                                                        />
                                                        <div className={cn(
                                                            "w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center",
                                                            data[`question_${currentQuestion}` as keyof typeof data] === key
                                                                ? "border-primary bg-primary"
                                                                : "border-muted-foreground"
                                                        )}>
                                                            {data[`question_${currentQuestion}` as keyof typeof data] === key && (
                                                                <div className="w-2 h-2 rounded-full bg-white" />
                                                            )}
                                                        </div>
                                                        <span className="text-base flex-1">{option}</span>
                                                    </motion.label>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t border-border">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={handlePreviousQuestion}
                                                    disabled={currentQuestion === 1}
                                                    className="flex items-center gap-2 px-6 py-3"
                                                >
                                                    <ArrowLeft className="h-4 w-4" />
                                                    Previous
                                                </Button>

                                                <Button
                                                    type="button"
                                                    onClick={handleNextQuestion}
                                                    disabled={!isCurrentQuestionAnswered() || processing}
                                                    className="flex items-center gap-2 px-6 py-3"
                                                >
                                                    {currentQuestion === totalQuestions ? (
                                                        <>
                                                            {areAllQuestionsAnswered() ? 'Complete Quiz' : 'Complete Quiz (Answer All Questions)'}
                                                            <CheckCircle className="h-4 w-4" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            Next Question
                                                            <ArrowRight className="h-4 w-4" />
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })()}
                            </div>

                            {/* Question Navigation */}
                            <div className="mt-8">
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((questionNum) => {
                                        const isAnswered = data[`question_${questionNum}` as keyof typeof data] && data[`question_${questionNum}` as keyof typeof data] !== ''
                                        const isCurrent = questionNum === currentQuestion

                                        return (
                                            <button
                                                key={questionNum}
                                                onClick={() => setCurrentQuestion(questionNum)}
                                                disabled={!isAnswered && !isCurrent}
                                                className={cn(
                                                    "w-10 h-10 rounded-full text-sm font-medium transition-colors",
                                                    isCurrent
                                                        ? "bg-primary text-primary-foreground"
                                                        : isAnswered
                                                            ? "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"
                                                            : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                                                )}
                                            >
                                                {questionNum}
                                            </button>
                                        )
                                    })}
                                </div>
                                <p className="text-xs text-muted-foreground text-center mt-2">
                                    You can only navigate to questions you've already answered
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    )
}
