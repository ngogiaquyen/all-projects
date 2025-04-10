<?php
//methods
function validMethodPOST()
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        handleError('Phương thức không hợp lệ');
    }
}
function validMethodGET()
{
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        handleError('Phương thức không hợp lệ');
    }
}
//posts
function validPostCreate()
{
    validMethodPOST();
    if (empty($_POST['title'])) {
        handleError('Tiêu đề không được để trống');
    }
    if (empty($_POST['salary'])) {
        handleError('Lương không được để trống');
    }
    if (empty($_POST['location'])) {
        handleError('Vị trí không được để trống');
    }
    if (empty($_POST['experience'])) {
        handleError('Kinh nghiệm không được để trống');
    }
    if (empty($_POST['expiration_date'])) {
        handleError('Ngày hết hạn không được để trống');
    }
    if (empty($_POST['content'])) {
        handleError('Nội dung không được để trống');
    }
}
function validPostUpdate()
{
    validMethodPOST();
    if (empty($_POST['id']) || !is_numeric($_POST['id'])) {
        handleError('Vui lòng chọn một bài viết');
    }
    if (empty($_POST['title'])) {
        handleError('Tiêu đề không được để trống');
    }
    if (empty($_POST['salary'])) {
        handleError('Lương không được để trống');
    }
    if (empty($_POST['location'])) {
        handleError('Vị trí không được để trống');
    }
    if (empty($_POST['experience'])) {
        handleError('Kinh nghiệm không được để trống');
    }
    if (empty($_POST['expiration_date'])) {
        handleError('Ngày hết hạn không được để trống');
    }
    if (empty($_POST['content'])) {
        handleError('Nội dung không được để trống');
    }
}
function validPostDelete()
{
    validMethodPOST();
    if (empty($_POST['id']) || !is_numeric($_POST['id'])) {
        handleError('Vui lòng chọn một bài viết');
    }
}
//users
function validUserLogin()
{
    validMethodPOST();
    if (empty($_POST['phone_number'])) {
        handleError('Số điện thoại không được để trống');
    }
    if (empty($_POST['password'])) {
        handleError('Mật khẩu không được để trống');
    }
}
function validUserRegister()
{
    validMethodPOST();
    if (empty($_POST['full_name'])) {
        handleError('Tên đầy đủ không được để trống');
    }
    if (empty($_POST['email'])) {
        handleError('Email không được để trống');
    }
    if (empty($_POST['phone_number'])) {
        handleError('Số điện thoại không được để trống');
    }
    if (strlen($_POST['phone_number']) !== 10) {
        handleError('Số điện thoại không hợp lệ');
    }
    if (empty($_POST['gender'])) {
        handleError('Giới tính không được để trống');
    }
    if (empty($_POST['birthday'])) {
        handleError('Sinh nhật không được để trống');
    }
    if (!isset($_FILES['cv']) || $_FILES['cv']['error'] != UPLOAD_ERR_OK) {
        handleError('CV không được để trống');
    }
    // if (empty($_POST['password'])) {
    //     handleError('Mật khẩu không được để trống');
    // }
    // if (strlen($_POST['password']) < 8) {
    //     handleError('Mật khẩu phải dài trên 8 ký tự');
    // }
    // if (!preg_match('/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/', $_POST['password'])) {
    //     handleError('Mật khẩu phải chứa ít nhất 1 ký tự hoa, 1 ký tự chữ thường, 1 số và 1 ký tự đặc biệt');
    // }
    // if (empty($_POST['repeat_password'])) {
    //     handleError('Nhập lại mật khẩu không được để trống');
    // }
    // if ($_POST['repeat_password'] !== $_POST['password']) {
    //     handleError('Mật khẩu không khớp');
    // }
}
//file types
function validType($type)
{
    $allowed_types = ['jpg', 'jpeg', 'png', 'pdf'];
    if (!in_array($type, $allowed_types)) {
        handleError('Chỉ chấp nhận JPG, JEPG, PNG, PDF');
    }
}
//applicants
function validApplicant()
{
    validMethodPOST();
    if (empty($_POST['post_id'])) {
        handleError('Thao tác không hợp lệ');
    }
}
//interviews
function validInterview()
{
    validMethodPOST();

    if (empty($_POST['interview_datetime'])) {
        handleError('Ngày, giờ phỏng vấn không hợp lệ');
    }
    if (empty($_POST['interview_type'])) {
        handleError('Loại phỏng vấn không được để trống');
    }
    if (empty($_POST['interview_location'])) {
        handleError('Địa điểm phỏng vấn không được để trống');
    }
    if (empty($_POST['interviewers'])) {
        handleError('Vui lòng chọn người phỏng vấn');
    }
    if (empty($_POST['required_documents'])) {
        handleError('Văn bản yêu cầu không được để trống');
    }
}
function validInterviewUpdate()
{
    if (empty($_POST['id'])) {
        handleError('Vui lòng chọn một cuộc phỏng vấn');
    }
    validInterview();
}
function validInterviewDelete()
{
    validMethodPOST();
    if (empty($_POST['id'])) {
        handleError('Vui lòng chọn một cuộc phỏng vấn');
    }
}
//candidates
function validCandidate()
{
    validMethodPOST();
    if (empty($_POST['interview_id'])) {
        handleError('Vui lòng chọn một buổi phóng vấn');
    }
    if (empty($_POST['applicant_id'])) {
        handleError('Vui lòng chọn ứng viên');
    }
}