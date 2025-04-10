<?php
class Shop extends Controller
{
    private $model;
    public function __construct()
    {
        $this->model = $this->createModel("ShopModel");
    }
    public function read($arg)
    {   
        validMethodGET();
        echo json_encode($this->model->readProducts($arg));
    }
    public function detail ($arg){
        $id = $arg['id'];
        echo json_encode($id);

        echo json_encode($this->model->productDetail($id));
    }
    public function register()
    {
        validApplicant();
        validUserRegister();
        
        $phone = $_POST['phone_number'];
        $birthday = formatDate($_POST['birthday']);
        $message = "<b>Tài khoản</b>: $phone<br><b>Mật khẩu</b>: $birthday<br>Dùng tài khoản để theo dõi ứng tuyển";
        $path = upload();

        $this->user_model->beginTransaction();

        $data = [
            'full_name' => $_POST['full_name'],
            'email' => $_POST['email'],
            'phone_number' => $phone,
            'gender' => $_POST['gender'],
            'birthday' => $_POST['birthday'],
            'cv' => $path,
            'password' => password_hash($birthday, PASSWORD_DEFAULT),
        ];

        $user_id = $this->user_model->register($data);
        
        if (empty($user_id)) {
            $this->user_model->rollback('Đăng ký thất bại, vui lòng thử lại sau');
        }
        
        $newApplicant = [
            'user_id' => $user_id,
            'post_id' => $_POST['post_id'],
        ];
        
        if ($this->model->createApplicant($newApplicant)) {
            $_SESSION['user_id'] = $user_id;
            $_SESSION['phone_number'] = $_POST['phone_number'];
            $this->user_model->commitNotify('Hệ thống cấp tài khoản tự động', $message, true);
        }
        
        $this->user_model->rollback('Đăng ký ứng tuyển thất bại');
    }
}