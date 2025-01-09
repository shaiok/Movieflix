enum LogLevel {
  INFO = "INFO",
  DEBUG = "DEBUG",
  ERROR = "ERROR",
}

const log = (level: LogLevel, message: string, meta?: any) => {
  const timestamp = new Date().toISOString();
  if (meta) {
    console.log(`[${timestamp}] [${level}] ${message}`, meta);
  } else {
    console.log(`[${timestamp}] [${level}] ${message}`);
  }
};

export const Logger = {
  info: (message: string, meta?: any) => log(LogLevel.INFO, message, meta),
  debug: (message: string, meta?: any) => log(LogLevel.DEBUG, message, meta),
  error: (message: string, meta?: any) => log(LogLevel.ERROR, message, meta),
};
