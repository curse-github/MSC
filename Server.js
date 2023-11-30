"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Colors = /** @class */ (function () {
    function Colors() {
    }
    Colors.Reset = "\x1b[0m";
    Colors.Bright = "\x1b[1m";
    Colors.Underscore = "\x1b[4m";
    Colors.Reverse = "\x1b[7m";
    //static Dim       :string = "\x1b[2m";//does not work at all
    //static Blink     :string = "\x1b[5m";//does not work at all
    //static Hidden    :string = "\x1b[8m";//does not work at all
    Colors.R = "\x1b[0m";
    Colors.B = "\x1b[1m";
    Colors.U = "\x1b[4m";
    Colors.Rev = "\x1b[7m";
    Colors.FgBlack = "\x1b[30m";
    Colors.FgRed = "\x1b[31m";
    Colors.FgGreen = "\x1b[32m";
    Colors.FgYellow = "\x1b[33m"; //does not work on powershell somehow
    Colors.FgBlue = "\x1b[34m";
    Colors.FgMagenta = "\x1b[35m";
    Colors.FgCyan = "\x1b[36m";
    Colors.FgWhite = "\x1b[37m";
    Colors.FgGray = "\x1b[90m";
    Colors.Fbla = "\x1b[30m";
    Colors.Fr = "\x1b[31m";
    Colors.Fgre = "\x1b[32m";
    Colors.Fy = "\x1b[33m"; //does not work on powershell somehow
    Colors.Fblu = "\x1b[34m";
    Colors.Fm = "\x1b[35m";
    Colors.Fc = "\x1b[36m";
    Colors.Fw = "\x1b[37m";
    Colors.Fgra = "\x1b[90m";
    Colors.BgBlack = "\x1b[40m";
    Colors.BgRed = "\x1b[41m";
    Colors.BgGreen = "\x1b[42m";
    Colors.BgYellow = "\x1b[43m";
    Colors.BgBlue = "\x1b[44m";
    Colors.BgMagenta = "\x1b[45m";
    Colors.BgCyan = "\x1b[46m";
    Colors.BgWhite = "\x1b[47m";
    Colors.BgGray = "\x1b[100m";
    Colors.Bbla = "\x1b[40m";
    Colors.Br = "\x1b[41m";
    Colors.Bgre = "\x1b[42m";
    Colors.By = "\x1b[43m";
    Colors.Bblu = "\x1b[44m";
    Colors.Bm = "\x1b[45m";
    Colors.Bc = "\x1b[46m";
    Colors.Bw = "\x1b[47m";
    Colors.Bgra = "\x1b[100m";
    return Colors;
}());
var events_1 = require("events");
var child_process_1 = require("child_process"); // https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
var fs = require("fs");
function generateUUID() {
    var a = new Date().getTime(); //Timestamp
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var b = Math.random() * 16; //random number between 0 and 16
        b = (a + b) % 16 | 0;
        a = Math.floor(a / 16);
        return (c === 'x' ? b : (b & 0x3 | 0x8)).toString(16);
    });
}
var QuatIdentity = [0, 0, 0, 1];
var EmptyTransformationObj = { translation: [0, 0, 0], left_rotation: [0, 0, 0, 1], scale: [1, 1, 1], right_rotation: [0, 0, 0, 1] };
/**
 * converts axis angle to quaternion
 * @param {Vec3<number>} x axis
 * @param {number} theta angle
 */
function AxAngToQuat(x, theta) {
    var a = theta / 2;
    var b = Math.sin(a);
    return __spreadArray(__spreadArray([], x.map(function (el) { return (el * b); }), true), [Math.cos(a)], false).map(function (el) { return Math.round(el * 1000) / 1000; });
}
var Minecraft = /** @class */ (function () {
    function Minecraft() {
        var _this = this;
        this.playerData = {};
        this.tmpPlayerData = {};
        console.clear();
        this.cmdQueue = [];
        this.cmdResolves = [];
        this.server = (0, child_process_1.spawn)("java", ["-Xmx5G", "-Xms5G", "-jar", "./server.jar", "nogui"], { cwd: __dirname + "/server" });
        this.server.stdout.on('data', function (stdout) {
            var out = stdout.toString().trim();
            out.split("\r\n").forEach(function (newOut) {
                _this.handle(newOut);
            });
        });
        this.server.stderr.on('data', function (stderr) { console.log(Colors.Fgra + "Server exited with code: " + Colors.Fy + stderr.toString() + Colors.Fgra + "." + Colors.R); process.exit(); });
        this.server.on('close', function (code) { console.log(Colors.Fgra + "Server exited with code: " + Colors.Fy + code + Colors.Fgra + "." + Colors.R); process.exit(); });
        process.on('SIGINT', function () { console.log(Colors.Fr + "KeyboardInterrupt" + Colors.R); process.exit(); });
        process.on('SIGTERM', function () { console.log(Colors.Fgra + "Server closing!!" + Colors.R); });
        this.Emitter = new events_1.EventEmitter();
    }
    Minecraft.prototype.cmd = function (stdin) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.cmdQueue.push(stdin);
                        _this.cmdResolves.push(resolve);
                        _this.server.stdin.write(stdin + "\n");
                    })];
            });
        });
    };
    Minecraft.prototype.cmdDiscardOutput = function (stdin) {
        this.cmdQueue.push(stdin);
        this.cmdResolves.push("none");
        this.server.stdin.write(stdin + "\n");
    };
    Minecraft.prototype.getPlayerPos = function (name) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var out, data, nbt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mine.cmd("data get entity " + name)];
                    case 1:
                        out = _a.sent();
                        if (out.match(/\S+ has the following entity data: /g) != null) {
                            data = "" + out.match(/(?<=\S+ has the following entity data: ).+/g);
                            nbt = Minecraft.parseNbt(data);
                            mine.playerData[name].nbt = nbt;
                            mine.playerData[name].pos = nbt.Pos;
                            resolve([Math.floor(nbt.Pos[0]), Math.floor(nbt.Pos[1]), Math.floor(nbt.Pos[2])]);
                        }
                        else
                            resolve([0, 0, 0]);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Minecraft.prototype.handle = function (line) {
        var _this = this;
        try {
            if (line.startsWith("Starting"))
                return;
            var splt = line.split(/\ (?![^\[]*\])/g);
            var json = {};
            json.time = splt.shift().match(/(?!\[)(.*)(?=\])/g); // https://www.regextester.com/96872
            if (json.time != null) {
                json.time = json.time[0];
            }
            else {
                console.log(Colors.Fgra + line + Colors.R);
                return;
            }
            json.type = splt.shift().match(/(?!\[)(.*)(?=\])/g)[0];
            if (json.type.match(/(Worker-Main-(\d+)\/INFO)/g) != null)
                json.type = "Worker-Main/INFO";
            else if (json.type.match(/(User Authenticator #\d\/INFO)/g) != null)
                json.type = "User Authenticator/INFO";
            else if (json.type.match(/(User Authenticator #\d\/ERROR)/g) != null)
                json.type = "User Authenticator/ERROR";
            json.data = splt.join(" ");
            switch (json.type) {
                case "ServerMain/INFO":
                    if (json.data.startsWith("You need to agree to the EULA")) {
                        fs.writeFileSync("./server/eula.txt", fs.readFileSync("./server/eula.txt").toString().replace("false", "true"));
                        console.log(Colors.Fgre + "EULA agreed. Restart server now.");
                        return;
                    }
                    else if (json.data.startsWith("Environment: "))
                        return;
                    else if (json.data.match(/Loaded \d* recipes/g) != null) {
                        console.log(Colors.Fgra + "Recipes loaded: " + Colors.Fy + json.data.match(/(?<=Loaded )\d*/g) + Colors.Fgra + ".");
                        return;
                    }
                    else if (json.data.match(/Loaded \d* advancements/g) != null) {
                        console.log(Colors.Fgra + "Advancements loaded: " + Colors.Fy + json.data.match(/(?<=Loaded )\d*/g) + Colors.Fgra + ".");
                        return;
                    }
                    else {
                        console.log(json);
                        break;
                    }
                case "ServerMain/WARN":
                    if (json.data == "Failed to load eula.txt")
                        return;
                    else {
                        console.log(json);
                        break;
                    }
                case "Server thread/WARN":
                    if (json.data.includes("moved too quickly!"))
                        return;
                    console.log(json);
                    break;
                case "Server thread/INFO":
                    if (json.data.startsWith("Starting minecraft server version")) {
                        console.log(Colors.Fgra + "Minecraft Version: " + Colors.Fy + (json.data.match(/\d+\.\d+\.?\d+?/g)) + Colors.Fgra + "." + Colors.R);
                        return;
                    }
                    else if (json.data.startsWith("Default game type")) {
                        console.log(Colors.Fgra + "Default gamemode: " + Colors.Fgre + (json.data.match(/(?<=Default game type: )\w+/g)) + Colors.Fgra + "." + Colors.R);
                        return;
                    }
                    else if (json.data.startsWith("Starting Minecraft server on")) {
                        console.log(Colors.Fgra + "Server port: " + Colors.Fy + (json.data.match(/(?<=Starting Minecraft server on \*:)\d*/g)) + Colors.Fgra + "." + Colors.R);
                        return;
                    }
                    else if (json.data.startsWith("Preparing start region for dimension")) {
                        var dimension_1 = "" + json.data.match(/(?<=Preparing start region for dimension )\w*:\w*/g);
                        console.log(Colors.Fgra + "Preparing dimension: " + Colors.Fgre + dimension_1 + Colors.Fgra + "." + Colors.R);
                        return;
                    }
                    else if (json.data.startsWith("Time elapsed")) {
                        console.log(Colors.Fgra + "Time elapsed: " + Colors.Fy + (json.data.match(/(?<=Time elapsed: )\d* ms/g)) + Colors.Fgra + "." + Colors.R);
                        return;
                    }
                    else if (json.data.startsWith("Done")) {
                        console.log(Colors.Fgra + "Total time: " + Colors.Fy + (json.data.match(/(?<=Done \()\d+\.\d+s/g)) + Colors.Fgra + "." + Colors.R);
                        console.log(Colors.Fgre + "Server started" + Colors.R);
                        this.Emitter.emit("serverStart", { "preventDefault": (function () { }) });
                        return;
                    }
                    else if (json.data.includes("logged in with entity id")) {
                        var name_1 = "" + json.data.match(/.*(?=\[\/\d*\.\d*\.\d*\.\d:\d*] logged in with entity id)/);
                        var entityId = parseInt("" + json.data.match(/(?<=with entity id )\d*/g));
                        var pos = JSON.parse("[" + json.data.match(/(?<=entity id \d* at \()-?\d*\.\d*, -?\d*\.\d*, -?\d*\.\d*/g) + "]");
                        this.tmpPlayerData[name_1] = this.tmpPlayerData[name_1] || {};
                        this.tmpPlayerData[name_1].entityId = entityId;
                        this.tmpPlayerData[name_1].pos = pos;
                        //var out = Colors.Fgra+"Entity id of user "+Colors.Fgre+name+Colors.Fgra+" is "+Colors.Fy+entityId+Colors.Fgra+".\n";
                        //out += "Position of user "+Colors.Fgre+name+Colors.Fgra+" is ["+Colors.Fy+pos[0]+Colors.Fgra+", "+Colors.Fy+pos[1]+Colors.Fgra+", "+Colors.Fy+pos[2]+Colors.Fgra+"]."+Colors.R;
                        //console.log(out);
                        return;
                    }
                    else if (json.data.match(/\S* joined the game/) != null) {
                        var name_2 = "" + json.data.match(/\S*(?= joined the game)/);
                        var tmpData = this.tmpPlayerData[name_2];
                        this.tmpPlayerData[name_2] = null;
                        this.playerData[name_2] = this.playerData[name_2] || { "name": name_2, uuid: "", entityId: -1, pos: [], online: true, cmdOuts: [], chats: [] };
                        if (tmpData.uuid)
                            this.playerData[name_2].uuid = tmpData.uuid;
                        if (tmpData.entityId)
                            this.playerData[name_2].entityId = tmpData.entityId;
                        if (tmpData.pos)
                            this.playerData[name_2].pos = tmpData.pos;
                        this.playerData[name_2].online = true;
                        this.playerData[name_2].updatePos = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this.getPlayerPos(name_2)];
                        }); }); };
                        this.cmd("data get entity " + name_2).then(function (out) {
                            if (out.match(/\S+ has the following entity data: /g) != null) {
                                var data = "" + out.match(/(?<=\S+ has the following entity data: ).+/g);
                                var nbt = Minecraft.parseNbt(data);
                                _this.playerData[name_2].nbt = nbt;
                                _this.playerData[name_2].pos = nbt.Pos;
                                //console.log(Colors.Fgra+user+": "+Colors.R); console.log(nbt);
                                return;
                            }
                        });
                        var doDefault = true;
                        this.Emitter.emit("playerJoined", { "name": name_2, "player": this.playerData[name_2], "preventDefault": (function () { doDefault = false; }) });
                        if (doDefault) {
                            console.log(Colors.Fgra + Colors.Fy + name_2 + " has joined." + Colors.R);
                        }
                        return;
                    }
                    else if (json.data.endsWith(" left the game")) { //playerLeft
                        var name_3 = "" + json.data.match(/\S*(?= left the game)/);
                        this.playerData[name_3].online = false;
                        var doDefault = true;
                        this.Emitter.emit("playerLeft", { "name": name_3, "player": this.playerData[name_3], "preventDefault": (function () { doDefault = false; }) });
                        if (doDefault) {
                            console.log(Colors.Fgra + Colors.Fy + name_3 + " has left." + Colors.R);
                        }
                        return;
                    }
                    else if (json.data == "Stopping server") {
                        console.log(Colors.Fgra + "Server closing!!" + Colors.R);
                        return;
                    }
                    else if (json.data.startsWith("Saving chunks for level")) {
                        var dimension_2 = "" + json.data.match(/(?<=level 'ServerLevel\[world\]\'\/)\w*:\w*/g);
                        console.log(Colors.Fgra + "Saving dimension: " + Colors.Fgre + dimension_2 + Colors.Fgra + "." + Colors.R);
                        return;
                    }
                    else if (json.data.startsWith("ThreadedAnvilChunkStorage")) {
                        if (json.data == "ThreadedAnvilChunkStorage: All dimensions are saved") {
                            console.log(Colors.Fgra + "All dimensions are saved.");
                        }
                        else {
                            var dimension = "" + json.data.match(/(?<=ThreadedAnvilChunkStorage \()\w*\d?-?\d?/g);
                            dimension = dimension.replace("DIM1", "minecraft:the_nether").replace("DIM-1", "minecraft:the_end").replace("world", "minecraft:overworld");
                            console.log(Colors.Fgra + "Saved dimension: " + Colors.Fgre + dimension + Colors.Fgra + "." + Colors.R);
                        }
                        return;
                    }
                    else if (json.data == "Loading properties" ||
                        json.data == "Generating keypair" ||
                        json.data == "Using default channel type" ||
                        json.data.startsWith("Preparing level") ||
                        json.data.endsWith("lost connection: Disconnected") ||
                        json.data == "Saving players" ||
                        json.data == "Saving worlds") {
                        return; //nothing
                    }
                    else if (json.data.match(/\[\w*: .*\]/g) != null) { //playerCmdOut
                        var name_4 = "" + json.data.match(/(?<=\[)\w*(?=: .*\])/g);
                        var out = "" + json.data.match(/(?<=\[\w*: ).*(?=\])/g);
                        var timSplt = json.time.split(":");
                        var date = new Date();
                        date.setHours(timSplt[0]);
                        date.setMinutes(timSplt[1]);
                        date.setSeconds(timSplt[2]);
                        this.playerData[name_4].cmdOuts.push([out, date.getTime()]);
                        var doDefault = true;
                        this.Emitter.emit("playerCmdOut", { "name": name_4, "out": out, "player": this.playerData[name_4], "preventDefault": (function () { doDefault = false; }) });
                        if (doDefault) {
                            console.log(Colors.Fgra + "[" + name_4 + ": " + out + "]" + Colors.R);
                        }
                        return;
                    }
                    else if (json.data.match(/(<|\[)\w*(>|\]) .*/g) != null) { //playerChat
                        var name_5 = "" + json.data.match(/(?<=(<|\[))\w*(?=(>|\]) .*)/g);
                        var chat = "" + json.data.match(/(?<=(<|\[)\w*(>|\]) ).*/g);
                        var timSplt = json.time.split(":");
                        var date = new Date();
                        date.setHours(timSplt[0]);
                        date.setMinutes(timSplt[1]);
                        date.setSeconds(timSplt[2]);
                        this.playerData[name_5].chats.push([chat, date.getTime()]);
                        var doDefault = true;
                        this.Emitter.emit("playerChat", { "name": name_5, "chat": chat, "player": this.playerData[name_5], "preventDefault": (function () { doDefault = false; }) });
                        if (doDefault) {
                            console.log(Colors.Fgra + "<" + name_5 + "> " + chat + Colors.R);
                        }
                        return;
                    }
                    else {
                        this.serverCmdOut(json.data);
                        return;
                    }
                case "Worker-Main/INFO":
                    if (json.data.startsWith("Preparing spawn area:")) {
                        console.log(Colors.Fgra + "Preparing spawn: " + Colors.Fy + (json.data.match(/\d*%/g)) + Colors.Fgra + "." + Colors.R);
                        return;
                    }
                    else {
                        console.log(json);
                        break;
                    }
                case "User Authenticator/INFO":
                    if (json.data.startsWith("UUID of player")) {
                        var name_6 = "" + json.data.match(/(?<=UUID of player )\w*/g);
                        var uuid = "" + json.data.match(/(?<=UUID of player \w* is )\w*-\w*-\w*-\w*-\w*/g);
                        this.tmpPlayerData[name_6] = this.tmpPlayerData[name_6] || {};
                        this.tmpPlayerData[name_6].uuid = uuid;
                        //console.log(Colors.Fgra+"UUID of user "+Colors.Fgre+name+Colors.Fgra+" is "+Colors.Fgre+uuid+Colors.Fgra+"."+Colors.R);
                        return;
                    }
                    else {
                        console.log(json);
                        break;
                    }
                case "User Authenticator/INFO":
                    console.log(json);
                    break;
                default:
                    console.log(Colors.Fgra + "Unknown type " + Colors.Fgre + "\"" + json.type + "\"" + Colors.Fgra + "." + Colors.R);
                    console.log(json);
                    break;
            }
            console.log(Colors.Fgra + line + Colors.R);
            return;
        }
        catch (err) {
            //console.dir(err);
            console.log(line);
            console.log(Colors.Fr + "Error" + Colors.R);
            console.log(err);
        }
    };
    Minecraft.parseNbt = function (nbt) {
        frontTrim();
        function parseValue() {
            if (nbt[0] == "{") { //object
                return parseObj();
            }
            else if (nbt[0] == "[") { //array
                return parseArray();
            }
            else if (nbt[0] == "'") { //string
                return parseStringSingle();
            }
            else if (nbt[0] == "\"") { //string
                return parseStringDouble();
            }
            else if (nbt[0] == "-" || digits.includes(nbt[0])) { //number
                return parseNumber();
            }
            else { //boolean
                return parseBool();
            }
        }
        var digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        function frontTrim() {
            nbt = nbt.replace(/^\s*/g, "");
        }
        function parseObj() {
            var obj = {};
            if (nbt[0] != "{") {
                console.log("1");
                console.log(nbt);
                return null;
            }
            nbt = nbt.substring(1);
            frontTrim();
            var first = true;
            while (nbt[0] != "}") {
                if (!nbt.startsWith(",")) {
                    if (!first) {
                        console.log("2");
                        console.log(nbt);
                        return null;
                    }
                    else
                        first = false;
                }
                else
                    nbt = nbt.substring(1);
                frontTrim();
                var key = (nbt.match(/^\w+(?=\s*:)/g) || ["null"])[0];
                nbt = nbt.substring(key.length);
                if (nbt[0] != ":") {
                    console.log("3");
                    console.log(nbt);
                    return null;
                }
                nbt = nbt.substring(1);
                frontTrim();
                obj[key] = parseValue();
                frontTrim();
            }
            if (nbt[0] != "}") {
                console.log("4");
                console.log(nbt);
                return null;
            }
            nbt = nbt.substring(1);
            //console.log("\""+obj+"\"");
            return obj;
        }
        function parseArray() {
            if (nbt[0] != "[") {
                console.log("5");
                console.log(nbt);
                return null;
            }
            nbt = nbt.substring(1);
            var ary = [];
            if (nbt.startsWith("B;") || nbt.startsWith("I;") || nbt.startsWith("L;")) {
                nbt = nbt.substring(2);
            }
            frontTrim();
            var first = true;
            while (nbt[0] != "]") {
                if (!nbt.startsWith(",")) {
                    if (!first) {
                        console.log("6");
                        console.log(nbt);
                        return null;
                    }
                    else
                        first = false;
                }
                else
                    nbt = nbt.substring(1);
                frontTrim();
                ary.push(parseValue());
                frontTrim();
            }
            if (nbt[0] != "]") {
                console.log("7");
                console.log(nbt);
                return null;
            }
            nbt = nbt.substring(1);
            //console.log("\""+ary+"\"");
            return ary;
        }
        function parseStringSingle() {
            if (!nbt.startsWith("'")) {
                console.log("8");
                console.log(nbt);
                return null;
            }
            nbt = nbt.substring(1);
            var ind = -1;
            for (var i = 0; i < nbt.length; i++) {
                if (nbt[i] == "'" && nbt[i - 1] != "\\") {
                    ind = i;
                    break;
                }
            }
            if (ind == -1) {
                console.log("9");
                console.log(nbt);
                return null;
            }
            var str = nbt.substring(0, ind);
            nbt = nbt.substring(ind + 1);
            //console.log("\""+str+"\"");
            return str;
        }
        function parseStringDouble() {
            if (!nbt.startsWith("\"")) {
                console.log("10");
                console.log(nbt);
                return null;
            }
            nbt = nbt.substring(1);
            var ind = -1;
            for (var i = 0; i < nbt.length; i++) {
                if (nbt[i] == "\"" && nbt[i - 1] != "\\") {
                    ind = i;
                    break;
                }
            }
            if (ind == -1) {
                console.log("11");
                console.log(nbt);
                return null;
            }
            var str = nbt.substring(0, ind);
            nbt = nbt.substring(ind + 1);
            //console.log("\""+str+"\"");
            return str;
        }
        function parseNumber() {
            var num = nbt.match(/^-?\d+(\.\d+)?(s|S|b|B|d|D|f|F|L)?/g);
            if (num != null) {
                nbt = nbt.substring(num[0].length);
                //console.log("\""+num[0]+"\"");
                return parseFloat(num[0]);
            }
            else {
                console.log("12");
                console.log(nbt);
                return null;
            }
        }
        function parseBool() {
            if (nbt.toLowerCase().startsWith("true")) {
                //console.log("\""+true +"\"");
                nbt = nbt.substring(4);
                return true;
            }
            else if (nbt.toLowerCase().startsWith("false")) {
                //console.log("\""+false+"\"");
                nbt = nbt.substring(5);
                return false;
            }
            else {
                console.log("13");
                console.log(nbt);
                return null;
            }
        }
        return parseValue();
    };
    Minecraft.prototype.serverCmdOut = function (out) {
        if (this.cmdResolves.length > 0) {
            if (out != "Unknown or incomplete command, see below for error") {
                this.cmdQueue.shift();
                var resolve = this.cmdResolves.shift();
                if (resolve != "none") {
                    resolve(out);
                }
            }
        }
        //console.log(Colors.Fgra+"[Server]: "+out+Colors.R);
    };
    //https://misode.github.io/transformation
    Minecraft.transformationToString = function (transformation) {
        if (Array.isArray(transformation)) {
            return "[" + transformation.map(function (el) { return el.toString() + "f"; }).join(",") + "]";
        }
        else {
            var str = "{" + Object.entries(transformation).map(function (_a) {
                var key = _a[0], value = _a[1];
                return key + ":[" + value.map(function (el) { return "" + el + "f"; }).join(",") + "]";
            }).join(",") + "}";
            return str;
        }
    };
    Minecraft.prototype.summonBlockDisplay = function (Pos, Tags, identifier, transformation, Name, Properties) {
        return new BlockDisplay(this, Pos, Tags, identifier, transformation, Name, Properties);
    };
    Minecraft.prototype.summonItemDisplay = function (Pos, Tags, identifier, transformation) {
        return new ItemDisplay(this, Pos, Tags, identifier, transformation);
    };
    Minecraft.prototype.summonTextDisplay = function (Pos, Tags, identifier, transformation) {
        return new TextDisplay(this, Pos, Tags, identifier, transformation);
    };
    Minecraft.prototype.summonInteraction = function (Pos, Tags, identifier, width, height, response) {
        return new Interaction(this, Pos, Tags, identifier, width, height, response);
    };
    return Minecraft;
}());
var Entity = /** @class */ (function () {
    function Entity(parent, entityName, Pos, Tags, identifier) {
        this.nbt = {};
        this.position = [0, 0, 0];
        this.parent = parent;
        this.entityName = entityName;
        this.nbt = { Tags: (Tags || []).map(function (el) { return "\"" + el + "\""; }) };
        if (identifier) {
            this.uuid = identifier;
        }
        else {
            this.uuid = generateUUID();
        }
        if (!this.nbt.Tags.includes("\"" + this.uuid + "\""))
            this.addTags(this.uuid);
        if (!this.nbt.Tags.includes("\"FromServer\""))
            this.addTags("FromServer");
        this.selector = "@e[nbt={Tags:[\"" + this.uuid + "\",\"FromServer\"]},limit=1]";
        this.Pos = Pos;
    }
    Entity.prototype.addTags = function () {
        var _a;
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        (_a = this.nbt.Tags).push.apply(_a, (tags.map(function (el) { return "\"" + el + "\""; })));
        return this;
    };
    Object.defineProperty(Entity.prototype, "Pos", {
        get: function () { return this.position; },
        set: function (value) { this.position = value; this.nbt.Pos = value.map(function (el) { return el.toString() + "d"; }); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Entity.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var command = "summon " + _this.entityName + " 0 0 0 {Tags:[" + _this.nbt.Tags.join(",") + "]}";
                        _this.parent.cmd(command).then(function (out) { if (out.includes("Summoned new "))
                            resolve(true);
                        else
                            resolve(false); });
                        _this.update();
                    })];
            });
        });
    };
    Entity.prototype.update = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var command = "data merge entity " + _this.selector;
            var nbt = "{" + Object.entries(_this.nbt).map(function (_a) {
                var key = _a[0], value = _a[1];
                if ((typeof value) == "object")
                    return key + ":[" + value.join(",") + "]";
                else
                    return key + ":" + value;
            }).join(",") + "}";
            command += " " + nbt;
            _this.parent.cmd(command).then(function (out) { if (out.includes("Modified entity data of"))
                resolve(true);
            else
                resolve(false); });
        });
    };
    Entity.prototype.kill = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.parent.cmd("kill " + _this.selector).then(function (out) { if (out.match(/Killed \d+/g) != null)
                resolve(true);
            else
                resolve(false); });
        });
    };
    Entity.prototype.savetoFile = function (name) {
        var str = JSON.stringify(this.toJson());
        fs.writeFileSync(__dirname + "/Saves/" + name + ".json", str);
    };
    Entity.prototype.toJson = function () {
        return {
            "uuid": this.uuid,
            "nbt": this.nbt
        };
    };
    return Entity;
}());
//#region Displays
var Display = /** @class */ (function (_super) {
    __extends(Display, _super);
    function Display(parent, entityName, Pos, Tags, identifier, transformation) {
        var _this = _super.call(this, parent, entityName, Pos, Tags, identifier) || this;
        _this.actualTransformation = EmptyTransformationObj;
        _this.glowColorOverride = 16383998; // https://www.digminecraft.com/lists/dyed_armor_color_list_pc.php
        _this.addTags("Displays");
        if (transformation)
            _this.transformation = transformation;
        return _this;
    }
    Object.defineProperty(Display.prototype, "transformation", {
        get: function () { return this.actualTransformation; },
        set: function (value) { this.actualTransformation = value; this.nbt.transformation = Minecraft.transformationToString(value); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Display.prototype, "glowing", {
        get: function () { return this.nbt.Glowing == "true"; },
        set: function (value) { this.nbt.Glowing = value.toString(); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Display.prototype, "glow_color_override", {
        get: function () { return this.glowColorOverride; },
        set: function (value) { this.glowColorOverride = value; this.nbt.glow_color_override = value.toString(); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Display.prototype.animate = function (ticks) {
        var _this = this;
        return new Promise(function (resolve) {
            var command = "data merge entity " + _this.selector;
            var nbt = "{";
            nbt += "start_interpolation:0,interpolation_duration:" + ticks;
            if (_this.transformation != null)
                nbt += ",transformation:" + Minecraft.transformationToString(_this.transformation);
            nbt += "}";
            command += " " + nbt;
            _this.parent.cmd(command).then(function (out) { if (out.includes("Modified entity data of"))
                resolve(true);
            else
                resolve(false); });
        });
    };
    return Display;
}(Entity));
var BlockDisplay = /** @class */ (function (_super) {
    __extends(BlockDisplay, _super);
    function BlockDisplay(parent, Pos, Tags, identifier, transformation, Name, Properties) {
        var _this = _super.call(this, parent, "minecraft:block_display", Pos, Tags, identifier, transformation) || this;
        _this.addTags("BlockDisplays");
        _this.nbt.CustomName = "\"\\\"" + _this.uuid + "\\\"\"";
        _this.nbt.CustomNameVisible = "0";
        _this.blockState = { Name: "" };
        _this.blockStateName = Name;
        if (Properties)
            _this.blockStateProperties = Properties;
        return _this;
    }
    BlockDisplay.prototype.addTags = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        _super.prototype.addTags.apply(this, tags);
        return this;
    };
    BlockDisplay.prototype.setBlockState = function () {
        var blockStateStr = "{Name:\"" + this.blockState.Name + "\"";
        if (this.blockState.Properties != null) {
            blockStateStr += ",Properties:{" + Object.entries(this.blockState.Properties).map(function (_a) {
                var key = _a[0], value = _a[1];
                return key + ":\"" + value + "\"";
            }).join(",") + "}";
        }
        blockStateStr += "}";
        this.nbt.block_state = blockStateStr;
    };
    Object.defineProperty(BlockDisplay.prototype, "blockStateName", {
        get: function () { return this.blockState.Name; },
        set: function (value) { this.blockState.Name = value; this.setBlockState(); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(BlockDisplay.prototype, "blockStateProperties", {
        get: function () { return this.blockState.Properties; },
        set: function (value) { this.blockState.Properties = value; this.setBlockState(); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    BlockDisplay.fromJson = function (parent, json) {
        var blockState = Minecraft.parseNbt(json.nbt.block_state);
        var transformation = (json.nbt.transformation != null) ? Minecraft.parseNbt(json.nbt.transformation) : null;
        var out = new BlockDisplay(parent, json.nbt.Pos.map(function (el) { return parseFloat(el); }), json.nbt.Tags.map(function (el) { return ((el.match(/(?<=").*(?=")/g) || [""])[0]); }), json.uuid, transformation, blockState.Name, blockState.Properties);
        out.nbt = json.nbt;
        return out;
    };
    BlockDisplay.fromFile = function (parent, name) {
        try {
            return BlockDisplay.fromJson(parent, JSON.parse(fs.readFileSync(__dirname + "/Saves/" + name + ".json").toString()));
        }
        catch (err) {
            //console.log(err);
            return undefined;
        }
    };
    return BlockDisplay;
}(Display));
var ItemDisplay = /** @class */ (function (_super) {
    __extends(ItemDisplay, _super);
    function ItemDisplay(parent, Pos, Tags, identifier, transformation) {
        var _this = _super.call(this, parent, "minecraft:item_display", Pos, Tags, identifier, transformation) || this;
        _this.addTags("ItemDisplays");
        _this.nbt.CustomName = "\"\\\"" + _this.uuid + "\\\"\"";
        _this.nbt.CustomNameVisible = "0";
        return _this;
    }
    ItemDisplay.prototype.addTags = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        _super.prototype.addTags.apply(this, tags);
        return this;
    };
    ItemDisplay.fromJson = function (parent, json) {
        var transformation = (json.nbt.transformation != null) ? Minecraft.parseNbt(json.nbt.transformation) : null;
        var out = new ItemDisplay(parent, json.nbt.Pos.map(function (el) { return parseFloat(el); }), json.nbt.Tags.map(function (el) { return ((el.match(/(?<=").*(?=")/g) || [""])[0]); }), json.uuid, transformation);
        out.nbt = json.nbt;
        return out;
    };
    ItemDisplay.fromFile = function (parent, name) {
        try {
            return ItemDisplay.fromJson(parent, JSON.parse(fs.readFileSync(__dirname + "/Saves/" + name + ".json").toString()));
        }
        catch (err) {
            //console.log(err);
            return undefined;
        }
    };
    return ItemDisplay;
}(Display));
var TextDisplay = /** @class */ (function (_super) {
    __extends(TextDisplay, _super);
    function TextDisplay(parent, Pos, Tags, identifier, transformation) {
        var _this = _super.call(this, parent, "minecraft:text_display", Pos, Tags, identifier, transformation) || this;
        _this.addTags("TextDisplays");
        _this.nbt.CustomName = "\"\\\"" + _this.uuid + "\\\"\"";
        _this.nbt.CustomNameVisible = "0";
        return _this;
    }
    TextDisplay.prototype.addTags = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        _super.prototype.addTags.apply(this, tags);
        return this;
    };
    TextDisplay.fromJson = function (parent, json) {
        var transformation = (json.nbt.transformation != null) ? Minecraft.parseNbt(json.nbt.transformation) : null;
        var out = new TextDisplay(parent, json.nbt.Pos.map(function (el) { return parseFloat(el); }), json.nbt.Tags.map(function (el) { return ((el.match(/(?<=").*(?=")/g) || [""])[0]); }), json.uuid, transformation);
        out.nbt = json.nbt;
        return out;
    };
    TextDisplay.fromFile = function (parent, name) {
        try {
            return TextDisplay.fromJson(parent, JSON.parse(fs.readFileSync(__dirname + "/Saves/" + name + ".json").toString()));
        }
        catch (err) {
            //console.log(err);
            return undefined;
        }
    };
    return TextDisplay;
}(Display));
//#endregion Displays
//#region Interaction
var Interaction = /** @class */ (function (_super) {
    __extends(Interaction, _super);
    function Interaction(parent, Pos, Tags, identifier, width, height, response) {
        var _this = _super.call(this, parent, "minecraft:interaction", Pos, Tags, identifier) || this;
        _this.addTags("Interactions");
        _this.nbt.CustomName = "\"\\\"" + _this.uuid + "\\\"\"";
        _this.nbt.CustomNameVisible = "0";
        _this.width = width;
        _this.height = height;
        _this.response = response;
        return _this;
    }
    Interaction.prototype.addTags = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        _super.prototype.addTags.apply(this, tags);
        return this;
    };
    Object.defineProperty(Interaction.prototype, "width", {
        get: function () { return parseFloat(this.nbt.width); },
        set: function (value) { this.nbt.width = value.toString(); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Interaction.prototype, "height", {
        get: function () { return parseFloat(this.nbt.height); },
        set: function (value) { this.nbt.height = value.toString(); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Interaction.prototype, "response", {
        get: function () { return this.nbt.response == "true"; },
        set: function (value) { this.nbt.response = value.toString(); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Interaction.fromJson = function (parent, json) {
        var out = new Interaction(parent, json.nbt.Pos.map(function (el) { return parseFloat(el); }), json.nbt.Tags.map(function (el) { return ((el.match(/(?<=").*(?=")/g) || [""])[0]); }), json.uuid, parseFloat(json.nbt.width), parseFloat(json.nbt.height), json.nbt.response == "true");
        out.nbt = json.nbt;
        return out;
    };
    Interaction.fromFile = function (parent, name) {
        try {
            return Interaction.fromJson(parent, JSON.parse(fs.readFileSync(__dirname + "/Saves/" + name + ".json").toString()));
        }
        catch (err) {
            //console.log(err);
            return undefined;
        }
    };
    return Interaction;
}(Entity));
function registerInteractionDetecter(mine, Tags, onInteraction) {
    var lastInteraction = (new Date()).getTime();
    return setInterval(function () {
        //var start:number=(new Date()).getTime();
        mine.cmd("data get entity @e[type=interaction,nbt={Tags:[" + Tags.map(function (el) { return "\"" + el + "\""; }).join(",") + ",\"Interactions\",\"FromServer\"],interaction:{}},limit=1]").then(function (out) {
            //console.log(Colors.Fgra+"Time: "+Colors.Fy+((new Date()).getTime()-start)+Colors.Fgra+"."+Colors.R)
            if (out != "No entity was found") {
                var match = out.match(/^\S+ has the following entity data: {.*}$/g);
                if (match != null) {
                    var nbt = Minecraft.parseNbt(out.match(/(?<=^\S+ has the following entity data: ){.*}$/g)[0]);
                    if (nbt.interaction != null) {
                        var time = (new Date()).getTime();
                        if ((time - lastInteraction) < 100)
                            return; //buffers one detection to reset
                        lastInteraction = time;
                        var uuid = nbt.Tags.filter(function (el) { return (el.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g) != null); })[0];
                        //console.log(Colors.Fgra+"Interact: "+Colors.Fgre+uuid+Colors.R);
                        mine.cmd("data remove entity @e[nbt={Tags:[\"" + uuid + "\"]},limit=1] interaction");
                        Object.values(mine.playerData);
                        onInteraction(nbt);
                    }
                }
            }
        });
    }, 1000 / 20); //one tick
}
function registerAttackDetecter(mine, Tags, onAttack) {
    var lastInteraction = (new Date()).getTime();
    return setInterval(function () {
        //var start:number=(new Date()).getTime();
        mine.cmd("data get entity @e[type=interaction,nbt={Tags:[" + Tags.map(function (el) { return "\"" + el + "\""; }).join(",") + ",\"Interactions\",\"FromServer\"],attack:{}},limit=1]").then(function (out) {
            //console.log(Colors.Fgra+"Time: "+Colors.Fy+((new Date()).getTime()-start)+Colors.Fgra+"."+Colors.R)
            if (out != "No entity was found") {
                var match = out.match(/^\S+ has the following entity data: {.*}$/g);
                if (match != null) {
                    var nbt = Minecraft.parseNbt(out.match(/(?<=^\S+ has the following entity data: ){.*}$/g)[0]);
                    if (nbt.attack != null) {
                        var time = (new Date()).getTime();
                        if ((time - lastInteraction) < 100)
                            return; //buffers one detection to reset
                        lastInteraction = time;
                        var uuid = nbt.Tags.filter(function (el) { return (el.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g) != null); })[0];
                        //console.log(Colors.Fgra+"Interact: "+Colors.Fgre+uuid+Colors.R);
                        mine.cmd("data remove entity @e[nbt={Tags:[\"" + uuid + "\"]},limit=1] attack");
                        onAttack(nbt);
                    }
                }
            }
        });
    }, 1000 / 20); //one tick
}
//#endregion Interaction
var mine = new Minecraft();
/*
mine.Emitter.on("playerJoined",(e:{name:string,preventDefault:()=>void})=>{
    mine.cmd("op "+e.name).then((out:string)=>{console.log(Colors.Fgra+out+Colors.R);})
});
mine.Emitter.on("playerLeft",(e:{name:string,preventDefault:()=>void})=>{
    mine.cmd("deop "+e.name).then((out:string)=>{console.log(Colors.Fgra+out+Colors.R);})
});*/
mine.Emitter.on("playerChat", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!(e.chat == "stop")) return [3 /*break*/, 2];
                e.preventDefault();
                _b = (_a = console).log;
                _c = Colors.Fgra;
                return [4 /*yield*/, mine.cmd("stop")];
            case 1:
                _b.apply(_a, [_c + (_d.sent()) + Colors.R]);
                return [2 /*return*/];
            case 2: return [2 /*return*/];
        }
    });
}); });
mine.Emitter.on("playerCmdOut", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var returnVal;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(e.out == "Gamerule sendCommandFeedback is now set to: false")) return [3 /*break*/, 3];
                return [4 /*yield*/, mine.cmd("gamerule sendCommandFeedback true")];
            case 1:
                returnVal = _a.sent();
                console.log(Colors.Fgra + returnVal + Colors.R);
                return [4 /*yield*/, mine.cmd("kill " + e.name)];
            case 2:
                returnVal = _a.sent();
                console.log(Colors.Fgra + returnVal + Colors.R);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
var Quat90 = AxAngToQuat([0, 1, 0], Math.PI / 2);
var QuatNeg90 = AxAngToQuat([0, 1, 0], -Math.PI / 2);
var Quat180 = AxAngToQuat([0, 1, 0], Math.PI);
function relativePos(pos, relativePos) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var finalPos, i, num;
                    return __generator(this, function (_a) {
                        if (pos == null || (pos[0] == "~" && pos[1] == "~" && pos[2] == "~")) {
                            resolve(relativePos);
                            return [2 /*return*/];
                        }
                        finalPos = [0, 0, 0];
                        for (i = 0; i < pos.length; i++) {
                            num = pos[i];
                            if (num == "~") {
                                finalPos[i] = relativePos[i];
                            }
                            else if (num.startsWith("~")) {
                                finalPos[i] = relativePos[i] + parseFloat(num.replace("~", ""));
                            }
                            else {
                                finalPos[i] = parseFloat(num);
                            }
                        }
                        resolve(finalPos);
                        return [2 /*return*/];
                    });
                }); })];
        });
    });
}
var Door = /** @class */ (function () {
    function Door() {
    }
    Door.read = function () {
        var lst = [
            BlockDisplay.fromFile(mine, "Door/1"), BlockDisplay.fromFile(mine, "Door/2"),
            BlockDisplay.fromFile(mine, "Door/3"), BlockDisplay.fromFile(mine, "Door/4")
        ];
        for (var i = 0; i < 14; i++) {
            lst[i + 4] = Interaction.fromFile(mine, "Door/int" + i);
        }
        if (lst[0] == null || lst[1] == null ||
            lst[2] == null || lst[3] == null ||
            lst[4] == null || lst[5] == null ||
            lst[6] == null || lst[7] == null ||
            lst[8] == null || lst[9] == null ||
            lst[10] == null || lst[11] == null ||
            lst[12] == null || lst[13] == null ||
            lst[14] == null || lst[15] == null ||
            lst[16] == null || lst[17] == null)
            return;
        Door.door = lst;
        registerInteractionDetecter(mine, ["Door"], Door.toggle);
        registerAttackDetecter(mine, ["Door"], Door.kill);
    };
    Door.summon = function (playerPos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Door.door = [
                    mine.summonBlockDisplay([playerPos[0], playerPos[1], playerPos[2]], ["Door"], null, __assign(__assign({}, EmptyTransformationObj), { translation: [0, 0, 1], right_rotation: Quat90 }), "minecraft:spruce_door", { facing: "east", half: "lower", hinge: "left", open: "false" }),
                    mine.summonBlockDisplay([playerPos[0], playerPos[1] + 1, playerPos[2]], ["Door"], null, __assign(__assign({}, EmptyTransformationObj), { translation: [0, 0, 1], right_rotation: Quat90 }), "minecraft:spruce_door", { facing: "east", half: "upper", hinge: "left", open: "false" }),
                    mine.summonBlockDisplay([playerPos[0] + 1, playerPos[1], playerPos[2]], ["Door"], null, __assign(__assign({}, EmptyTransformationObj), { translation: [1, 0, 1], right_rotation: Quat180 }), "minecraft:spruce_door", { facing: "south", half: "lower", hinge: "right", open: "false" }),
                    mine.summonBlockDisplay([playerPos[0] + 1, playerPos[1] + 1, playerPos[2]], ["Door"], null, __assign(__assign({}, EmptyTransformationObj), { translation: [1, 0, 1], right_rotation: Quat180 }), "minecraft:spruce_door", { facing: "south", half: "upper", hinge: "right", open: "false" }),
                    mine.summonInteraction([playerPos[0] + 3 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005], ["Door"], null, 3 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 9 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005], ["Door"], null, 3 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 15 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005], ["Door"], null, 3 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 21 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005], ["Door"], null, 3 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 27 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005], ["Door"], null, 3 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 31 / 32, playerPos[1], playerPos[2] + 31 / 32 + 0.0005], ["Door"], null, 1 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 31 / 32, playerPos[1], playerPos[2] + 27 / 32 + 0.0005], ["Door"], null, 1 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 35 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005], ["Door"], null, 3 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 41 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005], ["Door"], null, 3 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 47 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005], ["Door"], null, 3 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 53 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005], ["Door"], null, 3 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 59 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005], ["Door"], null, 3 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 63 / 32, playerPos[1], playerPos[2] + 31 / 32 + 0.0005], ["Door"], null, 1 / 16 + 0.001, 2, true),
                    mine.summonInteraction([playerPos[0] + 63 / 32, playerPos[1], playerPos[2] + 27 / 32 + 0.0005], ["Door"], null, 1 / 16 + 0.001, 2, true)
                ];
                Door.build();
                Door.doorOpened = false;
                return [2 /*return*/];
            });
        });
    };
    Door.build = function () {
        var door = Door.door;
        if (door == null)
            return;
        for (var i = 0; i < door.length; i++) {
            door[i].build();
        }
        mine.cmd("fill " + door[0].Pos.join(" ") + " " + door[3].Pos.join(" ") + " minecraft:barrier");
        registerInteractionDetecter(mine, ["Door"], Door.toggle);
        registerAttackDetecter(mine, ["Door"], Door.kill);
        this.save();
    };
    Door.save = function () {
        var door = Door.door;
        if (door == null)
            return;
        if (!fs.existsSync(__dirname + "/Saves/Door"))
            fs.mkdirSync(__dirname + "/Saves/Door");
        door[0].savetoFile("Door/1");
        door[1].savetoFile("Door/2");
        door[2].savetoFile("Door/3");
        door[3].savetoFile("Door/4");
        door[4].savetoFile("Door/int0");
        door[5].savetoFile("Door/int1");
        door[6].savetoFile("Door/int2");
        door[7].savetoFile("Door/int3");
        door[8].savetoFile("Door/int4");
        door[9].savetoFile("Door/int5");
        door[10].savetoFile("Door/int6");
        door[11].savetoFile("Door/int7");
        door[12].savetoFile("Door/int8");
        door[13].savetoFile("Door/int9");
        door[14].savetoFile("Door/int10");
        door[15].savetoFile("Door/int11");
        door[16].savetoFile("Door/int12");
        door[17].savetoFile("Door/int13");
    };
    Door.animate = function () {
        var door = Door.door;
        if (door == null)
            return;
        var animationSpeed = Door.animationSpeed;
        door[0].animate(animationSpeed);
        door[1].animate(animationSpeed);
        door[2].animate(animationSpeed);
        door[3].animate(animationSpeed);
    };
    //#region open/close
    Door.open = function () {
        var door = Door.door;
        if (door == null || Door.doorOpened == true)
            return;
        Door.doorOpened = true;
        //door1
        door[0].transformation.left_rotation = Quat90;
        door[0].transformation.translation = [3 / 16, 0, 1];
        door[1].transformation.left_rotation = Quat90;
        door[1].transformation.translation = [3 / 16, 0, 1];
        //door2
        door[2].transformation.left_rotation = QuatNeg90;
        door[2].transformation.translation = [1 - 3 / 16, 0, 1];
        door[3].transformation.left_rotation = QuatNeg90;
        door[3].transformation.translation = [1 - 3 / 16, 0, 1];
        Door.animate();
        Door.save();
        var playerPos = door[0].Pos;
        door[4].Pos = [playerPos[0] + 3 / 32, playerPos[1], playerPos[2] + 29 / 32];
        door[5].Pos = [playerPos[0] + 3 / 32, playerPos[1], playerPos[2] + 23 / 32];
        door[6].Pos = [playerPos[0] + 3 / 32, playerPos[1], playerPos[2] + 17 / 32];
        door[7].Pos = [playerPos[0] + 3 / 32, playerPos[1], playerPos[2] + 11 / 32];
        door[8].Pos = [playerPos[0] + 3 / 32, playerPos[1], playerPos[2] + 3 / 32];
        door[9].Pos = [playerPos[0] + 1 / 64, playerPos[1], playerPos[2] + 7 / 32];
        door[10].Pos = [playerPos[0] + 5 / 32, playerPos[1], playerPos[2] + 7 / 32];
        door[11].Pos = [playerPos[0] + 61 / 32, playerPos[1], playerPos[2] + 29 / 32];
        door[12].Pos = [playerPos[0] + 61 / 32, playerPos[1], playerPos[2] + 23 / 32];
        door[13].Pos = [playerPos[0] + 61 / 32, playerPos[1], playerPos[2] + 17 / 32];
        door[14].Pos = [playerPos[0] + 61 / 32, playerPos[1], playerPos[2] + 11 / 32];
        door[15].Pos = [playerPos[0] + 61 / 32, playerPos[1], playerPos[2] + 3 / 32];
        door[16].Pos = [playerPos[0] + 63 / 32, playerPos[1], playerPos[2] + 7 / 32];
        door[17].Pos = [playerPos[0] + 59 / 32, playerPos[1], playerPos[2] + 7 / 32];
        for (var i = 4; i < door.length; i++) {
            door[i].update();
        }
        mine.cmd("fill " + door[0].Pos.join(" ") + " " + door[3].Pos.join(" ") + " minecraft:air");
    };
    Door.close = function () {
        var door = Door.door;
        if (door == null || Door.doorOpened == false)
            return;
        Door.doorOpened = false;
        //door1
        door[0].transformation.left_rotation = QuatIdentity;
        door[0].transformation.translation = [0, 0, 1];
        door[1].transformation.left_rotation = QuatIdentity;
        door[1].transformation.translation = [0, 0, 1];
        //door2
        door[2].transformation.left_rotation = QuatIdentity;
        door[2].transformation.translation = [1, 0, 1];
        door[3].transformation.left_rotation = QuatIdentity;
        door[3].transformation.translation = [1, 0, 1];
        Door.animate();
        Door.save();
        var playerPos = door[0].Pos;
        door[4].Pos = [playerPos[0] + 3 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005];
        door[5].Pos = [playerPos[0] + 9 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005];
        door[6].Pos = [playerPos[0] + 15 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005];
        door[7].Pos = [playerPos[0] + 21 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005];
        door[8].Pos = [playerPos[0] + 27 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005];
        door[9].Pos = [playerPos[0] + 31 / 32, playerPos[1], playerPos[2] + 31 / 32 + 0.0005];
        door[10].Pos = [playerPos[0] + 31 / 32, playerPos[1], playerPos[2] + 27 / 32 + 0.0005];
        door[11].Pos = [playerPos[0] + 35 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005];
        door[12].Pos = [playerPos[0] + 41 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005];
        door[13].Pos = [playerPos[0] + 47 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005];
        door[14].Pos = [playerPos[0] + 53 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005];
        door[15].Pos = [playerPos[0] + 59 / 32, playerPos[1], playerPos[2] + 29 / 32 + 0.0005];
        door[16].Pos = [playerPos[0] + 63 / 32, playerPos[1], playerPos[2] + 31 / 32 + 0.0005];
        door[17].Pos = [playerPos[0] + 63 / 32, playerPos[1], playerPos[2] + 27 / 32 + 0.0005];
        for (var i = 4; i < door.length; i++) {
            door[i].update();
        }
        mine.cmd("fill " + door[0].Pos.join(" ") + " " + door[3].Pos.join(" ") + " minecraft:barrier");
    };
    Door.toggle = function () { if (Door.doorOpened)
        Door.close();
    else
        Door.open(); };
    //#endregion open/close
    Door.kill = function () {
        var door = Door.door;
        if (door == null)
            return;
        mine.cmd("fill " + door[0].Pos.join(" ") + " " + door[3].Pos.join(" ") + " minecraft:air");
        mine.cmd("kill @e[nbt={Tags:[\"FromServer\",\"Door\"]}]").then(function (out) { });
        door = undefined;
        fs.rmSync(__dirname + "/Saves/Door/1.json");
        fs.rmSync(__dirname + "/Saves/Door/2.json");
        fs.rmSync(__dirname + "/Saves/Door/3.json");
        fs.rmSync(__dirname + "/Saves/Door/4.json");
        fs.rmSync(__dirname + "/Saves/Door/int0.json");
        fs.rmSync(__dirname + "/Saves/Door/int1.json");
        fs.rmSync(__dirname + "/Saves/Door/int2.json");
        fs.rmSync(__dirname + "/Saves/Door/int3.json");
        fs.rmSync(__dirname + "/Saves/Door/int4.json");
        fs.rmSync(__dirname + "/Saves/Door/int5.json");
        fs.rmSync(__dirname + "/Saves/Door/int6.json");
        fs.rmSync(__dirname + "/Saves/Door/int7.json");
        fs.rmSync(__dirname + "/Saves/Door/int8.json");
        fs.rmSync(__dirname + "/Saves/Door/int9.json");
        fs.rmSync(__dirname + "/Saves/Door/int10.json");
        fs.rmSync(__dirname + "/Saves/Door/int11.json");
        fs.rmSync(__dirname + "/Saves/Door/int12.json");
        fs.rmSync(__dirname + "/Saves/Door/int13.json");
        fs.rmdirSync(__dirname + "/Saves/Door");
        Door.doorOpened = false;
    };
    Door.door = undefined;
    Door.doorOpened = false;
    Door.animationSpeed = 5;
    return Door;
}());
//#region blockDisplays
var blockDisplays;
var blockDisplayIndex;
function blockDisplaysRead() {
    try {
        var data = JSON.parse(fs.readFileSync(__dirname + "/Saves/Displays.json").toString());
        blockDisplays = data.displays.map(function (el) { return BlockDisplay.fromJson(mine, el); });
        blockDisplayIndex = data.index;
    }
    catch (err) {
        blockDisplays = [];
        blockDisplayIndex = -1;
    }
}
function blockDisplaysSave() {
    fs.writeFileSync(__dirname + "/Saves/Displays.json", JSON.stringify({ "index": blockDisplayIndex, "displays": blockDisplays.map(function (el) { return el.toJson(); }) }));
}
function blockDisplaysKillAll() {
    mine.cmd("kill @e[nbt={Tags:[\"FromServer\",\"BlockDisplays\",\"Tests\"]}]").then(function (out) { });
    blockDisplays = [];
    blockDisplayIndex = -1;
    blockDisplaysSave();
}
function blockDisplaySummon(pos) {
    if (blockDisplays.length != 0) {
        var display = blockDisplays[blockDisplayIndex];
        display.glowing = false;
        display.update();
    }
    blockDisplays.push(mine.summonBlockDisplay(pos, null, null, EmptyTransformationObj, "minecraft:diamond_block", null));
    var display = blockDisplays[blockDisplays.length - 1];
    display.addTags("Tests").glowing = true;
    display.build();
    blockDisplayIndex = blockDisplays.length - 1;
    blockDisplaysSave();
}
function blockDisplayKill() {
    if (blockDisplayIndex == -1)
        return;
    var display = blockDisplays[blockDisplayIndex];
    if (display == null)
        return;
    display.kill();
    delete blockDisplays[blockDisplayIndex];
    blockDisplays = blockDisplays.filter(function (el) { return el != null; });
    if (blockDisplays.length > 0) {
        var display = blockDisplays[blockDisplays.length - 1];
        display.glowing = true;
        display.update();
        blockDisplayIndex = blockDisplays.length - 1;
    }
    else
        blockDisplayIndex = -1;
    blockDisplaysSave();
}
function blockDisplayRotate() {
    if (blockDisplayIndex == -1)
        return;
    var display = blockDisplays[blockDisplayIndex];
    if (display == null)
        return;
    display.transformation.left_rotation = AxAngToQuat([0, 1, 0], Math.PI / 4);
    display.animate(20);
    blockDisplaysSave();
}
function blockDisplayUnRotate() {
    if (blockDisplayIndex == -1)
        return;
    var display = blockDisplays[blockDisplayIndex];
    if (display == null)
        return;
    display.transformation.left_rotation = QuatIdentity;
    display.animate(20);
    blockDisplaysSave();
}
function blockDisplaysNext() {
    if (blockDisplayIndex == -1)
        return;
    var display = blockDisplays[blockDisplayIndex];
    if (display == null)
        return;
    //unglow previous
    display.glowing = false;
    display.update();
    //set selected
    blockDisplayIndex++;
    blockDisplayIndex %= blockDisplays.length;
    display = blockDisplays[blockDisplayIndex];
    display.glowing = true;
    display.update();
    blockDisplaysSave();
}
function blockDisplayMove(relPos) {
    return __awaiter(this, void 0, void 0, function () {
        var display, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (blockDisplayIndex == -1)
                        return [2 /*return*/];
                    display = blockDisplays[blockDisplayIndex];
                    if (display == null)
                        return [2 /*return*/];
                    _a = display;
                    return [4 /*yield*/, relativePos(relPos, display.Pos)];
                case 1:
                    _a.Pos = _b.sent();
                    display.update().then(function (out) { });
                    blockDisplaysSave();
                    return [2 /*return*/];
            }
        });
    });
}
function blockDisplayTp(relPos, name) {
    return __awaiter(this, void 0, void 0, function () {
        var display, playerPos, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (blockDisplayIndex == -1)
                        return [2 /*return*/];
                    display = blockDisplays[blockDisplayIndex];
                    if (display == null)
                        return [2 /*return*/];
                    return [4 /*yield*/, mine.playerData[name].updatePos()];
                case 1:
                    playerPos = (_b.sent());
                    _a = display;
                    return [4 /*yield*/, relativePos(relPos, playerPos)];
                case 2:
                    _a.Pos = _b.sent();
                    display.update().then(function (out) { });
                    blockDisplaysSave();
                    return [2 /*return*/];
            }
        });
    });
}
//#endregion blockDisplays
mine.Emitter.on("serverStart", function (e) {
    blockDisplaysRead();
    Door.read();
});
mine.Emitter.on("playerChat", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var finalPos, pos, playerPos, finalPos, playerPos, relPos, relPos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!e.chat.startsWith("summon")) return [3 /*break*/, 9];
                if (!e.chat.startsWith("summon display")) return [3 /*break*/, 6];
                if (!e.chat.startsWith("summon display block")) return [3 /*break*/, 5];
                if (!(e.chat == "summon display block")) return [3 /*break*/, 2];
                e.preventDefault();
                return [4 /*yield*/, mine.playerData[e.name].updatePos()];
            case 1:
                finalPos = (_a.sent());
                blockDisplaySummon(finalPos);
                return [2 /*return*/];
            case 2:
                if (!e.chat.match(/^summon display block (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) return [3 /*break*/, 5];
                e.preventDefault();
                pos = e.chat.replace("summon ", "").split(" ");
                return [4 /*yield*/, mine.playerData[e.name].updatePos()];
            case 3:
                playerPos = (_a.sent());
                return [4 /*yield*/, relativePos(pos, playerPos)];
            case 4:
                finalPos = _a.sent();
                blockDisplaySummon(finalPos);
                return [2 /*return*/];
            case 5: return [3 /*break*/, 8];
            case 6:
                if (!e.chat.startsWith("summon door")) return [3 /*break*/, 8];
                return [4 /*yield*/, mine.playerData[e.name].updatePos()];
            case 7:
                playerPos = (_a.sent());
                Door.summon(playerPos);
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                if (e.chat.startsWith("door")) {
                    if (e.chat.startsWith("door open")) {
                        e.preventDefault();
                        Door.open();
                    }
                    else if (e.chat.startsWith("door close")) {
                        e.preventDefault();
                        Door.close();
                    }
                    else if (e.chat.startsWith("door toggle")) {
                        e.preventDefault();
                        Door.toggle();
                    }
                    else if (e.chat.startsWith("door kill")) {
                        e.preventDefault();
                        Door.kill();
                    }
                }
                else if (e.chat.startsWith("display")) {
                    if (e.chat.startsWith("display block")) {
                        if (e.chat.startsWith("display block kill")) {
                            if (e.chat == "display block kill all") {
                                blockDisplaysKillAll();
                            }
                            else if (e.chat == "display block kill") {
                                blockDisplayKill();
                            }
                        }
                        else if (e.chat == "display block next") {
                            blockDisplaysNext();
                        }
                        else if (e.chat == "display block rotate") {
                            blockDisplayRotate();
                        }
                        else if (e.chat == "display block un-rotate") {
                            blockDisplayUnRotate();
                        }
                        else if (e.chat.match(/^display block move (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) {
                            relPos = e.chat.replace("display block move ", "").split(" ");
                            blockDisplayMove(relPos);
                        }
                        else if (e.chat.match(/^display block tp (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) {
                            relPos = e.chat.replace("display block tp ", "").split(" ");
                            blockDisplayTp(relPos, e.name);
                        }
                    }
                }
                _a.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}); });
