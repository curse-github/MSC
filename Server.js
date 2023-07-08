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
function newParameter(name, nullable, isPublic, defaultValue, type) {
    return {
        "name": name, "type": (type || (typeof defaultValue).replace("bigint", "number")), "nullable": nullable, "public": isPublic, "defaultValue": defaultValue
    };
}
var WebSocket = require("ws");
var Client = /** @class */ (function () {
    function Client(name, isPublic) {
        this.connectionMessage = {
            type: "connection",
            data: {
                name: "Client",
                functions: [],
                public: true
            }
        };
        this.functions = {};
        this.intervalId = null;
        this.attemts = 0;
        this.onclose = null;
        this.name = name;
        this.public = isPublic;
    }
    Object.defineProperty(Client.prototype, "name", {
        get: function () { return this.connectionMessage.data.name; },
        set: function (v) { this.connectionMessage.data.name = v; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "public", {
        get: function () { return this.connectionMessage.data.public; },
        set: function (v) { this.connectionMessage.data.public = v; },
        enumerable: false,
        configurable: true
    });
    Client.prototype.SetupWebsocket = function () {
        var _this = this;
        try {
            this.ws.send(JSON.stringify(this.connectionMessage));
            this.ws.onerror = function (err) { console.log("Websocket error: \"" + err + "\"."); };
            this.ws.onmessage = function (e) {
                var _a;
                try {
                    if (_this.ws == null)
                        return;
                    var msg = JSON.parse(e.data);
                    if (msg.type != null) {
                        if (msg.type == "ping" && msg.data != null) {
                            _this.ws.send(JSON.stringify({ type: "pong", data: msg.data }));
                        }
                        else if (msg.type == "command" && msg.data != null) {
                            var funcName = msg.data.toLowerCase();
                            if (_this.functions[funcName] == null) {
                                console.log("invalid command");
                                console.log(msg);
                                return;
                            }
                            if (msg.parameters != null && msg.parameters.length > 0) {
                                (_a = _this.functions)[funcName].apply(_a, __spreadArray([_this], msg.parameters, false));
                            }
                            else {
                                _this.functions[funcName](_this);
                            }
                        }
                        else if (msg.type == "reply") {
                            if (msg.statusCode != 200) {
                                console.log("Connection failed, status " + msg.status);
                                console.log("Error message: \"" + msg.error + "\"");
                                console.log("Error id: \"" + msg.id + "\"");
                            }
                        }
                        else if (msg.type == "status") {
                            if (msg.statusCode != 200) {
                                console.log("Command fail, status " + msg.status);
                                console.log("Error message: \"" + msg.error + "\"");
                                console.log("Error id: \"" + msg.id + "\"");
                            }
                        }
                    }
                    else
                        console.log("Error, msg type is null.");
                }
                catch (err) {
                    console.log(err);
                }
            };
            this.ws.onclose = function (e) {
                console.log("Lost connection to MOCS server.");
                _this.ws = null;
                if (_this.onclose != null)
                    try {
                        _this.onclose();
                    }
                    catch (err) { }
                _this.setReconnectInterval(true);
            };
        }
        catch (err) {
            console.log(err.stack);
        }
        return this;
    };
    Client.prototype.setReconnectInterval = function (reconnection) {
        var _this = this;
        // attempt to connect every 20 seconds untill it works and then stop.
        this.tryReconnect(reconnection);
        this.intervalId = setInterval(function () {
            _this.tryReconnect(reconnection);
        }, 15000);
        return this;
    };
    Client.prototype.tryReconnect = function (reconnection) {
        var _this = this;
        if (this.ws != null) {
            try {
                this.ws.close();
            }
            catch (err) {
                console.log(err.stack);
            }
            this.ws = null;
        }
        ;
        this.attemts++;
        console.log("Attempt #" + this.attemts + " to connect to the MOCS server.");
        this.ws = new WebSocket(Client.URL);
        this.ws.onerror = function (e) { if (_this.ws != null) {
            if (_this.onclose != null)
                try {
                    _this.onclose();
                }
                catch (err) { }
            try {
                _this.ws.close();
            }
            catch (err) {
                console.log(err.stack);
            }
            _this.ws = null;
        } };
        this.ws.onclose = function (e) { if (_this.ws != null) {
            if (_this.onclose != null)
                try {
                    _this.onclose();
                }
                catch (err) { }
            _this.ws = null;
        } };
        this.ws.onopen = function () {
            _this.stopInterval(); // stop loop.
            //console.clear();
            console.log((reconnection == true ? "Rec" : "C") + "onnected to MOCS server" + ((_this.attemts > 1) ? " after " + _this.attemts + " attempts." : "."));
            _this.attemts = 0;
            _this.SetupWebsocket();
        };
        return this;
    };
    Client.prototype.stopInterval = function () { if (this.intervalId != null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
    } return this; };
    Client.prototype.AddFunction = function (name, isPublic, parameters, func) {
        this.connectionMessage.data.functions.push({ "name": name, "public": isPublic, "parameters": parameters });
        this.functions[name.toLowerCase() + "()"] = func;
        return this;
    };
    Client.prototype.AddChildFunction = function (devicename, devicePublic, functionName, functionPublic, parameters, func) {
        var devices = this.connectionMessage.data.devices;
        if (devices == null)
            devices = [];
        var index = devices.findIndex(function (el) { return el.name == devicename; });
        if (index == -1) {
            index = devices.length;
            devices.push({ name: devicename, "public": devicePublic, functions: [] });
        }
        devices[index].functions.push({ "name": functionName, "public": functionPublic, "parameters": parameters });
        this.connectionMessage.data.devices = devices;
        this.functions[devicename.toLowerCase() + "." + functionName.toLowerCase() + "()"] = func;
        return this;
    };
    Client.prototype.listen = function () {
        this.setReconnectInterval();
        return this;
    };
    //static URL:string = "ws://mc.campbellsimpson.com:42069";
    Client.URL = "ws://192.168.1.37:42069";
    return Client;
}());
//#endregion typeDefs
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
var BlockDisplay = /** @class */ (function () {
    function BlockDisplay(parent, pos, Name, Tags, Properties, transformation) {
        this.parent = parent;
        this.pos = pos;
        this.blockState = { "Name": Name, "Properties": Properties };
        this.transformation = transformation;
        this.uuid = generateUUID();
        this.Tags = Tags || [];
        this.Tags.push(this.uuid);
        this.command = "summon minecraft:block_display " + pos[0] + " " + pos[1] + " " + pos[2];
        var blockStateStr = "{Name:\"" + Name + "\"";
        if (Properties != null) {
            blockStateStr += ",Properties:{" + Object.entries(Properties).map(function (_a) {
                var key = _a[0], value = _a[1];
                return key + ":\"" + value + "\"";
            }).join(",") + "}";
        }
        blockStateStr += "}";
        var nbt = "{block_state:" + blockStateStr;
        if (transformation != null)
            nbt += ",transformation:" + Minecraft.transformationToString(transformation);
        nbt += ",Tags:[" + (Tags || []).map(function (el) { return "\"" + el + "\""; }).join(",") + "]";
        nbt += ",CustomName:\"\\\"" + this.uuid + "\\\"\",CustomNameVisible:0";
        nbt += ",Pos:[" + pos[0] + "d," + pos[1] + "d," + pos[2] + "d]";
        nbt += "}";
        this.command += " " + nbt;
    }
    BlockDisplay.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.parent.cmd(_this.command).then(function (out) { if (out.includes("Summoned new "))
                            resolve(true);
                        else
                            resolve(false); });
                    })];
            });
        });
    };
    BlockDisplay.prototype.kill = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.parent.cmd("kill @e[nbt={Tags:[\"" + _this.uuid + "\"]}]").then(function (out) { if (out.match(/Killed \d+/g) != null)
                resolve(true);
            else
                resolve(false); });
        });
    };
    BlockDisplay.prototype.update = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.command = "data merge entity @e[nbt={Tags:[\"" + _this.uuid + "\"]},limit=1]";
            var blockStateStr = "{Name:\"" + _this.blockState.Name + "\"";
            if (_this.blockState.Properties != null) {
                blockStateStr += ",Properties:{" + Object.entries(_this.blockState.Properties).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return key + ":\"" + value + "\"";
                }).join(",") + "}";
            }
            blockStateStr += "}";
            var nbt = "{block_state:" + blockStateStr;
            if (_this.transformation != null)
                nbt += ",transformation:" + Minecraft.transformationToString(_this.transformation);
            nbt += ",Tags:[" + (_this.Tags || []).map(function (el) { return "\"" + el + "\""; }).join(",") + "]";
            nbt += ",CustomName:\"\\\"" + _this.uuid + "\\\"\",CustomNameVisible:0";
            nbt += ",Pos:[" + _this.pos[0] + "d," + _this.pos[1] + "d," + _this.pos[2] + "d]";
            nbt += "}";
            _this.command += " " + nbt;
            _this.parent.cmd(_this.command).then(function (out) { if (out.includes("Modified entity data of"))
                resolve(true);
            else
                resolve(false); });
        });
    };
    return BlockDisplay;
}());
var Minecraft = /** @class */ (function () {
    function Minecraft() {
        var _this = this;
        this.playerData = {};
        this.tmpPlayerData = {};
        console.clear();
        this.cmdQueue = [];
        this.cmdResolves = [];
        this.waiting = false;
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
                        _this.runNextCmd();
                    })];
            });
        });
    };
    Minecraft.prototype.cmdNoOutput = function (stdin) {
        this.server.stdin.write(stdin + "\n");
    };
    Minecraft.prototype.runNextCmd = function () {
        if (!this.waiting && this.cmdQueue.length > 0) {
            this.server.stdin.write(this.cmdQueue[0] + "\n");
            this.waiting = true;
        }
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
                        this.Emitter.emit("serverStart");
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
                        console.log(Colors.Fgra + Colors.Fy + name_2 + " has joined." + Colors.R);
                        this.cmd("data get entity " + name_2).then(function (out) {
                            if (out.match(/\S+ has the following entity data: /g) != null) {
                                var data = "" + out.match(/(?<=\S+ has the following entity data: ).+/g);
                                var nbt = _this.parseNbt(data);
                                _this.playerData[name_2].nbt = nbt;
                                _this.playerData[name_2].pos = nbt.Pos;
                                //console.log(Colors.Fgra+user+": "+Colors.R); console.log(nbt);
                                return;
                            }
                        });
                        this.Emitter.emit("playerJoined", name_2);
                        return;
                    }
                    else if (json.data.endsWith(" left the game")) {
                        var name_3 = "" + json.data.match(/\S*(?= left the game)/);
                        this.playerData[name_3].online = false;
                        console.log(Colors.Fgra + Colors.Fy + name_3 + " has left." + Colors.R);
                        this.Emitter.emit("playerLeft", name_3);
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
                    else if (json.data.match(/\[\w*: .*\]/g) != null) {
                        var name_4 = "" + json.data.match(/(?<=\[)\w*(?=: .*\])/g);
                        var out = "" + json.data.match(/(?<=\[\w*: ).*(?=\])/g);
                        var timSplt = json.time.split(":");
                        var date = new Date();
                        date.setHours(timSplt[0]);
                        date.setMinutes(timSplt[1]);
                        date.setSeconds(timSplt[2]);
                        this.playerData[name_4].cmdOuts.push([out, date.getTime()]);
                        console.log(Colors.Fgra + "[" + name_4 + ": " + out + "]" + Colors.R);
                        this.Emitter.emit("playerCmdOut", name_4, out);
                        return;
                    }
                    else if (json.data.match(/(<|\[)\w*(>|\]) .*/g) != null) {
                        var name_5 = "" + json.data.match(/(?<=(<|\[))\w*(?=(>|\]) .*)/g);
                        var chat = "" + json.data.match(/(?<=(<|\[)\w*(>|\]) ).*/g);
                        var timSplt = json.time.split(":");
                        var date = new Date();
                        date.setHours(timSplt[0]);
                        date.setMinutes(timSplt[1]);
                        date.setSeconds(timSplt[2]);
                        this.playerData[name_5].chats.push([chat, date.getTime()]);
                        console.log(Colors.Fgra + "<" + name_5 + "> " + chat + Colors.R);
                        this.Emitter.emit("playerChat", name_5, chat);
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
                default:
                    console.log(Colors.Fgra + "Unknown type " + Colors.Fgre + "\"" + json.type + "\"" + Colors.Fgra + "." + Colors.R);
                    console.log(json);
                    break;
            }
            console.log(line);
            return;
        }
        catch (err) {
            //console.dir(err);
            console.log(line);
            console.log(Colors.Fr + "Error" + Colors.R);
            console.log(err);
        }
    };
    Minecraft.prototype.parseNbt = function (nbt) {
        frontTrim();
        var out = {};
        function parseValue() {
            if (nbt[0] == "{") { //object
                return parseObj();
            }
            else if (nbt[0] == "[") { //array
                return parseArray();
            }
            else if (nbt[0] == "\"") { //string
                return parseString();
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
        function parseString() {
            if (!nbt.startsWith("\"") && !nbt.startsWith("'")) {
                console.log("8");
                console.log(nbt);
                return null;
            }
            nbt = nbt.substring(1);
            var ind = -1;
            for (var i = 0; i < nbt.length; i++) {
                if ((nbt[i] == "\"" || nbt[i] == "'") && nbt[i - 1] != "\\") {
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
        function parseNumber() {
            var num = nbt.match(/^-?\d+(\.\d+)?(s|S|b|B|d|D|f|F)?/g);
            if (num != null) {
                nbt = nbt.substring(num[0].length);
                //console.log("\""+num[0]+"\"");
                return parseFloat(num[0]);
            }
            else {
                console.log("10");
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
                console.log("11");
                console.log(nbt);
                return null;
            }
        }
        return parseValue();
    };
    Minecraft.prototype.serverCmdOut = function (out) {
        if (this.waiting && this.cmdResolves.length > 0) {
            if (out != "Unknown or incomplete command, see below for error") {
                this.cmdQueue.shift();
                var resolve = this.cmdResolves.shift();
                this.waiting = false;
                if (resolve != null)
                    resolve(out);
                this.runNextCmd();
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
    Minecraft.prototype.summonBlockDisplay = function (pos, Name, Properties, transformation, Tags) {
        return new BlockDisplay(this, pos, Name, Tags, Properties, transformation);
    };
    return Minecraft;
}());
var mine = new Minecraft();
var myClient = new Client("McServer", true)
    .AddFunction("cmd", true, [
    newParameter("cmd", false, true, "tp __Curse -3 86 3")
], function (client, input) {
    //console.log(Colors.Fgra+"Cmd: "+Colors.Fgre+(input as string));
    if (input.startsWith("tellraw")) {
        mine.cmdNoOutput(input);
    }
    else {
        mine.cmd(input).then(function (out) {
            console.log(Colors.Fgre + input + Colors.Fgra + " : " + Colors.Fgre + out + Colors.R);
        });
    }
})
    .AddFunction("print", true, [], function (client) {
    console.log(mine.playerData);
    Object.entries(mine.playerData).forEach(function (_a) {
        var player = _a[0], data = _a[1];
        var tmpData = __assign({}, data);
        delete tmpData.nbt;
        mine.cmdNoOutput("tellraw " + player + " \"" + JSON.stringify(tmpData, null, 4).split("\n").join("\\n").split("\"").join("\\\"") + "\"");
    });
});
mine.Emitter.on("serverStart", function () {
    myClient.listen();
});
mine.Emitter.on("playerJoined", function (user) {
    mine.cmd("op " + user).then(function (out) { console.log(Colors.Fgra + out + Colors.R); });
});
mine.Emitter.on("playerLeft", function (user) {
    mine.cmd("deop " + user).then(function (out) { console.log(Colors.Fgra + out + Colors.R); });
});
var display;
mine.Emitter.on("playerChat", function (user, chat) { return __awaiter(void 0, void 0, void 0, function () {
    var out, data, nbt, pos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(chat == "summon")) return [3 /*break*/, 2];
                return [4 /*yield*/, mine.cmd("data get entity " + user)];
            case 1:
                out = _a.sent();
                if (out.match(/\S+ has the following entity data: /g) != null) {
                    data = "" + out.match(/(?<=\S+ has the following entity data: ).+/g);
                    nbt = mine.parseNbt(data);
                    mine.playerData[user].nbt = nbt;
                    mine.playerData[user].pos = nbt.Pos;
                    pos = [Math.round(nbt.Pos[0]), Math.round(nbt.Pos[1]), Math.round(nbt.Pos[2])];
                    display = mine.summonBlockDisplay(pos, "minecraft:diamond_block", null, { translation: [-0.5, 0, -0.5], left_rotation: [0, 0, 0, 1], scale: [1, 1, 1], right_rotation: [0, 0, 0, 1] }, []);
                    display.build();
                    console.log("summoned!!");
                }
                return [3 /*break*/, 3];
            case 2:
                if (chat == "up") {
                    if (display != null) {
                        display.pos[1] += 1;
                        display.update().then(function (out) { console.log(Colors.Fgra + out + Colors.R); });
                    }
                }
                else if (chat == "down") {
                    if (display != null) {
                        display.pos[1] -= 1;
                        display.update().then(function (out) { console.log(Colors.Fgra + out + Colors.R); });
                    }
                }
                else if (chat == "kill") {
                    if (display != null)
                        display.kill();
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
mine.Emitter.on("playerCmdOut", function (user, playerOut) { return __awaiter(void 0, void 0, void 0, function () {
    var out;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(playerOut == "Gamerule sendCommandFeedback is now set to: false")) return [3 /*break*/, 3];
                return [4 /*yield*/, mine.cmd("gamerule sendCommandFeedback true")];
            case 1:
                out = _a.sent();
                console.log(Colors.Fgra + out + Colors.R);
                return [4 /*yield*/, mine.cmd("kill " + user)];
            case 2:
                out = _a.sent();
                console.log(Colors.Fgra + out + Colors.R);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
