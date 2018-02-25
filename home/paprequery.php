<?php
include 'db.php';
$pid=$_GET['pid'];
$data=$mysql->query("select * from papre where pid=$pid")->fetch_assoc();
echo json_encode($data);