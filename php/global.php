<?php
    function exit_with_data()
    {
        exit(json_encode($GLOBALS["rtn"]));
    }
?>