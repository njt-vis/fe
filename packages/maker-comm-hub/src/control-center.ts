import { CommandTaskCallback } from './typings';
import { Command } from './command';
import ControlDriver from './control-driver';

// interface OptionsModel {}
export enum DRIVERS {
  ROOT = 'ROOT',
  SIDEBAR = 'SIDEBAR',
  MENU = 'MENU',
  NAV = 'NAV',
  CANVAS = 'CANVAS',
  ATTRBAR = 'ATTRBAR',
}

class ControlCenter {
  private drivers: Map<string, ControlDriver> = new Map();

  private commands: Map<string, Command> = new Map();

  public initialize = () => {};

  /** 注册驱动 */
  public registerDriver = (name: string): ControlDriver => {
    let driver = this.drivers.get(name);
    if (driver) {
      // TODO: log
      return driver;
    }
    driver = new ControlDriver(name);

    this.drivers.set(name, driver);

    return driver;
  };

  /** 注册指令 */
  public registerCommand = (name: string): void => {
    if (!this.commands.get(name)) {
      this.commands.set(name, new Command(name));
    }
  };

  /** 执行指令 */
  public execCommand = (name: string, args: any): void => {
    const command = this.commands.get(name);

    command && command.exec(args);
  };

  /** 接收指令 */
  public receiveCommand = (
    name: string,
    callback: CommandTaskCallback
  ): void => {
    if (!this.commands.get(name)) {
      this.registerCommand(name);
    }
    this.commands.get(name)?.bind(callback);
  };
}

const controlCenter = new ControlCenter();

export function prepare(): void {
  controlCenter.initialize();
}

export function registerDriver(name: string): ControlDriver {
  return controlCenter.registerDriver(name);
}

export function registerCommand(command: string): void {
  controlCenter.registerCommand(command);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function execCommand(command: string, args: any): void {
  controlCenter.execCommand(command, args);
}

export function receiveCommand(
  command: string,
  callback: CommandTaskCallback
): void {
  controlCenter.receiveCommand(command, callback);
}
