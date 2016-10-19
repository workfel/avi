var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AviApi_1 = require("./AviApi");
var History = (function (_super) {
    __extends(History, _super);
    function History() {
        _super.call(this, this, 'history');
    }
    History.prototype.get = function (req, res) {
    };
    History.prototype.getById = function (req, res) {
    };
    return History;
})(AviApi_1.AviApi);
exports.History = History;
//# sourceMappingURL=history.js.map