<?php

class App
{
    private $controller, $action, $params;

    public function __construct()
    {
        $this->handlerUrl();
    }

    public function getUrl()
    {
        return !empty($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';
    }

    public function handlerUrl()
    {
        $url = $this->getUrl();
        $url_array = array_filter(explode('/', $url));
        $url_array = array_values($url_array);
        if (!empty($url_array[0])) {
            //process find controller 1
            $file_name = ucfirst(strtolower($url_array[0]));
            $path_file = ROOT . '/app/controllers/' . $file_name . '.php';
            if (file_exists($path_file)) {
                require_once $path_file;
                $this->controller = $file_name;
                unset($url_array[0]);
            } else if (!empty($url_array[1])) {
                //process find controller 2
                $file_name = ucfirst(strtolower($url_array[1]));
                $folder = strtolower($url_array[0]);
                $path_file = ROOT . '/app/controllers/' . $folder . '/' . $file_name . '.php';
                if (file_exists($path_file)) {
                    require_once $path_file;
                    $this->controller = $file_name;
                    unset($url_array[0], $url_array[1]);
                }
            }

            //check class
            if (class_exists($this->controller)) {
                $this->controller = new $this->controller;
                $url_array = array_values($url_array);
            }

            //process method
            if (!empty($url_array[0])) {
                $this->action = strtolower($url_array[0]);
            }

            //check method
            if (method_exists($this->controller, $this->action)) {
                unset($url_array[0]);
                $this->params = array_values($url_array);

                if (!empty($_GET)) {
                    $this->params = array_merge($this->params, $_GET);
                }

                if (empty($this->params)) {
                    $this->params = [0];
                }

                // var_dump($this->params);
                // exit;
                call_user_func_array([$this->controller, $this->action], [$this->params]);
            }
        }
    }
}
