<?php

foreach (glob("./configs/*.php") as $file) {
    require_once $file;
}

foreach (glob("./helper/*.php") as $file) {
    require_once $file;
}

foreach (glob("./core/*.php") as $file) {
    require_once $file;
}

require_once ROOT . '/app/App.php';