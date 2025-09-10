<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Output file
    |--------------------------------------------------------------------------
    |
    | The path to the output file for the generated JavaScript.
    |
    */

    'output' => resource_path('js/ziggy.js'),

    /*
    |--------------------------------------------------------------------------
    | Except
    |--------------------------------------------------------------------------
    |
    | The routes that should be excluded from the generated JavaScript.
    |
    */

    'except' => [
        'debugbar.*',
        'ignition.*',
        'telescope.*',
        'horizon.*',
    ],

    /*
    |--------------------------------------------------------------------------
    | Groups
    |--------------------------------------------------------------------------
    |
    | The route groups that should be included in the generated JavaScript.
    |
    */

    'groups' => [
        // 'admin',
    ],

    /*
    |--------------------------------------------------------------------------
    | URL
    |--------------------------------------------------------------------------
    |
    | The base URL that will be used for the generated JavaScript.
    |
    */

    'url' => null,

    /*
    |--------------------------------------------------------------------------
    | Filter
    |--------------------------------------------------------------------------
    |
    | The filter function that will be used to determine which routes to include.
    |
    */

    'filter' => null,

    /*
    |--------------------------------------------------------------------------
    | Skip Route Model Binding
    |--------------------------------------------------------------------------
    |
    | Whether to skip route model binding when generating URLs.
    |
    */

    'skip_route_model_binding' => false,
];
