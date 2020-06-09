
import * as vscode from "vscode";
import * as path from "path";
import { DebugProtocol } from "vscode-debugprotocol";

export function createDebugGraphPanel(context: vscode.ExtensionContext): vscode.WebviewPanel {

    const webviewPanel = vscode.window.createWebviewPanel(
        'visualDebug.debugGraph',
        'Debug Graph',
        vscode.ViewColumn.Active,
        {},
    );

    webviewPanel.webview.options = { enableScripts: true };
    const scriptUri = webviewPanel.webview.asWebviewUri(vscode.Uri.file(
        path.join(context.extensionPath, 'dist', 'script.js')
    ));
    webviewPanel.webview.html = `` // TODO

    return webviewPanel;

    async function updateGraph(session: vscode.DebugSession) {
        const threads = (await session.customRequest('threads')).threads as DebugProtocol.Thread[];
        console.log(threads);
        const frames: DebugProtocol.StackFrame[] = (await Promise.all(threads.map(thread => session.customRequest('stackTrace', { threadId: thread.id })))).map(res => res.stackFrames);
        for (const frame of frames) {
            console.log(frame);
        }
    }

}
