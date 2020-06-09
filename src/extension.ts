// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { createDebugGraphPanel } from './panel';

export function activate(context: vscode.ExtensionContext) {

    let currentPanel: vscode.WebviewPanel | undefined = undefined;

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "visual-debug" is now active!');

    //vscode.debug.onDidStartDebugSession(async (session) => {
    // visualize(session);
    //});

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(`visual-debug.openGraph`, async () => {
    if (currentPanel !== undefined) {
     currentPanel.reveal();
    } else {
        currentPanel = createDebugGraphPanel(context);
        currentPanel.onDidDispose(
            () => { currentPanel = undefined; },
            null,
            context.subscriptions
        );
    }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
