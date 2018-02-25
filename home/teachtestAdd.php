<?php
include 'db.php';
$data=$_REQUEST;
$key=array_keys($_REQUEST);
$str="(";
for ($i=0;$i<count($key);$i++){
    $str.=$key[$i].',';
}
$str.='tpeople) values (';
foreach ($data as $v){
    $str.="'".$v."',";
}
session_start();
$str.="'".$_SESSION['user']."')";
$sql="INSERT INTO `test` $str";
$mysql->query($sql);
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}