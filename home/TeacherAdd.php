<?php
include 'db.php';
$mname=$_POST['mname'];
$cid=$_POST['cid'];
$did=$_POST['did'];
$sid=$_POST['sid'];
$mysql->query("INSERT INTO `teacher` (`tid`, `mname`,`cid`,`did`,`sid`,`mpass`) VALUES (NULL, '$mname','$cid','$did','$sid',md5(123456))");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}