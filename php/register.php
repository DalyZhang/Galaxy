<?php
    include_once "global.php";
    include_once "config.php";
    include_once "class/DataRev.php";

    $rtn["type"] = 0;

    $rev = new DataRev;
    $rev->initRegister("name", "gender", "school", "dorm", "tele", "first", "second", "obey", "info");

    try
    {
        $con = new PDO($config["dsn"], $config["user"], $config["password"]);
    }
    catch (PDOException $e)
    {
        exit_with_data();
    }
    $con->query("SET NAMES UTF8");

    $stm = $con->prepare("SELECT `tele` FROM {$config["table"]} WHERE `tele` = ?");
    $stm->execute([$rev->data["tele"]]);
    if($stm->rowCount())
    {
        $rtn["type"] = 2;
        exit_with_data();
    }

    $stm->closeCursor();
    $stm = $con->prepare("INSERT INTO {$config["table"]} (`name`, `gender`, `school`, `dorm`, `tele`, `first`, `second`, `obey`, `info`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stm->execute(array_values($rev->data));

    session_start();
    $_SESSION["tele"] = $rev->data["tele"];
    $rtn["type"] = 1;
    exit_with_data();
?>