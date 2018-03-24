<?php
    include "global.php";
    include "connect.php";

    $rtn["type"] = 0;

    session_start();
    if(!isset($_SESSION["tel"]))
    {
        exitData();
    }
    
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

    if($_SESSION["tel"] !== $data->tele)
    {
        $stm = mysqli_prepare($con, "SELECT * FROM {$datacon->table} WHERE `tele` = ?");
        mysqli_stmt_bind_param($stm, "s", $data->tele);
        mysqli_stmt_execute($stm);
        if(mysqli_num_rows(mysqli_stmt_get_result($stm)))
        {
            $rtn["type"] = 2;
            exitData();
        }
        mysqli_stmt_free_result($stm);
    }

    $stm = mysqli_prepare($con, "UPDATE {$datacon->table} SET `name` = ?, `gender` = ?, `school` = ?, `dorm` = ?, `tele` = ?, `first` = ?, `second` = ?, `obey` = ?, `info` = ? WHERE `tele` = ?");
    mysqli_stmt_bind_param($stm, "siissiiiss", $data->name, $data->gender, $data->school, $data->dorm, $data->tele, $data->first, $data->second, $data->obey, $data->info, $_SESSION["tel"]);
    mysqli_stmt_execute($stm);
    $_SESSION["tel"] = $data->tele;
    $rtn["type"] = 1;
    exitData();
?>