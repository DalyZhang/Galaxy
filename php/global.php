<?php
    class DataRev
    {
        var $name, $gender, $school, $dorm, $tele, $first, $second, $obey, $info;
        public function registerInit($json)
        {
            $rev = json_decode($json, true);
            if(!(
                isset($rev["name"]) && $this->isname($rev["name"]) && //$name
                isset($rev["gender"]) && $this->isgender($rev["gender"]) && //$gen
                isset($rev["school"]) && $this->isschool($rev["school"]) && //$scl
                isset($rev["dorm"]) && $this->isdorm($rev["dorm"]) && //$drm
                isset($rev["tele"]) && $this->istele($rev["tele"]) && //$tel
                isset($rev["first"]) && $this->isfirst($rev["first"]) && //$fst
                isset($rev["second"]) && $this->issecond($rev["second"]) && //$sec
                isset($rev["obey"]) && $this->isobey($rev["obey"]) && //$obey
                isset($rev["info"]) && $this->isinfo($rev["info"]) //$info
            ))
            {
                exitData();
            }
            if($this->first === $this->second)
            {
                exitData();
            }
        }
        public function queryInit($json)
        {
            $rev = json_decode($json, true);
            if(!(
                isset($rev["name"]) && $this->isname($rev["name"]) && //$name
                isset($rev["tele"]) && $this->istele($rev["tele"])//$tel
            ))
            {
                exitData();
            }
        }
        private function isname($s)
        {
            if($b = is_string($s) && strlen($s) > 0 && mb_strlen($s) < 16)
            {
                $this->name = $s;
            }
            return $b;
        }
        private function isgender($i)
        {
            if($b = is_int($i) && $i > 0 && $i < 3)
            {
                $this->gender = $i;
            }
            return $b;
        }
        private function isschool($i)
        {
            if($b = is_int($i) && $i > 0 && $i < 29)
            {
                $this->school = $i;
            }
            return $b;
        }
        private function isdorm($s)
        {
            if($b = is_string($s) && preg_match("/^C([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i", $s))
            {
                $this->dorm = preg_filter("/^C([1-9]|1[0-9]) *(东|西)? *-? *([1-9][0-9]{2}) *$/i", 'C$1$2 - $3', $s);
            }
            return $b;
        }
        private function istele($s)
        {
            if($b = is_string($s) && preg_match("/^1[0-9]{10}$/", $s))
            {
                $this->tele = $s;
            }
            return $b;
        }
        private function isfirst($i)
        {
            if($b = is_int($i) && $i > 0 && $i < 11)
            {
                $this->first = $i;
            }
            return $b;
        }
        private function issecond($i)
        {
            if($b = is_int($i) && $i > -1 && $i < 11)
            {
                $this->second = $i;
            }
            return $b;
        }
        private function isobey($i)
        {
            if($b = is_int($i) && $i > -1 && $i < 2)
            {
                $this->obey = $i;
            }
            return $b;
        }
        private function isinfo($s)
        {
            if($b = is_string($s) && mb_strlen($s) < 101)
            {
                $this->info = $s;
            }
            return $b;
        }
    }

    function exitData()
    {
        exit(json_encode($GLOBALS["rtn"]));
    }
?>