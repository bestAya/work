<?php
include 'db.php';
$cname=$_POST['cname'];
$did=$_POST['did'];
$sid=$_POST['sid'];
$mysql->query("INSERT INTO `classes` (`cid`, `cname`,`sid`,`did`) VALUES (NULL, '$cname','$sid','$did')");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}