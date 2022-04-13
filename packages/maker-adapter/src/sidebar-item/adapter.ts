interface AdapterSidebarItemOptions {
  el: HTMLElement;
  onError: (error: Error) => void;
}

class AdapterSidebarItem {
  // eslint-disable-next-line no-useless-constructor
  constructor(_props: AdapterSidebarItemOptions) {}

  public mount = () => {};

  public unmount = () => {};

  public onError = (_error: Error) => {};
}

export default AdapterSidebarItem;
