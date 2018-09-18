"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DetailsError = /** @class */ (function (_super) {
    __extends(DetailsError, _super);
    function DetailsError(message, status, description, details) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = status;
        _this.description = description;
        _this.details = details;
        return _this;
    }
    return DetailsError;
}(Error));
module.exports = DetailsError;
