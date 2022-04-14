import { common, plugin } from '@njt-vis/utils';

export interface PluginSettingMode {
  name: string;
  hostname: string;
  port: number;
  connected: string;
}

/** 获取合并后的 sidebar-items */
export async function getDebugPlugins(
  appSettings: Debug.PluginSetting[]
): Promise<Sidebar.ItemModel[]> {
  const appPromises = appSettings.map(app =>
    fetch(`${plugin.getPluginDebugBaseUrl(app)}/application.json`)
  );
  // 此处请求无失败处理
  const appRes = await common.FetchAllWithoutReject(appPromises);

  // 过滤失败请求
  const appRunning: Sidebar.ItemModel[] = appRes
    .filter(plugin => plugin !== 0)
    .map(app => {
      // TODO: 理论上不存在无法找到, 但需要处理
      const { hostname, port } = appSettings.find(
        item => item.name === app.name
      ) as Debug.PluginSetting;
      return {
        ...app,
        hostname,
        port,
      };
    });
  // 批量获取启动插件的 icon
  const iconPromises = appRunning.map(app =>
    fetch(`${plugin.getPluginDebugBaseUrl(app)}/${app?.itemIcon}`)
  );
  // 此处请求无失败处理
  const iconRes = await common.FetchAllWithoutReject(iconPromises, {
    parse: 'text',
  });
  appRunning.forEach((app, index) => {
    Object.assign(app, { itemIconCtx: iconRes[index] });
  });
  return appRunning;
}

type SidebarItemExct = {
  type: PluginModel.TypeSidebarItem;
  plugins: Sidebar.ItemModel[];
};
// TODO: 需要扩展多种类型
type ExtractResult = SidebarItemExct;

/** 提取不同类型的插件 */
export const extractDiffTypePlugins = (
  // TODO: 扩展多种类型
  plugins: Sidebar.ItemModel[]
): ExtractResult[] => {
  const sidebarItem = plugins.filter(item => item.type === 'SIDEBAR_ITEM');

  return [
    {
      type: 'SIDEBAR_ITEM',
      plugins: sidebarItem,
    },
  ];
};
