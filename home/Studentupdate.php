<?php
include 'db.php';
$uid=$_POST['uid'];
$cname=$_POST['cname'];
$mname=$_POST['mname'];
$mysql->query("UPDATE `student` SET `mname` = '$mname',`cname`='$cname' WHERE `student`.`uid` = $uid");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}