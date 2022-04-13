import { plugin } from '@njt-vis/utils';

import AdapterSidebarItem from './adapter';
import logger from '../utils/logger';

const getAppContainerId = (name: string) => `sidebar-item-folder-${name}`;

const getAppCssId = (name: string) => `sidebar-item-css-${name}`;

const loadCss = (name: string, url: string, debug?: boolean) => {
  const id = getAppCssId(name);
  let el = document.querySelector(`[data-id=${id}]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('data-id', id);
    el.setAttribute('rel', 'stylesheet');

    document.head.appendChild(el);
  }
  const assetsUrl = url + (debug ? `?stamp=${Date.now()}` : '');
  el.setAttribute('href', assetsUrl);
};

interface SidebarItemBonderProps {
  el: HTMLElement;
  app: Sidebar.ItemModel;
}
/**
 * sidebar item 粘接器
 */
class SidebarItemBonder {
  constructor(props: SidebarItemBonderProps) {
    this.el = props.el;
    this.app = props.app;
  }

  private el: HTMLElement;

  private app?: Sidebar.ItemModel;

  private adapter?: AdapterSidebarItem;

  public getAppContainer = (app: Sidebar.ItemModel) => {
    const id = getAppContainerId(app.name);
    let container = document.getElementById(id);

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', id);
      this.el.appendChild(container);
    }

    return container;
  };

  /** 挂载 */
  public mount = async () => {
    const { app } = this;
    if (!app) return;

    const { main } = plugin.getSidebarItemResources(app);

    loadCss(app.name, main.css, app.debug);

    this.getAppContainer(app).style.display = 'block';

    const assetsUrl = main.js + (app.debug ? `?stamp=${Date.now()}` : '');

    System.import<SystemModel.Props<AdapterSidebarItem>>(assetsUrl).then(
      (module: SystemModel.Props<AdapterSidebarItem>) => {
        // MARK: 销毁后不进行渲染
        if (!this.app) return;

        const RemoteAdapterSidebarItem = module.default;

        const adapter = new RemoteAdapterSidebarItem({
          el: this.getAppContainer(app),
          onError: this.handleError,
        });
        // 尝试卸载节点
        this.adapter?.unmount();
        // 尝试挂载节点
        try {
          adapter.mount();
        } catch (error: any) {
          // TODO: 异常上报
          logger.error(error);
          this.handleError(error);
        }
        this.adapter = adapter;
      }
    );
  };

  /** 重新挂载 */
  public remount = (app: Sidebar.ItemModel) => {
    this.adapter?.unmount();
    this.app = app;
    this.mount();
  };

  /** 销毁粘接器 */
  public destroy = () => {
    const { app } = this;
    if (!app) return;

    this.adapter?.unmount();
    this.getAppContainer(app).style.display = 'none';
    this.app = undefined;
  };

  /** 异常处理 */
  private handleError = (error: Error) => {
    // TODO: 异常上报
    logger.error(error);
  };
}

export default SidebarItemBonder;
