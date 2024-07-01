const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.copyCode', function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor!');
            return;
        }
        const document = editor.document;
        const fullText = document.getText();  // Gets the entire text of the document

        vscode.env.clipboard.writeText(fullText).then(() => {
            // Use the status bar to show message
            let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
            statusBarItem.text = "Copied to clipboard!";
            statusBarItem.show();

            // Hide the status bar message after 3 seconds
            setTimeout(() => {
                statusBarItem.hide();
                statusBarItem.dispose();
            }, 1250);
        }, (err) => {
            vscode.window.showErrorMessage('Failed to copy code: ' + err);
        });
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
