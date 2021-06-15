import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
  console.log("[Debug] FMDB: activated");
  const openWebsite = vscode.commands.registerCommand("fmdb.openWeb", () => {
    console.log("[Debug] FMDB: Opened website");
    vscode.env.openExternal(vscode.Uri.parse("https://home.venovedo.ro"));
  });
}

export function deactivate() {
  console.log("[Debug] FMDB: stopped");
}
