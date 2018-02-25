<?php
include 'db.php';
$sid=$_GET['sid'];
$data=$mysql->query("select * from stage where sid=$sid")->fetch_assoc();
echo json_encode($data);