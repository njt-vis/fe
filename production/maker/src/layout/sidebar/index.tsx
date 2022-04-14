import { render } from 'solid-js/web';

import { sidebar as sidebarCommon } from '@njt-vis/maker-inherent-sdk';
import { sidebar as sidebarDebug, switchOpen } from '@njt-vis/debug-store';

import { INHERENT_COMMANDS } from '../../commands';
import Swap from '../swap';

import App from './App';
import AppUnfold from './app-unfold';
import { showPluginUnFoldView, store, setItems, getItems } from './store';

import './index.less';

interface OptionsModel {
  id: string;
  driver: string;
}

class SidebarRenderer extends Swap {
  /** sidebar container element */
  private container?: HTMLElement;

  // TODO: 从常量中取值
  private layoutMode: Sidebar.LayoutMode = 'shrink';

  /** 初始化内置侧边栏插件 */
  private initializeInherentItems = async () => {
    const items = await sidebarCommon.getPlugins();
    setItems(items.map(item => ({ ...item })));

    // TODO: 全局调用
    switchOpen();

    this.listenDebugChange();
  };

  /** 监听 debug 插件变化 */
  private listenDebugChange = () => {
    sidebarDebug.onDebugPluginsChange(this.mergeDebugPlugins);
  };

  /** 合并 debug 插件列表 */
  private mergeDebugPlugins = (debugPlugins: Sidebar.ItemModel[]) => {
    if (!debugPlugins.length) return;

    const plugins = getItems().map(item => ({ ...item }));
    debugPlugins.forEach(plugin => {
      const debugPlugin = { ...plugin };
      const index = plugins.findIndex(item => item.name === debugPlugin.name);
      debugPlugin.debug = true;
      if (index === -1) {
        plugins.push(debugPlugin);
        return;
      }
      plugins[index] = debugPlugin;
    });
    setItems(plugins);
  };

  /** 监听相关 */
  private intializeReceiver = () => {
    this.receiveCommand(
      INHERENT_COMMANDS.RELAYOUT,
      (args: Record<string, any>) =>
        new Promise(resolve => {
          if (typeof args.sidebar !== 'undefined') {
            this.layoutMode = args.sidebar;
          }
          resolve(args);
        })
    );
  };

  private handleItemClick = (name: string) => {
    const mode = this.layoutMode === 'shrink' ? 'stretch' : 'shrink';
    showPluginUnFoldView(name);
    this.changeLayout(mode);
  };

  public mount = (id: string) => {
    if (this.container) {
      return;
    }
    this.container = document.getElementById(id) as HTMLElement;

    const AppWrapper = () => (
      <div className="layout-sidebar-container">
        {/* 侧边栏渲染视图 */}
        <App store={store} onItemClick={this.handleItemClick} />
        {/* 侧边栏展开渲染视图 */}
        <AppUnfold store={store}></AppUnfold>
      </div>
    );

    render(() => <AppWrapper />, document.getElementById(id) as HTMLElement);
  };

  /** 启用 */
  public startUp = () => {
    // 初始化注册 sidebar items
    this.initializeInherentItems();
    // 初始化指令接收
    this.intializeReceiver();
  };

  public changeLayout = (mode: Sidebar.LayoutMode) => {
    // this.$options?.onLayoutChange && this.$options?.onLayoutChange(mode);
    this.execCommand(INHERENT_COMMANDS.RELAYOUT, { sidebar: mode });
  };
}

const view = new SidebarRenderer();

export function renderSidebar({ id, driver }: OptionsModel): void {
  view.mount(id);
  view.bindDriver(driver);
  view.startUp();
}
