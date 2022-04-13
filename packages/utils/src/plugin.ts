// TODO: 抽离到公共包
const publicPath = 'http://127.0.0.1:13010';

interface BaseUrlOptions {
  name: string;
  version?: string;
  hostname?: string;
  port?: number;
}

/** 获取插件资源路径 */
export function getPluginBaseUrl(app: BaseUrlOptions) {
  const { name, version } = app;
  return `${publicPath}/${name}/${version}`;
}

/** 获取插件 debug mode 资源路径 */
export function getPluginDebugBaseUrl(app: BaseUrlOptions) {
  const { name, hostname, port } = app;
  return `http://${hostname}:${port}/${name}/-1`;
}

/** 获取 sidebar - item 插件资源 */
export function getSidebarItemResources(
  app: Sidebar.ItemModel
): PluginMode.Resources<'main'> {
  const baseUrl = app.debug
    ? getPluginDebugBaseUrl(app)
    : getPluginBaseUrl(app);
  const resources = {
    main: {
      js: `${baseUrl}/sidebar-item.js`,
      css: `${baseUrl}/sidebar-item.css`,
    },
  };
  return resources;
}
