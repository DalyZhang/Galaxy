<?php
    include_once "config.php";
    class DataRev
    {
        public $data;
        private static function isFormat($s)
        {
            $f = 
            [
                "name" => function($s) {return is_string($s) && strlen($s) > 0 && mb_strlen($s, "utf-8") < 16;},
                "gender" => function($i) {return is_int($i) && $i > 0 && $i < 3;},
                "school" => function($i) {return is_int($i) && $i > 0 && $i < 29;},
                "dorm" => function($s) {return is_string($s) && preg_match($GLOBALS["config"]["regexp_dorm"], $s);},
                "tele" => function($s) {return is_string($s) && preg_match($GLOBALS["config"]["regexp_tele"], $s);},
                "first" => function($i) {return is_int($i) && $i > 0 && $i < 11;},
                "second" => function($i) {return is_int($i) && $i > -1 && $i < 11;},
                "obey" => function($i) {return is_int($i) && $i > -1 && $i < 2;},
                "info" => function($s) {return is_string($s) && mb_strlen($s, "utf-8") < 101;}
            ];
            return $f[$s];
        }
        public function checkFormat($a)
        {
            if (isset($_POST["data"]))
            {
                $rev = json_decode($_POST["data"], true);
            }
            else
            {
                exit_with_data();
            }
            foreach ($a as $s)
            {
                if (isset($rev[$s]) && self::isFormat($s)($rev[$s]))
                {
                    $this->data[$s] = $rev[$s];
                }
                else
                {
                    exit_with_data();
                }
            }
        }
        public function initRegister()
        {
            $this->checkFormat(func_get_args());
            if($this->data["first"] === $this->data["second"])
            {
                exit_with_data();
            }
            $this->data["dorm"] = preg_filter($GLOBALS["config"]["regexp_dorm"], 'C$1$2 - $3', $this->data["dorm"]);
        }
        public function initQuery()
        {
            $this->checkFormat(func_get_args());
        }
    }
?>