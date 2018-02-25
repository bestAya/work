var obj={
    install(v,data) {
        v.prototype.get = function (data) {
            return data++;
        };
        v.prototype.set = function (data) {
            return data--;
        };
    }

}
export default obj;