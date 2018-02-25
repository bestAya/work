<?php
include 'db.php';
$tid=$_POST['tid'];
$dname=$_POST['dname'];
$mname=$_POST['mname'];
$mysql->query("UPDATE `teacher` SET `mname` = '$mname',`dname`='$dname' WHERE `teacher`.`tid` = $tid");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}