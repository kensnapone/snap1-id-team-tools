const robot = require("robotjs");
require('dotenv').config({path: __dirname + '/.env'})

const INITIAL_LEFT_PANE = 245
const INITIAL_RIGHT_PANE = 1293

const ADJUST_LEFT_PANE = parseInt(process.env['ADJUST_LEFT_PANE'],10) || 100
const ADJUST_RIGHT_PANE = parseInt(process.env['ADJUST_RIGHT_PANE'], 10) || -100

async function setComposerPanes() {
    let mpos = robot.getMousePos();
    await robot.setMouseDelay(500);
    await robot.moveMouse(INITIAL_LEFT_PANE,300);
    await robot.mouseClick();
    await robot.setMouseDelay(200);
    await robot.mouseClick();
    await robot.setMouseDelay(200);
    await robot.mouseToggle("down", "left");
    await robot.setMouseDelay(200);
    await robot.dragMouse(INITIAL_LEFT_PANE + ADJUST_LEFT_PANE, 300);
    await robot.setMouseDelay(200);
    await robot.mouseToggle("up");
    await robot.setMouseDelay(200);
    await robot.moveMouse(INITIAL_RIGHT_PANE,300);
    await robot.setMouseDelay(200);
    await robot.mouseToggle("down", "left");
    await robot.dragMouse(INITIAL_RIGHT_PANE + ADJUST_RIGHT_PANE, 300);
    await robot.setMouseDelay(200);
    await robot.mouseToggle("up");
    await robot.setMouseDelay(200);
    await robot.moveMouse(mpos.x, mpos.y);
}

setComposerPanes();