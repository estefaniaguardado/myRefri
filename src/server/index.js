"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var express_flash_1 = __importDefault(require("express-flash"));
var passport_1 = __importDefault(require("passport"));
var debug_1 = __importDefault(require("debug"));
var http = debug_1.default('http');
var body_parser_1 = __importDefault(require("body-parser"));
var express_session_1 = __importDefault(require("express-session"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var routes_1 = __importDefault(require("./routes"));
require("./services/auth");
var app = express_1.default();
app.set('view engine', 'pug');
app.set('views', path_1.default.join(__dirname, '/views'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
app.use(express_session_1.default({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(express_flash_1.default());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(routes_1.default);
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '../client')));
app.use(function (error, req, res, next) {
    res.status(error.statusCode || 500);
    if (req.accepts('text/html')) {
        return res.render('error', { error: error });
    }
    else if (req.accepts('application/json')) {
        return res.json(__assign({}, error, { name: error.message }));
    }
    return next(error);
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    debug_1.default("App is listening in port " + port);
});
module.exports = app;
