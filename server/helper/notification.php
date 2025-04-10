<?php function handleError($message, $value = [])
{
    echo json_encode([
        'status' => 'error',
        'title' => 'Đã có lỗi xảy ra',
        'content' => $message,
        "data" => $value
    ]);
    exit;
}
function handleSuccess($message, $value = [])
{
    echo json_encode([
        'status' => 'success',
        'title' => 'Thông báo',
        'content' => $message,
        "data" => $value
    ]);
    exit;
}
function handleNotify($satus, $title, $message, $value = [])
{
    echo json_encode([
        'status' => $title ? 'success' : 'error',
        'title' => $title,
        'content' => $message
    ]);
    exit;
}
function handleMessage($arr)
{
    echo json_encode($arr);
    exit;
}