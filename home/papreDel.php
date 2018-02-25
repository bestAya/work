<?php
include 'db.php';
$pid=$_POST['pid'];
$mysql->query("DELETE FROM `papre` WHERE `papre`.`pid` = $pid ");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}