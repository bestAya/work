<?php
include 'db.php';
$uid=$_GET['uid'];
$data=$mysql->query("select * from student where uid=$uid")->fetch_assoc();
echo json_encode($data);