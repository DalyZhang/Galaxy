<?php
    include_once "global.php";
    include_once "config.php";
    include_once "class/DataRev.php";

    $rtn["type"] = 0;
    
    $rev = new DataRev;
    $rev->initQuery("name", "tele");
    
    try
    {
        $con = new PDO($config["dsn"], $config["user"], $config["password"]);
    }
    catch (PDOException $e)
    {
        exit_with_data();
    }
    $con->query("SET NAMES UTF8");

    $stm = $con->prepare("SELECT * FROM {$config["table"]} WHERE `tele` = ?");
    $stm->execute([$rev->data["tele"]]);

    if($stm->rowCount())
    {
        $info = $stm->fetch(PDO::FETCH_ASSOC);
        if($info["name"] === $rev->data["name"])
        {
            $rtn["type"] = 1;
            $rtn["info"] = $info;
            $rtn["info"]["name"] = htmlspecialchars($rtn["info"]["name"]);
            $rtn["info"]["info"] = htmlspecialchars($rtn["info"]["info"]);
            session_start();
            $_SESSION["tele"] = $rev->data["tele"];
            unset($rtn["info"]["time_s"]);
            unset($rtn["info"]["id"]);
        }
        else
        {
            $rtn["type"] = 2;
        }
    }
    exit_with_data();
?>