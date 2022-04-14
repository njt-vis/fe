import { CommandTaskCallback } from './typings';

export class CommandTask {
  constructor(cb?: CommandTaskCallback) {
    this.callback = cb;
  }

  private callback?: CommandTaskCallback;

  public prev: CommandTask | null = null;

  public next: CommandTask | null = null;

  public exec = (args: any): void => {
    if (this.callback) {
      this.callback(args).then(nextAgrs => {
        if (this.next) {
          this.next.exec(nextAgrs);
        }
      });
    }
  };

  public getLength = (): number => {
    if (this.next) {
      return 1 + this.next.getLength();
    }
    return 1;
  };

  public shift = (task: CommandTask): void => {
    if (this.prev === null) {
      this.prev = task;
    }
    // TODO:
  };

  public setPrev = (task: CommandTask | null): void => {
    this.prev = task;
  };

  public setNext = (task: CommandTask | null): void => {
    this.next = task;
  };

  public append = (task: CommandTask): void => {
    if (this.next === null) {
      this.setNext(task);
      task.setPrev(this);
    } else {
      this.next.append(task);
    }
  };
}
