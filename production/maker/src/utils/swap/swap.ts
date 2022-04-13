export class Swap<S> {
  private cbs: ((data: S) => void)[] = [];

  public on = (cb: (data: S) => void): void => {
    const { cbs } = this;
    !cbs.includes(cb) && cbs.push(cb);
  };

  public remove = (cb: (data: S) => void): void => {
    const { cbs } = this;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const index = cbs.findIndex(cb);

    index > -1 && cbs.splice(index, 1);
  };

  public emit = (data: S): void => {
    this.cbs.forEach(cb => cb(data));
  };

  public destroy = (): void => {
    this.cbs = [];
  };
}
