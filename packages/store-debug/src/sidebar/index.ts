import { common, Listener } from '@njt-vis/utils';

enum EVENTS {
  DEBUG_SIDEBAR_ITEMS_CHANGE = 'DEBUG_SIDEBAR_ITEMS_CHANGE',
}

const listener = new Listener();

const originStore: Sidebar.MakerStore = Object.create({
  plugins: [],
});

const store = common.createDisabledProxy<Sidebar.MakerStore>(originStore);

/** 调试插件变更 */
export const onDebugPluginsChange = (
  fn: (plugins: Sidebar.ItemModel[]) => void
) => {
  listener.on(EVENTS.DEBUG_SIDEBAR_ITEMS_CHANGE, () => {
    fn(store.plugins);
  });
};

/** 更新插件列表 */
export const updatePlugins = (plugins: Sidebar.ItemModel[]) => {
  originStore.plugins = plugins;
  listener.emit(EVENTS.DEBUG_SIDEBAR_ITEMS_CHANGE);
};
