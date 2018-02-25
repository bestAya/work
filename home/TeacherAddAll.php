<?php
include 'db.php';
$data = $_REQUEST['data'];
$str = "(";
for($i=0;$i<count($data);$i++){
    for($j=0;$j<count($data[$i]);$j++){
        $str .= "'{$data[$i][$j]}',";
    }
    $str.="'".md5(123456)."'";
    $str.=') ,(';
}
$str = substr($str,0,-2);
$sql="INSERT INTO `teacher` (`mname`,`dname`,`mpass`) VALUES $str";
$mysql->query($sql);
if($mysql->affected_rows){
    echo 'yes';
}else{
    echo 'no';
}