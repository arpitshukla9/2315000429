import fs from "fs";
import path from "path";

const LOG_FOLDER = "logs";
const LOG_FILE = path.join(LOG_FOLDER, "app.log");

if(!fs.existsSync(LOG_FOLDER)) {
    fs.mkdirSync(LOG_FOLDER)
}

export const logger = (stack , level, pkg, message) => {
    const logData = {
        timeStamp: new Date().toISOString(),
        stack,
        level,
        package: pkg,
        message,
    };
    const format = JSON.stringify(logData);
    console.log(format);
    fs.appendFileSync(LOG_FILE, format + "\n");
};