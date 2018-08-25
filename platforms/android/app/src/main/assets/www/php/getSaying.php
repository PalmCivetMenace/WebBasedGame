<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
session_start();
echo $_SESSION['saying'];
?>
