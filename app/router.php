<?php
if (!defined("_ALORESAL_")) {exit;}

$f3->route('GET /', 'UI->index');

//$f3->route('GET /install', 'Aloresal->login');
//$f3->route('POST /install', 'Aloresal->install');
$f3->route('GET /session', 'AloresalFrontEnd->login');
$f3->route('POST /session', 'AloresalFrontEnd->auth');
//$f3->route('GET /register', 'Aloresal->login');
$f3->route('GET /logout', 'AloresalFrontEnd->logout');

$f3->route('GET /lists', 'UI->lists');
$f3->route('GET /ui/@template', 'UI->template');
$f3->route('GET /api/@request', 'Task->@request');

$f3->route('GET /onlinemember', 'AloresalFrontEnd->onlinemember');
$f3->route('GET /errorlog', 'AloresalFrontEnd->errorlog');
$f3->route('POST /chat', 'Chat->alochat');
