<?php
include 'db.php';
$cname=$_POST['cname'];
$pname=$_POST['pname'];
$mysql->query("INSERT INTO `papre` (`pid`, `cname`,`pname`) VALUES (NULL, '$cname','$pname')");
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}