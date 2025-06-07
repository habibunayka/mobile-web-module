<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$events = [];
for ($i = 1; $i <= 50; $i++) {
    $date = date('Y-m-d', strtotime("-$i days"));
    $events[] = [
        'id' => $i,
        'title' => "Event ke-$i",
        'date' => $date,
        'image' => "https://plakatkunst.com/cdn/shop/files/100x100-massiv-eg.jpg?v=1748476870&width=500"
    ];
}

$begin = $_GET['beginning_date'] ?? null;
$end = $_GET['ending_date'] ?? null;
$page = (int)($_GET['page'] ?? 1);
$limit = 10;

if ($begin) {
    $events = array_filter($events, fn($e) => $e['date'] >= $begin);
}
if ($end) {
    $events = array_filter($events, fn($e) => $e['date'] <= $end);
}

$events = array_values($events);
$total = count($events);
$start = ($page - 1) * $limit;
$paginated = array_slice($events, $start, $limit);

function safeParam($key) {
    return urlencode($_GET[$key] ?? '');
}

$response = [
    'events' => $paginated,
    'pages' => [
        'prev' => $page > 1
            ? "module_mobile_api.php?beginning_date=" . safeParam('beginning_date') .
              "&ending_date=" . safeParam('ending_date') . "&page=" . ($page - 1)
            : null,
        'next' => $start + $limit < $total
            ? "module_mobile_api.php?beginning_date=" . safeParam('beginning_date') .
              "&ending_date=" . safeParam('ending_date') . "&page=" . ($page + 1)
            : null,
    ]
];

echo json_encode($response, JSON_PRETTY_PRINT);
