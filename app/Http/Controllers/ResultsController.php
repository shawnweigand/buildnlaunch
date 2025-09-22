<?php

namespace App\Http\Controllers;

use App\Models\Waitlist;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResultsController extends Controller
{
    /**
     * Show the results page with waitlist data
     */
    public function index(): Response
    {
        $waitlistEntries = Waitlist::orderBy('created_at', 'desc')->get();

        $stats = [
            'total_entries' => $waitlistEntries->count(),
            'completed_surveys' => $waitlistEntries->whereNotNull('question_1')->count(),
            'incomplete_surveys' => $waitlistEntries->whereNull('question_1')->count(),
        ];

        return Inertia::render('results', [
            'waitlistEntries' => $waitlistEntries,
            'stats' => $stats,
        ]);
    }
}
