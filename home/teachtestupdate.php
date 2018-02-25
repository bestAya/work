<?php
include 'db.php';
$tid=$_POST['tid'];
$tscore=$_POST['tscore'];
$tanalysis=$_POST['tanalysis'];
$tanswer=$_POST['tanswer'];
$sname=$_POST['sname'];
$type=$_POST['type'];
$options=$_POST['options'];
$mysql->query("UPDATE `test` SET `tscore` = '$tscore',`tanalysis`='$tanalysis',`tanswer` = '$tanswer',`sname`='$sname',`type` = '$type',`options`='$options' WHERE `test`.`tid` = $tid");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}