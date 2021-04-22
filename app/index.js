"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 3000;
app.get('/', function (req, res) {
    res.send('test eiei');
});
app.listen(port, function () {
    console.info("Ready on port " + port);
}).on("error", function (err) {
    if (err) {
        return console.error(err);
    }
    return console.log("server is listening on " + port);
});
