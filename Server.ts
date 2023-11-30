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
type Quat = [number,number,number,number];
const QuatIdentity:Quat=[0,0,0,1];
type Vec8<T> = [T,T,T,T,T,T,T,T];
type obj = string|boolean|number|null|undefined|obj[]|{[key:string]:obj};

// https://misode.github.io/transformation
type transformationObj = {translation:Vec3<number>,scale:Vec3<number>,left_rotation:Quat,right_rotation:Quat};
type Transformation = transformationObj|Vec8<number>;
const EmptyTransformationObj:transformationObj = {translation:[0,0,0],left_rotation:[0,0,0,1],scale:[1,1,1],right_rotation:[0,0,0,1]};

/**
 * converts axis angle to quaternion
 * @param {Vec3<number>} x axis
 * @param {number} theta angle
 */ 
function AxAngToQuat(x:Vec3<number>,theta:number):Quat {
    var a:number=theta/2;
    var b:number = Math.sin(a);
    return ([...x.map((el:number)=>(el*b)),Math.cos(a)].map((el:number)=>Math.round(el*1000)/1000) as Quat);
}

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


class Minecraft {
    cmdQueue:string[];
    cmdResolves:(((value:any)=>void)|"none")[];

    server:ChildProcessWithoutNullStreams;
    playerData:{[key:string]:PlayerData} = {};
    tmpPlayerData:{[key:string]:any} = {};

    Emitter:EventEmitter;
    constructor() {
        console.clear();

        this.cmdQueue=[];
        this.cmdResolves=[];

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
            this.server.stdin.write(stdin+"\n");
        });
        //server.stdin.end();
    }
    cmdDiscardOutput(stdin:string):void {
        this.cmdQueue   .push(stdin );
        this.cmdResolves.push("none");
        this.server.stdin.write(stdin+"\n");
    }
    getPlayerPos(name:string) {
        return new Promise<Vec3<number>>(async(resolve:(value:Vec3<number>)=>void)=>{
            var out:string = await mine.cmd("data get entity "+name)
            if (out.match(/\S+ has the following entity data: /g) != null) {
                var data = ""+out.match(/(?<=\S+ has the following entity data: ).+/g);
                const nbt=Minecraft.parseNbt(data);
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
                                const nbt=Minecraft.parseNbt(data);
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

    static parseNbt(nbt:string):any {
        frontTrim();
        function parseValue() {
            if (nbt[0] == "{") {//object
                return parseObj();
            } else if (nbt[0] == "[") {//array
                return parseArray();
            } else if (nbt[0] == "'") {//string
                return parseStringSingle();
            } else if (nbt[0] == "\"") {//string
                return parseStringDouble();
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
        function parseStringSingle():string|null {
            if (!nbt.startsWith("'")) {console.log("8");console.log(nbt);return null;}
            nbt=nbt.substring(1);
            var ind:number = -1;
            for (let i = 0; i < nbt.length; i++) {
                if (nbt[i]=="'"&&nbt[i-1]!="\\"){ind=i;break;}
            }
            if (ind==-1){console.log("9");console.log(nbt);return null;}
            var str=nbt.substring(0,ind)
            nbt=nbt.substring(ind+1);
            //console.log("\""+str+"\"");
            return str;
        }
        function parseStringDouble():string|null {
            if (!nbt.startsWith("\"")) {console.log("10");console.log(nbt);return null;}
            nbt=nbt.substring(1);
            var ind:number = -1;
            for (let i = 0; i < nbt.length; i++) {
                if (nbt[i]=="\""&&nbt[i-1]!="\\"){ind=i;break;}
            }
            if (ind==-1){console.log("11");console.log(nbt);return null;}
            var str=nbt.substring(0,ind)
            nbt=nbt.substring(ind+1);
            //console.log("\""+str+"\"");
            return str;
        }
        function parseNumber():number|null {
            var num:string[]|null = nbt.match(/^-?\d+(\.\d+)?(s|S|b|B|d|D|f|F|L)?/g);
            if (num != null) {
                nbt=nbt.substring(num[0].length);
                //console.log("\""+num[0]+"\"");
                return parseFloat(num[0]);
            }
            else {console.log("12");console.log(nbt);return null;}
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
            else {console.log("13");console.log(nbt);return null;}
        }
        return parseValue();
    }

    serverCmdOut(out:string) {
        if (this.cmdResolves.length>0) {
            if (out!="Unknown or incomplete command, see below for error") {
                this.cmdQueue.shift();
                var resolve:((value:any)=>void)|"none" = this.cmdResolves.shift()!;
                if (resolve!="none"){ resolve(out); }
            }
        }
        //console.log(Colors.Fgra+"[Server]: "+out+Colors.R);
    }
    //https://misode.github.io/transformation
    static transformationToString(transformation:Transformation):string {
        if (Array.isArray(transformation)) {
            return "["+transformation.map((el:number)=>el.toString()+"f").join(",")+"]";
        } else {
            var str:string = "{"+Object.entries(transformation).map(([key,value]:[string,Vec3<number>|Quat])=>key+":["+value.map((el:number)=>""+el+"f").join(",")+"]").join(",")+"}";
            return str;
        }
    }
    summonBlockDisplay(Pos:Vec3<number>, Tags:string[]|null, identifier:string|null, transformation:Transformation|null, Name:string, Properties:{[key:string]:string}|null|undefined):BlockDisplay {
        return new BlockDisplay(this,Pos,Tags,identifier,transformation,Name,Properties);
    }
    summonItemDisplay(Pos:Vec3<number>, Tags:string[]|null, identifier:string|null, transformation:Transformation|null):ItemDisplay {
        return new ItemDisplay(this,Pos,Tags,identifier,transformation);
    }
    summonTextDisplay(Pos:Vec3<number>, Tags:string[]|null, identifier:string|null, transformation:Transformation|null):TextDisplay {
        return new TextDisplay(this,Pos,Tags,identifier,transformation);
    }
    summonInteraction(Pos:Vec3<number>, Tags:string[]|null, identifier:string|null, width:number, height:number, response:boolean):Interaction {
        return new Interaction(this,Pos,Tags,identifier,width,height,response);
    }
}
abstract class Entity {
    parent:Minecraft;
    entityName:string;

    uuid:string;
    nbt:{[key:string]:string|string[];}={};
    addTags(...tags:string[]):Entity{(this.nbt.Tags as string[]).push(...(tags.map((el:string)=>"\""+el+"\"")));return this;}

    selector:string;

    private position:Vec3<number> = [0,0,0];
    set Pos(value:Vec3<number>){ this.position=value;this.nbt.Pos=value.map((el:number)=>el.toString()+"d"); };
    get Pos():Vec3<number>{ return this.position; };

    constructor(parent:Minecraft, entityName:string, Pos:Vec3<number>, Tags:string[]|null, identifier:string|null) {
        this.parent=parent;
        this.entityName=entityName;

        this.nbt={ Tags:(Tags||[]).map((el:string)=>"\""+el+"\"") };
        if (identifier) { this.uuid=identifier; }
        else  { this.uuid=generateUUID(); }
        if (!this.nbt.Tags.includes("\""+this.uuid+"\"")) this.addTags(this.uuid);
        if (!this.nbt.Tags.includes("\"FromServer\"")) this.addTags("FromServer");
        this.selector="@e[nbt={Tags:[\""+this.uuid+"\",\"FromServer\"]},limit=1]";

        this.Pos = Pos;
    }
    async build():Promise<boolean> {
        return new Promise<boolean>((resolve:(value:boolean)=>void)=>{
            var command:string = "summon "+this.entityName+" 0 0 0 {Tags:["+(this.nbt.Tags as string[]).join(",")+"]}";
            this.parent.cmd(command).then((out:string)=>{if (out.includes("Summoned new ")) resolve(true); else resolve(false);});
            this.update();
        });
    }
    update():Promise<boolean> {
        return new Promise<boolean>((resolve:(value:boolean)=>void)=>{
            var command:string = "data merge entity "+this.selector;
            var nbt:string = "{"+Object.entries(this.nbt).map(([key,value]:[string,string|string[]])=>{
                if ((typeof value) == "object") return key+":["+(value as string[]).join(",")+"]";
                else return key+":"+value;
            }).join(",")+"}";
            command+=" "+nbt;
            this.parent.cmd(command).then((out:string)=>{if (out.includes("Modified entity data of")) resolve(true); else resolve(false);});
        });
    }
    kill():Promise<boolean> {
        return new Promise<boolean>((resolve:(value:boolean)=>void)=>{
            this.parent.cmd("kill "+this.selector).then((out:string)=>{if (out.match(/Killed \d+/g) != null) resolve(true); else resolve(false);});
        });
    }
    savetoFile(name:string) {
        const str:string = JSON.stringify(this.toJson());
        fs.writeFileSync(__dirname+"/Saves/"+name+".json",str);
    }
    toJson():{"uuid":string,"nbt":obj} {
        return {
            "uuid":this.uuid,
            "nbt":this.nbt
        }
    }
}
//#region Displays
abstract class Display extends Entity {

    private actualTransformation:Transformation=EmptyTransformationObj;
    set transformation(value:Transformation){ this.actualTransformation=value;this.nbt.transformation=Minecraft.transformationToString(value); };
    get transformation():Transformation{ return this.actualTransformation; };

    set glowing(value:boolean){ this.nbt.Glowing=value.toString(); };
    get glowing():boolean{ return this.nbt.Glowing=="true"; };

    private glowColorOverride:number = 16383998;// https://www.digminecraft.com/lists/dyed_armor_color_list_pc.php
    set glow_color_override(value:number){ this.glowColorOverride=value;this.nbt.glow_color_override=value.toString(); };
    get glow_color_override():number{ return this.glowColorOverride; };
    constructor(parent:Minecraft, entityName:string, Pos:Vec3<number>, Tags:string[]|null, identifier:string|null, transformation:Transformation|null) {
        super(parent,entityName,Pos,Tags,identifier);
        this.addTags("Displays");
        if (transformation) this.transformation=transformation;
    }
    animate(ticks:number):Promise<boolean> {
        return new Promise<boolean>((resolve:(value:boolean)=>void)=>{
            var command:string = "data merge entity "+this.selector;
            var nbt:string = "{";
            nbt+="start_interpolation:0,interpolation_duration:"+ticks;
            if (this.transformation!=null) nbt+=",transformation:"+Minecraft.transformationToString(this.transformation);
            nbt+="}";
            command+=" "+nbt;
            this.parent.cmd(command).then((out:string)=>{if (out.includes("Modified entity data of")) resolve(true); else resolve(false);});
        });
    }
}
class BlockDisplay extends Display {
    addTags(...tags:string[]):BlockDisplay{super.addTags(...tags);return this;}

    private blockState:{Name:string,Properties?:{[key:string]:string}};
    setBlockState(){
        var blockStateStr:string = "{Name:\""+this.blockState.Name+"\"";
        if (this.blockState.Properties!=null){ blockStateStr+=",Properties:{"+Object.entries(this.blockState.Properties).map(([key,value]:[string,string])=>{return key+":\""+value+"\"";}).join(",")+"}";}
        blockStateStr+="}";
        this.nbt.block_state=blockStateStr;
    }
    set blockStateName(value:string){ this.blockState.Name=value;this.setBlockState(); };
    get blockStateName():string{ return this.blockState.Name; };
    set blockStateProperties(value:{[key:string]:string}|undefined){ this.blockState.Properties=value;this.setBlockState(); };
    get blockStateProperties():{[key:string]:string}|undefined{ return this.blockState.Properties; };

    constructor(parent:Minecraft, Pos:Vec3<number>, Tags:string[]|null, identifier:string|null, transformation:Transformation|null, Name:string, Properties:{[key:string]:string}|null|undefined) {
        super(parent,"minecraft:block_display",Pos,Tags,identifier,transformation);
        this.addTags("BlockDisplays");
        this.nbt.CustomName="\"\\\""+this.uuid+"\\\"\"";
        this.nbt.CustomNameVisible="0";

        this.blockState={Name:""};
        this.blockStateName=Name;
        if (Properties) this.blockStateProperties=Properties;
    }
    static fromJson(parent:Minecraft,json:{"uuid":string,"nbt":{[key:string]:string|string[]}}):BlockDisplay {
        var blockState:{Name:string,Properties?:{[key:string]:string}} = Minecraft.parseNbt(json.nbt.block_state as string);
        var transformation:Transformation|null = (json.nbt.transformation!=null)?(Minecraft.parseNbt(json.nbt.transformation as string) as Transformation):null;
        var out:BlockDisplay = new BlockDisplay(parent,
            ((json.nbt.Pos as string[]).map((el:string):number=>parseFloat(el)) as Vec3<number>),
            (json.nbt.Tags as string[]).map((el:string)=>((el.match(/(?<=").*(?=")/g)||[""])[0])),
            json.uuid,
            transformation,
            blockState.Name,blockState.Properties
        );
        out.nbt=json.nbt;
        return out;
    }
    static fromFile(parent:Minecraft,name:string):BlockDisplay|undefined {
        try {
            return BlockDisplay.fromJson(parent,JSON.parse(fs.readFileSync(__dirname+"/Saves/"+name+".json").toString()));
        } catch (err:any) {
            //console.log(err);
            return undefined;
        }
    }
}
class ItemDisplay extends Display {
    addTags(...tags:string[]):ItemDisplay{super.addTags(...tags);return this;}

    constructor(parent:Minecraft, Pos:Vec3<number>, Tags:string[]|null, identifier:string|null, transformation:Transformation|null) {
        super(parent,"minecraft:item_display",Pos,Tags,identifier,transformation);
        this.addTags("ItemDisplays");
        this.nbt.CustomName="\"\\\""+this.uuid+"\\\"\"";
        this.nbt.CustomNameVisible="0";
    }
    static fromJson(parent:Minecraft,json:{"uuid":string,"nbt":{[key:string]:string|string[]}}):ItemDisplay {
        var transformation:Transformation|null = (json.nbt.transformation!=null)?(Minecraft.parseNbt(json.nbt.transformation as string) as Transformation):null;
        var out:ItemDisplay = new ItemDisplay(parent,
            ((json.nbt.Pos as string[]).map((el:string):number=>parseFloat(el)) as Vec3<number>),
            (json.nbt.Tags as string[]).map((el:string)=>((el.match(/(?<=").*(?=")/g)||[""])[0])),
            json.uuid,
            transformation,
        );
        out.nbt=json.nbt;
        return out;
    }
    static fromFile(parent:Minecraft,name:string):ItemDisplay|undefined {
        try {
            return ItemDisplay.fromJson(parent,JSON.parse(fs.readFileSync(__dirname+"/Saves/"+name+".json").toString()));
        } catch (err:any) {
            //console.log(err);
            return undefined;
        }
    }
}
class TextDisplay extends Display {
    addTags(...tags:string[]):TextDisplay{super.addTags(...tags);return this;}

    constructor(parent:Minecraft, Pos:Vec3<number>, Tags:string[]|null, identifier:string|null, transformation:Transformation|null) {
        super(parent,"minecraft:text_display",Pos,Tags,identifier,transformation);
        this.addTags("TextDisplays");
        this.nbt.CustomName="\"\\\""+this.uuid+"\\\"\"";
        this.nbt.CustomNameVisible="0";
    }
    static fromJson(parent:Minecraft,json:{"uuid":string,"nbt":{[key:string]:string|string[]}}):TextDisplay {
        var transformation:Transformation|null = (json.nbt.transformation!=null)?(Minecraft.parseNbt(json.nbt.transformation as string) as Transformation):null;
        var out:TextDisplay = new TextDisplay(parent,
            ((json.nbt.Pos as string[]).map((el:string):number=>parseFloat(el)) as Vec3<number>),
            (json.nbt.Tags as string[]).map((el:string)=>((el.match(/(?<=").*(?=")/g)||[""])[0])),
            json.uuid,
            transformation,
        );
        out.nbt=json.nbt;
        return out;
    }
    static fromFile(parent:Minecraft,name:string):TextDisplay|undefined {
        try {
            return TextDisplay.fromJson(parent,JSON.parse(fs.readFileSync(__dirname+"/Saves/"+name+".json").toString()));
        } catch (err:any) {
            //console.log(err);
            return undefined;
        }
    }
}
//#endregion Displays

//#region Interaction
class Interaction extends Entity {
    addTags(...tags:string[]):Interaction{super.addTags(...tags);return this;}

    set width(value:number)    { this.nbt.width=value.toString();    };
    get width():number         { return parseFloat(this.nbt.width  as string); };
    set height(value:number)   { this.nbt.height=value.toString();   };
    get height():number        { return parseFloat(this.nbt.height as string); };
    set response(value:boolean){ this.nbt.response=value.toString(); };
    get response():boolean     { return this.nbt.response=="true";   };

    constructor(parent:Minecraft, Pos:Vec3<number>, Tags:string[]|null, identifier:string|null, width:number, height:number, response:boolean) {
        super(parent,"minecraft:interaction",Pos,Tags,identifier);
        this.addTags("Interactions");
        this.nbt.CustomName="\"\\\""+this.uuid+"\\\"\"";
        this.nbt.CustomNameVisible="0";

        this.width=width;
        this.height=height;
        this.response=response;
    }
    static fromJson(parent:Minecraft,json:{"uuid":string,"nbt":{[key:string]:string|string[]}}):Interaction {
        var out:Interaction = new Interaction(parent,((json.nbt.Pos as string[]).map((el:string):number=>parseFloat(el)) as Vec3<number>),(json.nbt.Tags as string[]).map((el:string)=>((el.match(/(?<=").*(?=")/g)||[""])[0])),json.uuid,parseFloat(json.nbt.width as string),parseFloat(json.nbt.height as string),json.nbt.response=="true");
        out.nbt=json.nbt;
        return out;
    }
    static fromFile(parent:Minecraft,name:string):Interaction|undefined {
        try {
            return Interaction.fromJson(parent,JSON.parse(fs.readFileSync(__dirname+"/Saves/"+name+".json").toString()));
        } catch (err:any) {
            //console.log(err);
            return undefined;
        }
    }
}
function registerInteractionDetecter(mine:Minecraft,Tags:string[],onInteraction:(nbt:any)=>void):ReturnType<typeof setInterval> {
    var lastInteraction:number = (new Date()).getTime();
    return setInterval(() => {
        //var start:number=(new Date()).getTime();
        mine.cmd("data get entity @e[type=interaction,nbt={Tags:["+Tags.map((el:string)=>"\""+el+"\"").join(",")+",\"Interactions\",\"FromServer\"],interaction:{}},limit=1]").then((out:string)=>{
            //console.log(Colors.Fgra+"Time: "+Colors.Fy+((new Date()).getTime()-start)+Colors.Fgra+"."+Colors.R)
            if(out!="No entity was found") {
                var match:RegExpMatchArray|null = out.match(/^\S+ has the following entity data: {.*}$/g);
                if (match!=null) {
                    var nbt:any = Minecraft.parseNbt(out.match(/(?<=^\S+ has the following entity data: ){.*}$/g)![0]);
                    if (nbt.interaction != null) {
                        var time:number = (new Date()).getTime();
                        if ((time-lastInteraction)<100) return;//buffers one detection to reset
                        lastInteraction=time;
                        var uuid:string = nbt.Tags.filter((el:string)=>(el.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g)!=null))[0];
                        //console.log(Colors.Fgra+"Interact: "+Colors.Fgre+uuid+Colors.R);
                        mine.cmd("data remove entity @e[nbt={Tags:[\""+uuid+"\"]},limit=1] interaction");
                        Object.values(mine.playerData)
                        onInteraction(nbt);
                    }
                }
            }
        })
    }, 1000/20);//one tick
}
function registerAttackDetecter(mine:Minecraft,Tags:string[],onAttack:(nbt:any)=>void):ReturnType<typeof setInterval> {
    var lastInteraction:number = (new Date()).getTime();
    return setInterval(() => {
        //var start:number=(new Date()).getTime();
        mine.cmd("data get entity @e[type=interaction,nbt={Tags:["+Tags.map((el:string)=>"\""+el+"\"").join(",")+",\"Interactions\",\"FromServer\"],attack:{}},limit=1]").then((out:string)=>{
            //console.log(Colors.Fgra+"Time: "+Colors.Fy+((new Date()).getTime()-start)+Colors.Fgra+"."+Colors.R)
            if(out!="No entity was found") {
                var match:RegExpMatchArray|null = out.match(/^\S+ has the following entity data: {.*}$/g);
                if (match!=null) {
                    var nbt:any = Minecraft.parseNbt(out.match(/(?<=^\S+ has the following entity data: ){.*}$/g)![0]);
                    if (nbt.attack != null) {
                        var time:number = (new Date()).getTime();
                        if ((time-lastInteraction)<100) return;//buffers one detection to reset
                        lastInteraction=time;
                        var uuid:string = nbt.Tags.filter((el:string)=>(el.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/g)!=null))[0];
                        //console.log(Colors.Fgra+"Interact: "+Colors.Fgre+uuid+Colors.R);
                        mine.cmd("data remove entity @e[nbt={Tags:[\""+uuid+"\"]},limit=1] attack");
                        onAttack(nbt);
                    }
                }
            }
        })
    }, 1000/20);//one tick
}
//#endregion Interaction

const mine:Minecraft = new Minecraft();
/*
mine.Emitter.on("playerJoined",(e:{name:string,preventDefault:()=>void})=>{
    mine.cmd("op "+e.name).then((out:string)=>{console.log(Colors.Fgra+out+Colors.R);})
});
mine.Emitter.on("playerLeft",(e:{name:string,preventDefault:()=>void})=>{
    mine.cmd("deop "+e.name).then((out:string)=>{console.log(Colors.Fgra+out+Colors.R);})
});*/
mine.Emitter.on("playerChat",async(e:{name:string,chat:string,player:PlayerData,preventDefault:()=>void})=>{
    if (e.chat=="stop") { e.preventDefault();
        console.log(Colors.Fgra+(await mine.cmd("stop"))+Colors.R);
        return; }
});
mine.Emitter.on("playerCmdOut",async (e:{name:string,out:string,player:PlayerData,preventDefault:()=>void})=>{
    if (e.out=="Gamerule sendCommandFeedback is now set to: false") {
        var returnVal:string = await mine.cmd("gamerule sendCommandFeedback true");
        console.log(Colors.Fgra+returnVal+Colors.R);
        returnVal = await mine.cmd("kill "+e.name);
        console.log(Colors.Fgra+returnVal+Colors.R);
    }
});



var Quat90:Quat = AxAngToQuat([0,1,0],Math.PI/2);
var QuatNeg90:Quat = AxAngToQuat([0,1,0],-Math.PI/2);
var Quat180:Quat = AxAngToQuat([0,1,0],Math.PI);
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
        resolve(finalPos); return;
    });
}

type doorType = [
    BlockDisplay,BlockDisplay,
    BlockDisplay,BlockDisplay,
    Interaction,Interaction,
    Interaction,Interaction,
    Interaction,Interaction,
    Interaction,Interaction,
    Interaction,Interaction,
    Interaction,Interaction,
    Interaction,Interaction
]
class Door {
    constructor(){}

    static door:doorType|undefined = undefined;
    static doorOpened:boolean = false;
    static animationSpeed:number = 5;
    static read() {
        const lst:[
            BlockDisplay|undefined,BlockDisplay|undefined,
            BlockDisplay|undefined,BlockDisplay|undefined,
            Interaction?, Interaction?,
            Interaction?, Interaction?,
            Interaction?, Interaction?,
            Interaction?, Interaction?,
            Interaction?, Interaction?,
            Interaction?, Interaction?,
            Interaction?, Interaction?
        ] = [
            BlockDisplay.fromFile(mine,"Door/1"), BlockDisplay.fromFile(mine,"Door/2"),
            BlockDisplay.fromFile(mine,"Door/3"), BlockDisplay.fromFile(mine,"Door/4")
        ]
        for (let i = 0; i < 14; i++) { lst[i+4]=Interaction.fromFile(mine,"Door/int"+i); }
        if (
            lst[ 0]==null||lst[ 1]==null||
            lst[ 2]==null||lst[ 3]==null||
            lst[ 4]==null||lst[ 5]==null||
            lst[ 6]==null||lst[ 7]==null||
            lst[ 8]==null||lst[ 9]==null||
            lst[10]==null||lst[11]==null||
            lst[12]==null||lst[13]==null||
            lst[14]==null||lst[15]==null||
            lst[16]==null||lst[17]==null
        ) return;
        Door.door = lst as doorType;
        registerInteractionDetecter(mine,["Door"],Door.toggle);
        registerAttackDetecter(mine,["Door"],Door.kill);
    }
    static async summon(playerPos:Vec3<number>) {
        Door.door = [
            mine.summonBlockDisplay([playerPos[0]      ,playerPos[1]  ,playerPos[2]             ],["Door"],null,{...EmptyTransformationObj,translation:[0,0,1],right_rotation:Quat90 },"minecraft:spruce_door",{facing:"east",  half:"lower", hinge:"left",  open:"false"}),
            mine.summonBlockDisplay([playerPos[0]      ,playerPos[1]+1,playerPos[2]             ],["Door"],null,{...EmptyTransformationObj,translation:[0,0,1],right_rotation:Quat90 },"minecraft:spruce_door",{facing:"east",  half:"upper", hinge:"left",  open:"false"}),
            mine.summonBlockDisplay([playerPos[0]+1    ,playerPos[1]  ,playerPos[2]             ],["Door"],null,{...EmptyTransformationObj,translation:[1,0,1],right_rotation:Quat180},"minecraft:spruce_door",{facing:"south", half:"lower", hinge:"right", open:"false"}),
            mine.summonBlockDisplay([playerPos[0]+1    ,playerPos[1]+1,playerPos[2]             ],["Door"],null,{...EmptyTransformationObj,translation:[1,0,1],right_rotation:Quat180},"minecraft:spruce_door",{facing:"south", half:"upper", hinge:"right", open:"false"}),
            mine.summonInteraction ([playerPos[0]+ 3/32,playerPos[1]  ,playerPos[2]+29/32+0.0005],["Door"],null,3/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+ 9/32,playerPos[1]  ,playerPos[2]+29/32+0.0005],["Door"],null,3/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+15/32,playerPos[1]  ,playerPos[2]+29/32+0.0005],["Door"],null,3/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+21/32,playerPos[1]  ,playerPos[2]+29/32+0.0005],["Door"],null,3/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+27/32,playerPos[1]  ,playerPos[2]+29/32+0.0005],["Door"],null,3/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+31/32,playerPos[1]  ,playerPos[2]+31/32+0.0005],["Door"],null,1/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+31/32,playerPos[1]  ,playerPos[2]+27/32+0.0005],["Door"],null,1/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+35/32,playerPos[1]  ,playerPos[2]+29/32+0.0005],["Door"],null,3/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+41/32,playerPos[1]  ,playerPos[2]+29/32+0.0005],["Door"],null,3/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+47/32,playerPos[1]  ,playerPos[2]+29/32+0.0005],["Door"],null,3/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+53/32,playerPos[1]  ,playerPos[2]+29/32+0.0005],["Door"],null,3/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+59/32,playerPos[1]  ,playerPos[2]+29/32+0.0005],["Door"],null,3/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+63/32,playerPos[1]  ,playerPos[2]+31/32+0.0005],["Door"],null,1/16+0.001,2,true),
            mine.summonInteraction ([playerPos[0]+63/32,playerPos[1]  ,playerPos[2]+27/32+0.0005],["Door"],null,1/16+0.001,2,true)
        ];
        Door.build();
        Door.doorOpened=false;
    }
    static build() {
        var door:doorType|undefined = Door.door;
        if (door==null) return;
        for (let i = 0; i < door.length; i++) { door[i].build(); }
        mine.cmd("fill "+door[0].Pos.join(" ")+" "+door[3].Pos.join(" ")+" minecraft:barrier");
        registerInteractionDetecter(mine,["Door"],Door.toggle);
        registerAttackDetecter(mine,["Door"],Door.kill);
        this.save();
    }
    static save() {
        var door:doorType|undefined = Door.door;
        if (door==null) return;
        if (!fs.existsSync(__dirname+"/Saves/Door")) fs.mkdirSync(__dirname+"/Saves/Door");
        door[0].savetoFile("Door/1"); door[1].savetoFile("Door/2");
        door[2].savetoFile("Door/3"); door[3].savetoFile("Door/4");
        door[4].savetoFile("Door/int0"); door[5].savetoFile("Door/int1");
        door[6].savetoFile("Door/int2"); door[7].savetoFile("Door/int3");
        door[8].savetoFile("Door/int4"); door[9].savetoFile("Door/int5");
        door[10].savetoFile("Door/int6"); door[11].savetoFile("Door/int7");
        door[12].savetoFile("Door/int8"); door[13].savetoFile("Door/int9");
        door[14].savetoFile("Door/int10"); door[15].savetoFile("Door/int11");
        door[16].savetoFile("Door/int12"); door[17].savetoFile("Door/int13");
    }
    static animate() {
        var door:doorType|undefined = Door.door;
        if (door==null) return;
        var animationSpeed:number =Door.animationSpeed
        door[0].animate(animationSpeed); door[1].animate(animationSpeed);
        door[2].animate(animationSpeed); door[3].animate(animationSpeed);
    }
    //#region open/close
    static open() {
        var door:doorType|undefined = Door.door;
        if (door==null||Door.doorOpened==true) return;
        Door.doorOpened=true;
        //door1
        (door[0].transformation as transformationObj).left_rotation = Quat90;
        (door[0].transformation as transformationObj).translation   = [3/16,0,1];
        (door[1].transformation as transformationObj).left_rotation = Quat90;
        (door[1].transformation as transformationObj).translation   = [3/16,0,1];
        //door2
        (door[2].transformation as transformationObj).left_rotation = QuatNeg90;
        (door[2].transformation as transformationObj).translation   = [1-3/16,0,1];
        (door[3].transformation as transformationObj).left_rotation = QuatNeg90;
        (door[3].transformation as transformationObj).translation   = [1-3/16,0,1];
        Door.animate();
        Door.save();
        var playerPos:Vec3<number> = door[0].Pos;
        door[ 4].Pos=[playerPos[0]+ 3/32,playerPos[1],playerPos[2]+29/32];
        door[ 5].Pos=[playerPos[0]+ 3/32,playerPos[1],playerPos[2]+23/32];
        door[ 6].Pos=[playerPos[0]+ 3/32,playerPos[1],playerPos[2]+17/32];
        door[ 7].Pos=[playerPos[0]+ 3/32,playerPos[1],playerPos[2]+11/32];
        door[ 8].Pos=[playerPos[0]+ 3/32,playerPos[1],playerPos[2]+ 3/32];
        door[ 9].Pos=[playerPos[0]+ 1/64,playerPos[1],playerPos[2]+ 7/32];
        door[10].Pos=[playerPos[0]+ 5/32,playerPos[1],playerPos[2]+ 7/32];

        door[11].Pos=[playerPos[0]+61/32,playerPos[1],playerPos[2]+29/32];
        door[12].Pos=[playerPos[0]+61/32,playerPos[1],playerPos[2]+23/32];
        door[13].Pos=[playerPos[0]+61/32,playerPos[1],playerPos[2]+17/32];
        door[14].Pos=[playerPos[0]+61/32,playerPos[1],playerPos[2]+11/32];
        door[15].Pos=[playerPos[0]+61/32,playerPos[1],playerPos[2]+ 3/32];
        door[16].Pos=[playerPos[0]+63/32,playerPos[1],playerPos[2]+ 7/32];
        door[17].Pos=[playerPos[0]+59/32,playerPos[1],playerPos[2]+ 7/32];
        for (let i = 4; i < door.length; i++) { door[i].update(); }
        mine.cmd("fill "+door[0].Pos.join(" ")+" "+door[3].Pos.join(" ")+" minecraft:air");
    }
    static close() {
        var door:doorType|undefined = Door.door;
        if (door==null||Door.doorOpened==false) return;
        Door.doorOpened=false;
        //door1
        (door[0].transformation as transformationObj).left_rotation = QuatIdentity;
        (door[0].transformation as transformationObj).translation   = [0,0,1];
        (door[1].transformation as transformationObj).left_rotation = QuatIdentity;
        (door[1].transformation as transformationObj).translation   = [0,0,1];
        //door2
        (door[2].transformation as transformationObj).left_rotation = QuatIdentity;
        (door[2].transformation as transformationObj).translation   = [1,0,1];
        (door[3].transformation as transformationObj).left_rotation = QuatIdentity;
        (door[3].transformation as transformationObj).translation   = [1,0,1];
        Door.animate();
        Door.save();
        var playerPos:Vec3<number> = door[0].Pos;
        door[ 4].Pos=[playerPos[0]+ 3/32,playerPos[1],playerPos[2]+29/32+0.0005];
        door[ 5].Pos=[playerPos[0]+ 9/32,playerPos[1],playerPos[2]+29/32+0.0005];
        door[ 6].Pos=[playerPos[0]+15/32,playerPos[1],playerPos[2]+29/32+0.0005];
        door[ 7].Pos=[playerPos[0]+21/32,playerPos[1],playerPos[2]+29/32+0.0005];
        door[ 8].Pos=[playerPos[0]+27/32,playerPos[1],playerPos[2]+29/32+0.0005];
        door[ 9].Pos=[playerPos[0]+31/32,playerPos[1],playerPos[2]+31/32+0.0005];
        door[10].Pos=[playerPos[0]+31/32,playerPos[1],playerPos[2]+27/32+0.0005];

        door[11].Pos=[playerPos[0]+35/32,playerPos[1],playerPos[2]+29/32+0.0005];
        door[12].Pos=[playerPos[0]+41/32,playerPos[1],playerPos[2]+29/32+0.0005];
        door[13].Pos=[playerPos[0]+47/32,playerPos[1],playerPos[2]+29/32+0.0005];
        door[14].Pos=[playerPos[0]+53/32,playerPos[1],playerPos[2]+29/32+0.0005];
        door[15].Pos=[playerPos[0]+59/32,playerPos[1],playerPos[2]+29/32+0.0005];
        door[16].Pos=[playerPos[0]+63/32,playerPos[1],playerPos[2]+31/32+0.0005];
        door[17].Pos=[playerPos[0]+63/32,playerPos[1],playerPos[2]+27/32+0.0005];
        for (let i = 4; i < door.length; i++) { door[i].update(); }
        mine.cmd("fill "+door[0].Pos.join(" ")+" "+door[3].Pos.join(" ")+" minecraft:barrier");
    }
    static toggle() { if (Door.doorOpened) Door.close(); else Door.open(); }
    //#endregion open/close
    static kill() {
        var door:doorType|undefined = Door.door;
        if (door==null) return;
        mine.cmd("fill "+door[0].Pos.join(" ")+" "+door[3].Pos.join(" ")+" minecraft:air");
        mine.cmd("kill @e[nbt={Tags:[\"FromServer\",\"Door\"]}]").then((out:string)=>{});
        door=undefined;
        fs.rmSync(__dirname+"/Saves/Door/1.json"    ); fs.rmSync(__dirname+"/Saves/Door/2.json"    );
        fs.rmSync(__dirname+"/Saves/Door/3.json"    ); fs.rmSync(__dirname+"/Saves/Door/4.json"    );
        fs.rmSync(__dirname+"/Saves/Door/int0.json" ); fs.rmSync(__dirname+"/Saves/Door/int1.json" );
        fs.rmSync(__dirname+"/Saves/Door/int2.json" ); fs.rmSync(__dirname+"/Saves/Door/int3.json" );
        fs.rmSync(__dirname+"/Saves/Door/int4.json" ); fs.rmSync(__dirname+"/Saves/Door/int5.json" );
        fs.rmSync(__dirname+"/Saves/Door/int6.json" ); fs.rmSync(__dirname+"/Saves/Door/int7.json" );
        fs.rmSync(__dirname+"/Saves/Door/int8.json" ); fs.rmSync(__dirname+"/Saves/Door/int9.json" );
        fs.rmSync(__dirname+"/Saves/Door/int10.json"); fs.rmSync(__dirname+"/Saves/Door/int11.json");
        fs.rmSync(__dirname+"/Saves/Door/int12.json"); fs.rmSync(__dirname+"/Saves/Door/int13.json");
        fs.rmdirSync(__dirname+"/Saves/Door");
        Door.doorOpened=false;
    }
}

//#region blockDisplays
var blockDisplays:BlockDisplay[];
var blockDisplayIndex:number;
function blockDisplaysRead() {
    try {
        var data:{index:number,displays:{ uuid: string; nbt: { [key: string]: string | string[]; }; }[]} = JSON.parse(fs.readFileSync(__dirname+"/Saves/Displays.json").toString());
        blockDisplays = data.displays.map((el:{ uuid: string; nbt: { [key: string]: string | string[]; }; })=>BlockDisplay.fromJson(mine,el));
        blockDisplayIndex=data.index;
    } catch (err:any) { blockDisplays=[];blockDisplayIndex=-1; }
}
function blockDisplaysSave() {
    fs.writeFileSync(__dirname+"/Saves/Displays.json",JSON.stringify( {"index":blockDisplayIndex,"displays":blockDisplays.map( (el:BlockDisplay)=>el.toJson() )} ));
}
function blockDisplaysKillAll() {
    mine.cmd("kill @e[nbt={Tags:[\"FromServer\",\"BlockDisplays\",\"Tests\"]}]").then((out:string)=>{});
    blockDisplays=[];
    blockDisplayIndex=-1;
    blockDisplaysSave();
}

function blockDisplaySummon(pos:Vec3<number>) {
    if (blockDisplays.length!=0) { var display = blockDisplays[blockDisplayIndex];display.glowing=false;display.update(); }
    blockDisplays.push(mine.summonBlockDisplay(pos,null,null,EmptyTransformationObj,"minecraft:diamond_block",null));
    var display = blockDisplays[blockDisplays.length-1];
    display.addTags("Tests").glowing=true;
    display.build();
    blockDisplayIndex=blockDisplays.length-1;
    blockDisplaysSave();
}
function blockDisplayKill() {
    if (blockDisplayIndex==-1) return;
    var display:BlockDisplay = blockDisplays[blockDisplayIndex];
    if (display==null) return;
    
    display.kill();
    delete blockDisplays[blockDisplayIndex];
    blockDisplays=blockDisplays.filter((el:BlockDisplay)=>el!=null);

    if (blockDisplays.length>0){
        var display:BlockDisplay = blockDisplays[blockDisplays.length-1];
        display.glowing = true; display.update();
        blockDisplayIndex = blockDisplays.length-1;
    } else blockDisplayIndex = -1;
    blockDisplaysSave();
}

function blockDisplayRotate() {
    if (blockDisplayIndex==-1) return;
    var display:BlockDisplay = blockDisplays[blockDisplayIndex];
    if (display==null) return;
    
    (display.transformation as transformationObj).left_rotation = AxAngToQuat([0,1,0],Math.PI/4);
    display.animate(20);
    blockDisplaysSave();
}
function blockDisplayUnRotate() {
    if (blockDisplayIndex==-1) return;
    var display:BlockDisplay = blockDisplays[blockDisplayIndex];
    if (display==null) return;
    
    (display.transformation as transformationObj).left_rotation = QuatIdentity;
    display.animate(20);
    blockDisplaysSave();
}
function blockDisplaysNext() {
    if (blockDisplayIndex==-1) return;
    var display:BlockDisplay = blockDisplays[blockDisplayIndex];
    if (display==null) return;
    
    //unglow previous
    display.glowing=false;display.update();
    //set selected
    blockDisplayIndex++;
    blockDisplayIndex%=blockDisplays.length;
    display = blockDisplays[blockDisplayIndex];
    display.glowing=true;display.update();
    blockDisplaysSave();
}
async function blockDisplayMove(relPos:Vec3<string>) {
    if (blockDisplayIndex==-1) return;
    var display:BlockDisplay = blockDisplays[blockDisplayIndex];
    if (display==null) return;
    display.Pos = await relativePos(relPos,display.Pos);
    display.update().then((out:boolean)=>{});
    blockDisplaysSave();
}
async function blockDisplayTp(relPos:Vec3<string>,name:string) {
    if (blockDisplayIndex==-1) return;
    var display:BlockDisplay = blockDisplays[blockDisplayIndex];
    if (display==null) return;
    var playerPos:Vec3<number> = (await mine.playerData[name].updatePos()) as Vec3<number>;
    display.Pos = await relativePos(relPos,playerPos);
    display.update().then((out:boolean)=>{});
    blockDisplaysSave();
}
//#endregion blockDisplays

mine.Emitter.on("serverStart",(e:{preventDefault:()=>void})=>{
    blockDisplaysRead();
    Door.read();
});
mine.Emitter.on("playerChat",async(e:{name:string,chat:string,player:PlayerData,preventDefault:()=>void})=>{
    if (e.chat.startsWith("summon")) {
        if (e.chat.startsWith("summon display")) {
            if (e.chat.startsWith("summon display block")) {
                if (e.chat == "summon display block") { e.preventDefault();
                    var finalPos:Vec3<number> = (await mine.playerData[e.name].updatePos()) as Vec3<number>;
                    blockDisplaySummon(finalPos); return;
                } else if (e.chat.match(/^summon display block (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) { e.preventDefault();
                    const pos:Vec3<string> = e.chat.replace("summon ","").split(" ") as Vec3<string>;
                    var playerPos:Vec3<number> = (await mine.playerData[e.name].updatePos()) as Vec3<number>;
                    var finalPos:Vec3<number> = await relativePos(pos,playerPos);
                    blockDisplaySummon(finalPos); return;
                }
            }
        } else if (e.chat.startsWith("summon door")) {
            var playerPos:Vec3<number> = (await mine.playerData[e.name].updatePos()) as Vec3<number>;
            Door.summon(playerPos);
        }
    } else if (e.chat.startsWith("door")) {
        if (e.chat.startsWith("door open")) {
            e.preventDefault(); Door.open();
        } else if (e.chat.startsWith("door close")) {
            e.preventDefault(); Door.close();
        } else if (e.chat.startsWith("door toggle")) {
            e.preventDefault(); Door.toggle();
        } else if (e.chat.startsWith("door kill")) {
            e.preventDefault(); Door.kill();
        }
    } else if (e.chat.startsWith("display")) {
        if (e.chat.startsWith("display block")) {
            if (e.chat.startsWith("display block kill")) {
                if (e.chat=="display block kill all") { blockDisplaysKillAll(); }
                else if (e.chat=="display block kill") { blockDisplayKill(); }
            } else if (e.chat=="display block next") {
                blockDisplaysNext();
            } else if (e.chat=="display block rotate") {
                blockDisplayRotate();
            } else if (e.chat=="display block un-rotate") {
                blockDisplayUnRotate();
            } else if (e.chat.match(/^display block move (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) {
                var relPos:Vec3<string> = e.chat.replace("display block move ","").split(" ") as Vec3<string>;
                blockDisplayMove(relPos);
            } else if (e.chat.match(/^display block tp (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?))) (((-|\+)?\d+(\.\d+)?)|~|(~((-|\+)?\d+(\.\d+)?)))$/g)) {
                var relPos:Vec3<string> = e.chat.replace("display block tp ","").split(" ") as Vec3<string>;
                blockDisplayTp(relPos,e.name);
            }
        }
    }
});