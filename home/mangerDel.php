<?php
include 'db.php';
$did=$_POST['did'];
$mysql->query("DELETE FROM `direction` WHERE `direction`.`did` = $did ");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}