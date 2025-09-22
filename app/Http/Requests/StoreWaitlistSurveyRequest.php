<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWaitlistSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $questions = config('survey.questions');
        $rules = [
            'email' => ['required', 'email:rfc,dns', 'exists:waitlist,email'],
        ];

        foreach ($questions as $questionNumber => $questionData) {
            $fieldName = "question_{$questionNumber}";

            if ($questionData['type'] === 'multiple_choice') {
                $optionKeys = array_keys($questionData['options']);
                $rules[$fieldName] = ['nullable', 'string', 'in:' . implode(',', $optionKeys)];
            } elseif ($questionData['type'] === 'open_text') {
                $maxLength = $questionData['max_length'] ?? 1000;
                $rules[$fieldName] = ['nullable', 'string', 'max:' . $maxLength];
            } elseif ($questionData['type'] === 'scale') {
                $min = $questionData['min'] ?? 1;
                $max = $questionData['max'] ?? 10;
                $rules[$fieldName] = ['nullable', 'integer', 'min:' . $min, 'max:' . $max];
            }
        }

        return $rules;
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'email.exists' => 'This email is not found on our waitlist.',
            'question_1.in' => 'Please select a valid option for question 1.',
            'question_2.in' => 'Please select a valid option for question 2.',
            'question_3.in' => 'Please select a valid option for question 3.',
            'question_4.in' => 'Please select a valid option for question 4.',
            'question_5.integer' => 'Please select a valid number for question 5.',
            'question_5.min' => 'Please select a value of at least 1 for question 5.',
            'question_5.max' => 'Please select a value no greater than 10 for question 5.',
        ];
    }
}
