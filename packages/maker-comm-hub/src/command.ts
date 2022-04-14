import { CommandTask } from './command-task';
import { CommandTaskCallback } from './typings';

export class Command {
  private top: CommandTask | null = null;

  public name = '';

  constructor(name: string) {
    this.name = name;
  }

  /** bind new task to command */
  public bind = (cb?: CommandTaskCallback): void => {
    const task = new CommandTask(cb);
    if (!this.top) {
      this.top = task;
    } else {
      this.top.append(task);
    }
  };

  /** unbind new task with command */
  public unbind = (task: CommandTask): void => {
    if (!this.top || !task) return;

    this.remove(task, this.top);
  };

  /** remove new task from command */
  public remove = (task: CommandTask, current: CommandTask): void => {
    if (task !== current && current.next) {
      this.remove(task, current.next);
      return;
    }

    if (task !== current) return;
    // task === current
    if (task.prev) {
      const { prev } = task;
      prev.setNext(current);
      current.setPrev(prev);
    } else {
      current.setPrev(null);
    }
  };

  /** exec command */
  public exec = (args: any): void => {
    this.top && this.top.exec(args);
  };
}
