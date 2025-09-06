// execute shellscript change for platform
import * as vscode from "vscode"
import { Tracer } from "./tracer";
import {execSync,execFileSync} from 'child_process';
import path from "path";
import * as fs from "fs";
import * as iconv from "iconv-lite"

export interface FileInfo{
    abstPath: string,
    relativePath: string,
    virtualPath: string,
    filename: string,
    restorePath: string,
}

export function getsid() :string{

    const getSidCommand = "(GET-LocalUser -Name $env:USERNAME).SID.Value"
    let sid: string = ""
    if(process.platform == 'win32' ){
        const stdout = execSync( getSidCommand,{'shell':'powershell.exe'})
        const sid = stdout.toString().trim()
        return sid;
    }
    return sid;
}

export function createUri(): string{
    const sid = getsid()
    const recycleBinPath = "C:\\\\$Recycle.Bin\\\\" + sid; // escape string \\→\ \$→$
    return recycleBinPath
}

export  class ShellService{
    public gomiUri: string;
    public files:FileInfo[]=[];
    private context: vscode.ExtensionContext

    constructor(context: vscode.ExtensionContext){
        console.log("ShellService")
        this.gomiUri = createUri()
        this.context = context
    }

    parse_json(info:any): FileInfo{
        return {
            abstPath: info.abstPath,
            filename: info.filename,
            relativePath: info.relativePath,
            restorePath: info.restorePath,
            virtualPath: info.virtualPath,
        }
    }

    public getFileInfo(){
        this.files=[]
        console.log("getFileInfo")
        const stdoutbuffer = execFileSync( this.context.extensionPath + "\\ps1\\recyclebinItemList.ps1",{'shell':'powershell.exe'})
        const stdout = iconv.decode(stdoutbuffer,"shift_JIS")
        console.log(stdout,"stdout")
        const splitstdout = stdout.split(/\n/g).forEach((value,index)=>{
            if(value !== ""){
                const json =JSON.parse(value)
                this.files.push(this.parse_json(json))
            }
            return
        });
        console.log(this.files)
    }
}
