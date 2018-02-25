<?php
include 'db.php';
$data=$mysql->query("select classes.*,stage.sname,direction.dname from classes,stage,direction where classes.sid=stage.sid and classes.did=direction.did")->fetch_all(1);
echo json_encode($data);