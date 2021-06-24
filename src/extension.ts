import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
export function activate(context: vscode.ExtensionContext) {
  debug("activated");
  const openWebsite = vscode.commands.registerCommand("fmdb.openWeb", () => {
    debug("Opened website");
    vscode.env.openExternal(vscode.Uri.parse("https://home.venovedo.ro"));
  });
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("fmdb-sidebar", sidebarProvider)
  );
}

export function deactivate() {
  debug("stopped");
}

function debug(...messages: Array<String>) {
  console.log("[Debug] FMDB:", ...messages);
}
