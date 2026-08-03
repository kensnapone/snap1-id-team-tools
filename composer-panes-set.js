const { execSync } = require('child_process');
require('dotenv').config({ path: __dirname + '/.env' });

const INITIAL_LEFT_PANE = 245;
const INITIAL_RIGHT_PANE = 1293;

const ADJUST_LEFT_PANE = parseInt(process.env['ADJUST_LEFT_PANE'], 10) || 100;
const ADJUST_RIGHT_PANE = parseInt(process.env['ADJUST_RIGHT_PANE'], 10) || -100;

const LEFT_END = INITIAL_LEFT_PANE + ADJUST_LEFT_PANE;
const RIGHT_END = INITIAL_RIGHT_PANE + ADJUST_RIGHT_PANE;

// Uses macOS CoreGraphics via JXA — no native npm modules required
const jxaScript = `
ObjC.import('CoreGraphics');

function post(type, x, y) {
    var e = $.CGEventCreateMouseEvent($(), type, $.CGPointMake(x, y), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, e);
}

function sleep(s) { $.NSThread.sleepForTimeInterval(s); }

function click(x, y) {
    post($.kCGEventLeftMouseDown, x, y);
    sleep(0.05);
    post($.kCGEventLeftMouseUp, x, y);
}

function drag(fromX, fromY, toX, toY) {
    post($.kCGEventLeftMouseDown, fromX, fromY);
    sleep(0.2);
    post($.kCGEventLeftMouseDragged, toX, toY);
    sleep(0.2);
    post($.kCGEventLeftMouseUp, toX, toY);
}

var savedPos = $.CGEventGetLocation($.CGEventCreate($()));

sleep(0.5);

post($.kCGEventMouseMoved, ${INITIAL_LEFT_PANE}, 300);
sleep(0.2);
click(${INITIAL_LEFT_PANE}, 300);
sleep(0.2);
click(${INITIAL_LEFT_PANE}, 300);
sleep(0.2);
drag(${INITIAL_LEFT_PANE}, 300, ${LEFT_END}, 300);

sleep(0.2);

post($.kCGEventMouseMoved, ${INITIAL_RIGHT_PANE}, 300);
sleep(0.2);
drag(${INITIAL_RIGHT_PANE}, 300, ${RIGHT_END}, 300);

sleep(0.2);

post($.kCGEventMouseMoved, savedPos.x, savedPos.y);
`;

execSync(`osascript -l JavaScript -e ${JSON.stringify(jxaScript)}`);