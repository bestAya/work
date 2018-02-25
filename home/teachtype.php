<?php
include 'db.php';
$data=$mysql->query("select * from `type`")->fetch_all(1);
echo json_encode($data);