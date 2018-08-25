<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
session_start();
session_unset();
session_destroy();

echo"Done";

?>
