<?php
include 'db.php';
$data=$mysql->query("select student.*,classes.cname from classes,student where student.cname=classes.cname")->fetch_all(1);
echo json_encode($data);