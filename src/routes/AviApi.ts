var express = require('express');
var AviApi = (function () {
    function AviApi(listener, name) {
        this.listener = listener;
        this.name = name;
        this.router = express.Router();
        this.configure();
    }
    AviApi.prototype.configure = function () {
        console.log('aaa');
        this.get();
        this.getById();
    };
    AviApi.prototype.getById = function () {
        var _this = this;
        this.router.get('/' + name + '/:id', function (req, res) {
            _this.listener.getById(req, res);
        });
    };
    AviApi.prototype.get = function () {
        var _this = this;
        this.router.get('/' + name, function (req, res) {
            _this.listener.get(req, res);
        });
    };
    return AviApi;
})();
exports.AviApi = AviApi;
//# sourceMappingURL=AviApi.js.map