<?php

namespace App\Http\Controllers;

use App\Models\Email;
use App\Models\Waitlist;
use App\Models\Quiz;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResultsController extends Controller
{
    /**
     * Show the results page with survey and quiz data
     */
    public function index(): Response
    {
        // Get all emails with their related waitlist and quiz data
        $emails = Email::with(['waitlist', 'quiz'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Transform the data to match the expected format
        $entries = $emails->map(function ($email) {
            $waitlistData = $email->waitlist;
            $quizData = $email->quiz;

            return [
                'id' => $email->id,
                'first_name' => $email->name,
                'email' => $email->email,
                'email_verified_at' => $email->email_verified_at,
                'created_at' => $email->created_at,
                'updated_at' => $email->updated_at,
                // Survey completion status
                'survey_completed_at' => $waitlistData?->completed_at,
                'survey_completed' => !is_null($waitlistData?->completed_at),
                // Quiz completion status
                'quiz_completed_at' => $quizData?->completed_at,
                'quiz_completed' => !is_null($quizData?->completed_at),
                // Survey data (for analytics)
                'question_1' => $waitlistData?->question_1,
                'question_2' => $waitlistData?->question_2,
                'question_3' => $waitlistData?->question_3,
                'question_4' => $waitlistData?->question_4,
                'question_5' => $waitlistData?->question_5,
                // Quiz data (for analytics)
                'quiz_question_1' => $quizData?->question_1,
                'quiz_question_2' => $quizData?->question_2,
                'quiz_question_3' => $quizData?->question_3,
                'quiz_question_4' => $quizData?->question_4,
                'quiz_question_5' => $quizData?->question_5,
                'quiz_question_6' => $quizData?->question_6,
                'quiz_question_7' => $quizData?->question_7,
                'quiz_question_8' => $quizData?->question_8,
                'quiz_question_9' => $quizData?->question_9,
                'quiz_question_10' => $quizData?->question_10,
            ];
        });

        $stats = [
            'total_entries' => $emails->count(),
            'completed_surveys' => $emails->whereNotNull('waitlist.completed_at')->count(),
            'completed_quizzes' => $emails->whereNotNull('quiz.completed_at')->count(),
            'incomplete_surveys' => $emails->whereNull('waitlist.completed_at')->count(),
            'incomplete_quizzes' => $emails->whereNull('quiz.completed_at')->count(),
        ];

        return Inertia::render('results', [
            'entries' => $entries,
            'stats' => $stats,
        ]);
    }

    /**
     * Get survey analytics data
     */
    public function getSurveyAnalytics(): JsonResponse
    {
        $surveyConfig = config('survey');
        $results = [];

        // Get all completed survey responses
        $completedSurveys = Waitlist::whereNotNull('completed_at')->get();
        $completedCount = $completedSurveys->count();

        // Process each question
        foreach ($surveyConfig['questions'] as $questionNumber => $questionData) {
            $questionResults = [];

            if ($questionData['type'] === 'multiple_choice') {
                // Count responses for each option
                $optionCounts = [];
                foreach ($questionData['options'] as $optionKey => $optionLabel) {
                    $count = $completedSurveys->where("question_{$questionNumber}", $optionKey)->count();
                    $optionCounts[] = [
                        'name' => $optionLabel,
                        'value' => $count,
                        'key' => $optionKey
                    ];
                }
                $questionResults = $optionCounts;
            } elseif ($questionData['type'] === 'scale') {
                // Count responses for each scale value
                $scaleCounts = [];
                for ($i = $questionData['min']; $i <= $questionData['max']; $i++) {
                    $count = $completedSurveys->where("question_{$questionNumber}", (string)$i)->count();
                    if ($count > 0) {
                        $scaleCounts[] = [
                            'name' => (string)$i,
                            'value' => $count,
                            'key' => (string)$i
                        ];
                    }
                }
                $questionResults = $scaleCounts;
            }

            $results[$questionNumber] = [
                'question' => $questionData['question'],
                'type' => $questionData['type'],
                'data' => $questionResults,
                'total_responses' => $completedCount
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $results,
            'total_completed' => $completedCount,
        ]);
    }

    /**
     * Get quiz analytics data
     */
    public function getQuizAnalytics(): JsonResponse
    {
        $quizConfig = config('quiz');
        $results = [];

        // Get all completed quiz responses
        $completedQuizzes = Quiz::whereNotNull('completed_at')->get();
        $completedCount = $completedQuizzes->count();

        // Process each question
        foreach ($quizConfig['questions'] as $questionNumber => $questionData) {
            $questionResults = [];

            if ($questionData['type'] === 'multiple_choice') {
                // Count responses for each option
                $optionCounts = [];
                foreach ($questionData['options'] as $optionKey => $optionLabel) {
                    $count = $completedQuizzes->where("question_{$questionNumber}", $optionKey)->count();
                    $optionCounts[] = [
                        'name' => $optionLabel,
                        'value' => $count,
                        'key' => $optionKey
                    ];
                }
                $questionResults = $optionCounts;
            }

            $results[$questionNumber] = [
                'question' => $questionData['question'],
                'type' => $questionData['type'],
                'data' => $questionResults,
                'total_responses' => $completedCount
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $results,
            'total_completed' => $completedCount,
        ]);
    }
}
