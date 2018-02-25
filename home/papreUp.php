<?php
include 'db.php';
$pid=$_POST['pid'];
$pname=$_POST['pname'];
$cname=$_POST['cname'];
$mysql->query("UPDATE `papre` SET `pname` = '$pname',`cname` = '$cname' WHERE `papre`.`pid` = $pid");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}