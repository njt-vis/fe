import { ControlCenter, ControlDriver, ControlTypes } from '@njt-vis/vdriver';

const { registerDriver, registerCommand, execCommand, receiveCommand } =
  ControlCenter;

export class Swap {
  protected driver?: ControlDriver;

  public bindDriver = (name: string): void => {
    this.driver = registerDriver(name);
  };

  protected registerCommand = (name: string): void => {
    registerCommand(name);
  };

  protected execCommand = (name: string, args: Record<string, any>): void => {
    execCommand(name, args);
  };

  protected receiveCommand = (
    name: string,
    callback: ControlTypes.CommandTaskCallback
  ): void => {
    receiveCommand(name, callback);
  };
}

export default Swap;
