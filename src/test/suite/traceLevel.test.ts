import {Configuration} from "../../model"
import { TraceLevel, Tracer } from "../../tracer";
import { Model } from "../../model";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

//TraceLevel unit test
suite('Extension Trace Level Test', async() => {
    test('Trace Level: Test', async() => {
        const args = process.execArgv
        console.log("dbugOption",args)
        // create vscodecontext
        
        const extention =  vscode.extensions.getExtension("gomi");
        const context = await extention?.activate();
        //set configuration
        const model = new Model(context);
        Tracer.error("error message");
        Tracer.warnig("warning message");
        Tracer.info("info message");
        Tracer.verbose("Verbose message");
    });
});
