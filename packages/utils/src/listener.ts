type Exec = () => void;

type Task = {
  once?: boolean;
  exec: Exec;
};

type OnOptions = {
  /** 是否单次监听 */
  once?: boolean;
};

const isExist = (tasks: Task[] | undefined): boolean =>
  typeof tasks !== 'undefined';

class Listener {
  /** 任务存储 */
  private taskMap: Map<string, Task[]> = new Map();

  /** 是否已经监听 */
  private isListenning = (key: string, exec: Exec) => {
    const { taskMap } = this;
    const tasks = taskMap.get(key);

    return isExist(tasks) && !!tasks?.find(item => item.exec === exec);
  };

  /** 监听 */
  public on = (key: string, exec: Exec, { once }: OnOptions = {}) => {
    const { taskMap } = this;
    const tasks = taskMap.get(key);

    // 已经监听
    if (this.isListenning(key, exec)) {
      // TODO: 添加日志
      return;
    }
    const task = {
      once,
      exec,
    };
    if (isExist(tasks)) {
      tasks?.push(task);
      return;
    }
    taskMap.set(key, [task]);
  };

  /** 取消监听 */
  public off = (key: string, exec: Exec) => {
    const { taskMap } = this;
    const tasks = taskMap.get(key);

    // 尚未监听
    if (!isExist(tasks)) return;

    const index = tasks?.findIndex(task => task.exec === exec) as number;

    if (index !== -1) {
      tasks?.splice(index, 1);
    }
  };

  /** 触发监听 */
  public emit = (key: string) => {
    const { taskMap } = this;
    const tasks = taskMap.get(key) as Task[];
    // 尚未监听
    if (!isExist(tasks)) return;
    // 移除监听任务下标序号列表
    const deleteIndexs: number[] = [];

    tasks.forEach((task, index) => {
      if (task.once) {
        deleteIndexs.push(index);
      }
      task.exec();
    });
    for (let len = deleteIndexs?.length as number; len > 0; len -= 1) {
      tasks.splice(deleteIndexs[len - 1], 1);
    }
  };

  public getTask = (name: string) => this.taskMap.get(name);

  /** 销毁, 清空所有监听 */
  public destroy = () => {
    this.taskMap.clear();
  };
}

export default Listener;
