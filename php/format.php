<?php
    function e()
    {
        exit(json_encode($GLOBALS["rtn"]));
    }
    
    function isname($s)
    {
        if($b = is_string($s) && strlen($s) > 0 && strlen($s) < 16)
        {
            $GLOBALS["name"] = $s;
        }
        return $b;
    }

    function isgender($i)
    {
        if($b = is_int($i) && $i > 0 && $i < 3)
        {
            $GLOBALS["gen"] = $i;
        }
        return $b;
    }

    function isschool($i)
    {
        if($b = is_int($i) && $i > 0 && $i < 29)
        {
            $GLOBALS["scl"] = $i;
        }
        return $b;
    }

    function isdorm($s)
    {
        if($b = is_string($s) && preg_match("/^C([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i", $s))
        {
            $GLOBALS["drm"] = preg_filter("/^C([1-9]|1[0-9]) *(东|西)? *-? *([1-9][0-9]{2}) *$/i", 'C$1$2 - $3', $s);
        }
        return $b;
    }

    function istele($s)
    {
        if($b = is_string($s) && preg_match("/^1[0-9]{10}$/", $s))
        {
            $GLOBALS["tel"] = $s;
        }
        return $b;
    }

    function isfirst($i)
    {
        if($b = is_int($i) && $i > 0 && $i < 11)
        {
            $GLOBALS["fst"] = $i;
        }
        return $b;
    }

    function issecond($i)
    {
        if($b = is_int($i) && $i > -1 && $i < 11)
        {
            $GLOBALS["sec"] = $i;
        }
        return $b;
    }

    function isobey($i)
    {
        if($b = is_int($i) && $i > -1 && $i < 2)
        {
            $GLOBALS["obey"] = $i;
        }
        return $b;
    }

    function isinfo($s)
    {
        if($b = is_string($s) && strlen($s) < 101)
        {
            $GLOBALS["info"] = $s;
        }
        return $b;
    }
?>