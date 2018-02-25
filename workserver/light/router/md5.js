var crypto=require("crypto");
function md5(str) {
    var ext=crypto.createHash("md5").update(str).digest("hex");
    return ext;
}
module.exports=md5;
