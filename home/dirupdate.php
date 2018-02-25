<?php
include 'db.php';
$did=$_POST['did'];
$dname=$_POST['dname'];
$mysql->query("UPDATE `direction` SET `dname` = '$dname' WHERE `direction`.`did` = $did");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}