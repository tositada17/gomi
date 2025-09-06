import * as vscode from "vscode"
import { Tracer } from "./tracer";
import {execSync,execFileSync} from 'child_process';
import path from "path";
import { get } from "http";
import { ShellService } from "./shellService";


export interface Configuration {
    readonly traceLevel: string
}


export interface FileInfo{
    abstPath: string,
    relativePath: string,
    virtualPath: string,
    filename: string,
    restorePath: string,
}

export class Model{
    private _config: Configuration;

    constructor(
        context: vscode.ExtensionContext
    ){
        this._config= this.getConfiguration();
        Tracer.level = this._config.traceLevel;
    };

    getConfiguration(): Configuration{
        return {
            traceLevel: <string>vscode.workspace.getConfiguration('gomi').get('traceLevel')
        }
    };

    get configration(): Configuration{
        return this._config
    }
}