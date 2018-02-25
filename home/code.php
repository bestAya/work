<?php
class Code{
    public $img;
    public $lette='1234567890qwertyuiopasdfghjklzxcvbnm';
    public $linenum=4;
    public $dian=40;
    public $height=30;
    public $width=100;
    public $fontfile='font.ttf';
    public $result;

    function cout(){
        $this->img=imagecreatetruecolor($this->width,$this->height);
        $arr=$this->bgcolor();
        $color=imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
        imagefill($this->img,0,0,$color);
        for($i=0;$i<$this->linenum;$i++){
            $x1=mt_rand(1,$this->width/2);
            $x2=mt_rand($this->width/2,$this->width);
            $y1=mt_rand(1,$this->height/2);
            $y2=mt_rand($this->height/2,$this->height);
            $arr=$this->bgcolor();
            $linecolor=imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
            if($i>$this->linenum/2){
                imageline($this->img,$x2,$y1,$x1,$y2,$linecolor);
            }else{
                imageline($this->img,$x1,$y2,$x2,$y1,$linecolor);
            }
        }
        for($i=0;$i<$this->dian;$i++){
            $arr=$this->bgcolor();
            $pxcolor=imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
            imagesetpixel($this->img,mt_rand(0,100),mt_rand(0,30),$pxcolor);
        }



    }
    function drarText(){
        $x=$this->width/4;
        $y=$this->height/4;
        $result=$this->getchars();
        for($i=0;$i<4;$i++){
            $arr=$this->fontcolor();
            $color=imagecolorallocate($this->img,$arr[0],$arr[1],$arr[2]);
            imagettftext($this->img,mt_rand(14,25),mt_rand(-15,15),$x*$i+5,$y+18,$color,$this->fontfile,substr($result,$i,1));
        }
    }
    function getchars(){
        $len=strlen($this->lette)-1;
        substr($this->lette,mt_rand(0,$len),1);
        $str='';
        for($i=0;$i<4;$i++){
            $str.=substr($this->lette,mt_rand(0,$len),1);
        }
        $this->result=strtolower($str);
        return $str;
    }
    function bgcolor(){
        $arr=[];
        $arr[0]=mt_rand(0,107);
        $arr[1]=mt_rand(0,107);
        $arr[2]=mt_rand(0,107);
        return $arr;
    }
    function fontcolor(){
        $arr=[];
        $arr[0]=mt_rand(108,255);
        $arr[1]=mt_rand(108,255);
        $arr[2]=mt_rand(108,255);
        return $arr;
    }
    function outPut(){
        header('Content-type:image/png');
        $this->cout();
        $this->drarText();
        imagepng($this->img);
        imagedestroy($this->img);
    }

}
$code=new Code();
$code->outPut();
session_start();
$_SESSION['code']=strtolower($code->result);
