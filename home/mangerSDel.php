<?php
include 'db.php';
$cid=$_POST['cid'];
$mysql->query("DELETE FROM `classes` WHERE `classes`.`cid` = $cid ");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}