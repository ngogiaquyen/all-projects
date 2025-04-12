<?php
class English extends Controller
{
    private $model;
    public function __construct()
    {
        $this->model = $this->createModel("EnglishModel");
    }
    public function read($arg)
    {
        validMethodGET();
        echo json_encode($this->model->readVocabulary($arg));
    }

    public function create($arg)
    {
        validMethodPOST();
        $data = [
            "word" => $_POST["word"],
            "meaning_vi" => $_POST["meaning_vi"],
            "example_en" => $_POST["example_en"],
            "example_vi" => $_POST["example_vi"]
        ];
        if ($this->model->createVocabulary($data)) {
            handleSuccess("Tạo từ vựng mới thành công");
        } else {
            handleError("Có lỗi sảy ra khi tạo từ vựng");
        }

    }
    public function update()
    {
        validMethodPOST();
        $id = $_POST["id"];
        $data = [
            "word" => $_POST["word"],
            "meaning_vi" => $_POST["meaning_vi"],
            "example_en" => $_POST["example_en"],
            "example_vi" => $_POST["example_vi"]
        ];
        if ($this->model->updateVocabulary($data, $id)) {
            handleSuccess("Chỉnh sửa từ vựng mới thành công");
        } else {
            handleError("Có lỗi sảy ra khi chỉnh sửa từ vựng");
        }

    }

    public function delete()
    {
        validMethodPOST();
        $id = $_POST["id"];
        if ($this->model->deleteVocabulary($id)) {
            handleSuccess("Xóa từ vựng mới thành công");
        } else {
            handleError("Có lỗi sảy ra khi xóa từ vựng");
        }

    }

}