<?php
include 'db.php';
$did=$_REQUEST['ids'];
$dis=implode(',',$did);
$sql="DELETE FROM `test` WHERE `test`.`tid` IN({$dis})";
$mysql->query($sql);
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}