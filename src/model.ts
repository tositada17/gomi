import * as vs from "vscode"
import { Tracer } from "./tracer";

export interface Configuration {
    readonly traceLevel: string
}

export function getConfiguration(): Configuration{
    return {
        traceLevel: <string>vs.workspace.getConfiguration('gomi').get('traceLevel')
    }
};

export class Model{
    private _config: Configuration;
    
    constructor(
        context: vs.ExtensionContext
    ){
        vs.commands.executeCommand('setContext', 'gomi.traceLevel', "off");
        this._config= getConfiguration();
        Tracer.level = this._config.traceLevel;
    };

    get configration(): Configuration{
        return this._config
    }
}