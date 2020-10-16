let logger: Logger | null = null;

export function getLogger() {
  if (!logger) logger = new Logger();
  return logger;
}

// FIXME: maybe a bug in eslint?
// eslint-disable-next-line no-shadow
enum LogLevel {
  debug,
  info,
  warn,
  error,
}

export class Logger {
  env;

  constructor(options: { env: string | undefined } = { env: process.env.NODE_ENV }) {
    this.env = options.env;
  }

  debug(message: string) {
    this.message(message, LogLevel.debug);
  }

  log(message: string) {
    this.message(message, LogLevel.info);
  }

  warn(message: string) {
    this.message(message, LogLevel.warn);
  }

  error(message: string) {
    this.message(message, LogLevel.error);
  }

  private message(message: string, level = LogLevel.info) {
    if (this.env === 'test') return;
    switch (level) {
      case LogLevel.info:
        console.log(message);
        return;
      case LogLevel.warn:
        console.warn(message);
        return;
      case LogLevel.error:
        console.error(message);
        return;
      case LogLevel.debug:
      default:
        console.debug(message);
    }
  }
}
