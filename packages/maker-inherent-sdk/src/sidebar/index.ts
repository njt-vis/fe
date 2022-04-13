import { common, plugin } from '@njt-vis/utils';

type SidebarPluginStore = {
  plugins: Sidebar.ItemModel[];
};

// TODO: 来自读取
const originSidebarStore: SidebarPluginStore = {
  plugins: [
    {
      name: 'vis-charts',
      type: 'SIDEBAR_ITEM',
      version: '0.0.0',
      description: '图表组件库',
      displayName: '图表',
      icon: 'icon.png',
      itemIcon: 'icon.svg',
      engines: {
        vis: '1.0.0',
      },
    },
  ],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sidebarStore =
  common.createDisabledProxy<SidebarPluginStore>(originSidebarStore);

/** 获取用户 sidebar 插件 */
export const getPlugins = async (): Promise<Sidebar.ItemModel[]> => {
  const appPromises = originSidebarStore.plugins.map(app =>
    fetch(`${plugin.getPluginBaseUrl(app)}/${app.itemIcon}`)
  );

  // 此处请求无失败处理
  const appIcons = await common.FetchAllWithoutReject(appPromises, {
    parse: 'text',
  });
  const plugins: Sidebar.ItemModel[] = originSidebarStore.plugins.map(
    (item, index) => {
      if (typeof appIcons[index] === 'string') {
        Object.assign(item, { itemIconCtx: appIcons[index] });
      }
      return item;
    }
  );
  return plugins;
};
