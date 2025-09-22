<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWaitlistEmailRequest;
use App\Http\Requests\StoreWaitlistSurveyRequest;
use App\Models\Waitlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class WaitlistController extends Controller
{
    /**
     * Show the waitlist page
     */
    public function show(): Response
    {
        // Check if we have survey data in session (from email submission)
        $surveyData = session()->get('survey');
        $userEmail = session()->get('email');
        $userFirstName = session()->get('first_name');
        $successMessage = session()->get('success');

        // Clear session data after retrieving it to prevent persistence
        if ($surveyData) {
            session()->forget(['survey', 'email', 'first_name', 'success']);
        }

        return Inertia::render('waitlist', [
            'survey' => $surveyData,
            'email' => $userEmail,
            'first_name' => $userFirstName,
            'success' => $successMessage,
        ]);
    }

    /**
     * Add email to waitlist
     */
    public function addEmail(StoreWaitlistEmailRequest $request): JsonResponse|RedirectResponse|Response
    {
        $validated = $request->validated();

        // Check if user already exists but hasn't completed survey
        $waitlistEntry = Waitlist::where('email', $validated['email'])->first();

        if ($waitlistEntry) {
            // Update existing entry with new first name if provided
            $waitlistEntry->update([
                'first_name' => $validated['first_name'],
            ]);
        } else {
            // Create new entry
            $waitlistEntry = Waitlist::create([
                'first_name' => $validated['first_name'],
                'email' => $validated['email'],
            ]);
        }

        $surveyConfig = config('survey');

        Log::info('Email added/updated in waitlist', [
            'email' => $waitlistEntry->email,
            'first_name' => $waitlistEntry->first_name,
            'is_existing' => $waitlistEntry->wasRecentlyCreated === false,
            'expects_json' => $request->expectsJson(),
            'survey_config' => $surveyConfig
        ]);

        // Redirect to waitlist page with survey data in session
        return redirect()->route('waitlist')->with([
            'success' => 'Email saved! Please answer a few quick questions.',
            'first_name' => $waitlistEntry->first_name,
            'email' => $waitlistEntry->email,
            'survey' => $surveyConfig,
        ]);
    }

    /**
     * Add survey data to existing waitlist entry
     */
    public function addSurvey(StoreWaitlistSurveyRequest $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validated();

        $waitlistEntry = Waitlist::where('email', $validated['email'])->first();

        $waitlistEntry->update([
            'question_1' => $validated['question_1'] ?? null,
            'question_2' => $validated['question_2'] ?? null,
            'question_3' => $validated['question_3'] ?? null,
            'question_4' => $validated['question_4'] ?? null,
            'question_5' => $validated['question_5'] ?? null,
        ]);

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Survey data saved successfully!',
                'data' => [
                    'id' => $waitlistEntry->id,
                    'email' => $waitlistEntry->email,
                    'question_1' => $waitlistEntry->question_1,
                    'question_2' => $waitlistEntry->question_2,
                    'question_3' => $waitlistEntry->question_3,
                    'question_4' => $waitlistEntry->question_4,
                    'question_5' => $waitlistEntry->question_5,
                ]
            ]);
        }

        return back()->with('success', 'Survey data saved successfully!');
    }

    /**
     * Get survey configuration for frontend
     */
    public function getSurveyConfig(Request $request): JsonResponse
    {
        $surveyConfig = config('survey');

        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'data' => $surveyConfig
            ]);
        }

        return response()->json($surveyConfig);
    }

    /**
     * Get survey results for analytics
     */
    public function getSurveyResults(): JsonResponse
    {
        $surveyConfig = config('survey');
        $results = [];

        // Get all waitlist entries
        $totalWaitlistEntries = Waitlist::count();

        // Get all completed survey responses
        $completedSurveys = Waitlist::whereNotNull('question_1')
            ->whereNotNull('question_2')
            ->whereNotNull('question_3')
            ->whereNotNull('question_4')
            ->whereNotNull('question_5')
            ->get();

        $completedCount = $completedSurveys->count();
        $completionRate = $totalWaitlistEntries > 0 ? round(($completedCount / $totalWaitlistEntries) * 100, 1) : 0;

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
            'total_waitlist_entries' => $totalWaitlistEntries,
            'completion_rate' => $completionRate
        ]);
    }
}
