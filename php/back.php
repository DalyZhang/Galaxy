<?php
    session_start();
    if(isset($_SESSION["tel"]))
    {
        unset($_SESSION["tel"]);
    }
?>