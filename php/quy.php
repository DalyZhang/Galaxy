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
            isset($rev["tele"]) && istele($rev["tele"]) && //$tel
            isset($rev["name"]) && isname($rev["name"]) //$name
        )
    )
    {
        e();
    }

    $con = mysqli_connect("localhost", "root", "", "bbt_task");//////////////////////////////////////////////////
    if(!$con)
    {
        e();
    }
    mysqli_query($con, "SET NAMES UTF8");

    $stm = mysqli_prepare($con, "SELECT * FROM `app_form` WHERE `tele` = ?");
    mysqli_stmt_bind_param($stm, "s", $tel);
    mysqli_stmt_execute($stm);
    $rst = mysqli_stmt_get_result($stm);

    if(mysqli_num_rows($rst))
    {
        $info = mysqli_fetch_assoc($rst);
        if($info["name"] === $name)
        {
            $rtn["type"] = 1;
            $rtn["info"] = $info;
            $rtn["info"]["name"] = htmlspecialchars($rtn["info"]["name"]);
            $rtn["info"]["info"] = htmlspecialchars($rtn["info"]["info"]);
            session_start();
            $_SESSION["tel"] = $tel;
            unset($rtn["info"]["time_s"]);
            unset($rtn["info"]["id"]);
            e();
        }
        else
        {
            $rtn["type"] = 2;
            e();
        }
    }
    else
    {
        e();
    }
?>