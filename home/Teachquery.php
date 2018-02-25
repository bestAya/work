<?php
include 'db.php';
$tid=$_GET['tid'];
$data=$mysql->query("select * from teacher where tid=$tid")->fetch_assoc();
echo json_encode($data);