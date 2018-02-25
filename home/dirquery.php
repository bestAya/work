<?php
include 'db.php';
$did=$_GET['did'];
$data=$mysql->query("select * from direction where did=$did")->fetch_assoc();
echo json_encode($data);