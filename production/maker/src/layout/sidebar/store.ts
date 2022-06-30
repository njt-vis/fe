import { createMutable } from 'solid-js/store';

const createDefaultValue = (): Sidebar.MakerStore => ({
  plugins: [],
  active: '',
});

export const store = createMutable<Sidebar.MakerStore>(createDefaultValue());

/** update sidebar item */
export const getItems = (): Sidebar.ItemModel[] => store.plugins;
/** update sidebar item */
export const setItems = (items: Sidebar.ItemModel[]): void => {
  store.plugins = items;
};

/** 挂载插件 */
export const showPluginUnFoldView = (name: string): void => {
  store.active = store.active === name ? '' : name;
};
/** 卸载插件 */
export const hidePluginUnFoldView = (): void => {
  store.active = '';
};
/** 切换插件 */
export const switchPluginUnFoldView = (name: string): void => {
  store.active = name;
};
