/**
 * @description 生成字符串 [<string>]
 * @param {string} data 中间字符串 <string>
 * @returns {sting} [<string>]
 */
function wrap(data: any) {
  return `[${String(data)}]`;
}
/** 默认日志级别
 * @default INFO
 */
const DEFAULT_LEVEL = 'DEBUG';

const loggerLevelAsNumber = {
  TRACE: 1,
  DEBUG: 2,
  INFO: 3,
  WARN: 4,
  ERROR: 5,
};
const getStandardTimeStr = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60 * 1000;
  const timeStr = new Date(now.getTime() + Math.abs(offset)).toISOString();
  return timeStr.slice(0, -5).replace('T', ' ');
};
const consoleMethods: Record<string, (...data: any[]) => any> = {
  TRACE: console.trace,
  DEBUG: console.debug,
  INFO: console.info,
  WARN: console.warn,
  ERROR: (title: string, ...detail: any) => {
    console.error(title);
    console.error(...detail);
  },
};

let level = DEFAULT_LEVEL;

class Logger {
  constructor(name, options = {}) {
    this.options = { formatTimeStr: true };
    this.namespace = name;
    options && (this.options = { ...this.options, ...options });
  }

  private namespace = '';

  private options = {
    formatTimeStr: false,
  };

  static setLevel = (_level: string): void => {
    level = _level;
  };

  private isEnabledLevel(level) {
    const globalLevel = this.getLoggerLevel();
    const levelNumber = loggerLevelAsNumber[level];
    const globalLevelNumber = loggerLevelAsNumber[globalLevel];
    return levelNumber >= globalLevelNumber;
  }

  private format(level, message) {
    const { formatTimeStr } = this.options;
    const logTime = formatTimeStr ? getStandardTimeStr() : new Date();

    return `${wrap(logTime)}[${this.namespace} ${level}]: ${message}`;
  }

  private log(level, message, ...rest): (...data: any[]) => any {
    const fn = consoleMethods[level];
    if (!this.isEnabledLevel(level) || !fn) return () => null;
    if (level === 'ERROR') {
      return fn.call(console, this.format(level, ''), message, ...rest);
    }
    return fn.call(console, this.format(level, message), ...rest);
  }

  /**
   * 获取默认日志级别
   */
  public getLoggerLevel = (): string => {
    // 如果是 node 开发环境, 则是 `DEBUG` 级别
    if (
      typeof process !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      return 'DEBUG';
    }

    // 除此之外, 使用 `Logger.level` 日志级别
    return level;
  };

  public trace = (
    message: string | Error,
    ...rest
  ): ((...data: any[]) => any) => this.log('TRACE', message, ...rest);

  public debug = (
    message: string | Error,
    ...rest
  ): ((...data: any[]) => any) => this.log('DEBUG', message, ...rest);

  public info = (message: string | Error, ...rest): ((...data: any[]) => any) =>
    this.log('INFO', message, ...rest);

  public warn = (message: string | Error, ...rest): ((...data: any[]) => any) =>
    this.log('WARN', message, ...rest);

  public error = (
    message: string | Error,
    ...rest
  ): ((...data: any[]) => any) => this.log('ERROR', message, ...rest);
}

export default Logger;
