import fs from "fs";
import path from "path";
import axios from "axios";

const LOG_FOLDER = "logs";
const LOG_FILE = path.join(LOG_FOLDER, "app.log");

if (!fs.existsSync(LOG_FOLDER)) {
  fs.mkdirSync(LOG_FOLDER);
}

export const logger = async (stack, level, pkg, message) => {
  const logData = {
    stack,
    level,
    package: pkg,
    message,
  };

  const localLog = {
    timeStamp: new Date().toISOString(),
    ...logData,
  };

  const formatted = JSON.stringify(localLog);

  console.log(formatted);

  fs.appendFileSync(LOG_FILE, formatted + "\n");

  try {
    await axios.post(
      `${process.env.BASE_URL}/evaluation-service/logs`,
      logData,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(
      error.response?.data || error.message,
    );
  }
};
