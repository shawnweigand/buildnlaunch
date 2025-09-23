<?php

namespace App\Http\Controllers;

use App\Http\Requests\StartQuizRequest;
use App\Models\Email;
use App\Models\Quiz;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    /**
     * Show the quiz introduction page
     */
    public function intro(): Response
    {
        $quizConfig = config('quiz');

        return Inertia::render('quiz/intro', [
            'totalQuestions' => count($quizConfig['questions']),
            'estimatedTime' => '5-10 minutes',
        ]);
    }

    /**
     * Show the quiz start form (email/name collection)
     */
    public function start(): Response
    {
        return Inertia::render('quiz/start');
    }

    /**
     * Process the quiz start form and redirect to questions
     */
    public function storeStart(StartQuizRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Create or find email record
        $email = Email::firstOrCreate(
            ['email' => $validated['email']],
            ['name' => $validated['name']]
        );

        // Update name if it was provided and different
        if ($validated['name'] !== $email->name) {
            $email->update(['name' => $validated['name']]);
        }

        // Create quiz record if it doesn't exist
        if (!$email->quiz) {
            $quiz = Quiz::create();
            $email->update(['quiz_id' => $quiz->id]);
        }

        // Store email info in session for the quiz
        session([
            'quiz_email_id' => $email->id,
            'quiz_name' => $validated['name'],
            'quiz_email' => $validated['email'],
        ]);

        return redirect()->route('quiz.questions');
    }

    /**
     * Show the quiz questions
     */
    public function questions(): Response|RedirectResponse
    {
        // Check if user has started the quiz
        if (!session('quiz_email_id')) {
            return redirect()->route('quiz.start');
        }

        $quizConfig = config('quiz');

        return Inertia::render('quiz/questions', [
            'questions' => $quizConfig['questions'],
            'userInfo' => [
                'name' => session('quiz_name'),
                'email' => session('quiz_email'),
            ],
        ]);
    }

    /**
     * Submit quiz answers
     */
    public function submit(Request $request): RedirectResponse
    {
        $emailId = session('quiz_email_id');

        if (!$emailId) {
            return redirect()->route('quiz.start');
        }

        $email = Email::findOrFail($emailId);
        $quiz = $email->quiz;

        if (!$quiz) {
            return redirect()->route('quiz.start');
        }

        // Validate that all questions are answered
        $answers = $request->only([
            'question_1', 'question_2', 'question_3', 'question_4', 'question_5',
            'question_6', 'question_7', 'question_8', 'question_9', 'question_10'
        ]);

        // Check if any answers are missing
        foreach ($answers as $key => $value) {
            if (empty($value)) {
                return redirect()->back()->withErrors([
                    'quiz' => 'Please answer all questions before submitting the quiz.'
                ]);
            }
        }

        $quiz->update(array_merge($answers, [
            'completed_at' => now(),
        ]));

        // Clear session data
        session()->forget(['quiz_email_id', 'quiz_name', 'quiz_email']);

        return redirect()->route('quiz.complete');
    }

    /**
     * Show quiz completion page
     */
    public function complete(): Response
    {
        return Inertia::render('quiz/complete');
    }
}
