<?php
class Docx extends Controller
{

    public function read()
    {
        validMethodGET();
        $result = handleLoadDocx('test');
        if ($result['success']) {
            handleSuccess("Lấy file thành công", $result['files']); // Danh sách ảnh trong thư mục
        } else {
            handleError($result['message']); // Hiển thị lỗi nếu có
        }

    }



}