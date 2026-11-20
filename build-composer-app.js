const { execFileSync } = require('child_process');
const { copyFileSync, mkdirSync, readFileSync } = require('fs');
const path = require('path');
const { createPaneScript } = require('./composer-panes-set');

if (process.platform !== 'darwin') {
    throw new Error('Build this application on macOS.');
}

const appleScript = readFileSync(path.join(__dirname, 'mac-parallels-applescript.scpt'), 'utf8');
const appleScriptCommand = '/usr/bin/osascript -e ' + "'" + appleScript.replace(/'/g, "'\\''") + "'";
const appPath = path.join(__dirname, 'dist', 'Composer Setup.app');
const appSource = `
ObjC.import('AppKit');
ObjC.import('ApplicationServices');

function run() {
    var app = Application.currentApplication();
    app.includeStandardAdditions = true;

    if (!$.AXIsProcessTrusted()) {
        app.displayAlert('Accessibility permission required', {
            message: 'Enable Composer Setup in System Settings > Privacy & Security > Accessibility. Add this application with the + button, then open it again.',
            as: 'informational'
        });
        return;
    }

    try {
        Application('Parallels Desktop').activate();
        app.doShellScript(${JSON.stringify(appleScriptCommand)});

        ${createPaneScript()}
    } catch (error) {
        app.displayAlert('Composer Setup failed', {
            message: String(error.message || error),
            as: 'critical'
        });
    }
}
`;

mkdirSync(path.dirname(appPath), { recursive: true });
execFileSync('/usr/bin/osacompile', ['-l', 'JavaScript', '-o', appPath], {
    input: appSource,
    stdio: ['pipe', 'inherit', 'inherit']
});

const plistPath = path.join(appPath, 'Contents', 'Info.plist');
const plist = JSON.parse(execFileSync('/usr/bin/plutil', [
    '-convert', 'json', '-o', '-', plistPath
], { encoding: 'utf8' }));
for (const iconName of ['composer.icns', 'applet.icns']) {
    copyFileSync(
        path.join(__dirname, 'assets', 'icons', 'composer.icns'),
        path.join(appPath, 'Contents', 'Resources', iconName)
    );
}
delete plist.CFBundleIconName;
plist.CFBundleIconFile = 'composer.icns';
plist.CFBundleIdentifier = 'com.snapone.idtools.composer-setup';
plist.NSAppleEventsUsageDescription = 'Composer Setup controls Parallels Desktop to position its window before adjusting Composer panes.';
execFileSync('/usr/bin/plutil', ['-convert', 'xml1', '-o', plistPath, '--', '-'], {
    input: JSON.stringify(plist)
});
execFileSync('/usr/bin/codesign', ['--force', '--sign', '-', appPath], { stdio: 'inherit' });

console.log('Built: ' + appPath);