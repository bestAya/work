<?php
include 'db.php';
$sid=$_POST['sid'];
$sname=$_POST['sname'];
$did=$_POST['did'];
$mysql->query("UPDATE `stage` SET `sname` = '$sname',`did`='$did' WHERE `stage`.`sid` = $sid");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}