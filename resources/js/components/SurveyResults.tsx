import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { motion } from 'framer-motion'
import { BarChart3, PieChart as PieChartIcon, Users, TrendingUp } from 'lucide-react'

interface SurveyData {
    name: string
    value: number
    key: string
}

interface QuestionResult {
    question: string
    type: 'multiple_choice' | 'scale'
    data: SurveyData[]
    total_responses: number
}

interface SurveyResultsData {
    [key: number]: QuestionResult
    total_completed: number
    total_waitlist_entries: number
    completion_rate: number
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

export default function SurveyResults() {
    const [data, setData] = useState<SurveyResultsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchSurveyResults()
    }, [])

    const fetchSurveyResults = async () => {
        try {
            setLoading(true)
            const response = await fetch('/waitlist/survey-results')
            const result = await response.json()

            if (result.success) {
                console.log('Survey results data:', result)
                // Combine the data with the additional fields
                setData({
                    ...result.data,
                    total_completed: result.total_completed,
                    total_waitlist_entries: result.total_waitlist_entries,
                    completion_rate: result.completion_rate
                })
            } else {
                setError('Failed to fetch survey results')
            }
        } catch (err) {
            setError('Error fetching survey results')
            console.error('Error fetching survey results:', err)
        } finally {
            setLoading(false)
        }
    }

    const renderPieChart = (questionData: QuestionResult, questionNumber: number) => {
        if (questionData.data.length === 0) {
            return (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                    No data available
                </div>
            )
        }

        return (
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={questionData.data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {questionData.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        )
    }

    const renderBarChart = (questionData: QuestionResult, questionNumber: number) => {
        if (questionData.data.length === 0) {
            return (
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                    No data available
                </div>
            )
        }

        return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={questionData.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        )
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Loading survey results...
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="text-red-500 mb-2">Error</div>
                    <div className="text-muted-foreground">{error}</div>
                </div>
            </div>
        )
    }

    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="text-muted-foreground mb-2">No survey data available</div>
                    <div className="text-sm text-muted-foreground">Survey results will appear here once people start completing the survey.</div>
                </div>
            </div>
        )
    }

    const { total_completed, total_waitlist_entries, completion_rate, ...questions } = data

    console.log('Rendering with data:', { total_completed, total_waitlist_entries, completion_rate, questionsCount: Object.keys(questions).length })

    return (
        <div className="space-y-8">
            {/* Header Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-4 md:grid-cols-3"
            >
                <div className="rounded-lg border border-border bg-card p-6">
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <div className="text-sm font-medium text-muted-foreground">Completed Surveys</div>
                    </div>
                    <div className="text-2xl font-bold">{total_completed ?? 0}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        of {total_waitlist_entries ?? 0} total entries
                    </div>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                    <div className="flex items-center gap-2">
                        <PieChartIcon className="h-5 w-5 text-primary" />
                        <div className="text-sm font-medium text-muted-foreground">Questions</div>
                    </div>
                    <div className="text-2xl font-bold">{Object.keys(questions).length}</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-6">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <div className="text-sm font-medium text-muted-foreground">Completion Rate</div>
                    </div>
                    <div className="text-2xl font-bold">{completion_rate ?? 0}%</div>
                </div>
            </motion.div>

            {/* Survey Questions */}
            <div className="space-y-8">
                {Object.entries(questions).map(([questionNumber, questionData], index) => (
                    <motion.div
                        key={questionNumber}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg border border-border bg-card p-6"
                    >
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Question {questionNumber}: {questionData.question}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Type: {questionData.type.replace('_', ' ')}</span>
                                <span>•</span>
                                <span>Responses: {questionData.total_responses}</span>
                            </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Chart */}
                            <div>
                                <div className="mb-4 flex items-center gap-2">
                                    {questionData.type === 'multiple_choice' ? (
                                        <PieChartIcon className="h-4 w-4" />
                                    ) : (
                                        <BarChart3 className="h-4 w-4" />
                                    )}
                                    <span className="text-sm font-medium">
                                        {questionData.type === 'multiple_choice' ? 'Distribution' : 'Scale Distribution'}
                                    </span>
                                </div>
                                {questionData.type === 'multiple_choice'
                                    ? renderPieChart(questionData, parseInt(questionNumber))
                                    : renderBarChart(questionData, parseInt(questionNumber))
                                }
                            </div>

                            {/* Data Table */}
                            <div>
                                <div className="mb-4">
                                    <span className="text-sm font-medium">Response Breakdown</span>
                                </div>
                                <div className="space-y-2">
                                    {questionData.data.map((item, itemIndex) => (
                                        <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: COLORS[itemIndex % COLORS.length] }}
                                                />
                                                <span className="text-sm font-medium">{item.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold">{item.value}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    ({((item.value / questionData.total_responses) * 100).toFixed(1)}%)
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
