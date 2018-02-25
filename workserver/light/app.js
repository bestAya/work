var light=require("ueklight");
require("./router/index")
require("./router/upload");
require('./router/xlrd');
require('./router/client/conter')
var query=require("uekquery");
var body=require("uekpost");
var cookie=require("uekcookie");
var multer=require("uekmulter");
var app=light();
app.use(query());
app.use(body());
app.use(cookie("12312"));
app.use(multer({filename:function () {
    return new Date().getTime();
}}));
app.listen(7777);