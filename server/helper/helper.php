<?php
//format date
function formatDate($date)
{
    if (!is_string($date)) {
        return '01011990';
    }

    $arr = explode('-', $date);
    return count($arr) === 3 ? sprintf('%02d%02d%02d', $arr[2], $arr[1], $arr[0]) : '01011990';
}
//upload file
$target_file = '';
function upload()
{
    global $target_file;

    if (!isset($_FILES['cv']) || $_FILES['cv']['error'] != UPLOAD_ERR_OK) {
        handleError('Có lỗi xảy ra khi tải lên tệp.');
    }

    $file_name = basename($_FILES['cv']['name']);
    $file_type = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    validType($file_type);

    $unique_file_name = uniqid() . '_' . $file_name;
    $target_path = ROOT . '/public/uploads/';
    $target_file = $target_path . $unique_file_name;

    if (!is_dir($target_path)) {
        handleError('Thư mục đích không tồn tại');
    }

    if (!is_writable($target_path)) {
        handleError('Thư mục không có quyền ghi');
    }

    if (move_uploaded_file($_FILES['cv']['tmp_name'], $target_file)) {
        return $unique_file_name;
    } else {
        handleError('Có lỗi xảy ra khi di chuyển tệp tải lên.');
    }
}
function unload()
{
    global $target_file;

    if (file_exists($target_file)) {
        unlink($target_file);
    }
}

function removeFields($result, $fields)
{
    if (!is_array($result) || empty($fields)) {
        return $result;
    }

    $role_name = ['Trống', 'Ứng viên', 'Nhân viên', 'Phó phòng nhân sự', 'Trưởng phòng Nhân sự', 'Phó giám đốc', 'Giám đốc'];

    if ($result[0] && is_array($result[0])) {
        return array_map(function ($item) use ($fields, $role_name) {
            foreach ($fields as $field) {
                unset($item[$field]);
            }

            if (isset($item['role'])) {
                $item['role'] = $role_name[$item['role']];
            }

            return $item;
        }, $result);
    }

    foreach ($fields as $field) {
        unset($result[$field]);
    }

    if (isset($result['role'])) {
        $result['role'] = $role_name[$result['role']];
    }

    return $result;
}

function checkLogin($conn)
{
    if (!isset($_SESSION['user_id'])) {
        if (!isset($_COOKIE['user_id'])) {
            handleError("Bạn chưa đăng nhập");
            return false;
        }

        // Kiểm tra user_id trong database
        $stmt = $conn->prepare("SELECT id FROM users WHERE id = :id");
        $stmt->execute(['id' => $_COOKIE['user_id']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            http_response_code(403); // Forbidden
            handleError("Người dùng không hợp lệ");
            return false;
        }

        // Gán user_id vào session
        $_SESSION['user_id'] = $_COOKIE['user_id'];
    }

    return true;
}


function uploadImage($inputName, $folder, $require = true)
{
    // Kiểm tra xem có tệp ảnh nào được tải lên không
    if (!isset($_FILES[$inputName]) || $_FILES[$inputName]['error'] !== UPLOAD_ERR_OK) {
        if ($require) {
            handleError('Không có tệp ảnh nào được tải lên hoặc có lỗi trong quá trình tải lên');
        } else {
            return ['success' => false];
        }
    }

    // Danh sách các loại ảnh hợp lệ
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $fileType = mime_content_type($_FILES[$inputName]['tmp_name']);

    if (!in_array($fileType, $allowedTypes)) {
        handleError('Chỉ hỗ trợ JPG, PNG, GIF, WEBP');
    }

    // Giới hạn kích thước ảnh (tối đa 5MB)
    $maxSize = 5 * 1024 * 1024; // 5MB
    if ($_FILES[$inputName]['size'] > $maxSize) {
        handleError('Kích thước ảnh quá lớn. Giới hạn 5MB');
    }

    // Đường dẫn thư mục lưu ảnh
    $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/$folder/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }

    // Đặt tên file mới tránh trùng lặp
    $fileName = pathinfo($_FILES[$inputName]['name'], PATHINFO_FILENAME);
    $fileExt = pathinfo($_FILES[$inputName]['name'], PATHINFO_EXTENSION);
    $newFileName = uniqid() . "_" . preg_replace("/[^a-zA-Z0-9]/", "_", $fileName) . "." . $fileExt;
    $targetFilePath = $targetDir . $newFileName;
    $targetSave = "$folder/" . $newFileName;

    // Di chuyển tệp ảnh vào thư mục đích
    if (!move_uploaded_file($_FILES[$inputName]['tmp_name'], $targetFilePath)) {
        handleError('Không thể tải tệp ảnh lên, vui lòng thử lại');
    }

    return ['success' => true, 'img_url' => $targetSave];
}

function handleLoadImg($folder)
{
    $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/$folder/";

    // Kiểm tra xem thư mục có tồn tại không
    if (!is_dir($targetDir)) {
        return ['success' => false, 'message' => 'Thư mục không tồn tại'];
    }

    // Lấy danh sách tất cả các tệp trong thư mục
    $files = array_diff(scandir($targetDir), ['.', '..']);

    // Lọc chỉ lấy các tệp ảnh
    $imageFiles = [];
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    foreach ($files as $file) {
        $filePath = $targetDir . $file;
        $fileExt = strtolower(pathinfo($file, PATHINFO_EXTENSION));

        if (in_array($fileExt, $allowedTypes) && is_file($filePath)) {
            $imageFiles[] = "$folder/$file"; // Trả về đường dẫn tương đối
        }
    }

    if (empty($imageFiles)) {
        return ['success' => false, 'message' => 'Không tìm thấy ảnh nào'];
    }

    return ['success' => true, 'images' => $imageFiles];
}

function deleteImage($imagePath)
{
    $filePath = $_SERVER['DOCUMENT_ROOT'] . "/" . ltrim($imagePath, "/");

    // Kiểm tra xem tệp có tồn tại không
    if (!file_exists($filePath)) {
        handleError('Ảnh không tồn tại');
    }

    // Xóa tệp ảnh
    if (!unlink($filePath)) {
        handleError('Không thể xóa ảnh');
    }

    handleSuccess('Ảnh đã được xóa thành công');
}
function copyImage($imagePath, $destinationFolder)
{
    $sourcePath = $_SERVER['DOCUMENT_ROOT'] . "/" . ltrim($imagePath, "/");
    $destinationDir = $_SERVER['DOCUMENT_ROOT'] . "/" . ltrim($destinationFolder, "/");
    // Kiểm tra xem tệp nguồn có tồn tại không
    if (!file_exists($sourcePath)) {
        handleError('Ảnh nguồn không tồn tại');
    }

    // Kiểm tra và tạo thư mục đích nếu chưa tồn tại
    if (!is_dir($destinationDir)) {
        mkdir($destinationDir, 0755, true);
    }

    // Tạo tên file mới trong thư mục đích
    $fileName = basename($sourcePath);
    $newFilePath = $destinationDir . "/" . $fileName;
    $newFileUrl = $destinationFolder . "/" . $fileName;

    // Thực hiện sao chép tệp
    if (!copy($sourcePath, $newFilePath)) {
        handleError('Không thể sao chép ảnh');
    }

    return ['success' => true, 'new_img_url' => $newFileUrl];
}

function extractImageUrls($text)
{
    $pattern = '/!\[[^\]]*\]\(([^)]+)\)/'; // Biểu thức chính quy để tìm URL trong Markdown
    preg_match_all($pattern, $text, $matches);

    return $matches[1] ?? []; // Trả về mảng các URL ảnh
}

function handleLoadAudio($folder)
{
    $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/$folder/";

    // Kiểm tra xem thư mục có tồn tại không
    if (!is_dir($targetDir)) {
        return ['success' => false, 'message' => 'Thư mục không tồn tại'];
    }

    // Lấy danh sách tất cả các tệp trong thư mục
    $files = array_diff(scandir($targetDir), ['.', '..']);

    // Lọc chỉ lấy các tệp âm thanh
    $audioFiles = [];
    $allowedTypes = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'];

    foreach ($files as $file) {
        $filePath = $targetDir . $file;
        $fileExt = strtolower(pathinfo($file, PATHINFO_EXTENSION));

        if (in_array($fileExt, $allowedTypes) && is_file($filePath)) {
            $audioFiles[] = "$folder/$file"; // Trả về đường dẫn tương đối
        }
    }

    if (empty($audioFiles)) {
        return ['success' => false, 'message' => 'Không tìm thấy file âm thanh nào'];
    }

    return ['success' => true, 'audio' => $audioFiles];
}


function handleLoadDocx($folder)
{
    $targetDir = $_SERVER['DOCUMENT_ROOT'] . "/$folder/";

    // Kiểm tra thư mục có tồn tại không
    if (!is_dir($targetDir)) {
        return ['success' => false, 'message' => 'Thư mục không tồn tại'];
    }

    // Lấy danh sách các tệp trong thư mục
    $files = array_diff(scandir($targetDir), ['.', '..']);

    // Lọc chỉ lấy các tệp DOCX
    $docxFiles = [];
    $allowedTypes = ['docx'];

    foreach ($files as $file) {
        $filePath = $targetDir . $file;
        $fileExt = strtolower(pathinfo($file, PATHINFO_EXTENSION));

        if (in_array($fileExt, $allowedTypes) && is_file($filePath)) {
            $docxFiles[] = "$folder/$file"; // Trả về đường dẫn tương đối
        }
    }

    if (empty($docxFiles)) {
        return ['success' => false, 'message' => 'Không tìm thấy tệp DOCX nào'];
    }

    return ['success' => true, 'files' => $docxFiles];
}
