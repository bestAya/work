<?php
include 'db.php';
$tid=$_REQUEST['tids'];
$pid=$_REQUEST['pid'];
$answer=$_REQUEST['answer'];
session_start();
$uid=$_SESSION['uid'];
$str='';
for($i=0;$i<count($tid);$i++){
    $str.="(NULL,".$uid.','.$pid.','.$tid[$i].',';
    for($j=0;$j<count($answer['title'.$i]);$j++){
        if($answer['title'.$i][$j]){

            $str.="'".$answer["title".$i][$j]."'";
        }
    }
    $str.="),";
}
$str=substr($str,0,-1);
$sql="INSERT INTO `over` (`oid`,`user`,`pid`,`tid`,`answer`) VALUES $str";
echo $sql;
$mysql->query($sql);
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}