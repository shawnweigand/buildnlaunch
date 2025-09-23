import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { BarChart3, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SurveyResults from '@/components/SurveyResults';
import QuizResults from '@/components/QuizResults';

interface Entry {
    id: number;
    first_name: string;
    email: string;
    survey_completed_at?: string;
    survey_completed: boolean;
    quiz_completed_at?: string;
    quiz_completed: boolean;
    created_at: string;
    updated_at: string;
    // Survey data (for analytics)
    question_1?: string;
    question_2?: string;
    question_3?: string;
    question_4?: string;
    question_5?: string;
    // Quiz data (for analytics)
    quiz_question_1?: string;
    quiz_question_2?: string;
    quiz_question_3?: string;
    quiz_question_4?: string;
    quiz_question_5?: string;
    quiz_question_6?: string;
    quiz_question_7?: string;
    quiz_question_8?: string;
    quiz_question_9?: string;
    quiz_question_10?: string;
}

interface Stats {
    total_entries: number;
    completed_surveys: number;
    completed_quizzes: number;
    incomplete_surveys: number;
    incomplete_quizzes: number;
}

interface ResultsPageProps {
    entries: Entry[];
    stats: Stats;
}

export default function Results({ entries, stats }: ResultsPageProps) {
    const [activeTab, setActiveTab] = useState<'survey-analytics' | 'quiz-analytics' | 'entries'>('survey-analytics');

    const tabs = [
        {
            id: 'survey-analytics' as const,
            name: 'Survey Analytics',
            icon: BarChart3,
            count: stats.completed_surveys,
        },
        {
            id: 'quiz-analytics' as const,
            name: 'Quiz Analytics',
            icon: BarChart3,
            count: stats.completed_quizzes,
        },
        {
            id: 'entries' as const,
            name: 'Entries',
            icon: Users,
            count: stats.total_entries,
        },
    ];

    return (
        <>
            <Head title="Results" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="flex items-center gap-2"
                                >
                                    <Link href="/dashboard">
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to Dashboard
                                    </Link>
                                </Button>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Results
                            </h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                View and analyze signup data
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                    Total Entries
                                                </dt>
                                                <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                    {stats.total_entries}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                    Completed Surveys
                                                </dt>
                                                <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                    {stats.completed_surveys}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                    Completed Quizzes
                                                </dt>
                                                <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                    {stats.completed_quizzes}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                                    Incomplete Surveys
                                                </dt>
                                                <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                                    {stats.incomplete_surveys}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="mb-8">
                            <div className="border-b border-gray-200 dark:border-gray-700">
                                <nav className="-mb-px flex space-x-8">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                                                    activeTab === tab.id
                                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                                }`}
                                            >
                                                <Icon className={`-ml-0.5 mr-2 h-5 w-5 ${
                                                    activeTab === tab.id
                                                        ? 'text-blue-500 dark:text-blue-400'
                                                        : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                                                }`} />
                                                {tab.name}
                                                {tab.count > 0 && (
                                                    <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium ${
                                                        activeTab === tab.id
                                                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                                                            : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-300'
                                                    }`}>
                                                        {tab.count}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                            {activeTab === 'survey-analytics' && (
                                <div>
                                    <div className="px-4 py-5 sm:px-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                            Survey Analytics
                                        </h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                            Visual breakdown of survey responses
                                        </p>
                                    </div>
                                    <div className="px-4 py-5 sm:px-6">
                                        {stats.completed_surveys > 0 ? (
                                            <SurveyResults />
                                        ) : (
                                            <div className="text-center py-12">
                                                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                                                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No survey data</h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    Survey analytics will appear here once people complete the survey.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'quiz-analytics' && (
                                <div>
                                    <div className="px-4 py-5 sm:px-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                            Quiz Analytics
                                        </h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                            Visual breakdown of quiz responses
                                        </p>
                                    </div>
                                    <div className="px-4 py-5 sm:px-6">
                                        {stats.completed_quizzes > 0 ? (
                                            <QuizResults />
                                        ) : (
                                            <div className="text-center py-12">
                                                <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                                                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No quiz data</h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    Quiz analytics will appear here once people complete the quiz.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'entries' && (
                                <div>
                                    <div className="px-4 py-5 sm:px-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                            Waitlist Entries
                                        </h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                                            All waitlist signups and survey responses
                                        </p>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Email
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Completion Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                        Signup Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                {entries.map((entry) => (
                                                    <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                            {entry.first_name || 'N/A'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                            {entry.email}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex flex-col space-y-1">
                                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                    entry.survey_completed
                                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                                }`}>
                                                                    Survey: {entry.survey_completed ? 'Completed' : 'Incomplete'}
                                                                </span>
                                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                    entry.quiz_completed
                                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                                }`}>
                                                                    Quiz: {entry.quiz_completed ? 'Completed' : 'Incomplete'}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                            {new Date(entry.created_at).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {entries.length === 0 && (
                                        <div className="text-center py-12">
                                            <Users className="mx-auto h-12 w-12 text-gray-400" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No entries</h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Get started by sharing your waitlist link.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
