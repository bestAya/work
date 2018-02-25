<?php
include 'db.php';
$pid=$_REQUEST['pid'];
$sql="select test.*,edit.* from test,edit where test.tid=edit.tid and pid=$pid";
$data=$mysql->query($sql)->fetch_all(1);
echo json_encode($data);