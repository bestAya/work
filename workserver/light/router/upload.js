var light=require('ueklight');
var router=light.Router();
router.post('/home/upload',function (req,res) {
    var relPath=res.upInfo.relPath;
    res.send(relPath)
})