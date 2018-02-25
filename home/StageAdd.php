<?php
include 'db.php';
$sname=$_POST['sname'];
$did=$_POST['did'];
$mysql->query("INSERT INTO `stage` (`sid`, `sname`,`did`) VALUES (NULL, '$sname','$did')");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}