<?php
include 'db.php';
$data=$mysql->query("select stage.*,direction.dname from stage,direction where stage.did=direction.did")->fetch_all(1);
echo json_encode($data);