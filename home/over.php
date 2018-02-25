<?php
include 'db.php';
session_start();
$uid=$_SESSION['uid'];
$cname=$_SESSION['cname'];
$sql1="select * from (select * from papre where `cname`= '$cname' ) as lb where pid not in (select distinct pid from over where user='$uid')";
$data=$mysql->query($sql1)->fetch_all(1);
echo json_encode($data);