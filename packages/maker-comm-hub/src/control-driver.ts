import Receiver from './receiver';

export default class ControlDriver {
  constructor(name: string) {
    this.name = name;
  }

  public name = '';

  private receiver: Receiver = [];

  private bind = () => {};

  private unbuild = () => {};
}

Object.setPrototypeOf(ControlDriver.prototype, null);
