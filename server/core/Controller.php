<?php
class Controller
{
    public function createModel($model)
    {
        $file = ROOT . "/app/models/{$model}.php";
        if (file_exists($file)) {
            require_once $file;
            return new $model();
        }
        return null;
    }

    public function render($path, $data = [])
    {
        $view = ROOT . "/app/views/{$path}.php";
        if (file_exists($view)) {
            extract($data);
            require_once $view;
        } else {
            echo "<h1>404</h1>";
        }
    }
}