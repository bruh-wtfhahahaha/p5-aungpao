const colors= require("colors");
const moment = require("moment");

module.exports = class Logger {
	static log (content, type = "log") {
		const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
		switch (type) {
	
		case "log": {
			return console.log(`[${colors.bgBlue(type.toUpperCase())}] ${content}`);
		}
		case "warn": {
			return console.log(`[${colors.bgYellow(type.toUpperCase())}] ${content}`);
		}
		case "error": {
			return console.log(`[${colors.bgRed(type.toUpperCase())}] ${content}`);
		}
		case "debug": {
			return console.log(`[${colors.bgYellow(type.toUpperCase())}] ${content}`);
		}
		case "cmd": {
			return console.log(`[${colors.bgBrightCyan(type.toUpperCase())}] ${content}`);
		}
		case "event": {
			return console.log(`[${colors.bgBrightCyan(type.toUpperCase())}] ${content}`);
		}
    case "command": {
      return console.log(`[${colors.bgYellow(type.toUpperCase())}] ${colors.yellow(content)} `);
    }
		case "ready": {
			return console.log(`[${colors.bgBrightGreen(type.toUpperCase())}] ${content}`);
		} 
		default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
		}
	}
};