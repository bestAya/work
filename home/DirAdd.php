<?php
include 'db.php';
$dname=$_POST['dname'];
$mysql->query("INSERT INTO `direction` (`did`, `dname`) VALUES (NULL, '$dname')");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}