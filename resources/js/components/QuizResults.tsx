import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { motion } from 'framer-motion'
import { BarChart3, PieChart as PieChartIcon, Users, TrendingUp } from 'lucide-react'

interface QuizData {
    name: string
    value: number
    key: string
}

interface QuestionResult {
    question: string
    type: 'multiple_choice' | 'scale'
    data: QuizData[]
    total_responses: number
}

interface QuizResultsData {
    [key: number]: QuestionResult
}

interface QuizApiResponse {
    success: boolean
    data: QuizResultsData
    total_completed: number
}

const COLORS = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#06b6d4', // cyan-500
    '#84cc16', // lime-500
    '#f97316', // orange-500
]

export default function QuizResults() {
    const [data, setData] = useState<QuizResultsData | null>(null)
    const [totalCompleted, setTotalCompleted] = useState<number>(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchQuizResults()
    }, [])

    const fetchQuizResults = async () => {
        try {
            setLoading(true)
            const response = await fetch('/results/quiz-analytics')
            const result = await response.json()

            if (result.success && result.data) {
                setData(result.data)
                setTotalCompleted(result.total_completed || 0)
            } else {
                setError('Failed to fetch quiz results')
            }
        } catch (err) {
            setError('Error fetching quiz results')
            console.error('Error fetching quiz results:', err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">Loading quiz results...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <button
                    onClick={fetchQuizResults}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        )
    }

    if (!data || totalCompleted === 0) {
        return (
            <div className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No quiz data</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Quiz analytics will appear here once people complete the quiz.
                </p>
            </div>
        )
    }

    console.log('Rendering with data:', { totalCompleted, questionsCount: Object.keys(data).length })

    return (
        <div className="space-y-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white"
                >
                    <div className="flex items-center">
                        <Users className="h-8 w-8" />
                        <div className="ml-4">
                            <p className="text-blue-100">Total Completed</p>
                            <p className="text-2xl font-bold">{totalCompleted}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white"
                >
                    <div className="flex items-center">
                        <TrendingUp className="h-8 w-8" />
                        <div className="ml-4">
                            <p className="text-green-100">Quiz Responses</p>
                            <p className="text-2xl font-bold">
                                of {totalCompleted} total entries
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white"
                >
                    <div className="flex items-center">
                        <BarChart3 className="h-8 w-8" />
                        <div className="ml-4">
                            <p className="text-purple-100">Questions</p>
                            <p className="text-2xl font-bold">{Object.keys(data).length}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Question Results */}
            <div className="space-y-8">
                {Object.entries(data).map(([questionNumber, questionData], index) => {
                    // Skip if questionData is invalid
                    if (!questionData || typeof questionData !== 'object') {
                        return null;
                    }

                    return (
                    <motion.div
                        key={questionNumber}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                    >
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Question {questionNumber}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {questionData.question}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                {questionData.total_responses} responses
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Pie Chart */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <PieChartIcon className="h-5 w-5 text-blue-600" />
                                    <h4 className="font-medium text-gray-900 dark:text-white">Distribution</h4>
                                </div>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={questionData.data || []}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {(questionData.data || []).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Bar Chart */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <BarChart3 className="h-5 w-5 text-green-600" />
                                    <h4 className="font-medium text-gray-900 dark:text-white">Counts</h4>
                                </div>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={questionData.data || []}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="value" fill="#10b981" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Response Details */}
                        <div className="mt-6">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Response Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {(questionData.data || []).map((response, index) => (
                                    <div
                                        key={response.key}
                                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                            />
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {response.name}
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                                            {response.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    );
                })}
            </div>
        </div>
    )
}
