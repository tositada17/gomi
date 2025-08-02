import * as vscode from 'vscode';
import { Model } from './model';
import { Tracer } from './tracer';

export function activate(context: vscode.ExtensionContext) {
		const model = new Model(context)
	
	const hellodisposable = vscode.commands.registerCommand('gomi.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from gomi!');
	});

	const messagedisposable = vscode.commands.registerCommand('gomi.infoMessage', () => {
		Tracer.info("info message");
	});

	context.subscriptions.push(hellodisposable);
	context.subscriptions.push(messagedisposable);
}

export function deactivate() {}
