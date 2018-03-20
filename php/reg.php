<?php
    include "format.php";

    $rtn["type"] = 0;

    if(isset($_POST["data"]))
    {
        $rev = json_decode($_POST["data"], true);
    }
    else
    {
        e();
    }

    if
    (
        !(
            isset($rev["name"]) && isname($rev["name"]) && //$name
            isset($rev["gender"]) && isgender($rev["gender"]) && //$gen
            isset($rev["school"]) && isschool($rev["school"]) && //$scl
            isset($rev["dorm"]) && isdorm($rev["dorm"]) && //$drm
            isset($rev["tele"]) && istele($rev["tele"]) && //$tel
            isset($rev["first"]) && isfirst($rev["first"]) && //$fst
            isset($rev["second"]) && issecond($rev["second"]) && //$sec
            isset($rev["obey"]) && isobey($rev["obey"]) && //$obey
            isset($rev["info"]) && isinfo($rev["info"]) //$info
        )
    )
    {
        e();
    }

    if($fst === $sec)
    {
        e();
    }

    $con = mysqli_connect("localhost", "root", "", "bbt_task");//////////////////////////////////////////////////
    if(!$con)
    {
        e();
    }
    mysqli_query($con, "SET NAMES UTF8");

    $stm = mysqli_prepare($con, "SELECT `tele` FROM `app_form` WHERE `tele` = ?");
    mysqli_stmt_bind_param($stm, "s", $tel);
    mysqli_stmt_execute($stm);
    if(mysqli_num_rows(mysqli_stmt_get_result($stm)))
    {
        $rtn["type"] = 2;
        e();
    }

    mysqli_stmt_free_result($stm);
    $stm = mysqli_prepare($con, "INSERT INTO `app_form` (`name`, `gender`, `school`, `dorm`, `tele`, `first`, `second`, `obey`, `info`, `time_s`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    mysqli_stmt_bind_param($stm, "siissiiisi", $name, $gen, $scl, $drm, $tel, $fst, $sec, $obey, $info, $time);
    date_default_timezone_set("Asia/Shanghai");
    $time = time();
    mysqli_stmt_execute($stm);

    session_start();
    $_SESSION["tel"] = $tel;
    $rtn["type"] = 1;
    e();
?>