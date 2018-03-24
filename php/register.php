<?php
    include "global.php";
    include "connect.php";

    $rtn["type"] = 0;

    if(isset($_POST["data"]))
    {
        $data = new DataRev;
        $data->registerInit($_POST["data"]);
    }
    else
    {
        exitData();
    }

    $datacon = new DataConnect();
    $con = $datacon->con();
    if(!$con)
    {
        exitData();
    }
    mysqli_query($con, "SET NAMES UTF8");

    $stm = mysqli_prepare($con, "SELECT `tele` FROM {$datacon->table} WHERE `tele` = ?");
    mysqli_stmt_bind_param($stm, "s", $tel);
    mysqli_stmt_execute($stm);
    if(mysqli_num_rows(mysqli_stmt_get_result($stm)))
    {
        $rtn["type"] = 2;
        exitData();
    }

    mysqli_stmt_free_result($stm);
    $stm = mysqli_prepare($con, "INSERT INTO {$datacon->table} (`name`, `gender`, `school`, `dorm`, `tele`, `first`, `second`, `obey`, `info`, `time_s`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    mysqli_stmt_bind_param($stm, "siissiiisi", $data->name, $data->gender, $data->school, $data->dorm, $data->tele, $data->first, $data->second, $data->obey, $data->info, $time);
    date_default_timezone_set("Asia/Shanghai");
    $time = time();
    mysqli_stmt_execute($stm);

    session_start();
    $_SESSION["tel"] = $data->tele;
    $rtn["type"] = 1;
    exitData();
?>