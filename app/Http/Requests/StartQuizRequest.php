<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StartQuizRequest extends FormRequest
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
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email:rfc,dns',
                'max:255',
                function ($attribute, $value, $fail) {
                    $existingEntry = \App\Models\Email::where('email', $value)->first();

                    if ($existingEntry && $existingEntry->quiz && $existingEntry->quiz->isQuizComplete()) {
                        $fail('This email has already completed the quiz.');
                    }
                }
            ],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your name to start the quiz.',
            'name.string' => 'Please enter a valid name.',
            'name.max' => 'Your name must not exceed 255 characters.',
            'email.required' => 'Please enter your email address to start the quiz.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'Your email must not exceed 255 characters.',
        ];
    }
}
