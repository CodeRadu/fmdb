"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    console.log("[Debug] FMDB: activated");
    const openWebsite = vscode.commands.registerCommand("fmdb.openWeb", () => {
        console.log("[Debug] FMDB: Opened website");
        vscode.env.openExternal(vscode.Uri.parse("https://home.venovedo.ro"));
    });
}
exports.activate = activate;
function deactivate() {
    console.log("[Debug] FMDB: stopped");
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map