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
var EmptyTransformationObj = { translation: [0, 0, 0], left_rotation: [0, 0, 0, 1], scale: [1, 1, 1], right_rotation: [0, 0, 0, 1] };
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
    Minecraft.prototype.summonBlockDisplay = function (Pos, Tags, identifier, Name, Properties, transformation, glowing, glow_color_override) {
        return new BlockDisplay(this, Pos, Tags, identifier, Name, Properties, transformation, glowing, glow_color_override);
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
        if (!this.nbt.Tags.includes("\"FromServer"))
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
var BlockDisplay = /** @class */ (function (_super) {
    __extends(BlockDisplay, _super);
    function BlockDisplay(parent, Pos, Tags, identifier, Name, Properties, transformation, glowing, glow_color_override) {
        var _this = _super.call(this, parent, "minecraft:block_display", Pos, Tags, identifier) || this;
        _this.actualTransformation = EmptyTransformationObj;
        _this.glowColorOverride = 16383998; // https://www.digminecraft.com/lists/dyed_armor_color_list_pc.php
        _this.addTags("Displays", "BlockDisplays");
        _this.nbt.CustomName = "\"\\\"" + _this.uuid + "\\\"\"";
        _this.nbt.CustomNameVisible = "0";
        _this.blockState = { Name: "" };
        _this.blockStateName = Name;
        if (Properties)
            _this.blockStateProperties = Properties;
        if (transformation)
            _this.transformation = transformation;
        if (glowing)
            _this.glowing = glowing;
        if (glow_color_override)
            _this.glow_color_override = glow_color_override;
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
    Object.defineProperty(BlockDisplay.prototype, "transformation", {
        get: function () { return this.actualTransformation; },
        set: function (value) { this.actualTransformation = value; this.nbt.transformation = Minecraft.transformationToString(value); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(BlockDisplay.prototype, "glowing", {
        get: function () { return this.nbt.Glowing == "true"; },
        set: function (value) { this.nbt.Glowing = value.toString(); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(BlockDisplay.prototype, "glow_color_override", {
        get: function () { return this.glowColorOverride; },
        set: function (value) { this.glowColorOverride = value; this.nbt.glow_color_override = value.toString(); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    BlockDisplay.prototype.animate = function (ticks) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.command = "data merge entity " + _this.selector;
            var nbt = "{";
            nbt += "start_interpolation:0,interpolation_duration:" + ticks;
            if (_this.transformation != null)
                nbt += ",transformation:" + Minecraft.transformationToString(_this.transformation);
            nbt += "}";
            _this.command += " " + nbt;
            _this.parent.cmd(_this.command).then(function (out) { if (out.includes("Modified entity data of"))
                resolve(true);
            else
                resolve(false); });
        });
    };
    BlockDisplay.fromJson = function (parent, json) {
        var blockState = Minecraft.parseNbt(json.nbt.block_state);
        var transformation = (json.nbt.transformation != null) ? Minecraft.parseNbt(json.nbt.transformation) : null;
        var out = new BlockDisplay(parent, json.nbt.Pos.map(function (el) { return parseFloat(el); }), json.nbt.Tags.map(function (el) { return ((el.match(/(?<=").*(?=")/g) || [""])[0]); }), json.uuid, blockState.Name, blockState.Properties, transformation, (json.nbt.glowing != null) ? (json.nbt.glowing == "true") : null, (json.nbt.glow_color_override != null) ? parseInt(json.nbt.glow_color_override) : null);
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
}(Entity));
var Interaction = /** @class */ (function (_super) {
    __extends(Interaction, _super);
    function Interaction(parent, Pos, Tags, identifier, width, height, response) {
        var _this = _super.call(this, parent, "minecraft:interaction", Pos, Tags, identifier) || this;
        _this.ignoreNextInteraction = false;
        _this.ignoreNextAttack = false;
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
    Interaction.prototype.build = function () {
        this.start();
        return _super.prototype.build.call(this);
    };
    Interaction.prototype.kill = function () {
        if (this.intervalId != null) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
        return _super.prototype.kill.call(this);
    };
    Interaction.prototype.start = function () {
        var _this = this;
        this.intervalId = setInterval(function () {
            _this.parent.cmd("data get entity " + _this.selector).then(function (out) {
                if (out != "No entity was found") {
                    var match = out.match(/^\S+ has the following entity data: {.*}$/g);
                    if (match != null) {
                        var nbt = Minecraft.parseNbt(out.match(/(?<=^\S+ has the following entity data: ){.*}$/g)[0]);
                        if (nbt.interaction != null) {
                            if (_this.ignoreNextInteraction) {
                                _this.ignoreNextInteraction = false;
                                return;
                            } //buffers one detection to reset
                            else {
                                _this.ignoreNextInteraction = true;
                            }
                            //console.log(Colors.Fgra+"Interact: "+Colors.Fgre+this.uuid+Colors.R)
                            //console.log(nbt.interaction);
                            _this.parent.cmd("data remove entity " + _this.selector + " interaction");
                            if (_this.onInteraction != null)
                                _this.onInteraction(nbt);
                        }
                        else if (nbt.attack != null) {
                            if (_this.ignoreNextAttack) {
                                _this.ignoreNextAttack = false;
                                return;
                            } //buffers one detection to reset
                            else {
                                _this.ignoreNextAttack = true;
                            }
                            //console.log(Colors.Fgra+"Attack: "+Colors.Fgre+this.uuid+Colors.R)
                            //console.log(nbt.attack);
                            _this.parent.cmd("data remove entity " + _this.selector + " attack");
                            if (_this.onAttack != null)
                                _this.onAttack(nbt);
                        }
                    }
                }
            });
        }, 1000 / 20); //one tick
    };
    Interaction.fromJson = function (parent, json) {
        return new Interaction(parent, json.nbt.Pos.map(function (el) { return parseFloat(el); }), json.nbt.Tags.map(function (el) { return ((el.match(/(?<=").*(?=")/g) || [""])[0]); }), json.uuid, parseFloat(json.nbt.width), parseFloat(json.nbt.height), json.nbt.response == "true");
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
var mine = new Minecraft();
/*
mine.Emitter.on("playerJoined",(e:{name:string,preventDefault:()=>void})=>{
    mine.cmd("op "+e.name).then((out:string)=>{console.log(Colors.Fgra+out+Colors.R);})
});
mine.Emitter.on("playerLeft",(e:{name:string,preventDefault:()=>void})=>{
    mine.cmd("deop "+e.name).then((out:string)=>{console.log(Colors.Fgra+out+Colors.R);})
});
*/
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
//#region door
var door = undefined;
var doorOpened = false;
mine.Emitter.on("serverStart", function (e) {
    var lst = [
        BlockDisplay.fromFile(mine, "Door/1"),
        BlockDisplay.fromFile(mine, "Door/2"),
        BlockDisplay.fromFile(mine, "Door/3"),
        BlockDisplay.fromFile(mine, "Door/4"),
        Interaction.fromFile(mine, "Door/int0"),
        Interaction.fromFile(mine, "Door/int1")
    ];
    if (lst[0] == null || lst[1] == null || lst[2] == null || lst[3] == null || lst[4] == null || lst[5] == null)
        return;
    door = [lst[0], lst[1], lst[2], lst[3], lst[4], lst[5]];
    for (var i = 4; i < door.length; i++) {
        var inter = door[i];
        inter.start();
        inter.onInteraction = doorToggle;
        //inter.onAttack=doorKill;
    }
});
function SaveDoor() {
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
}
function buildDoor() {
    if (door == null)
        return;
    for (var i = 0; i < door.length; i++) {
        door[i].build();
    }
    for (var i = 4; i < door.length; i++) {
        var inter = door[i];
        inter.start();
        inter.onInteraction = doorToggle;
        //inter.onAttack=doorKill;
    }
    var cmd = "fill " + door[0].Pos.join(" ") + " " + door[3].Pos.join(" ") + " barrier";
    mine.cmd(cmd);
}
function animateDoor() {
    if (door == null)
        return;
    door[0].animate(10);
    door[1].animate(10);
    door[2].animate(10);
    door[3].animate(10);
}
function doorOpen() {
    if (door == null)
        return;
    doorOpened = true;
    //door1
    door[0].transformation.left_rotation = [0, Math.sqrt(0.5), 0, Math.sqrt(0.5)];
    door[0].transformation.translation = [0.188, 0, 1];
    door[1].transformation.left_rotation = [0, Math.sqrt(0.5), 0, Math.sqrt(0.5)];
    door[1].transformation.translation = [0.188, 0, 1];
    //door2
    door[2].transformation.left_rotation = [0, -Math.sqrt(0.5), 0, Math.sqrt(0.5)];
    door[2].transformation.translation = [0.813, 0, 1];
    door[3].transformation.left_rotation = [0, -Math.sqrt(0.5), 0, Math.sqrt(0.5)];
    door[3].transformation.translation = [0.813, 0, 1];
    animateDoor();
    SaveDoor();
    var cmd = "fill " + door[0].Pos.join(" ") + " " + door[3].Pos.join(" ") + " air";
    mine.cmd(cmd);
}
function doorClose() {
    if (door == null)
        return;
    doorOpened = false;
    //door1
    door[0].transformation.left_rotation = [0, 0, 0, 1];
    door[0].transformation.translation = [0, 0, 1];
    door[1].transformation.left_rotation = [0, 0, 0, 1];
    door[1].transformation.translation = [0, 0, 1];
    //door2
    door[2].transformation.left_rotation = [0, 0, 0, 1];
    door[2].transformation.translation = [1, 0, 1];
    door[3].transformation.left_rotation = [0, 0, 0, 1];
    door[3].transformation.translation = [1, 0, 1];
    animateDoor();
    SaveDoor();
    var cmd = "fill " + door[0].Pos.join(" ") + " " + door[3].Pos.join(" ") + " barrier";
    mine.cmd(cmd);
}
function doorKill() {
    if (door == null)
        return;
    for (var i = 0; i < door.length; i++) {
        door[i].kill();
    }
    fs.rmSync(__dirname + "/Saves/Door/1.json");
    fs.rmSync(__dirname + "/Saves/Door/2.json");
    fs.rmSync(__dirname + "/Saves/Door/3.json");
    fs.rmSync(__dirname + "/Saves/Door/4.json");
    fs.rmSync(__dirname + "/Saves/Door/int0.json");
    fs.rmSync(__dirname + "/Saves/Door/int1.json");
    fs.rmdirSync(__dirname + "/Saves/Door");
    var cmd = "fill " + door[0].Pos.join(" ") + " " + door[3].Pos.join(" ") + " air";
    mine.cmd(cmd);
}
function doorToggle() { if (doorOpened)
    doorClose();
else
    doorOpen(); }
mine.Emitter.on("playerChat", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var playerPos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(e.chat == "summonDoor")) return [3 /*break*/, 2];
                e.preventDefault();
                return [4 /*yield*/, mine.playerData[e.name].updatePos()];
            case 1:
                playerPos = (_a.sent());
                door = [
                    mine.summonBlockDisplay([playerPos[0], playerPos[1], playerPos[2]], ["Door"], null, "minecraft:dark_oak_door", { facing: "east", half: "lower", hinge: "left", open: "false" }, __assign(__assign({}, EmptyTransformationObj), { translation: [0, 0, 1], right_rotation: [0, Math.sqrt(0.5), 0, Math.sqrt(0.5)] })),
                    mine.summonBlockDisplay([playerPos[0], playerPos[1] + 1, playerPos[2]], ["Door"], null, "minecraft:dark_oak_door", { facing: "east", half: "upper", hinge: "left", open: "false" }, __assign(__assign({}, EmptyTransformationObj), { translation: [0, 0, 1], right_rotation: [0, Math.sqrt(0.5), 0, Math.sqrt(0.5)] })),
                    mine.summonBlockDisplay([playerPos[0] + 1, playerPos[1], playerPos[2]], ["Door"], null, "minecraft:dark_oak_door", { facing: "south", half: "lower", hinge: "right", open: "false" }, __assign(__assign({}, EmptyTransformationObj), { translation: [1, 0, 1], right_rotation: [0, 1, 0, 0] })),
                    mine.summonBlockDisplay([playerPos[0] + 1, playerPos[1] + 1, playerPos[2]], ["Door"], null, "minecraft:dark_oak_door", { facing: "south", half: "upper", hinge: "right", open: "false" }, __assign(__assign({}, EmptyTransformationObj), { translation: [1, 0, 1], right_rotation: [0, 1, 0, 0] })),
                    mine.summonInteraction([playerPos[0] + 0.5, playerPos[1], playerPos[2] + 0.5005], ["Door"], null, 1.01, 2, true),
                    mine.summonInteraction([playerPos[0] + 1.5, playerPos[1], playerPos[2] + 0.5005], ["Door"], null, 1.01, 2, true)
                ];
                buildDoor();
                SaveDoor();
                return [3 /*break*/, 3];
            case 2:
                if (e.chat == "open" && door != null) {
                    e.preventDefault();
                    if (!doorOpened)
                        doorOpen();
                }
                else if (e.chat == "close" && door != null) {
                    e.preventDefault();
                    if (doorOpened)
                        doorClose();
                }
                else if (e.chat == "toggle" && door != null) {
                    e.preventDefault();
                    doorToggle();
                }
                else if (e.chat == "killDoor" && door != null) {
                    e.preventDefault();
                    doorKill();
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//#endregion
//#region BlockDisplays
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
var displays;
var displayIndex;
function saveDisplays() {
    fs.writeFileSync(__dirname + "/Saves/Displays.json", JSON.stringify({ "index": displayIndex, "displays": displays.map(function (el) { return el.toJson(); }) }));
}
mine.Emitter.on("serverStart", function (e) {
    try {
        var data = JSON.parse(fs.readFileSync(__dirname + "/Saves/Displays.json").toString());
        displays = data.displays.map(function (el) { return BlockDisplay.fromJson(mine, el); });
        displayIndex = data.index;
    }
    catch (error) {
        displays = [];
        displayIndex = -1;
    }
});
mine.Emitter.on("playerChat", function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var finalPos, display, display, pos, playerPos, finalPos, display, display, display, display, pos, _a, pos, playerPos, finalPos;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(e.chat == "summon")) return [3 /*break*/, 2];
                e.preventDefault();
                return [4 /*yield*/, mine.playerData[e.name].updatePos()];
            case 1:
                finalPos = (_b.sent());
                if (displays.length != 0 && displayIndex != -1) {
                    display = displays[displayIndex];
                    display.glowing = false;
                    display.update();
                }
                displays.push(mine.summonBlockDisplay(finalPos, null, null, "minecraft:diamond_block", null, EmptyTransformationObj, true));
                display = displays[displays.length - 1];
                display.addTags("Tests").build();
                displayIndex = displays.length - 1;
                saveDisplays();
                return [2 /*return*/];
            case 2:
                if (!e.chat.match(/^summon (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) return [3 /*break*/, 5];
                e.preventDefault();
                pos = e.chat.replace("summon ", "").split(" ");
                return [4 /*yield*/, mine.playerData[e.name].updatePos()];
            case 3:
                playerPos = (_b.sent());
                return [4 /*yield*/, relativePos(pos, playerPos)];
            case 4:
                finalPos = _b.sent();
                if (displays.length != 0) {
                    display = displays[displayIndex];
                    display.glowing = false;
                    display.update();
                }
                displays.push(mine.summonBlockDisplay(finalPos, null, null, "minecraft:diamond_block", null, EmptyTransformationObj, true));
                display = displays[displays.length - 1];
                display.addTags("Tests").build();
                displayIndex = displays.length - 1;
                saveDisplays();
                return [2 /*return*/];
            case 5:
                if (!(e.chat == "kill-all")) return [3 /*break*/, 6];
                e.preventDefault();
                mine.cmd("kill @e[nbt={Tags:[\"FromServer\",\"Displays\",\"Tests\"]}]").then(function (out) { });
                displays = [];
                displayIndex = -1;
                saveDisplays();
                return [2 /*return*/];
            case 6:
                if (!(e.chat == "kill" || e.chat == "rotate" || e.chat == "un-rotate" || e.chat == "next" || e.chat.startsWith("move ") || e.chat.startsWith("tp "))) return [3 /*break*/, 15];
                if (displayIndex == -1)
                    return [2 /*return*/];
                display = displays[displayIndex];
                if (display == null)
                    return [2 /*return*/];
                e.preventDefault();
                if (!(e.chat == "kill")) return [3 /*break*/, 7];
                display.kill();
                delete displays[displayIndex];
                displays = displays.filter(function (el) { return el != null; });
                if (displays.length > 0) {
                    display = displays[displays.length - 1];
                    display.glowing = true;
                    display.update();
                    displayIndex = displays.length - 1;
                }
                else
                    displayIndex = -1;
                saveDisplays();
                return [2 /*return*/];
            case 7:
                if (!(e.chat == "rotate")) return [3 /*break*/, 8];
                display.transformation.left_rotation = [0, 0.383, 0, 0.924];
                display.animate(20);
                saveDisplays();
                return [2 /*return*/];
            case 8:
                if (!(e.chat == "un-rotate")) return [3 /*break*/, 9];
                display.transformation.left_rotation = [0, 0, 0, 1];
                display.animate(20);
                saveDisplays();
                return [2 /*return*/];
            case 9:
                if (!(e.chat == "next")) return [3 /*break*/, 10];
                display = displays[displayIndex];
                display.glowing = false;
                display.update();
                //set selected
                displayIndex++;
                displayIndex %= displays.length;
                display = displays[displayIndex];
                display.glowing = true;
                display.update();
                saveDisplays();
                return [2 /*return*/];
            case 10:
                if (!e.chat.match(/^move (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) return [3 /*break*/, 12];
                pos = e.chat.replace("move ", "").split(" ");
                _a = display;
                return [4 /*yield*/, relativePos(pos, display.Pos)];
            case 11:
                _a.Pos = _b.sent();
                display.update().then(function (out) { });
                saveDisplays();
                return [2 /*return*/];
            case 12:
                if (!e.chat.match(/^tp (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) return [3 /*break*/, 15];
                pos = e.chat.replace("tp ", "").split(" ");
                return [4 /*yield*/, mine.playerData[e.name].updatePos()];
            case 13:
                playerPos = (_b.sent());
                return [4 /*yield*/, relativePos(pos, playerPos)];
            case 14:
                finalPos = _b.sent();
                display.Pos = finalPos;
                display.update().then(function (out) { });
                saveDisplays();
                return [2 /*return*/];
            case 15: return [2 /*return*/];
        }
    });
}); });
//#endregion
