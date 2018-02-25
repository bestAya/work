<?php
include 'db.php';
$data=$mysql->query("select teacher.*,direction.dname from direction,teacher where teacher.dname=direction.dname")->fetch_all(1);
echo json_encode($data);