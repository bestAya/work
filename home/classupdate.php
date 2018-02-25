<?php
include 'db.php';
$cid=$_POST['cid'];
$sid=$_POST['sid'];
$did=$_POST['did'];
$cname=$_POST['cname'];
$mysql->query("UPDATE `classes` SET `cname` = '$cname',`sid`='$sid',`did`='$did' WHERE `classes`.`cid` = $cid");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}