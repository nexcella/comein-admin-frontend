export enum LOG_LEVEL {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  NONE = 'NONE'
}

export type LoggerConfig = {
  logLevel: LOG_LEVEL,
}

export const loggerConfig: LoggerConfig = {
  logLevel: process.env.LOG_LEVEL as unknown as LOG_LEVEL || LOG_LEVEL.DEBUG
};
