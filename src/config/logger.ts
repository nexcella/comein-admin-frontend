import {LOG_LEVEL, LoggerConfig} from "@nexcella/logger";

export const loggerConfig: LoggerConfig = {
  logLevel: process.env.LOG_LEVEL as unknown as LOG_LEVEL || LOG_LEVEL.DEBUG
};
