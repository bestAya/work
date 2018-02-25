<?php
include 'db.php';
$did=$_REQUEST['ids'];
$dis=implode(',',$did);
$sql="DELETE FROM `student` WHERE `student`.`uid` IN({$dis})";
$mysql->query($sql);
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}