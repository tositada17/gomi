import * as path from 'path'

import {runTests} from "@vscode/test-electron"

async function main() {
    try{
        // The folder containing the extension Manifest package.json 
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');

        //The path to extentions test script
        //Passed to --extentionTestsPath
        const extensionTestsPath = path.resolve(__dirname, './suite/index');

        //Download VS Code,unzip it and run the integration test
        await runTests({extensionDevelopmentPath, extensionTestsPath});
    }
    catch {
        console.error('Fauled ti run test');
        process.exit(1);
    }
}

main();