<?php

namespace App\Http\Controllers;

use App\Models\Email;
use App\Models\Waitlist;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class ResultsController extends Controller
{
    /**
     * Show the results page with survey data
     */
    public function index(): Response
    {
        // Get all emails with their related waitlist data
        $emails = Email::with(['waitlist'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Transform the data to match the expected format
        $entries = $emails->map(function ($email) {
            $waitlistData = $email->waitlist;

            return [
                'id' => $email->id,
                'first_name' => $email->name,
                'email' => $email->email,
                'email_verified_at' => $email->email_verified_at,
                'created_at' => $email->created_at,
                'updated_at' => $email->updated_at,
                // Survey completion status
                'survey_completed_at' => $waitlistData?->completed_at,
                'survey_completed' => ! is_null($waitlistData?->completed_at),
                // Survey data (for analytics)
                'question_1' => $waitlistData?->question_1,
                'question_2' => $waitlistData?->question_2,
                'question_3' => $waitlistData?->question_3,
                'question_4' => $waitlistData?->question_4,
                'question_5' => $waitlistData?->question_5,
            ];
        });

        $stats = [
            'total_entries' => $emails->count(),
            'completed_surveys' => $emails->whereNotNull('waitlist.completed_at')->count(),
            'incomplete_surveys' => $emails->whereNull('waitlist.completed_at')->count(),
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
                        'key' => $optionKey,
                    ];
                }
                $questionResults = $optionCounts;
            } elseif ($questionData['type'] === 'scale') {
                // Count responses for each scale value
                $scaleCounts = [];
                for ($i = $questionData['min']; $i <= $questionData['max']; $i++) {
                    $count = $completedSurveys->where("question_{$questionNumber}", (string) $i)->count();
                    if ($count > 0) {
                        $scaleCounts[] = [
                            'name' => (string) $i,
                            'value' => $count,
                            'key' => (string) $i,
                        ];
                    }
                }
                $questionResults = $scaleCounts;
            }

            $results[$questionNumber] = [
                'question' => $questionData['question'],
                'type' => $questionData['type'],
                'data' => $questionResults,
                'total_responses' => $completedCount,
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $results,
            'total_completed' => $completedCount,
        ]);
    }
}
