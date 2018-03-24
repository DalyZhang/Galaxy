<?php
    include "global.php";
    include "connect.php";

    $rtn["type"] = 0;
    
    if(isset($_POST["data"]))
    {
        $data = new DataRev;
        $data->queryInit($_POST["data"]);
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

    $stm = mysqli_prepare($con, "SELECT * FROM {$datacon->table} WHERE `tele` = ?");
    mysqli_stmt_bind_param($stm, "s", $data->tele);
    mysqli_stmt_execute($stm);
    $rst = mysqli_stmt_get_result($stm);

    if(mysqli_num_rows($rst))
    {
        $info = mysqli_fetch_assoc($rst);
        if($info["name"] === $data->name)
        {
            $rtn["type"] = 1;
            $rtn["info"] = $info;
            $rtn["info"]["name"] = htmlspecialchars($rtn["info"]["name"]);
            $rtn["info"]["info"] = htmlspecialchars($rtn["info"]["info"]);
            session_start();
            $_SESSION["tel"] = $data->tele;
            unset($rtn["info"]["time_s"]);
            unset($rtn["info"]["id"]);
            exitData();
        }
        else
        {
            $rtn["type"] = 2;
            exitData();
        }
    }
    else
    {
        exitData();
    }
?>