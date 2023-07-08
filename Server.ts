class Colors {
    static Reset     :string = "\x1b[0m";
    static Bright    :string = "\x1b[1m";
    static Underscore:string = "\x1b[4m";
    static Reverse   :string = "\x1b[7m";
    //static Dim       :string = "\x1b[2m";//does not work at all
    //static Blink     :string = "\x1b[5m";//does not work at all
    //static Hidden    :string = "\x1b[8m";//does not work at all
    static R  :string = "\x1b[0m";
    static B  :string = "\x1b[1m";
    static U  :string = "\x1b[4m";
    static Rev:string = "\x1b[7m";

    static FgBlack  :string = "\x1b[30m";
    static FgRed    :string = "\x1b[31m";
    static FgGreen  :string = "\x1b[32m";
    static FgYellow :string = "\x1b[33m";//does not work on powershell somehow
    static FgBlue   :string = "\x1b[34m";
    static FgMagenta:string = "\x1b[35m";
    static FgCyan   :string = "\x1b[36m";
    static FgWhite  :string = "\x1b[37m";
    static FgGray   :string = "\x1b[90m";
    static Fbla:string = "\x1b[30m";
    static Fr  :string = "\x1b[31m";
    static Fgre:string = "\x1b[32m";
    static Fy  :string = "\x1b[33m";//does not work on powershell somehow
    static Fblu:string = "\x1b[34m";
    static Fm  :string = "\x1b[35m";
    static Fc  :string = "\x1b[36m";
    static Fw  :string = "\x1b[37m";
    static Fgra:string = "\x1b[90m";

    static BgBlack  :string = "\x1b[40m" ;
    static BgRed    :string = "\x1b[41m" ;
    static BgGreen  :string = "\x1b[42m" ;
    static BgYellow :string = "\x1b[43m" ;
    static BgBlue   :string = "\x1b[44m" ;
    static BgMagenta:string = "\x1b[45m" ;
    static BgCyan   :string = "\x1b[46m" ;
    static BgWhite  :string = "\x1b[47m" ;
    static BgGray   :string = "\x1b[100m";
    static Bbla:string = "\x1b[40m" ;
    static Br  :string = "\x1b[41m" ;
    static Bgre:string = "\x1b[42m" ;
    static By  :string = "\x1b[43m" ;
    static Bblu:string = "\x1b[44m" ;
    static Bm  :string = "\x1b[45m" ;
    static Bc  :string = "\x1b[46m" ;
    static Bw  :string = "\x1b[47m" ;
    static Bgra:string = "\x1b[100m";
}

import { EventEmitter } from "events";
import {spawn,ChildProcessWithoutNullStreams } from "child_process";// https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
import * as fs from "fs";
function generateUUID():string {
	var a = new Date().getTime();//Timestamp
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var b = Math.random() * 16;//random number between 0 and 16
		b = (a + b)%16 | 0;
		a = Math.floor(a/16);
		return (c === 'x' ? b : (b & 0x3 | 0x8)).toString(16);
	});
}
type Vec3<T> = [T,T,T];
type Vec4<T> = [T,T,T,T];
type PlayerData = {
    name:string,
    uuid:string,
    entityId:number,
    pos:Vec3<number>,
    online:boolean,
    cmdOuts:[string,number][],
    chats:[string,number][],
    nbt:any,
    updatePos:()=>Promise<Vec3<number>>
};
// https://misode.github.io/transformation
type transformationObj = {translation:Vec3<number>,scale:Vec3<number>,left_rotation:Vec4<number>,right_rotation:Vec4<number>};
type Transformation = transformationObj|[number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number];


class Minecraft {
    cmdQueue:string[];
    cmdResolves:((value:any)=>void)[];
    waiting:boolean;
    server:ChildProcessWithoutNullStreams;
    playerData:{[key:string]:PlayerData} = {};
    tmpPlayerData:{[key:string]:any} = {};

    Emitter:EventEmitter;
    constructor() {
        console.clear();

        this.cmdQueue=[];
        this.cmdResolves=[];
        this.waiting=false;

        this.server = spawn("java",["-Xmx5G", "-Xms5G", "-jar", "./server.jar", "nogui"],{cwd:__dirname+"/server"});
        this.server.stdout.on('data', (stdout: any) => {
            var out:string = stdout.toString().trim();
            out!.split("\r\n").forEach((newOut:string)=>{
                this.handle(newOut);
            })
        });
        this.server.stderr.on('data', (stderr:any)      =>{ console.log(Colors.Fgra+"Server exited with code: "+Colors.Fy+stderr.toString()+Colors.Fgra+"."+Colors.R);process.exit(); });
        this.server       .on('close',(code:number|null)=>{ console.log(Colors.Fgra+"Server exited with code: "+Colors.Fy+code+Colors.Fgra+"."+Colors.R);             process.exit(); });

        process.on('SIGINT', ()=>{ console.log(Colors.Fr+"KeyboardInterrupt"+Colors.R); process.exit(); });
        process.on('SIGTERM',()=>{ console.log(Colors.Fgra+"Server closing!!"+Colors.R);                });
        
        this.Emitter = new EventEmitter();
    }
    async cmd(stdin:string) {
        return new Promise<string>((resolve:(value:any)=>void)=>{
            this.cmdQueue   .push(stdin  );
            this.cmdResolves.push(resolve);
            this.runNextCmd();
        });
        //server.stdin.end();
    }
    cmdNoOutput(stdin:string) {
        this.server.stdin.write(stdin+"\n");
    }
    runNextCmd() {
        if (!this.waiting && this.cmdQueue.length>0) {
            this.server.stdin.write(this.cmdQueue[0]+"\n");
            this.waiting=true;
        }
    }
    getPlayerPos(name:string) {
        return new Promise<Vec3<number>>(async(resolve:(value:Vec3<number>)=>void)=>{
            var out:string = await mine.cmd("data get entity "+name)
            if (out.match(/\S+ has the following entity data: /g) != null) {
                var data = ""+out.match(/(?<=\S+ has the following entity data: ).+/g);
                const nbt=mine.parseNbt(data);
                mine.playerData[name].nbt=nbt;
                mine.playerData[name].pos=nbt.Pos as Vec3<number>;
    
                resolve([Math.floor(nbt.Pos[0]),Math.floor(nbt.Pos[1]),Math.floor(nbt.Pos[2])]);
            } else resolve([0,0,0]);
        });
    }
    handle(line:string):void {// https://regexr.com
        try {
            if (line.startsWith("Starting")) return;
            var splt = line.split(/\ (?![^\[]*\])/g);
            var json:any = {};
    
            json.time = splt.shift()!.match(/(?!\[)(.*)(?=\])/g);// https://www.regextester.com/96872
            if (json.time!=null){ json.time=json.time![0]; }else{ console.log(Colors.Fgra+line+Colors.R);return; }
            json.type = splt.shift()!.match(/(?!\[)(.*)(?=\])/g)![0];
            if      (json.type.match(/(Worker-Main-(\d+)\/INFO)/g)       != null) json.type = "Worker-Main/INFO"       ;
            else if (json.type.match(/(User Authenticator #\d\/INFO)/g)  != null) json.type = "User Authenticator/INFO";
            else if (json.type.match(/(User Authenticator #\d\/ERROR)/g) != null) json.type = "User Authenticator/ERROR";
            json.data = splt.join(" ");
    
            switch (json.type) {
                case "ServerMain/INFO":
                    if (json.data.startsWith("You need to agree to the EULA")) {
                        fs.writeFileSync("./server/eula.txt",fs.readFileSync("./server/eula.txt").toString().replace("false","true"));
                        console.log(Colors.Fgre+"EULA agreed. Restart server now.");return;
                    }
                    else if (json.data.startsWith("Environment: ")) return;
                    else if (json.data.match(/Loaded \d* recipes/g)     !=null) {console.log(Colors.Fgra+"Recipes loaded: "     +Colors.Fy+json.data.match(/(?<=Loaded )\d*/g)+Colors.Fgra+".");return;}
                    else if (json.data.match(/Loaded \d* advancements/g)!=null) {console.log(Colors.Fgra+"Advancements loaded: "+Colors.Fy+json.data.match(/(?<=Loaded )\d*/g)+Colors.Fgra+".");return;}
                    else { console.log(json);break; }
                case "ServerMain/WARN":
                    if (json.data=="Failed to load eula.txt") return;
                    else {console.log(json);break;}
                case "Server thread/WARN":
                    if (json.data.includes("moved too quickly!")) return;
                    console.log(json);break;
                case "Server thread/INFO":
                    if (json.data.startsWith("Starting minecraft server version")) {
                        console.log(Colors.Fgra+"Minecraft Version: "+Colors.Fy+(json.data.match(/\d+\.\d+\.?\d+?/g))+Colors.Fgra+"."+Colors.R);return;
                    } else if (json.data.startsWith("Default game type")) {
                        console.log(Colors.Fgra+"Default gamemode: "+Colors.Fgre+(json.data.match(/(?<=Default game type: )\w+/g))+Colors.Fgra+"."+Colors.R);return;
                    } else if (json.data.startsWith("Starting Minecraft server on")) {
                        console.log(Colors.Fgra+"Server port: "+Colors.Fy+(json.data.match(/(?<=Starting Minecraft server on \*:)\d*/g))+Colors.Fgra+"."+Colors.R);return;
                    } else if (json.data.startsWith("Preparing start region for dimension")) {
                        const dimension:string = ""+json.data.match(/(?<=Preparing start region for dimension )\w*:\w*/g);
                        console.log(Colors.Fgra+"Preparing dimension: "+Colors.Fgre+dimension+Colors.Fgra+"."+Colors.R);return;
                    } else if (json.data.startsWith("Time elapsed")) {
                        console.log(Colors.Fgra+"Time elapsed: "+Colors.Fy+(json.data.match(/(?<=Time elapsed: )\d* ms/g))+Colors.Fgra+"."+Colors.R);return;
                    } else if (json.data.startsWith("Done")) {
                        console.log(Colors.Fgra+"Total time: "+Colors.Fy+(json.data.match(/(?<=Done \()\d+\.\d+s/g))+Colors.Fgra+"."+Colors.R);
                        console.log(Colors.Fgre+"Server started"+Colors.R);

                        this.Emitter.emit("serverStart",{"preventDefault":(()=>{})});
                        return;
                    } else if (json.data.includes("logged in with entity id")) {
                        const name:string = ""+json.data.match(/.*(?=\[\/\d*\.\d*\.\d*\.\d:\d*] logged in with entity id)/)!;
                        const entityId:number = parseInt(""+json.data.match(/(?<=with entity id )\d*/g)!);
                        const pos:Vec3<number> = JSON.parse("["+json.data.match(/(?<=entity id \d* at \()-?\d*\.\d*, -?\d*\.\d*, -?\d*\.\d*/g)!+"]");
                        this.tmpPlayerData[name]=this.tmpPlayerData[name]||{};
                        this.tmpPlayerData[name].entityId=entityId;
                        this.tmpPlayerData[name].pos=pos;
                        //var out = Colors.Fgra+"Entity id of user "+Colors.Fgre+name+Colors.Fgra+" is "+Colors.Fy+entityId+Colors.Fgra+".\n";
                        //out += "Position of user "+Colors.Fgre+name+Colors.Fgra+" is ["+Colors.Fy+pos[0]+Colors.Fgra+", "+Colors.Fy+pos[1]+Colors.Fgra+", "+Colors.Fy+pos[2]+Colors.Fgra+"]."+Colors.R;
                        //console.log(out);
                        return;
                    } else if (json.data.match(/\S* joined the game/)!=null) {
                        const name:string = ""+json.data.match(/\S*(?= joined the game)/)!;
                        const tmpData=this.tmpPlayerData[name]; this.tmpPlayerData[name]=null;
                        this.playerData[name]=this.playerData[name]||{"name":name,uuid:"",entityId:-1,pos:[],online:true,cmdOuts:[],chats:[]};
                        if (tmpData.uuid    ) this.playerData[name].uuid     = tmpData.uuid    ;
                        if (tmpData.entityId) this.playerData[name].entityId = tmpData.entityId;
                        if (tmpData.pos     ) this.playerData[name].pos      = tmpData.pos     ;
                        this.playerData[name].online=true;
                        this.playerData[name].updatePos = async()=>{return this.getPlayerPos(name);};
                        this.cmd("data get entity "+name).then((out:string)=>{//playerJoined
                            if (out.match(/\S+ has the following entity data: /g) != null) {
                                var data = ""+out.match(/(?<=\S+ has the following entity data: ).+/g);
                                const nbt=this.parseNbt(data);
                                this.playerData[name].nbt=nbt
                                this.playerData[name].pos=nbt.Pos as Vec3<number>;
                                //console.log(Colors.Fgra+user+": "+Colors.R); console.log(nbt);
                                return;
                            }
                        });

                        var doDefault:Boolean = true;
                        this.Emitter.emit("playerJoined",{"name":name,"player":this.playerData[name],"preventDefault":(()=>{doDefault=false;})})
                        if (doDefault) {
                            console.log(Colors.Fgra+Colors.Fy+name+" has joined."+Colors.R);
                        }
                        return;
                    } else if (json.data.endsWith(" left the game")) {//playerLeft
                        const name:string = ""+json.data.match(/\S*(?= left the game)/)!;
                        this.playerData[name].online=false;

                        var doDefault:Boolean = true;
                        this.Emitter.emit("playerLeft",{"name":name,"player":this.playerData[name],"preventDefault":(()=>{doDefault=false;})})
                        if (doDefault) {
                            console.log(Colors.Fgra+Colors.Fy+name+" has left."+Colors.R);
                        }
                        return;
                    } else if (json.data == "Stopping server") {
                        console.log(Colors.Fgra+"Server closing!!"+Colors.R);return;
                    } else if (json.data.startsWith("Saving chunks for level")) {
                        const dimension:string = ""+json.data.match(/(?<=level 'ServerLevel\[world\]\'\/)\w*:\w*/g)!;
                        console.log(Colors.Fgra+"Saving dimension: "+Colors.Fgre+dimension+Colors.Fgra+"."+Colors.R);
                        return;
                    } else if (json.data.startsWith("ThreadedAnvilChunkStorage")) {
                        if (json.data == "ThreadedAnvilChunkStorage: All dimensions are saved") {
                            console.log(Colors.Fgra+"All dimensions are saved.");
                        } else {
                            var dimension:string = ""+json.data.match(/(?<=ThreadedAnvilChunkStorage \()\w*\d?-?\d?/g)!;
                            dimension = dimension.replace("DIM1","minecraft:the_nether").replace("DIM-1","minecraft:the_end").replace("world","minecraft:overworld");
                            console.log(Colors.Fgra+"Saved dimension: "+Colors.Fgre+dimension+Colors.Fgra+"."+Colors.R);
                        }
                        return;
                    } else if  (json.data == "Loading properties" ||
                        json.data == "Generating keypair" ||
                        json.data == "Using default channel type" ||
                        json.data.startsWith("Preparing level") ||
                        json.data.endsWith("lost connection: Disconnected") ||
                        json.data == "Saving players" ||
                        json.data == "Saving worlds") {
                        return;//nothing
                    } else if (json.data.match(/\[\w*: .*\]/g) != null) {//playerCmdOut
                        const name:string = ""+json.data.match(/(?<=\[)\w*(?=: .*\])/g)!;
                        const out:string = ""+json.data.match(/(?<=\[\w*: ).*(?=\])/g)!;
    
                        const timSplt = json.time.split(":");
                        const date = new Date();
                        date.setHours(timSplt[0]);
                        date.setMinutes(timSplt[1]);
                        date.setSeconds(timSplt[2]);
                        this.playerData[name].cmdOuts.push([out,date.getTime()]);

                        var doDefault:Boolean = true;
                        this.Emitter.emit("playerCmdOut",{"name":name,"out":out,"player":this.playerData[name],"preventDefault":(()=>{doDefault=false;})})
                        if (doDefault) {
                            console.log(Colors.Fgra+"["+name+": "+out+"]"+Colors.R);
                        }
                        return;
                    } else if (json.data.match(/(<|\[)\w*(>|\]) .*/g) != null) {//playerChat
                        const name:string = ""+json.data.match(/(?<=(<|\[))\w*(?=(>|\]) .*)/g)!;
                        const chat:string = ""+json.data.match(/(?<=(<|\[)\w*(>|\]) ).*/g)!;
    
                        const timSplt = json.time.split(":");
                        const date = new Date();
                        date.setHours(timSplt[0]);
                        date.setMinutes(timSplt[1]);
                        date.setSeconds(timSplt[2]);
                        this.playerData[name].chats.push([chat,date.getTime()]);
                        
                        var doDefault:Boolean = true;
                        this.Emitter.emit("playerChat",{"name":name,"chat":chat,"player":this.playerData[name],"preventDefault":(()=>{doDefault=false;})})
                        if (doDefault) {
                            console.log(Colors.Fgra+"<"+name+"> "+chat+Colors.R);
                        }
                        return;
                    } else {this.serverCmdOut(json.data);return;}
                case "Worker-Main/INFO":
                    if (json.data.startsWith("Preparing spawn area:")) {
                        console.log(Colors.Fgra+"Preparing spawn: "+Colors.Fy+(json.data.match(/\d*%/g))+Colors.Fgra+"."+Colors.R);
                        return;
                    } else {console.log(json);break;}
                case "User Authenticator/INFO":
                    if (json.data.startsWith("UUID of player")) {
                        const name:string = ""+json.data.match(/(?<=UUID of player )\w*/g)!;
                        const uuid:string = ""+json.data.match(/(?<=UUID of player \w* is )\w*-\w*-\w*-\w*-\w*/g)!;
                        this.tmpPlayerData[name]=this.tmpPlayerData[name]||{};
                        this.tmpPlayerData[name].uuid=uuid;
                        //console.log(Colors.Fgra+"UUID of user "+Colors.Fgre+name+Colors.Fgra+" is "+Colors.Fgre+uuid+Colors.Fgra+"."+Colors.R);
                        return;
                    } else {console.log(json);break;}
                case "User Authenticator/INFO":
                    console.log(json);break;
                default:
                    console.log(Colors.Fgra+"Unknown type "+Colors.Fgre+"\""+json.type+"\""+Colors.Fgra+"."+Colors.R);
                    console.log(json); break;
            }
            console.log(Colors.Fgra+line+Colors.R);return;
        } catch (err:any) {
            //console.dir(err);
            console.log(line);
            console.log(Colors.Fr+"Error"+Colors.R);
            console.log(err);
        }
    }

    parseNbt(nbt:string):any {
        frontTrim();
        var out:any = {};
        function parseValue() {
            if (nbt[0] == "{") {//object
                return parseObj();
            } else if (nbt[0] == "[") {//array
                return parseArray();
            } else if (nbt[0] == "\"") {//string
                return parseString();
            } else if (nbt[0]=="-"||digits.includes(nbt[0])) {//number
                return parseNumber();
            } else {//boolean
                return parseBool();
            }
        }
        const digits:string[]=["1","2","3","4","5","6","7","8","9","0"];
        function frontTrim() {
            nbt=nbt.replace(/^\s*/g,"");
        }
        function parseObj() {
            var obj:{[key:string]:any} = {};
            if (nbt[0] != "{") {console.log("1");console.log(nbt);return null;}
            nbt=nbt.substring(1);
            frontTrim();
            var first=true;
            while (nbt[0]!="}") {
                if (!nbt.startsWith(",")) {if (!first) {console.log("2");console.log(nbt);return null;} else first=false;}
                else nbt=nbt.substring(1);
                frontTrim();
                const key:string = (nbt.match(/^\w+(?=\s*:)/g)||["null"])[0];
                nbt=nbt.substring(key.length);
                if(nbt[0]!=":"){console.log("3");console.log(nbt);return null;}
                nbt=nbt.substring(1);
                frontTrim();
                obj[key]=parseValue();
                frontTrim();
            }
            if (nbt[0] != "}") {console.log("4");console.log(nbt);return null;}
            nbt=nbt.substring(1);
            //console.log("\""+obj+"\"");
            return obj;
        }
        function parseArray() {
            if (nbt[0] != "[") {console.log("5");console.log(nbt);return null;}
            nbt=nbt.substring(1);
            var ary:any[] = [];
            if (nbt.startsWith("B;") || nbt.startsWith("I;") || nbt.startsWith("L;")) {nbt=nbt.substring(2);}
            frontTrim();
            var first=true;
            while (nbt[0]!="]") {
                if (!nbt.startsWith(",")) {if (!first) {console.log("6");console.log(nbt);return null;} else first=false;}
                else nbt=nbt.substring(1);
                frontTrim();
                ary.push(parseValue());
                frontTrim();
            }
            if (nbt[0] != "]") {console.log("7");console.log(nbt);return null;}
            nbt=nbt.substring(1);
            //console.log("\""+ary+"\"");
            return ary;
        }
        function parseString():string|null {
            if (!nbt.startsWith("\"") && !nbt.startsWith("'")) {console.log("8");console.log(nbt);return null;}
            nbt=nbt.substring(1);
            var ind:number = -1;
            for (let i = 0; i < nbt.length; i++) {
                if ((nbt[i]=="\""||nbt[i]=="'")&&nbt[i-1]!="\\"){ind=i;break;}
            }
            if (ind==-1){console.log("9");console.log(nbt);return null;}
            var str=nbt.substring(0,ind)
            nbt=nbt.substring(ind+1);
            //console.log("\""+str+"\"");
            return str;
        }
        function parseNumber():number|null {
            var num:string[]|null = nbt.match(/^-?\d+(\.\d+)?(s|S|b|B|d|D|f|F)?/g);
            if (num != null) {
                nbt=nbt.substring(num[0].length);
                //console.log("\""+num[0]+"\"");
                return parseFloat(num[0]);
            }
            else {console.log("10");console.log(nbt);return null;}
        }
        function parseBool():boolean|null {
            if (nbt.toLowerCase().startsWith("true" )) {
                //console.log("\""+true +"\"");
                nbt=nbt.substring(4); return true ;
            }
            else if (nbt.toLowerCase().startsWith("false")) {
                //console.log("\""+false+"\"");
                nbt=nbt.substring(5); return false;
            }
            else {console.log("11");console.log(nbt);return null;}
        }
        return parseValue();
    }

    serverCmdOut(out:string) {
        if (this.waiting && this.cmdResolves.length>0) {
            if (out!="Unknown or incomplete command, see below for error") {
                this.cmdQueue.shift();
                var resolve:((value:any)=>void) = this.cmdResolves.shift()!;
                this.waiting=false;
                if (resolve!=null) resolve(out);
                this.runNextCmd();
            }
        }
        //console.log(Colors.Fgra+"[Server]: "+out+Colors.R);
    }
    //https://misode.github.io/transformation
    static transformationToString(transformation:Transformation):string {
        if (Array.isArray(transformation)) {
            return "["+transformation.map((el:number)=>el.toString()+"f").join(",")+"]";
        } else {
            var str:string = "{"+Object.entries(transformation).map(([key,value]:[string,Vec3<number>|Vec4<number>])=>key+":["+value.map((el:number)=>""+el+"f").join(",")+"]").join(",")+"}";
            return str;
        }
    }
    summonBlockDisplay(pos:Vec3<number>,Name:string,Properties:{[key:string]:string}|null,transformation:Transformation|null,Tags:string[]|null,glowing:boolean,glow_color_override:number|null):BlockDisplay {
        return new BlockDisplay(this,pos,Name,Tags,Properties,transformation,glowing,glow_color_override);
    }
}

class BlockDisplay {
    parent:Minecraft;
    pos:Vec3<number>;
    blockState:{Name:string,Properties?:{[key:string]:string}|null};
    transformation?:Transformation|null;
    uuid:string;
    Tags:string[]|null;
    glowing:boolean;
    glow_color_override:number|null;// https://www.digminecraft.com/lists/dyed_armor_color_list_pc.php

    command:string|undefined;
    constructor(parent:Minecraft, pos:Vec3<number>, Name:string, Tags:string[]|null, Properties:{[key:string]:string}|null, transformation:Transformation|null,glowing:boolean,glow_color_override:number|null) {
        this.parent=parent;
        this.pos = pos;
        this.blockState={"Name":Name,"Properties":Properties};
        this.transformation=transformation;
        this.Tags=Tags||[];
        this.glowing=glowing;
        this.glow_color_override=glow_color_override;

        this.uuid = generateUUID();
        this.Tags.push(this.uuid,"FromServer","Displays");
    }
    async build():Promise<boolean> {
        return new Promise<boolean>((resolve:(value:boolean)=>void)=>{
            this.command = "summon minecraft:block_display 0 0 0 {Tags:["+(this.Tags||[]).map((el:string)=>"\""+el+"\"").join(",")+"]}";
            this.parent.cmd(this.command).then((out:string)=>{if (out.includes("Summoned new ")) resolve(true); else resolve(false);});
            this.update();
        });
    }
    kill():Promise<boolean> {
        return new Promise<boolean>((resolve:(value:boolean)=>void)=>{
            this.parent.cmd("kill @e[nbt={Tags:[\""+this.uuid+"\"]}]").then((out:string)=>{if (out.match(/Killed \d+/g) != null) resolve(true); else resolve(false);});
        });
    }
    update():Promise<boolean> {
        return new Promise<boolean>((resolve:(value:boolean)=>void)=>{
            this.command = "data merge entity @e[nbt={Tags:[\""+this.uuid+"\",\"FromServer\",\"Displays\"]},limit=1]";
            var blockStateStr:string = "{Name:\""+this.blockState.Name+"\"";
            if (this.blockState.Properties!=null){ blockStateStr+=",Properties:{"+Object.entries(this.blockState.Properties).map(([key,value]:[string,string])=>{return key+":\""+value+"\"";}).join(",")+"}";}
            blockStateStr+="}";
            var nbt:string = "{block_state:"+blockStateStr;
            if (this.transformation!=null) nbt+=",transformation:"+Minecraft.transformationToString(this.transformation);
            nbt+=",Tags:["+(this.Tags||[]).map((el:string)=>"\""+el+"\"").join(",")+"]";
            nbt+=",CustomName:\"\\\""+this.uuid+"\\\"\",CustomNameVisible:0";
            nbt+=",Glowing:"+(this.glowing?"1b":"0b");
            nbt+=",glow_color_override:"+(this.glow_color_override||0).toString();
            nbt+=",Pos:["+this.pos[0]+"d,"+this.pos[1]+"d,"+this.pos[2]+"d]";
            nbt+="}";
            this.command+=" "+nbt;
            this.parent.cmd(this.command).then((out:string)=>{if (out.includes("Modified entity data of")) resolve(true); else resolve(false);});
        });
    }
    animate(ticks:number):Promise<boolean> {
        return new Promise<boolean>((resolve:(value:boolean)=>void)=>{
            this.command = "data merge entity @e[nbt={Tags:[\""+this.uuid+"\",\"FromServer\",\"Displays\"]},limit=1]";
            var nbt:string = "{";
            nbt+="start_interpolation:0,interpolation_duration:"+ticks;
            if (this.transformation!=null) nbt+=",transformation:"+Minecraft.transformationToString(this.transformation);
            nbt+="}";
            this.command+=" "+nbt;
            this.parent.cmd(this.command).then((out:string)=>{if (out.includes("Modified entity data of")) resolve(true); else resolve(false);});
        });
    }
}

const mine:Minecraft = new Minecraft();

mine.Emitter.on("serverStart",(e:{preventDefault:()=>void})=>{
    //server started
});

mine.Emitter.on("playerJoined",(e:{name:string,preventDefault:()=>void})=>{
    mine.cmd("op "+e.name).then((out:string)=>{console.log(Colors.Fgra+out+Colors.R);})
});
mine.Emitter.on("playerLeft",(e:{name:string,preventDefault:()=>void})=>{
    mine.cmd("deop "+e.name).then((out:string)=>{console.log(Colors.Fgra+out+Colors.R);})
});
mine.Emitter.on("playerChat",async(e:{name:string,chat:string,player:PlayerData,preventDefault:()=>void})=>{
    if (e.chat=="stop") {
        e.preventDefault();
        console.log(Colors.Fgra+(await mine.cmd("stop"))+Colors.R);
        return;
    }
});
mine.Emitter.on("playerCmdOut",async (e:{name:string,out:string,player:PlayerData,preventDefault:()=>void})=>{
    if (e.out=="Gamerule sendCommandFeedback is now set to: false") {
        var returnVal:string = await mine.cmd("gamerule sendCommandFeedback true");
        console.log(Colors.Fgra+returnVal+Colors.R);
        returnVal = await mine.cmd("kill "+e.name);
        console.log(Colors.Fgra+returnVal+Colors.R);
    }
});
//#region BlockDisplays
async function relativePos(pos:Vec3<string>|null,relativePos:Vec3<number>):Promise<Vec3<number>> {
    return new Promise<Vec3<number>>(async(resolve:(value:Vec3<number>)=>void)=>{
        if (pos==null || (pos[0]=="~"&&pos[1]=="~"&&pos[2]=="~")) { resolve(relativePos);return; }
        var finalPos:Vec3<number> = [0,0,0];
        for (let i = 0; i < pos.length; i++) {
            const num = pos[i];
            if (num=="~") { finalPos[i]=relativePos[i]; }
            else if (num.startsWith("~")){finalPos[i]=relativePos[i]+parseFloat(num.replace("~","")); }
            else{finalPos[i]=parseFloat(num); }
        }
        resolve(finalPos);return;
    });
}
var displays:BlockDisplay[] = [];
var displayIndex:number = -1;
mine.Emitter.on("playerChat",async(e:{name:string,chat:string,player:PlayerData,preventDefault:()=>void})=>{
    if (e.chat=="summon") { e.preventDefault();
        var finalPos:Vec3<number> = (await mine.playerData[e.name].updatePos()) as Vec3<number>;

        if (displays.length!=0&&displayIndex!=-1) { var display = displays[displayIndex];display.glowing=false;display.update(); }
        displays.push(mine.summonBlockDisplay(finalPos,"minecraft:diamond_block",null,{translation:[0,0,0],left_rotation:[0,0,0,1],scale:[1,1,1],right_rotation:[0,0,0,1]},[],true,16383998));
        var display = displays[displays.length-1];
        display.build();
        displayIndex=displays.length-1;
    } else if (e.chat.match(/^summon (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) { e.preventDefault();
        const pos:Vec3<string> = e.chat.replace("summon ","").split(" ") as Vec3<string>;
        var playerPos:Vec3<number> = (await mine.playerData[e.name].updatePos()) as Vec3<number>;
        var finalPos:Vec3<number> = await relativePos(pos,playerPos);

        if (displays.length!=0) { var display = displays[displayIndex];display.glowing=false;display.update(); }
        displays.push(mine.summonBlockDisplay(finalPos,"minecraft:diamond_block",null,{translation:[0,0,0],left_rotation:[0,0,0,1],scale:[1,1,1],right_rotation:[0,0,0,1]},[],true,16383998));
        var display = displays[displays.length-1];
        display.build();
        displayIndex=displays.length-1;
    } else if (e.chat=="kill-all") { e.preventDefault();
        mine.cmd("kill @e[nbt={Tags:[\"FromServer\",\"Displays\"]}]").then((out:string)=>{});
        displayIndex=-1;
    } else if (e.chat=="kill" || e.chat=="rotate" || e.chat=="un-rotate" || e.chat=="next" || e.chat.startsWith("move ") || e.chat.startsWith("tp ")) {
        if (displayIndex==-1) return;
        var display = displays[displayIndex];
        if (display==null) return;
        e.preventDefault();

        if (e.chat=="kill"){
            display.kill();
            delete displays[displayIndex];
            displays=displays.filter((el:BlockDisplay)=>el!=null);

            if (displays.length>0){
                display = displays[displays.length-1];
                display.glowing=true; display.update();
                displayIndex=displays.length-1;
            } else displayIndex=-1;
            return;
        } else if (e.chat=="rotate"){
            (display.transformation as transformationObj).left_rotation = [0,0.383,0,0.924];
            display.animate(20);return;
        } else if (e.chat=="un-rotate"){
            (display.transformation as transformationObj).left_rotation = [0,0,0,1];
            display.animate(20);return;
        } else if (e.chat=="next") {
            //unglow previous
            var display = displays[displayIndex];display.glowing=false;display.update();
            //set selected
            displayIndex++;
            displayIndex%=displays.length;
            display = displays[displayIndex];display.glowing=true;display.update();
        }else if (e.chat.match(/^move (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) {
            const pos:Vec3<string> = e.chat.replace("move ","").split(" ") as Vec3<string>;
            display.pos = await relativePos(pos,display.pos);
            display.update().then((out:boolean)=>{});return;
        } else if (e.chat.match(/^tp (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) {
            const pos:Vec3<string> = e.chat.replace("tp ","").split(" ") as Vec3<string>;
            var playerPos:Vec3<number> = (await mine.playerData[e.name].updatePos()) as Vec3<number>;
            var finalPos:Vec3<number> = await relativePos(pos,playerPos);
    
            display.pos=finalPos;
            display.update().then((out:boolean)=>{});return;
        }
    }
});
//#endregion