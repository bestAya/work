<?php
include 'db.php';
$cid=$_GET['cid'];
$data=$mysql->query("select * from classes where cid=$cid")->fetch_assoc();
echo json_encode($data);