const Url = require('url');
var query=require('querystring')
module.exports=function(){
    return function(req,res,reslove){
        var url=req.url;
        var qstring=Url.parse(url).query;
        var qobj=(query.parse(qstring));
        req.query={};
        for(var i in qobj){
            req.query[i]=qobj[i];
        }
        reslove();
    }
}