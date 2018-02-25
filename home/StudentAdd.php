<?php
include 'db.php';
$mname=$_POST['mname'];
$cname=$_POST['cname'];
$mysql->query("INSERT INTO `student` (`uid`, `mname`,`cname`,`mpass`) VALUES (NULL, '$mname','$cname',md5(123456))");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}