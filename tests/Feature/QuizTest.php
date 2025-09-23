<?php

use App\Models\Email;
use App\Models\Quiz;

it('shows quiz introduction page', function () {
    $response = $this->get('/quiz');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('quiz/intro')
        ->has('totalQuestions')
        ->has('estimatedTime')
    );
});

it('shows quiz start form', function () {
    $response = $this->get('/quiz/start');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('quiz/start')
    );
});

it('validates quiz start form', function () {
    $response = $this->post('/quiz/start', []);

    $response->assertSessionHasErrors(['name', 'email']);
});

it('prevents duplicate quiz completion', function () {
    // Create an email with a completed quiz
    $email = Email::factory()->create();
    $quiz = Quiz::factory()->create([
        'question_1' => 'option_1',
        'question_2' => 'option_2',
        'question_3' => 'option_3',
        'question_4' => 'option_4',
        'question_5' => 'option_5',
        'question_6' => 'option_6',
        'question_7' => 'option_7',
        'question_8' => 'option_8',
        'question_9' => 'option_9',
        'question_10' => 'option_10',
        'completed_at' => now(),
    ]);
    $email->update(['quiz_id' => $quiz->id]);

    $response = $this->post('/quiz/start', [
        'name' => 'Test User',
        'email' => $email->email,
    ]);

    $response->assertSessionHasErrors(['email']);
});

it('allows starting quiz for new email', function () {
    $response = $this->post('/quiz/start', [
        'name' => 'Test User',
        'email' => 'test@example.com',
    ]);

    $response->assertRedirect('/quiz/questions');

    // Check that email and quiz were created
    $this->assertDatabaseHas('emails', [
        'email' => 'test@example.com',
        'name' => 'Test User',
    ]);

    $email = Email::where('email', 'test@example.com')->first();
    $this->assertNotNull($email->quiz);
});

it('redirects to start if no session for questions', function () {
    $response = $this->get('/quiz/questions');

    $response->assertRedirect('/quiz/start');
});

it('shows quiz complete page', function () {
    $response = $this->get('/quiz/complete');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('quiz/complete')
    );
});

it('prevents quiz submission with incomplete answers', function () {
    // Create email and quiz
    $email = Email::factory()->create();
    $quiz = Quiz::factory()->create();
    $email->update(['quiz_id' => $quiz->id]);

    // Set session data
    session([
        'quiz_email_id' => $email->id,
        'quiz_name' => 'Test User',
        'quiz_email' => $email->email,
    ]);

    // Submit with incomplete answers
    $response = $this->post('/quiz/submit', [
        'question_1' => 'option_1',
        'question_2' => '', // Missing answer
        'question_3' => 'option_3',
        // ... other questions missing
    ]);

    $response->assertRedirect();
    $response->assertSessionHasErrors(['quiz']);

    // Quiz should not be completed
    $quiz->refresh();
    expect($quiz->completed_at)->toBeNull();
});

it('allows quiz submission with all answers', function () {
    // Create email and quiz
    $email = Email::factory()->create();
    $quiz = Quiz::factory()->create();
    $email->update(['quiz_id' => $quiz->id]);

    // Set session data
    session([
        'quiz_email_id' => $email->id,
        'quiz_name' => 'Test User',
        'quiz_email' => $email->email,
    ]);

    // Submit with all answers
    $response = $this->post('/quiz/submit', [
        'question_1' => 'option_1',
        'question_2' => 'option_2',
        'question_3' => 'option_3',
        'question_4' => 'option_4',
        'question_5' => 'option_5',
        'question_6' => 'option_6',
        'question_7' => 'option_7',
        'question_8' => 'option_8',
        'question_9' => 'option_9',
        'question_10' => 'option_10',
    ]);

    $response->assertRedirect('/quiz/complete');

    // Quiz should be completed
    $quiz->refresh();
    expect($quiz->completed_at)->not->toBeNull();
    expect($quiz->question_1)->toBe('option_1');
});

it('returns quiz analytics data', function () {
    // Create a completed quiz
    $email = Email::factory()->create();
    $quiz = Quiz::factory()->completed()->create();
    $email->update(['quiz_id' => $quiz->id]);

    $response = $this->get('/results/quiz-analytics');

    $response->assertSuccessful();
    $response->assertJsonStructure([
        'success',
        'data' => [
            '1' => [
                'question',
                'type',
                'data',
                'total_responses'
            ]
        ],
        'total_completed'
    ]);

    $data = $response->json();
    expect($data['success'])->toBeTrue();
    expect($data['total_completed'])->toBe(1);
    expect($data['data'])->toHaveKey('1');
});
